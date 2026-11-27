(function () {
    'use strict';
    const CONFIG = Object.freeze({ url: 'https://wolmrujwosbgipcbjdyq.supabase.co', key: 'sb_publishable_e1uWHNXU0sDkoKEV1vNFbA_Fs9jDqcX' });
    const DATA_KEY = 'et35_public_demo_v1';
    const BASE_KEY = 'et35_public_demo_base_v1';
    const TABLE = 'et35_demo_compartida';
    const SPACE = 'et35';
    const SECTIONS = ['ALUMNOS', 'PRECEPTORES', 'ASISTENCIAS', 'JUSTIFICACIONES', 'SCAN_LOG', 'AUDITORIA', 'BORRADORES'];
    let baseline = null, version = null, active = false, busy = false, latest = null, starting = null;
    let timer = null, lastProblem = '', offlineChanges = null;
    const parse = (value) => { try {
        return JSON.parse(value || 'null');
    }
    catch {
        return null;
    } };
    const copy = obj => JSON.parse(JSON.stringify(obj));
    const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    function readConfig() { return { ...CONFIG }; }
    function saveBase() { if (baseline)
        localStorage.setItem(BASE_KEY, JSON.stringify({ url: CONFIG.url, owner: SPACE, state: baseline })); }
    function setStatus(connected, message) {
        lastProblem = connected ? '' : message;
        const badge = document.querySelector('.live-badge span');
        if (badge)
            badge.textContent = message;
        let el = document.getElementById('et35-cloud-message');
        if (!el) {
            el = document.createElement('div');
            el.id = 'et35-cloud-message';
            el.style.cssText = 'position:fixed;right:12px;bottom:12px;max-width:min(440px,calc(100vw - 24px));padding:9px 12px;border-radius:10px;z-index:99999;font:600 12px system-ui;box-shadow:0 5px 20px #0003;display:flex;align-items:center;gap:10px';
            document.body.append(el);
        }
        el.style.background = connected ? '#d4fbe2' : '#fff0d3';
        el.style.color = '#173726';
        const text = document.createElement('span');
        text.textContent = message;
        const link = document.createElement('a');
        link.href = 'conexion.html';
        link.textContent = 'Ver conexión';
        link.style.cssText = 'color:#a32028;text-decoration:underline';
        el.replaceChildren(text, link);
        if (connected) {
            el.style.display = 'none';
        }
        else
            el.style.display = 'flex';
    }
    async function http(path, method = 'GET', data = null, extra = {}) {
        const headers = { apikey: CONFIG.key, ...extra };
        if (data !== null) headers['Content-Type'] = 'application/json';
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
            const res = await fetch(CONFIG.url + path, { method, headers, body: data === null ? undefined : JSON.stringify(data), cache: 'no-store', signal: controller.signal });
            const raw = await res.text();
            if (!res.ok) throw new Error(`Servidor ${res.status}: ${raw.slice(0, 230)}`);
            return raw ? JSON.parse(raw) : null;
        }
        finally { clearTimeout(timeout); }
    }
    async function fetchRow() {
        const data = await http('/rest/v1/' + TABLE + '?select=version,payload&id=eq.' + SPACE + '&limit=1');
        const row = Array.isArray(data) ? data[0] || null : null;
        if (row && (!row.payload || !Array.isArray(row.payload.ALUMNOS) || !Array.isArray(row.payload.ASISTENCIAS)))
            throw new Error('El espacio compartido tiene un formato inválido.');
        return row;
    }
    function keyFor(name, item, i) {
        if (name === 'ASISTENCIAS')
            return `${item.alumnoId}|${item.fecha}|${item.sesion || 'principal'}`;
        if (name === 'JUSTIFICACIONES')
            return String(item.id);
        if (name === 'SCAN_LOG')
            return `${item.fecha || ''}|${item.hora || ''}|${item.alumno?.id || item.alumnoId || ''}|${item.tipo || ''}|${i}`;
        if (name === 'AUDITORIA')
            return `${item.fecha || item.timestamp || item.cuando || ''}|${item.accion || item.tipo || ''}|${i}`;
        if (name === 'BORRADORES')
            return `${item.fecha || item.id || ''}|${i}`;
        return String(item.id);
    }
    function delta(base, local) {
        const changed = {};
        for (const name of SECTIONS) {
            const b = Array.isArray(base?.[name]) ? base[name] : [];
            const l = Array.isArray(local?.[name]) ? local[name] : [];
            if (name === 'SCAN_LOG' || name === 'AUDITORIA' || name === 'BORRADORES') {
                if (!equal(b, l))
                    changed[name] = { replace: copy(l) };
                continue;
            }
            const before = new Map(b.map((v, i) => [keyFor(name, v, i), v]));
            const after = new Map(l.map((v, i) => [keyFor(name, v, i), v]));
            const edits = [], deletes = [];
            for (const [k, v] of after)
                if (!equal(before.get(k), v))
                    edits.push([k, copy(v)]);
            for (const k of before.keys())
                if (!after.has(k))
                    deletes.push(k);
            if (edits.length || deletes.length)
                changed[name] = { edits, deletes };
        }
        const bDays = base?.DIAS_SIN_CLASES || {}, lDays = local?.DIAS_SIN_CLASES || {};
        const days = {};
        for (const k of new Set([...Object.keys(bDays), ...Object.keys(lDays)]))
            if (!equal(bDays[k], lDays[k]))
                days[k] = Object.hasOwn(lDays, k) ? lDays[k] : null;
        if (Object.keys(days).length)
            changed.DIAS_SIN_CLASES = days;
        return changed;
    }
    function applyDelta(remote, changes) {
        const out = copy(remote);
        out.datasetVersion = Math.max(16, Number(out.datasetVersion) || 0);
        for (const [name, c] of Object.entries(changes)) {
            if (name === 'DIAS_SIN_CLASES') {
                out.DIAS_SIN_CLASES = out.DIAS_SIN_CLASES || {};
                for (const [k, v] of Object.entries(c)) {
                    if (v === null)
                        delete out.DIAS_SIN_CLASES[k];
                    else
                        out.DIAS_SIN_CLASES[k] = v;
                }
                continue;
            }
            if (c.replace) {
                if (name === 'SCAN_LOG') {
                    const old = Array.isArray(out[name]) ? out[name] : [];
                    const seen = new Set(), merged = [];
                    for (const item of [...c.replace, ...old]) {
                        const k = JSON.stringify(item);
                        if (!seen.has(k)) {
                            seen.add(k);
                            merged.push(item);
                        }
                    }
                    out[name] = merged.slice(0, 100);
                }
                else
                    out[name] = c.replace;
                continue;
            }
            const rows = Array.isArray(out[name]) ? out[name] : [];
            const map = new Map(rows.map((v, i) => [keyFor(name, v, i), v]));
            for (const k of c.deletes)
                map.delete(k);
            for (const [k, v] of c.edits)
                map.set(k, v);
            out[name] = [...map.values()];
        }
        return out;
    }
    async function insertInitial(state) {
        const obj = { id: SPACE, version: 1, payload: state };
        try {
            const result = await http('/rest/v1/' + TABLE, 'POST', obj, { Prefer: 'return=representation' });
            return { version: 1, payload: state };
        }
        catch (e) {
            if (String(e).includes('Servidor 409'))
                return fetchRow();
            throw e;
        }
    }
    async function changeCAS(expected, data) {
        const rows = await http('/rest/v1/' + TABLE + '?id=eq.' + SPACE + '&version=eq.' + expected, 'PATCH', { payload: data, version: expected + 1 }, { Prefer: 'return=representation' });
        return Array.isArray(rows) && rows.length > 0 ? rows[0] : null;
    }
    async function writeNext(local) {
        if (!active)
            return;
        const changes = delta(baseline, local);
        if (!Object.keys(changes).length)
            return;
        for (let attempt = 0; attempt < 6; attempt++) {
            const remote = await fetchRow();
            if (!remote)
                throw new Error('No se encontró el espacio compartido.');
            const merged = applyDelta(remote.payload, changes);
            const result = await changeCAS(remote.version, merged);
            if (result) {
                baseline = copy(merged);
                version = result.version;
                saveBase();
                if (typeof window.et35AplicarEstadoRemoto === 'function')
                    window.et35AplicarEstadoRemoto(copy(merged));
                return;
            }
        }
        throw new Error('Conflicto de escritura. Se conservaron tus cambios en este navegador; reintentá la sincronización.');
    }
    async function flush() {
        if (busy || !active || !latest)
            return;
        busy = true;
        try {
            while (latest) {
                const state = latest;
                latest = null;
                await writeNext(state);
            }
            setStatus(true, 'Nube sincronizada');
        }
        catch (err) {
            console.error('ET35 nube:', err);
            latest = latest || parse(localStorage.getItem(DATA_KEY));
            setStatus(false, 'Sin sincronizar: ' + String(err.message || err).slice(0, 110));
        }
        finally {
            busy = false;
        }
    }
    function save(state) {
        if (!active)
            return;
        latest = copy(state);
        if (baseline)
            void flush();
    }
    async function bootstrap() {
        try {
            const row = await fetchRow();
            if (row) {
                const previous = parse(localStorage.getItem(BASE_KEY));
                const existing = parse(localStorage.getItem(DATA_KEY));
                if (previous?.url === CONFIG.url && previous?.owner === SPACE && previous?.state && existing) {
                    const changes = delta(previous.state, existing);
                    if (Object.keys(changes).length)
                        offlineChanges = changes;
                }
                baseline = copy(row.payload);
                version = row.version;
                window.ET35_BOOTSTRAP = { state: copy(row.payload) };
                localStorage.setItem(DATA_KEY, JSON.stringify(row.payload));
                saveBase();
            }
            active = true;
            setStatus(!!row, row ? 'Nube conectada' : 'Preparando base compartida…');
            return true;
        }
        catch (err) {
            setStatus(false, 'No se pudo abrir la nube: ' + String(err.message || err).slice(0, 90));
            return false;
        }
    }
    function start() {
        if (!starting) starting = startInternal().finally(() => { starting = null; });
        return starting;
    }
    async function startInternal() {
        if (!active)
            return;
        if (!baseline) {
            try {
                const local = parse(localStorage.getItem(DATA_KEY));
                if (!local || !Array.isArray(local.ALUMNOS))
                    throw new Error('Todavía no hay datos para iniciar la nube.');
                const row = await insertInitial(local);
                baseline = copy(row.payload);
                version = row.version;
                saveBase();
                const pending = latest;
                latest = null;
                if (!equal(row.payload, local) && window.et35AplicarEstadoRemoto)
                    window.et35AplicarEstadoRemoto(copy(row.payload));
                if (pending && !equal(pending, local)) {
                    const merged = applyDelta(baseline, delta(local, pending));
                    await writeNext(merged);
                }
                setStatus(true, 'Nube conectada');
            }
            catch (err) {
                active = false;
                setStatus(false, 'Error al iniciar nube: ' + String(err.message || err).slice(0, 100));
                return;
            }
        }
        else {
            if (offlineChanges) {
                try {
                    const state = applyDelta(baseline, offlineChanges);
                    offlineChanges = null;
                    await writeNext(state);
                }
                catch (err) {
                    setStatus(false, 'Datos locales pendientes: ' + err.message);
                }
            }
            const stored = parse(localStorage.getItem(DATA_KEY));
            if (stored && !equal(stored, baseline))
                save(stored);
        }
        if (!timer)
            timer = setInterval(async () => {
                if (!active || busy)
                    return;
                if (latest) {
                    void flush();
                    return;
                }
                try {
                    const data = await http('/rest/v1/' + TABLE + '?select=version&id=eq.' + SPACE + '&limit=1');
                    if (!data?.length)
                        return;
                    if (data[0].version !== version) {
                        const row = await fetchRow();
                        if (latest) {
                            void flush();
                            return;
                        }
                        version = row.version;
                        baseline = copy(row.payload);
                        saveBase();
                        if (window.et35AplicarEstadoRemoto)
                            window.et35AplicarEstadoRemoto(copy(row.payload));
                    }
                    setStatus(true, 'Nube sincronizada');
                }
                catch (err) {
                    setStatus(false, 'Sin conexión a la nube: ' + String(err.message || err).slice(0, 95));
                }
            }, 5000);
    }
    async function transact(change) {
        if (!active)
            throw new Error('Conectá la base de datos antes de escanear QR.');
        for (let i = 0; i < 7; i++) {
            const row = await fetchRow();
            if (!row)
                throw new Error('Abrí primero la página escolar para crear la base compartida.');
            const state = copy(row.payload);
            const result = change(state);
            if (!result.ok)
                return result;
            const written = await changeCAS(row.version, state);
            if (written) {
                baseline = copy(state);
                version = written.version;
                saveBase();
                return result;
            }
        }
        throw new Error('Hubo muchas modificaciones simultáneas. Volvé a escanear el QR.');
    }
    function getStatus() { return { configured: true, active, ready: active && baseline !== null, version, message: lastProblem }; }
    window.ET35Cloud = { bootstrap, start, save, transact, getStatus, getConfig: readConfig, fetchRow };
})();
