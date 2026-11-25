function validarComprobante(file) {
    if (!file)
        return true;
    if (!ET35_TIPOS_COMPROBANTE.has(file.type)) {
        toast('El comprobante debe ser PDF, PNG o JPG', 'warning');
        return false;
    }
    if (file.size > ET35_LIMITE_COMPROBANTE) {
        toast('El archivo supera los 8 MB', 'warning');
        return false;
    }
    return true;
}

function abrirBaseComprobantes() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB)
            return reject(new Error('Este navegador no permite guardar comprobantes'));
        const req = indexedDB.open('et35_comprobantes_demo', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('archivos', { keyPath: 'id' });
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error || new Error('No se pudo abrir la base local'));
    });
}

async function guardarComprobanteJust(id, file) {
    const db = await abrirBaseComprobantes();
    try {
        await new Promise((resolve, reject) => {
            const tx = db.transaction('archivos', 'readwrite');
            tx.objectStore('archivos').put({ id, blob: file, nombre: file.name, tipo: file.type });
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error || new Error('No se pudo guardar el archivo'));
            tx.onabort = () => reject(tx.error || new Error('Guardado cancelado'));
        });
    }
    finally {
        db.close();
    }
}

async function leerComprobanteJust(id) {
    const db = await abrirBaseComprobantes();
    try {
        return await new Promise((resolve, reject) => {
            const tx = db.transaction('archivos', 'readonly');
            const req = tx.objectStore('archivos').get(id);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error || new Error('No se pudo leer el archivo'));
        });
    }
    finally {
        db.close();
    }
}

async function verComprobanteJust(id) {
    const j = JUSTIFICACIONES.find(x => x.id === id);
    const autorizado = puedeRevisarJustificacion(j) || (currentUser?.rol === 'alumno' && currentUser.alumnoId === j?.alumnoId);
    if (!autorizado) {
        toast('No tenés permiso para ver este comprobante', 'error');
        return;
    }
    let el = document.getElementById('just-review-file-preview');
    if (!el) {
        abrirRevisionJust(id);
        el = document.getElementById('just-review-file-preview');
    }
    if (!el)
        return;
    el.textContent = 'Cargando comprobante local...';
    try {
        const contenido = await leerComprobanteJust(id);
        if (!contenido) {
            el.textContent = 'Este comprobante no se guardó en este navegador. Si se cargó en otra computadora, no está disponible acá.';
            return;
        }
        if (et35ArchivoRevisionURL)
            URL.revokeObjectURL(et35ArchivoRevisionURL);
        et35ArchivoRevisionURL = URL.createObjectURL(contenido.blob);
        const enlace = `<a href="${et35ArchivoRevisionURL}" target="_blank" rel="noopener noreferrer">Abrir ${esc(contenido.nombre)}</a>`;
        el.innerHTML = `<p>${enlace} · Archivo guardado solo en este navegador.</p>` +
            (contenido.tipo === 'application/pdf' ? `<iframe title="Comprobante PDF" src="${et35ArchivoRevisionURL}" style="width:100%;height:250px;border:1px solid #ddd"></iframe>` : `<img alt="Comprobante adjunto" src="${et35ArchivoRevisionURL}" style="max-width:100%;max-height:250px">`);
    }
    catch (e) {
        el.textContent = 'No se pudo abrir el comprobante: ' + String(e.message || e);
    }
}

function mostrarVistaPreviaComprobante() {
    const input = document.getElementById('just-file'), el = document.getElementById('just-file-preview');
    if (!el)
        return;
    if (et35ComprobanteURL) {
        URL.revokeObjectURL(et35ComprobanteURL);
        et35ComprobanteURL = null;
    }
    const f = input?.files?.[0];
    if (!f) {
        el.textContent = 'No seleccionaste ningún comprobante.';
        return;
    }
    if (f.size > 8 * 1024 * 1024) {
        input.value = '';
        el.textContent = 'Archivo demasiado grande: máximo 8 MB para la vista previa.';
        return;
    }
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(f.type)) {
        input.value = '';
        el.textContent = 'El archivo debe ser PDF, JPG o PNG.';
        return;
    }
    et35ComprobanteURL = URL.createObjectURL(f);
    el.innerHTML = `<p>Vista previa de <strong>${esc(f.name)}</strong>. Al enviar se guardará en este navegador, no en un servidor.</p>` + (f.type === 'application/pdf' ? `<iframe src="${et35ComprobanteURL}" title="Vista previa del PDF"></iframe>` : `<img src="${et35ComprobanteURL}" alt="Vista previa del comprobante">`);
}
