function et35AusenciasParaJustificar(alumnoId) {
    const id = Number(alumnoId);
    if (!id || !cursoDeAlumnoAutorizado(id))
        return [];
    const solicitadas = new Set(JUSTIFICACIONES.filter(j => j.alumnoId === id && j.estado !== 'Denegado').map(j => j.fecha + '|' + et35SesionRegistro(j)));
    const fechas = new Set();
    return ASISTENCIAS.filter(r => r.alumnoId === id && r.estado === 'Ausente' && r.fecha <= todayISO() && !solicitadas.has(r.fecha + '|' + et35SesionRegistro(r)))
        .filter(r => { const key = r.fecha + '|' + et35SesionRegistro(r); if (fechas.has(key))
        return false; fechas.add(key); return true; })
        .sort((a, b) => b.fecha.localeCompare(a.fecha));
}

function actualizarFechasJustificables() {
    const sel = document.getElementById('just-fecha');
    if (!sel)
        return;
    const alumnoId = Number(document.getElementById('just-alumno')?.value || 0);
    const anterior = sel.value;
    const fechas = et35AusenciasParaJustificar(alumnoId);
    sel.innerHTML = '<option value="">— Seleccioná una ausencia —</option>' + fechas.map(r => `<option value="${r.fecha}|${et35SesionRegistro(r)}">${esc(et35DiaSemanaCorto(r.fecha))} ${esc(et35FechaVisible(r.fecha))} · ${esc(et35NombreSesion(r))} · Ausente</option>`).join('');
    sel.value = fechas.some(r => r.fecha + '|' + et35SesionRegistro(r) === anterior) ? anterior : '';
    sel.disabled = !fechas.length;
    const ayuda = document.getElementById('just-fecha-ayuda');
    if (ayuda)
        ayuda.textContent = !alumnoId ? 'Elegí primero un alumno.' : fechas.length ? `${fechas.length} ausencia(s) disponibles para justificar.` : 'Este alumno no tiene ausencias pendientes para justificar.';
    const enviar = document.getElementById('just-enviar');
    if (enviar)
        enviar.disabled = !fechas.length;
}

function puedeRevisarJustificacion(j) {
    return !!j && (isJefa() || (currentUser?.rol === 'preceptor' && cursoDeAlumnoAutorizado(j.alumnoId)));
}

function justificacionesAutorizadas() {
    return JUSTIFICACIONES.filter(j => puedeRevisarJustificacion(j));
}

function renderJustificaciones() {
    const tbody = document.getElementById('just-tbody');
    if (!tbody)
        return;
    const filtro = document.getElementById('just-filtro-estado')?.value || 'En revisión';
    const curso = document.getElementById('just-filtro-curso');
    const solicitudes = justificacionesAutorizadas();
    if (curso) {
        const anterior = curso.dataset.et35JustIniciado === '1' ? curso.value : '';
        const pendientesCurso = new Map();
        solicitudes.filter(j => j.estado === 'En revisión').forEach(j => {
            const c = getAlumno(j.alumnoId)?.curso;
            if (c)
                pendientesCurso.set(c, (pendientesCurso.get(c) || 0) + 1);
        });
        const porAnio = [6, 5, 4, 3, 2, 1].map(n => {
            const lista = getCursosUsuario().filter(c => c.startsWith(n + '°'));
            return lista.length ? `<optgroup label="${n}° año">${lista.map(c => {
                const pendientes = pendientesCurso.get(c) || 0;
                return `<option value="${esc(c)}">${pendientes ? '🔴 ' : ''}${esc(c)}${pendientes ? ' · ' + pendientes + ' pendiente(s)' : ''}</option>`;
            }).join('')}</optgroup>` : '';
        }).join('');
        curso.innerHTML = porAnio + '<option value="">Todos los cursos</option>';
        curso.value = getCursosUsuario().includes(anterior) ? anterior : '';
        curso.dataset.et35JustIniciado = '1';
    }
    const pendientes = solicitudes.filter(j => j.estado === 'En revisión').length;
    const aprobadas = solicitudes.filter(j => j.estado === 'Justificado').length;
    const denegadas = solicitudes.filter(j => j.estado === 'Denegado').length;
    const resumen = document.getElementById('just-resumen');
    if (resumen)
        resumen.textContent = `${pendientes} pendientes · ${aprobadas} aprobadas · ${denegadas} denegadas · Solo cursos autorizados`;
    const visibles = solicitudes.filter(j => (!filtro || filtro === 'Todas' || j.estado === filtro) && (!curso?.value || getAlumno(j.alumnoId)?.curso === curso.value))
        .sort((x, y) => (x.estado === 'En revisión' ? 0 : 1) - (y.estado === 'En revisión' ? 0 : 1) || y.fecha.localeCompare(x.fecha) || y.id - x.id);
    tbody.innerHTML = visibles.map(j => {
        const a = getAlumno(j.alumnoId);
        return `<tr>
      <td><strong>${esc(a?.apellido || '—')}</strong>, ${esc(a?.nombre || '—')}<div class="helper-text">${esc(a?.curso || '—')}</div></td>
      <td class="mono">${et35FechaVisible(j.fecha)}<small style="display:block;color:#64748b">${esc(et35NombreSesion(j))}</small></td>
      <td>${esc(tiposJust(j.tipo))}<div class="helper-text">${esc(j.obs || 'Sin observación')}</div></td>
      <td>${j.archivoNombre ? `<button class="btn btn-ghost btn-sm" onclick="verComprobanteJust(${j.id})">📎 ${esc(j.archivoNombre)}</button>` : '<span class="helper-text">No adjuntó</span>'}</td>
      <td><span class="badge ${badgeJust(j.estado)}">${j.estado === 'Justificado' ? 'Aprobado' : esc(j.estado)}</span>${j.revisadoPor ? `<div class="helper-text">Por ${esc(j.revisadoPor)} · ${esc(j.revisadoEl ? new Date(j.revisadoEl).toLocaleString('es-AR') : '')}</div>` : ''}</td>
      <td><button class="btn btn-primary btn-sm" onclick="abrirRevisionJust(${j.id})">🔎 Revisar</button>
      ${j.estado === 'En revisión' ? `<button class="btn btn-green btn-sm" onclick="abrirRevisionJust(${j.id},'Justificado')">✔ Aprobar</button><button class="btn btn-danger btn-sm" onclick="abrirRevisionJust(${j.id},'Denegado')">✘ Denegar</button>` : ''}</td>
    </tr>`;
    }).join('') || '<tr><td colspan="6" class="helper-text" style="text-align:center;padding:1rem">No hay solicitudes para este filtro.</td></tr>';
    actualizarFechasJustificables();
    updateBadges();
}

function validarNuevaSolicitud(alumnoId, fecha, sesion = 'principal') {
    const a = getAlumno(alumnoId);
    if (!a || !/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha > todayISO()) {
        toast('Elegí un alumno y una fecha de inasistencia válida', 'warning');
        return false;
    }
    if (!(cursoDeAlumnoAutorizado(alumnoId) || (currentUser?.rol === 'alumno' && currentUser.alumnoId === alumnoId))) {
        toast('No tenés permiso para presentar esa solicitud', 'error');
        return false;
    }
    const registro = ASISTENCIAS.find(r => r.alumnoId === alumnoId && r.fecha === fecha && et35SesionRegistro(r) === sesion);
    if (!registro || registro.estado !== 'Ausente') {
        toast('Solo podés solicitar la justificación de una fecha registrada como Ausente', 'warning');
        return false;
    }
    if (currentUser?.rol !== 'alumno' && !et35AusenciasParaJustificar(alumnoId).some(r => r.fecha === fecha && et35SesionRegistro(r) === sesion)) {
        toast('Seleccioná una fecha de la lista de ausencias justificables', 'warning');
        return false;
    }
    if (JUSTIFICACIONES.some(j => j.alumnoId === alumnoId && j.fecha === fecha && et35SesionRegistro(j) === sesion && j.estado !== 'Denegado')) {
        toast('Ya existe una solicitud pendiente o aprobada para esa fecha', 'warning');
        return false;
    }
    return true;
}

async function crearSolicitudJustificacion(alumnoId, fecha, tipo, obs, archivo, sesion = 'principal') {
    if (et35SolicitudEnCurso)
        return false;
    if (!validarNuevaSolicitud(alumnoId, fecha, sesion) || !validarComprobante(archivo))
        return false;
    if (!['medica', 'familiar', 'deportiva', 'otra'].includes(tipo)) {
        toast('Elegí un motivo válido', 'warning');
        return false;
    }
    et35SolicitudEnCurso = true;
    try {
        const id = Math.max(0, ...JUSTIFICACIONES.map(j => j.id)) + 1;
        if (archivo) {
            try {
                await guardarComprobanteJust(id, archivo);
            }
            catch (e) {
                toast('No se pudo conservar el comprobante. No se envió la solicitud. ' + String(e.message || e), 'error');
                return false;
            }
        }
        JUSTIFICACIONES.push({ id, alumnoId, fecha, sesion, tipo, obs, estado: 'En revisión', obsJefa: '', archivoNombre: archivo?.name || '', presentadoPor: et35UsuarioActivo(), presentadoEl: new Date().toISOString() });
        saveDemoData();
        if (currentUser?.rol !== 'alumno')
            registrarAuditoria('Solicitud de justificación', `Solicitud ${id} · Alumno ${alumnoId} · ${fecha}`);
        toast('Solicitud presentada. Quedó pendiente de revisión.', 'success');
        return true;
    }
    finally {
        et35SolicitudEnCurso = false;
    }
}

async function cargarJustificacion() {
    const alumnoId = Number(document.getElementById('just-alumno')?.value), eleccion = document.getElementById('just-fecha')?.value || '';
    const [fecha, sesion = 'principal'] = eleccion.split('|');
    const tipo = document.getElementById('just-tipo')?.value, obs = document.getElementById('just-obs')?.value.trim();
    const archivo = document.getElementById('just-file')?.files?.[0];
    try {
        if (await crearSolicitudJustificacion(alumnoId, fecha, tipo, obs, archivo, sesion)) {
            clearJust();
            renderJustificaciones();
        }
    }
    catch (e) {
        console.error('Error al presentar justificativo:', e);
        toast('No se pudo cargar el justificativo: ' + String(e.message || e), 'error');
    }
}

function clearJust() {
    for (const id of ['just-alumno', 'just-fecha', 'just-obs']) {
        const el = document.getElementById(id);
        if (el)
            el.value = '';
    }
    const tipo = document.getElementById('just-tipo');
    if (tipo)
        tipo.value = 'medica';
    const archivo = document.getElementById('just-file');
    if (archivo)
        archivo.value = '';
    const preview = document.getElementById('just-file-preview');
    if (preview)
        preview.textContent = 'Seleccioná un PDF o una imagen. Se conservará solamente en este navegador.';
    actualizarFechasJustificables();
}

function abrirRevisionJust(id, estado = '') {
    const j = JUSTIFICACIONES.find(x => x.id === id);
    if (!puedeRevisarJustificacion(j)) {
        toast('Solo podés revisar justificaciones de tus cursos', 'error');
        return;
    }
    editingJustId = id;
    const a = getAlumno(j.alumnoId);
    const detalle = document.getElementById('just-review-detail');
    if (!detalle)
        return;
    detalle.innerHTML = `<strong>Alumno:</strong> ${esc(a?.apellido)}, ${esc(a?.nombre)} (${esc(a?.curso)})<br>
    <strong>Fecha:</strong> ${et35FechaVisible(j.fecha)} · ${esc(et35NombreSesion(j))}<br>
    <strong>Tipo:</strong> ${esc(tiposJust(j.tipo))}<br>
    <strong>Motivo:</strong> ${esc(j.obs || 'Sin observación')}<br>
    <strong>Presentado por:</strong> ${esc(j.presentadoPor || 'Registro inicial')}<br>
    <strong>Estado actual:</strong> <span class="badge ${badgeJust(j.estado)}">${esc(j.estado)}</span>` +
        (j.revisadoPor ? `<br><strong>Última revisión:</strong> ${esc(j.revisadoPor)} · ${esc(j.revisadoEl ? new Date(j.revisadoEl).toLocaleString('es-AR') : '')}` : '');
    document.getElementById('just-new-estado').value = estado || j.estado;
    document.getElementById('just-review-obs').value = j.obsJefa || '';
    const archivo = document.getElementById('just-review-file-preview');
    if (archivo)
        archivo.innerHTML = j.archivoNombre ? `<button class="btn btn-ghost btn-sm" onclick="verComprobanteJust(${j.id})">📎 Abrir ${esc(j.archivoNombre)}</button>` : '<span class="helper-text">No se adjuntó un comprobante.</span>';
    openModal('modal-revisar-just');
}

function cambiarEstadoJustificacion(j, nuevoEstado) {
    if (!puedeRevisarJustificacion(j))
        return false;
    if (!['En revisión', 'Justificado', 'Denegado'].includes(nuevoEstado)) {
        toast('Estado inválido', 'error');
        return false;
    }
    const r = ASISTENCIAS.find(r => r.alumnoId === j.alumnoId && r.fecha === j.fecha && et35SesionRegistro(r) === et35SesionRegistro(j));
    if (nuevoEstado === 'Justificado') {
        if (!r || !['Ausente', 'Justificado'].includes(r.estado)) {
            toast('Para aprobar debe haber una ausencia registrada en esa fecha', 'warning');
            return false;
        }
        if (r.estado === 'Justificado' && r.justificacionId && r.justificacionId !== j.id) {
            toast('La ausencia ya fue justificada por otra solicitud', 'warning');
            return false;
        }
        r.estado = 'Justificado';
        r.tipo = 'Justificación';
        r.demoGenerado = false;
        r.simulado = false;
        r.demoAutomatico = false;
        r.justificacionId = j.id;
    }
    else if (j.estado === 'Justificado' && r?.estado === 'Justificado' && (!r.justificacionId || r.justificacionId === j.id) && r.tipo === 'Justificación') {
        r.estado = 'Ausente';
        r.tipo = 'Manual (justificación revocada)';
        r.demoGenerado = false;
        r.simulado = false;
        r.demoAutomatico = false;
        delete r.justificacionId;
    }
    j.estado = nuevoEstado;
    recalcularFaltasDesdeRegistros();
    return true;
}

function guardarRevisionJust() {
    const j = JUSTIFICACIONES.find(x => x.id === editingJustId);
    if (!puedeRevisarJustificacion(j)) {
        toast('No tenés permiso para revisar esta solicitud', 'error');
        return;
    }
    const nuevoEstado = document.getElementById('just-new-estado').value;
    const observacion = document.getElementById('just-review-obs').value.trim();
    if (nuevoEstado === 'Denegado' && !observacion) {
        toast('Indicá por qué se deniega la justificación', 'warning');
        return;
    }
    const anterior = j.estado;
    if (!cambiarEstadoJustificacion(j, nuevoEstado))
        return;
    j.obsJefa = observacion;
    if (anterior !== nuevoEstado || !j.revisadoPor) {
        j.revisadoPor = [currentUser?.nombre, currentUser?.apellido].filter(Boolean).join(' ') || et35UsuarioActivo();
        j.revisadoUsuario = et35UsuarioActivo();
        j.revisadoEl = new Date().toISOString();
    }
    saveDemoData();
    registrarAuditoria('Revisión de justificación', `Solicitud ${j.id} · Alumno ${j.alumnoId} · ${anterior} → ${nuevoEstado} · ${observacion || 'Sin observación'}`);
    closeModal('modal-revisar-just');
    renderJustificaciones();
    if (isJefa())
        renderAdmin();
    renderAlumnos();
    recalcStats();
    updateBadges();
    toast(nuevoEstado === 'Justificado' ? 'Justificación aprobada' : nuevoEstado === 'Denegado' ? 'Justificación denegada' : 'Solicitud marcada en revisión', 'success');
}

function quickRevision(id, estado) {
    if (!puedeRevisarJustificacion(JUSTIFICACIONES.find(x => x.id === id)))
        return;
    abrirRevisionJust(id, estado);
}
