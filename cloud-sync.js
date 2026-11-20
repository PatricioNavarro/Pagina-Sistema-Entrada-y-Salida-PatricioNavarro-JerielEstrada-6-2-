(function () {
    'use strict';
    const CONFIG_KEY = 'et35_supabase_config_v1';
    const SESSION_KEY = 'et35_supabase_session_v1';
    const DATA_KEY = 'et35_demo_v2';
    const BASE_KEY = 'et35_cloud_previous_base_v1';
    const TABLE = 'et35_workspace';
    const SECTIONS = ['ALUMNOS', 'PRECEPTORES', 'ASISTENCIAS', 'JUSTIFICACIONES', 'SCAN_LOG', 'AUDITORIA', 'BORRADORES'];
    let config = null, session = null, baseline = null, version = null, active = false, busy = false, latest = null;
    let timer = null, lastProblem = '', offlineChanges = null;
    const parse = (value) => { try {
        return JSON.parse(value || 'null');
    }
    catch {
        return null;
    } };
    const copy = obj => JSON.parse(JSON.stringify(obj));
    const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    function readConfig() {
        const val = parse(localStorage.getItem(CONFIG_KEY));
        return val && /^https:\/\/[^/]+$/.test(val.url) && typeof val.key === 'string' && val.key.length > 12 ? val : null;
    }
    function readSession() { return parse(localStorage.getItem(SESSION_KEY)); }
    function saveBase() { if (baseline && session && config)
        localStorage.setItem(BASE_KEY, JSON.stringify({ url: config.url, owner: idFromSession(), state: baseline })); }
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
        link.textContent = 'Configurar';
        link.style.cssText = 'color:#a32028;text-decoration:underline';
        el.replaceChildren(text, link);
        if (connected) {
            el.style.display = 'none';
        }
        else
            el.style.display = 'flex';
    }
    async function http(path, method = 'GET', data = null, extra = {}) {
        if (!config)
            throw new Error('Configurá primero la base de datos en conexion.html');
        if (!session?.access_token)
            throw new Error('Iniciá sesión en la base compartida.');
        if (session.expires_at && Date.now() > session.expires_at - 60000)
            await renew();
        const doRequest = async () => {
            const headers = { apikey: config.key, Authorization: 'Bearer ' + session.access_token, ...extra };
            if (data !== null)
                headers['Content-Type'] = 'application/json';
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000);
            let res;
            try {
                res = await fetch(config.url + path, { method, headers, body: data === null ? undefined : JSON.stringify(data), cache: 'no-store', signal: controller.signal });
            }
            finally {
                clearTimeout(timeout);
            }
            if (!res.ok) {
                const err = await res.text();
                throw new Error(`Servidor ${res.status}: ${err.slice(0, 230)}`);
            }
            const raw = await res.text();
            return raw ? JSON.parse(raw) : null;
        };
        try {
            return await doRequest();
        }
        catch (err) {
            if (String(err).includes('Servidor 401') && session.refresh_token) {
                await renew();
                return doRequest();
            }
            throw err;
        }
    }
    async function renew() {
        const response = await fetch(config.url + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: { apikey: config.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: session.refresh_token }) });
        if (!response.ok) {
            session = null;
            localStorage.removeItem(SESSION_KEY);
            throw new Error('La sesión de nube venció. Volvé a conectar en conexion.html');
        }
        const value = await response.json();
        session = { access_token: value.access_token, refresh_token: value.refresh_token, expires_at: Date.now() + (value.expires_in || 3600) * 1000 };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    async function login(email, password) {
        config = readConfig();
        if (!config)
            throw new Error('Ingresá una URL de Supabase y una clave pública válida.');
        const response = await fetch(config.url + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: config.key, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
        if (!response.ok)
            throw new Error('No se pudo ingresar a Supabase. Revisá el correo, la contraseña y la confirmación de la cuenta.');
        const value = await response.json();
        session = { access_token: value.access_token, refresh_token: value.refresh_token, expires_at: Date.now() + (value.expires_in || 3600) * 1000 };
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        await fetchRow();
        return true;
    }
    function configure(url, key) {
        url = String(url || '').trim().replace(/\/+$/, '');
        key = String(key || '').trim();
        if (!/^https:\/\/[^/]+$/.test(url) || !key || key.length < 12)
            throw new Error('Ingresá la URL HTTPS de Supabase y la clave pública/anon del proyecto.');
        const old = readConfig();
        if (old && (old.url !== url || old.key !== key))
            localStorage.removeItem(SESSION_KEY);
        localStorage.setItem(CONFIG_KEY, JSON.stringify({ url, key }));
        config = readConfig();
        session = readSession();
    }
    function idFromSession() {
        try {
            const p = session.access_token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(p)).sub;
        }
        catch {
            throw new Error('Token de sesión no válido');
        }
    }
    async function fetchRow() {
        const data = await http('/rest/v1/' + TABLE + '?select=version,payload&owner_id=eq.' + encodeURIComponent(idFromSession()) + '&limit=1');
        return Array.isArray(data) ? data[0] || null : null;
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
        const obj = { owner_id: idFromSession(), version: 1, payload: state };
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
        const rows = await http('/rest/v1/' + TABLE + '?owner_id=eq.' + encodeURIComponent(idFromSession()) + '&version=eq.' + expected, 'PATCH', { payload: data, version: expected + 1 }, { Prefer: 'return=representation' });
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
        config = readConfig();
        session = readSession();
        if (!config || !session) {
            setStatus(false, 'Modo local: los cambios NO se comparten entre dispositivos.');
            return false;
        }
        try {
            const row = await fetchRow();
            if (row) {
                const previous = parse(localStorage.getItem(BASE_KEY));
                const existing = parse(localStorage.getItem(DATA_KEY));
                if (previous?.url === config.url && previous?.owner === idFromSession() && previous?.state && existing) {
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
            setStatus(true, 'Nube conectada');
            return true;
        }
        catch (err) {
            setStatus(false, 'No se pudo abrir la nube: ' + String(err.message || err).slice(0, 90));
            return false;
        }
    }
    async function start() {
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
                latest = null;
                if (!equal(row.payload, local) && window.et35AplicarEstadoRemoto)
                    window.et35AplicarEstadoRemoto(copy(row.payload));
                setStatus(true, 'Nube conectada');
            }
            catch (err) {
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
                    const data = await http('/rest/v1/' + TABLE + '?select=version&owner_id=eq.' + encodeURIComponent(idFromSession()) + '&limit=1');
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
    function getStatus() { return { configured: !!readConfig(), authenticated: !!readSession(), active, version, message: lastProblem }; }
    window.ET35Cloud = { configure, login, bootstrap, start, save, transact, getStatus, getConfig: readConfig, readSession, fetchRow, clearSession() { localStorage.removeItem(SESSION_KEY); session = null; active = false; } };
})();
