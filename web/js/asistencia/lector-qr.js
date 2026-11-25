function simulateScan() {
    procesarCodigoQR(document.getElementById('qr-input')?.value || '');
}

function registrarMovimiento(al, tipo = 'entrada', origen = 'QR') {
    if (!isMiCurso(al.curso)) {
        toast('No tenés permiso sobre ese curso', 'error');
        return false;
    }
    const fecha = todayISO(), ahora = new Date();
    const hora = String(ahora.getHours()).padStart(2, '0') + ':' + String(ahora.getMinutes()).padStart(2, '0');
    let r = ASISTENCIAS.find(x => x.alumnoId === al.id && x.fecha === fecha && et35SesionRegistro(x) === 'principal');
    if (tipo === 'salida' || tipo === 'retiro') {
        if (!r || !r.entrada) {
            toast('Primero registrá el ingreso de hoy', 'warning');
            return false;
        }
        if (r.salida) {
            toast('La salida de hoy ya está registrada', 'warning');
            return false;
        }
        r.salida = hora;
        if (tipo === 'retiro')
            r.estado = 'Retiro';
    }
    else if (tipo === 'ausencia_presencia') {
        if (!r) {
            r = { id: ASISTENCIAS.reduce((max, x) => Math.max(max, Number(x.id) > 0 ? Number(x.id) : 0), 0) + 1, alumnoId: al.id, fecha, sesion: 'principal', entrada: hora, salida: '', estado: 'Ausente', tipo: origen };
            ASISTENCIAS.push(r);
        }
        else {
            r.entrada = hora;
            r.estado = 'Ausente';
        }
    }
    else {
        if (r?.entrada) {
            toast('La entrada de hoy ya está registrada', 'warning');
            return false;
        }
        let estado = tipo === 'tarde' ? 'Tarde' : (origen === 'QR' && document.getElementById('qr-demo-horario')?.checked ? 'Presente' : evaluarEstado(hora, al.curso));
        if (r) {
            r.entrada = hora;
            r.estado = estado;
            r.salida = '';
            r.tipo = origen;
            r.obs = et35EstadoHorario(al.curso, hora).observacion;
        }
        else {
            r = { id: ASISTENCIAS.reduce((max, x) => Math.max(max, Number(x.id) > 0 ? Number(x.id) : 0), 0) + 1, alumnoId: al.id, fecha, sesion: 'principal', entrada: hora, salida: '', estado, tipo: origen, obs: et35EstadoHorario(al.curso, hora).observacion };
            ASISTENCIAS.push(r);
        }
    }
    SCAN_LOG.unshift({ alumno: al, tipo: tipo === 'salida' ? 'Salida' : 'Entrada', hora, estado: r.estado });
    SCAN_LOG = SCAN_LOG.slice(0, 20);
    saveDemoData();
    renderScannerRecent();
    updateBadges();
    toast(`${al.apellido}, ${al.nombre} (${al.curso}) · ${tipo} ${hora} · ${r.estado}`, 'success');
    return true;
}

function procesarCodigoQR(valor) {
    const codigo = valor.trim().toUpperCase();
    if (!codigo) {
        toast('Ingresá o escaneá un código QR', 'warning');
        return false;
    }
    const a = getMiAlumnos().find(a => qrCodigo(a) === codigo);
    if (!a) {
        toast('QR desconocido o alumno de otro curso', 'error');
        return false;
    }
    const tipo = document.getElementById('qr-movimiento')?.value || 'entrada';
    const ok = registrarMovimiento(a, tipo, 'QR');
    if (ok) {
        document.getElementById('qr-input').value = '';
        document.getElementById('qr-resultado').textContent = `✔ ${a.apellido}, ${a.nombre} · ${a.curso}`;
    }
    return ok;
}

function informarCamaraQR(mensaje) {
    const el = document.getElementById('qr-estado-camara');
    if (el)
        el.textContent = mensaje;
}

function cargarScriptQR(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = () => typeof window.jsQR === 'function' ? resolve() : reject(new Error('La biblioteca no se cargó correctamente'));
        script.onerror = () => reject(new Error('No se pudo descargar el lector QR'));
        document.head.append(script);
    });
}

async function obtenerDecoderQR() {
    if (qrDecoder)
        return qrDecoder;
    if ('BarcodeDetector' in window) {
        try {
            const formatos = await BarcodeDetector.getSupportedFormats();
            if (formatos.includes('qr_code')) {
                qrDecoder = { tipo: 'nativo', lector: new BarcodeDetector({ formats: ['qr_code'] }) };
                return qrDecoder;
            }
        }
        catch (e) {
            console.warn('Detector nativo no disponible', e);
        }
    }
    if (typeof window.jsQR === 'function')
        return qrDecoder = { tipo: 'jsqr' };
    if (!qrDecoderLoad) {
        qrDecoderLoad = (async () => {
            for (const url of QR_JS_LIBS) {
                try {
                    await cargarScriptQR(url);
                    break;
                }
                catch (e) {
                    console.warn(e.message);
                }
            }
            if (typeof window.jsQR !== 'function')
                throw new Error('No se pudo cargar el lector QR alternativo. Conectate a internet o ingresá el código manualmente.');
            return { tipo: 'jsqr' };
        })().catch(e => { qrDecoderLoad = null; throw e; });
    }
    return qrDecoder = await qrDecoderLoad;
}

function canvasParaQR(origen, maxLado = 1100) {
    const ancho = origen.videoWidth || origen.naturalWidth || origen.width;
    const alto = origen.videoHeight || origen.naturalHeight || origen.height;
    if (!ancho || !alto)
        throw new Error('La imagen no tiene dimensiones válidas.');
    const factor = Math.min(1, maxLado / Math.max(ancho, alto));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(ancho * factor));
    canvas.height = Math.max(1, Math.round(alto * factor));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx)
        throw new Error('No se pudo preparar la imagen.');
    ctx.drawImage(origen, 0, 0, canvas.width, canvas.height);
    return canvas;
}

async function decodificarCanvasQR(canvas, decoder) {
    if (decoder.tipo === 'nativo') {
        const codigos = await decoder.lector.detect(canvas);
        return codigos.find(c => c.rawValue)?.rawValue || null;
    }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const resultado = window.jsQR(img.data, img.width, img.height, { inversionAttempts: 'attemptBoth' });
    return resultado?.data || null;
}

async function iniciarCamaraQR() {
    if (qrStream)
        return;
    if (!navigator.mediaDevices?.getUserMedia) {
        informarCamaraQR('La cámara necesita permisos y una conexión segura (Live Server en localhost o HTTPS).');
        return;
    }
    informarCamaraQR('Preparando lector QR...');
    const iniciar = document.getElementById('qr-iniciar');
    if (iniciar)
        iniciar.disabled = true;
    try {
        const decoder = await obtenerDecoderQR();
        qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
        const video = document.getElementById('qr-video');
        if (!video)
            throw new Error('No se encontró la pantalla de la cámara.');
        video.srcObject = qrStream;
        video.style.display = 'block';
        await video.play();
        document.getElementById('qr-iniciar').style.display = 'none';
        document.getElementById('qr-detener').style.display = 'inline-flex';
        informarCamaraQR('Cámara activa. Enfocá un QR de la carpeta de códigos QR o el QR del alumno.');
        qrTimer = setInterval(async () => {
            if (qrBusy || !qrStream || video.readyState < 2)
                return;
            qrBusy = true;
            try {
                const codigo = await decodificarCanvasQR(canvasParaQR(video, 720), decoder);
                if (codigo) {
                    detenerCamaraQR(false);
                    const registrado = procesarCodigoQR(codigo);
                    informarCamaraQR(registrado ? 'Asistencia registrada. Podés activar la cámara nuevamente para el siguiente alumno.' : 'QR leído, pero no registrado. Revisá la confirmación.');
                }
            }
            catch (e) {
                console.warn('Error al leer cuadro QR', e);
            }
            finally {
                qrBusy = false;
            }
        }, 300);
    }
    catch (e) {
        detenerCamaraQR(false);
        let msg = e.message || 'Error desconocido';
        if (e.name === 'NotAllowedError')
            msg = 'Permiso de cámara denegado: habilitalo desde el ícono del navegador.';
        else if (e.name === 'NotFoundError')
            msg = 'No se encontró una cámara conectada.';
        else if (e.name === 'NotReadableError')
            msg = 'La cámara está ocupada por otra aplicación.';
        informarCamaraQR('No se pudo activar la cámara. ' + msg);
    }
    finally {
        if (iniciar)
            iniciar.disabled = false;
    }
}

function detenerCamaraQR(reset = true) {
    if (qrTimer)
        clearInterval(qrTimer);
    qrTimer = null;
    qrStream?.getTracks().forEach(track => track.stop());
    qrStream = null;
    const video = document.getElementById('qr-video');
    if (video) {
        video.pause();
        video.srcObject = null;
        video.style.display = 'none';
    }
    const iniciar = document.getElementById('qr-iniciar'), detener = document.getElementById('qr-detener');
    if (iniciar)
        iniciar.style.display = 'inline-flex';
    if (detener)
        detener.style.display = 'none';
    if (reset)
        informarCamaraQR('Cámara detenida. Podés volver a activarla.');
}

async function prepararImagenQR(archivo) {
    if (typeof createImageBitmap === 'function') {
        try {
            return await createImageBitmap(archivo);
        }
        catch (e) {
            console.warn('No se pudo cargar la imagen como bitmap', e);
        }
    }
    const url = URL.createObjectURL(archivo);
    try {
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = () => reject(new Error('El archivo no es una imagen válida')); });
        img.url = url;
        return img;
    }
    catch (e) {
        URL.revokeObjectURL(url);
        throw e;
    }
}

async function leerImagenQR(archivo) {
    if (!archivo)
        return;
    const input = document.getElementById('qr-imagen');
    const boton = document.getElementById('qr-subir-label');
    if (boton)
        boton.textContent = 'Procesando imagen...';
    informarCamaraQR('Buscando código QR en la imagen seleccionada...');
    try {
        if (!archivo.type.startsWith('image/'))
            throw new Error('Seleccioná una imagen PNG o JPG.');
        if (archivo.size > 12 * 1024 * 1024)
            throw new Error('La imagen no puede superar los 12 MB.');
        const decoder = await obtenerDecoderQR();
        const bitmap = await prepararImagenQR(archivo);
        let codigo;
        try {
            codigo = await decodificarCanvasQR(canvasParaQR(bitmap, 1500), decoder);
        }
        finally {
            bitmap.close?.();
            if (bitmap.url)
                URL.revokeObjectURL(bitmap.url);
        }
        if (!codigo)
            throw new Error('No se encontró un QR legible. Probá con una imagen más nítida o acercá el código.');
        const registrado = procesarCodigoQR(codigo);
        informarCamaraQR(registrado ? 'QR leído desde la imagen y asistencia registrada.' : 'QR leído, pero no registrado. Revisá la confirmación.');
    }
    catch (e) {
        informarCamaraQR('No se pudo leer la imagen: ' + e.message);
        toast('No se pudo leer el QR: ' + e.message, 'error');
    }
    finally {
        if (input)
            input.value = '';
        if (boton)
            boton.textContent = '🖼️ Leer QR desde imagen';
    }
}

function limpiarRegistrosDemoHoy() {
    const hoy = todayISO();
    const antes = ASISTENCIAS.length;
    ASISTENCIAS = ASISTENCIAS.filter(r => !(r.fecha === hoy && r.demoGenerado === true));
    const quitados = antes - ASISTENCIAS.length;
    saveDemoData();
    renderScannerRecent();
    updateBadges();
    toast(quitados ? `Se quitaron ${quitados} registros automáticos de hoy.` : 'No había registros automáticos de hoy.', 'info');
}

function renderScannerRecent() {
    const el = document.getElementById('scanner-recent');
    if (!SCAN_LOG.length) {
        el.innerHTML = '<p style="color:var(--gray-muted);font-size:.82rem;padding:.5rem">Sin escaneos registrados todavía.</p>';
        return;
    }
    el.innerHTML = SCAN_LOG.map(s => `
    <div class="recent-entry">
      <div class="entry-avatar">${s.alumno.nombre[0]}${s.alumno.apellido[0]}</div>
      <div><div class="entry-name">${esc(s.alumno.apellido)}, ${esc(s.alumno.nombre)}</div>
      <div class="entry-sub">${esc(s.alumno.curso)} · ${s.tipo} · <span class="badge ${badgeClass(s.estado)}">${s.estado}</span></div></div>
      <div class="entry-time">${s.hora}</div>
    </div>`).join('');
}

function registrarManual() {
    const q = document.getElementById('manual-search').value.trim().toLowerCase(), tipo = document.getElementById('manual-tipo').value;
    if (!q) {
        toast('Ingresá nombre o DNI', 'warning');
        return;
    }
    const al = getMiAlumnos().find(a => `${a.nombre} ${a.apellido}`.toLowerCase().includes(q) || `${a.apellido} ${a.nombre}`.toLowerCase().includes(q) || a.dni.includes(q));
    if (!al) {
        toast('Alumno no encontrado en tu curso', 'error');
        return;
    }
    if (registrarMovimiento(al, tipo, 'Manual'))
        clearManual();
}

function clearManual() {
    document.getElementById('manual-search').value = '';
    document.getElementById('manual-obs').value = '';
    document.getElementById('manual-tipo').value = 'entrada';
}

function mostrarConfirmacionQR(ok, msg, a, tipo) {
    const e = document.getElementById('qr-confirmacion');
    if (!e)
        return;
    e.className = 'qr-confirmacion ' + (ok ? 'exito' : 'error');
    e.innerHTML = `<div class="qr-confirmacion-ico">${ok ? '✅' : '⛔'}</div><div><strong>${esc(ok ? 'Registro confirmado' : 'No se registró')}</strong><p>${esc(msg)}</p></div>`;
}
