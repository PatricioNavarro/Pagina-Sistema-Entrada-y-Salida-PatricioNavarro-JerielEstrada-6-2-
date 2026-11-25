'use strict';
const $ = id => document.getElementById(id);
const camera = $('camera');
const codeInput = $('code');
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
let stream = null;
let detector = null;
let scanning = false;
let submitting = false;
let lastCode = '';
let lastAttempt = 0;
let retryTimer = null;
let clearFeedbackTimer = null;
let typedTimer = null;
let heldQr = null;
let missingQrFrames = 0;
function feedback(status, title, detail) {
    const box = $('feedback');
    box.className = status || '';
    const symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = status === 'success' ? '✅' : status === 'error' ? '⛔' : status === 'pending' ? '⌛' : '▣';
    const texts = document.createElement('div');
    const heading = document.createElement('strong');
    heading.textContent = title;
    const sub = document.createElement('small');
    sub.textContent = detail;
    texts.append(heading, sub);
    box.replaceChildren(symbol, texts);
}
const STORE_KEY = 'et35_demo_v2';
function estadoLocal() {
    try {
        const state = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
        return state && Array.isArray(state.ALUMNOS) && Array.isArray(state.ASISTENCIAS) ? state : null;
    }
    catch {
        return null;
    }
}
function statusConnection(ok) {
    const el = $('connection');
    el.className = 'connection ' + (ok ? 'ok' : 'off');
    el.querySelector('span').textContent = window.ET35Cloud?.getStatus().active ? 'Conectado a base de datos compartida' : ok ? 'Modo local · Este navegador solamente' : 'Sin base: configurá la nube o abrí el sistema principal';
}
function checkConnection() { statusConnection(Boolean(estadoLocal()) || Boolean(window.ET35Cloud?.getStatus().active)); }
(async () => {
    if (window.ET35Cloud) {
        await window.ET35Cloud.bootstrap();
        if (!window.ET35Cloud.getStatus().active) {
            feedback('error', 'Base de datos sin conectar', 'Para escanear desde otro dispositivo, abrí ../conexion.html y conectá Supabase.');
        }
    }
    checkConnection();
})();
setInterval(checkConnection, 6000);
window.addEventListener('storage', e => { if (e.key === STORE_KEY)
    checkConnection(); });
function ahoraArgentina() {
    const format = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    });
    const p = Object.fromEntries(format.formatToParts(new Date()).filter(x => x.type !== 'literal').map(x => [x.type, x.value]));
    return { fecha: `${p.year}-${p.month}-${p.day}`, hora: `${p.hour}:${p.minute}`, minutos: Number(p.hour) * 60 + Number(p.minute) };
}
function alumnoInscripto(a, fecha) {
    if (a.fechaAlta && fecha < a.fechaAlta)
        return false;
    const movimientos = (a.movimientosMatricula || []).filter(m => m.fecha <= fecha).sort((x, y) => x.fecha.localeCompare(y.fecha));
    return !movimientos.length || movimientos[movimientos.length - 1].tipo !== 'baja';
}
function registrarQRLocal(codigo) {
    const match = /^ET35-(?:ALU|DEMO)-(\d{4,6})$/.exec(codigo);
    if (!match)
        return { ok: false, error: 'El QR no pertenece al sistema ET35.' };
    const state = estadoLocal();
    if (!state)
        return { ok: false, error: 'Abrí la página principal con Live Server en otra pestaña de este mismo navegador.' };
    const alumno = state.ALUMNOS.find(a => Number(a.id) === Number(match[1]));
    if (!alumno || alumno.activo === false)
        return { ok: false, error: 'El código no corresponde a un alumno activo.' };
    const reloj = ahoraArgentina();
    if (!alumnoInscripto(alumno, reloj.fecha))
        return { ok: false, error: 'El alumno no figura inscripto hoy.' };
    let reg = state.ASISTENCIAS.find(r => Number(r.alumnoId) === Number(alumno.id) && r.fecha === reloj.fecha && (r.sesion || 'principal') === 'principal');
    if (reg && reg.entrada && !reg.demoGenerado)
        return { ok: false, error: 'El alumno ya tiene una entrada registrada hoy.' };
    if (reg?.estado === 'Justificado' && !reg.demoGenerado)
        return { ok: false, error: 'La ausencia está justificada. Debe revisarla un preceptor.' };
    const clasificacion = window.ET35Horarios?.estadoEntrada(alumno.curso, reloj.hora) || { estado: 'Sin registrar', observacion: 'Horario no disponible' };
    const estado = clasificacion.estado;
    if (estado === 'Sin registrar')
        return { ok: false, error: clasificacion.observacion };
    if (reg) {
        Object.assign(reg, { entrada: reloj.hora, salida: '', estado, tipo: 'QR', origen: 'Terminal local', demoGenerado: false, demoAutomatico: false, simulado: false, obs: clasificacion.observacion });
    }
    else {
        const id = state.ASISTENCIAS.reduce((max, r) => Math.max(max, Number(r.id) > 0 ? Number(r.id) : 0), 0) + 1;
        reg = { id, alumnoId: alumno.id, fecha: reloj.fecha, sesion: 'principal', entrada: reloj.hora, salida: '', estado, tipo: 'QR', origen: 'Terminal local', obs: clasificacion.observacion };
        state.ASISTENCIAS.push(reg);
    }
    state.SCAN_LOG = [
        { alumno: { id: alumno.id, apellido: alumno.apellido, nombre: alumno.nombre, curso: alumno.curso },
            tipo: 'Entrada', hora: reloj.hora, estado, fecha: reloj.fecha }, ...(state.SCAN_LOG || [])
    ].slice(0, 20);
    try {
        localStorage.setItem(STORE_KEY, JSON.stringify(state));
    }
    catch (e) {
        return { ok: false, error: 'No se pudieron guardar los datos en el navegador. Revisá el espacio disponible.' };
    }
    return { ok: true, alumno: `${alumno.apellido}, ${alumno.nombre}`, curso: alumno.curso, hora: reloj.hora, estado, observacion: clasificacion.observacion };
}
async function registrarQRNube(codigo) {
    return window.ET35Cloud.transact(state => {
        const match = /^ET35-(?:ALU|DEMO)-(\d{4,6})$/.exec(codigo);
        if (!match)
            return { ok: false, error: 'El QR no pertenece al sistema ET35.' };
        const alumno = state.ALUMNOS?.find(a => Number(a.id) === Number(match[1]));
        if (!alumno || alumno.activo === false)
            return { ok: false, error: 'No se encontró un alumno activo con ese QR.' };
        const reloj = ahoraArgentina();
        if (!alumnoInscripto(alumno, reloj.fecha))
            return { ok: false, error: 'El alumno no está inscripto en esta fecha.' };
        const existente = state.ASISTENCIAS.find(r => Number(r.alumnoId) === Number(alumno.id) && r.fecha === reloj.fecha && (r.sesion || 'principal') === 'principal');
        if (existente?.entrada && !existente.demoGenerado)
            return { ok: false, error: 'El alumno ya tiene su entrada registrada hoy.' };
        if (existente?.estado === 'Justificado' && !existente.demoGenerado)
            return { ok: false, error: 'La ausencia ya está justificada. Debe revisarla un preceptor.' };
        const clasificacion = window.ET35Horarios?.estadoEntrada(alumno.curso, reloj.hora) || { estado: 'Sin registrar', observacion: 'Horario no disponible' };
        const estado = clasificacion.estado;
        if (estado === 'Sin registrar')
            return { ok: false, error: clasificacion.observacion };
        if (existente)
            Object.assign(existente, { entrada: reloj.hora, salida: '', estado, tipo: 'QR', origen: 'Terminal en nube', demoGenerado: false, demoAutomatico: false, simulado: false, obs: clasificacion.observacion });
        else {
            const id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
            state.ASISTENCIAS.push({ id, alumnoId: alumno.id, fecha: reloj.fecha, sesion: 'principal', entrada: reloj.hora, salida: '', estado, tipo: 'QR', origen: 'Terminal en nube', obs: clasificacion.observacion });
        }
        state.SCAN_LOG = [{ alumno: { id: alumno.id, apellido: alumno.apellido, nombre: alumno.nombre, curso: alumno.curso }, tipo: 'Entrada', hora: reloj.hora, estado, fecha: reloj.fecha }, ...(state.SCAN_LOG || [])].slice(0, 100);
        return { ok: true, alumno: `${alumno.apellido}, ${alumno.nombre}`, curso: alumno.curso, hora: reloj.hora, estado, observacion: clasificacion.observacion };
    });
}
async function sendQR(value) {
    const codigo = String(value || '').trim().toUpperCase();
    if (!codigo || submitting)
        return;
    const now = Date.now();
    if (codigo === lastCode && now - lastAttempt < 6500)
        return;
    lastCode = codigo;
    lastAttempt = now;
    submitting = true;
    clearTimeout(clearFeedbackTimer);
    feedback('pending', 'Registrando asistencia…', 'Actualizando el sistema escolar.');
    try {
        const result = window.ET35Cloud?.getStatus().active ? await registrarQRNube(codigo) : registrarQRLocal(codigo);
        if (!result.ok) {
            feedback('error', 'No se registró', result.error);
        }
        else {
            statusConnection(true);
            feedback('success', result.estado === 'Tarde' ? 'Llegada tarde registrada' : result.estado === 'Ausente' ? 'Ingreso fuera de horario' : 'Entrada registrada', `${result.alumno} · ${result.curso} · ${result.hora}${result.observacion ? ` · ${result.observacion}` : ''}`);
        }
    }
    catch (e) {
        feedback('error', 'No se pudo registrar', e.message || 'Error inesperado');
    }
    finally {
        submitting = false;
        codeInput.value = '';
        clearFeedbackTimer = setTimeout(() => feedback('', 'Esperando un QR', 'Acercá el próximo código al lector.'), 6000);
    }
}
codeInput.addEventListener('keydown', e => {
    if (e.key !== 'Enter')
        return;
    e.preventDefault();
    clearTimeout(typedTimer);
    void sendQR(codeInput.value);
});
codeInput.addEventListener('input', () => {
    clearTimeout(typedTimer);
    if (/^ET35-(?:ALU|DEMO)-\d{4,6}$/i.test(codeInput.value.trim())) {
        typedTimer = setTimeout(() => void sendQR(codeInput.value), 500);
    }
});
async function readFrame() {
    if (!stream || submitting || !camera.videoWidth)
        return;
    if (detector) {
        const codes = await detector.detect(camera);
        return codes.find(x => x.rawValue)?.rawValue || null;
    }
    if (!window.jsQR || !ctx)
        return;
    const factor = Math.min(1, 850 / camera.videoWidth);
    canvas.width = Math.round(camera.videoWidth * factor);
    canvas.height = Math.round(camera.videoHeight * factor);
    ctx.drawImage(camera, 0, 0, canvas.width, canvas.height);
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return window.jsQR(pixels.data, pixels.width, pixels.height, { inversionAttempts: 'attemptBoth' })?.data || null;
}
async function scanLoop() {
    if (!scanning)
        return;
    try {
        const detected = await readFrame();
        if (detected) {
            missingQrFrames = 0;
            if (detected !== heldQr) {
                heldQr = detected;
                await sendQR(detected);
            }
        }
        else if (++missingQrFrames >= 5) {
            heldQr = null;
        }
    }
    catch (error) {
        console.warn('Lector QR:', error);
    }
    if (scanning)
        retryTimer = setTimeout(scanLoop, 260);
}
function stopCamera() {
    scanning = false;
    clearTimeout(retryTimer);
    if (stream)
        stream.getTracks().forEach(track => track.stop());
    stream = null;
    camera.srcObject = null;
    camera.hidden = true;
    $('scan-frame').hidden = true;
    heldQr = null;
    missingQrFrames = 0;
}
async function startCamera() {
    if (stream)
        return;
    const prompt = $('camera-status');
    const button = $('camera-start');
    button.hidden = true;
    $('camera-message').textContent = 'Activando cámara…';
    try {
        if (!navigator.mediaDevices?.getUserMedia)
            throw new Error('La cámara necesita localhost o HTTPS. Podés utilizar el lector USB.');
        if ('BarcodeDetector' in window) {
            try {
                detector = new BarcodeDetector({ formats: ['qr_code'] });
            }
            catch {
                detector = null;
            }
        }
        if (!detector && !window.jsQR) {
            throw new Error('No está disponible el lector QR en este navegador. Revisá la conexión a internet o usá el lector USB.');
        }
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
        camera.srcObject = stream;
        camera.hidden = false;
        await camera.play();
        $('scan-frame').hidden = false;
        prompt.hidden = true;
        scanning = true;
        void scanLoop();
    }
    catch (error) {
        stopCamera();
        prompt.hidden = false;
        $('camera-message').textContent = error.message || 'No se pudo abrir la cámara.';
        button.hidden = false;
    }
}
$('camera-start').addEventListener('click', () => void startCamera());
window.addEventListener('pagehide', stopCamera);
void startCamera();
