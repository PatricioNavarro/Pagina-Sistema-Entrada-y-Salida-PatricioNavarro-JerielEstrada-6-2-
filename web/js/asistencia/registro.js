function evaluarEstado(hora, curso = '') {
    return window.ET35Horarios?.estadoEntrada(curso, hora).estado || 'Sin registrar';
}

function fechaLegibleAusencias(iso) {
    const [anio, mes, dia] = iso.split('-').map(Number);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    return `${diasSemanaAusencias[fecha.getUTCDay()]} ${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${anio}`;
}

function abrirHistorialAusencias(alumnoId) {
    const a = getAlumno(Number(alumnoId));
    if (!a || !['preceptor', 'jefa'].includes(currentUser?.rol) || !cursoDeAlumnoAutorizado(a.id)) {
        toast('No tenés permiso para consultar las ausencias de ese alumno', 'error');
        return;
    }
    alumnoHistorialAusenciasId = a.id;
    document.getElementById('ausencias-alumno-nombre').textContent = `${a.apellido}, ${a.nombre} · ${a.curso} · ID ${a.id}`;
    const filtro = document.getElementById('ausencias-alumno-filtro');
    if (filtro)
        filtro.value = 'todas';
    const selector = document.getElementById('ausencias-alumno-bimestre');
    if (selector) {
        const anios = [...new Set([Number(todayISO().slice(0, 4)), ...ASISTENCIAS.filter(r => r.alumnoId === a.id).map(r => Number(r.fecha.slice(0, 4)))])].sort((a, b) => b - a);
        selector.innerHTML = '<option value="">Todos los bimestres</option>' + anios.flatMap(y => bimestresEscolares(y)).map(b => `<option value="${b.key}">${b.nombre} · ${b.descripcion} ${b.key.slice(0, 4)}</option>`).join('');
        selector.value = '';
    }
    renderHistorialAusencias();
    openModal('modal-ausencias-alumno');
}

function renderHistorialAusencias() {
    const a = getAlumno(alumnoHistorialAusenciasId);
    if (!a || !['preceptor', 'jefa'].includes(currentUser?.rol) || !cursoDeAlumnoAutorizado(a.id))
        return;
    const registros = ASISTENCIAS.filter(r => r.alumnoId === a.id && ['Ausente', 'Justificado', 'Tarde'].includes(r.estado))
        .sort((x, y) => y.fecha.localeCompare(x.fecha));
    const faltas = registros.filter(r => r.estado === 'Ausente').length;
    const justificadas = registros.filter(r => r.estado === 'Justificado').length;
    const tardanzas = registros.filter(r => r.estado === 'Tarde').length;
    const b = bimestreVigente();
    document.getElementById('ausencias-alumno-resumen').textContent = `${formatoFaltas(a.faltas)}/5 faltas en el ${periodoTexto(b)} · Histórico: ${faltas} ausencias sin justificar, ${tardanzas} tardanzas, ${justificadas} justificadas`;
    const filtro = document.getElementById('ausencias-alumno-filtro')?.value || 'todas';
    const filtroBim = document.getElementById('ausencias-alumno-bimestre')?.value || '';
    const visibles = registros.filter(r => (!filtroBim || bimestreDeFecha(r.fecha)?.key === filtroBim) && (filtro === 'todas' || (filtro === 'ausentes' && r.estado === 'Ausente') || (filtro === 'justificadas' && r.estado === 'Justificado') || (filtro === 'tardes' && r.estado === 'Tarde')));
    document.getElementById('ausencias-alumno-tbody').innerHTML = visibles.map(r => {
        const j = JUSTIFICACIONES.find(j => j.alumnoId === a.id && j.fecha === r.fecha && et35SesionRegistro(j) === et35SesionRegistro(r));
        const detalle = j ? `<span class="badge ${badgeJust(j.estado)}">${esc(j.estado)}</span>` : (r.estado === 'Justificado' ? 'Justificada en registro' : r.estado === 'Tarde' ? 'Llegada tarde' : 'Sin justificación aprobada');
        return `<tr><td class="mono">${fechaLegibleAusencias(r.fecha)}<small style="display:block;color:#64748b">${esc(et35NombreSesion(r))}</small></td><td>${esc(bimestreDeFecha(r.fecha)?.nombre || 'Fuera de bimestre')}</td><td><span class="badge ${badgeClass(r.estado)}">${r.estado}</span></td><td>${formatoFaltas(valorFaltaRegistro(r))}</td><td>${detalle}</td></tr>`;
    }).join('') || '<tr><td colspan="5" style="text-align:center;padding:1.3rem">No hay fechas para este filtro.</td></tr>';
}

function etiquetaTipoRegistro(r) {
    if (r.demoAutomatico === true)
        return 'Automático';
    if (r.simulado === true)
        return 'Automático';
    const t = String(r.tipo || '');
    if (t === 'Demo' || t === 'Histórico demo') {
        return r.estado === 'Ausente' ? 'Sistema' : r.estado === 'Justificado' ? 'Justificación' : r.estado === 'Retiro' ? 'Manual' : 'QR';
    }
    return t.replace(/\s*\(simulad[oa]\)/gi, '').trim();
}

function et35SesionSeleccionada() { return document.getElementById('filter-sesion-asistencia')?.value || 'principal'; }

function et35ActualizarOpcionesSesion() {
    const selector = document.getElementById('filter-sesion-asistencia');
    if (!selector)
        return 'principal';
    const anterior = selector.value || 'principal';
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    const curso = document.getElementById('filter-curso-asistencia')?.value || '';
    const cursos = curso ? [curso] : getCursosUsuario();
    const sesiones = new Set(['principal']);
    for (const c of cursos)
        for (const sesion of et35SesionesDia(c, fecha))
            sesiones.add(sesion.id);
    const nombres = { principal: 'Jornada principal', contraturno: 'Contraturno', educacion_fisica: 'Educación Física' };
    selector.innerHTML = [...sesiones].map(id => `<option value="${id}">${nombres[id] || id}</option>`).join('');
    selector.value = sesiones.has(anterior) ? anterior : 'principal';
    return selector.value;
}

function renderAsistencia() {
    const search = (document.getElementById('search-asistencia')?.value || '').trim().toLocaleLowerCase('es');
    const fe = document.getElementById('filter-estado')?.value || '';
    et35FiltroAnioCurso('asistencia-anio', 'filter-curso-asistencia');
    const curso = document.getElementById('filter-curso-asistencia')?.value || '';
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    const sesion = et35ActualizarOpcionesSesion();
    const alumnos = getMiAlumnos().filter(a => (!curso || a.curso === curso) && et35InscriptosEnFecha(a, fecha) && et35SesionDisponible(a.curso, fecha, sesion));
    const ids = new Set(alumnos.map(a => a.id));
    const porAlumno = new Map(ASISTENCIAS.filter(r => r.fecha === fecha && ids.has(r.alumnoId) && et35SesionRegistro(r) === sesion).map(r => [r.alumnoId, r]));
    const rows = alumnos.filter(a => {
        const estado = porAlumno.get(a.id)?.estado || 'Sin registrar';
        const coincide = Number.isFinite(et35PuntajeBusquedaAlumno(a, search)) || a.curso.toLocaleLowerCase('es').includes(search);
        return coincide && (!fe || estado === fe);
    }).sort((a, b) => (search ? (et35PuntajeBusquedaAlumno(a, search) - et35PuntajeBusquedaAlumno(b, search)) || 0 : 0) || a.curso.localeCompare(b.curso, 'es') || a.apellido.localeCompare(b.apellido, 'es') || a.nombre.localeCompare(b.nombre, 'es') || a.id - b.id);
    const body = document.getElementById('asistencia-tbody');
    if (!body)
        return;
    body.innerHTML = rows.map(a => {
        const r = porAlumno.get(a.id), estado = r?.estado || 'Sin registrar';
        const estadoBadge = r ? `<span class="badge ${badgeClass(estado)}">${esc(estado)}</span>` : '<span class="badge et35-pendiente">Sin registrar</span>';
        return `<tr><td class="mono">${a.id}</td><td><strong>${esc(a.apellido)}</strong>, ${esc(a.nombre)}</td><td><strong>${esc(a.curso)}</strong></td><td class="mono">${esc(r?.entrada || '—')}</td><td class="mono">${esc(r?.salida || '—')}</td><td>${estadoBadge}</td><td>${r ? esc(etiquetaTipoRegistro(r)) : '—'}</td><td><div class="acciones-registro"><button class="btn btn-ghost btn-sm" onclick="abrirHistorialAusencias(${a.id})">📅 Ver ausencias</button><button class="btn btn-ghost btn-sm" onclick="abrirCorreccionAlumno(${a.id})">${r ? '✏️ Editar' : '➕ Registrar'}</button></div></td></tr>`;
    }).join('') || '<tr><td colspan="8" style="text-align:center;padding:1.5rem">No hay alumnos que coincidan con los filtros.</td></tr>';
    const registros = [...porAlumno.values()];
    const ausentes = registros.filter(r => r.estado === 'Ausente').length;
    const sinRegistro = Math.max(0, alumnos.length - porAlumno.size);
    const foot = document.getElementById('asistencia-foot');
    if (foot)
        foot.textContent = `${et35FechaVisible(fecha)} · ${rows.length} alumnos visibles de ${alumnos.length} · ${registros.length} registrados · ${ausentes} ausentes · ${sinRegistro} sin registrar. Sin registrar NO significa ausente.`;
    const title = document.getElementById('asistencia-table-title');
    if (title)
        title.textContent = `Alumnos y asistencias del ${et35FechaVisible(fecha)}`;
}

function abrirCorreccionAlumno(alumnoId) {
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    const a = getAlumno(Number(alumnoId));
    if (!a || !cursoDeAlumnoAutorizado(a.id))
        return toast('No tenés permiso sobre ese alumno', 'error');
    if (fecha > todayISO())
        return toast('No podés registrar una fecha futura', 'warning');
    if (!et35SesionDisponible(a.curso, fecha, et35SesionSeleccionada()))
        return toast('Ese curso no tiene clases de esa jornada en la fecha elegida', 'warning');
    if (!et35InscriptosEnFecha(a, fecha))
        return toast('El alumno no está inscripto en esa fecha', 'warning');
    const sesion = et35SesionSeleccionada();
    if (!et35SesionDisponible(a.curso, fecha, sesion))
        return toast('Ese curso no tiene esa jornada en la fecha elegida', 'warning');
    const registrado = ASISTENCIAS.find(r => r.alumnoId === a.id && r.fecha === fecha && et35SesionRegistro(r) === sesion);
    if (registrado) {
        editingAsistAlumnoNuevo = null;
        editingAsistFechaNueva = null;
        abrirCorreccion(registrado.id);
        return;
    }
    editingAsistId = null;
    editingAsistAlumnoNuevo = a.id;
    editingAsistFechaNueva = fecha;
    document.getElementById('corr-desc').textContent = `Nuevo registro: ${a.apellido}, ${a.nombre} — ${et35FechaVisible(fecha)} · ${et35NombreSesion({ sesion })}. Se guardará cuando confirmes.`;
    document.getElementById('corr-entrada').value = '';
    document.getElementById('corr-salida').value = '';
    document.getElementById('corr-estado').value = 'Presente';
    document.getElementById('corr-tipo').value = 'Manual';
    document.getElementById('corr-obs').value = '';
    openModal('modal-corregir');
}

function abrirCorreccion(id) {
    editingAsistId = id;
    const r = ASISTENCIAS.find(x => x.id === id);
    if (!r)
        return;
    if (!cursoDeAlumnoAutorizado(r.alumnoId)) {
        toast('No tenés acceso a ese curso', 'error');
        return;
    }
    const a = getAlumno(r.alumnoId);
    document.getElementById('corr-desc').textContent = `Corrigiendo: ${a.apellido}, ${a.nombre} — ${r.fecha} · ${et35NombreSesion(r)}`;
    document.getElementById('corr-entrada').value = r.entrada || '';
    document.getElementById('corr-salida').value = r.salida || '';
    document.getElementById('corr-estado').value = r.estado;
    document.getElementById('corr-tipo').value = r.tipo;
    document.getElementById('corr-obs').value = '';
    openModal('modal-corregir');
}

function guardarCorreccion() {
    let r = editingAsistId != null ? ASISTENCIAS.find(x => x.id === editingAsistId) : null;
    const alumnoId = r?.alumnoId ?? editingAsistAlumnoNuevo;
    if (!alumnoId || !cursoDeAlumnoAutorizado(alumnoId))
        return toast('Alumno no autorizado', 'error');
    const esNuevo = !r;
    const sesion = r ? et35SesionRegistro(r) : et35SesionSeleccionada();
    if (!r) {
        const fecha = editingAsistFechaNueva;
        if (!et35SesionDisponible(getAlumno(alumnoId)?.curso, fecha, sesion))
            return toast('Esa jornada no corresponde al horario del curso', 'warning');
        if (!fecha || fecha > todayISO())
            return toast('Fecha inválida', 'error');
        if (ASISTENCIAS.some(x => x.alumnoId === alumnoId && x.fecha === fecha && et35SesionRegistro(x) === sesion))
            return toast('Ya existe un registro para esa fecha. Actualizá la tabla.', 'warning');
        let max = 0;
        for (const x of ASISTENCIAS)
            if (x.id > max)
                max = x.id;
        r = { id: max + 1, alumnoId, fecha, sesion };
        ASISTENCIAS.push(r);
    }
    r.sesion = sesion;
    r.entrada = document.getElementById('corr-entrada').value;
    r.salida = document.getElementById('corr-salida').value;
    r.estado = document.getElementById('corr-estado').value;
    r.tipo = 'Manual';
    r.obs = document.getElementById('corr-obs').value.trim();
    r.demoGenerado = false;
    r.simulado = false;
    r.demoAutomatico = false;
    editingAsistId = null;
    editingAsistAlumnoNuevo = null;
    editingAsistFechaNueva = null;
    if (currentUser && ['jefa', 'preceptor'].includes(currentUser.rol)) {
        const alumno = getAlumno(alumnoId);
        AUDITORIA.unshift({ fecha: new Date().toISOString(), usuario: et35UsuarioActivo(),
            accion: esNuevo ? 'Registro manual de asistencia' : 'Corrección de asistencia',
            detalle: `${alumno?.apellido || 'Alumno'} ID ${alumnoId} · ${r.fecha} · ${et35NombreSesion(r)} · ${r.estado}` });
        AUDITORIA = AUDITORIA.slice(0, 400);
    }
    saveDemoData();
    closeModal('modal-corregir');
    renderAsistencia();
    toast('Asistencia guardada correctamente', 'success');
}

function exportCSV() {
    const now = new Date();
    const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const rows = [
        [''], ['ESCUELA TÉCNICA N°35 D.E.18 — ING. EDUARDO LATZINA'],
        ['Sistema de Registro de Asistencia QR'],
        [`Fecha de exportación: ${fecha}`],
        [''],
        ['ID alumno', 'Apellido', 'Nombre', 'DNI', 'Curso', 'Fecha', 'Hora Entrada', 'Hora Salida', 'Jornada', 'Estado', 'Tipo Registro']
    ];
    getMiAsistencias().filter(r => r.fecha === (document.getElementById('filter-fecha-asistencia')?.value || todayISO()) && (!document.getElementById('filter-curso-asistencia')?.value || getAlumno(r.alumnoId)?.curso === document.getElementById('filter-curso-asistencia').value)).forEach(r => {
        const a = getAlumno(r.alumnoId);
        if (a)
            rows.push([a.id, a.apellido, a.nombre, a.dni, a.curso, r.fecha, r.entrada || '', r.salida || '', et35NombreSesion(r), r.estado, etiquetaTipoRegistro(r)]);
    });
    rows.push([''], ['Total registros exportados', rows.length - 6]);
    const safeCSV = c => {
        let t = String(c ?? '');
        if (/^[=+@\t\r]/.test(t))
            t = "'" + t;
        return '"' + t.replace(/"/g, '""') + '"';
    };
    const csv = rows.map(r => r.map(safeCSV).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asistencia_ET35_${document.getElementById('filter-fecha-asistencia')?.value || fecha}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('CSV exportado correctamente', 'success');
}

function moverFechaAsistencia(dias) { moverFechaEnInput('filter-fecha-asistencia', dias, renderAsistencia); }

function actualizarSeleccionMasiva() { const n = document.querySelectorAll('.asis-seleccion:checked').length, e = document.getElementById('bulk-cantidad'); if (e)
    e.textContent = n + ' seleccionados'; }

function marcarTodosAsistencia(v) { document.querySelectorAll('.asis-seleccion').forEach(e => e.checked = v); actualizarSeleccionMasiva(); }

function aplicarAsistenciaMasiva() {
    if (!['jefa', 'preceptor'].includes(currentUser?.rol))
        return toast('Acceso no autorizado', 'error');
    const ids = [...document.querySelectorAll('.asis-seleccion:checked')].map(x => Number(x.value));
    if (!ids.length)
        return toast('Seleccioná al menos un alumno', 'warning');
    const estado = document.getElementById('asistencia-bulk-estado')?.value;
    if (!['Presente', 'Ausente', 'Tarde', 'Justificado'].includes(estado))
        return toast('Elegí un estado válido', 'warning');
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    if (fecha > todayISO())
        return toast('No se pueden marcar asistencias futuras', 'warning');
    if (!ids.every(id => ['clase', 'ecpa'].includes(et35TipoDia(fecha, getAlumno(id)?.curso).tipo)))
        return toast('La fecha elegida no corresponde a un día lectivo del curso', 'warning');
    if (!ids.every(id => cursoDeAlumnoAutorizado(id) && (!getAlumno(id)?.fechaAlta || fecha >= getAlumno(id).fechaAlta)))
        return toast('Uno de los alumnos no está autorizado para esa fecha', 'error');
    if (!confirm(`¿Cambiar ${ids.length} registros del ${et35FechaVisible(fecha)} a ${estado}?`))
        return;
    const sesion = et35SesionSeleccionada();
    if (!ids.every(id => et35SesionDisponible(getAlumno(id)?.curso, fecha, sesion)))
        return toast('Algunos alumnos no tienen esa jornada programada', 'warning');
    const porAlumno = new Map(ASISTENCIAS.filter(x => x.fecha === fecha && et35SesionRegistro(x) === sesion).map(r => [r.alumnoId, r]));
    let maxId = 0;
    for (const r of ASISTENCIAS)
        if (r.id > maxId)
            maxId = r.id;
    let count = 0;
    ids.forEach(id => {
        let r = porAlumno.get(id);
        if (!r) {
            r = { id: ++maxId, alumnoId: id, fecha, sesion };
            ASISTENCIAS.push(r);
            porAlumno.set(id, r);
        }
        r.sesion = sesion;
        r.estado = estado;
        const reglas = et35InfoCurso(getAlumno(r.alumnoId)?.curso)?.jornada;
        r.entrada = ['Ausente', 'Justificado'].includes(estado) ? '' : estado === 'Tarde' ? (reglas?.nombre === 'Tarde' ? '13:50' : '08:05') : (reglas?.nombre === 'Tarde' ? '13:35' : '07:45');
        r.salida = ['Ausente', 'Justificado'].includes(estado) ? '' : (reglas?.fin || '13:00');
        r.tipo = 'Manual';
        r.obs = 'Corrección múltiple · ' + et35NombreSesion(r);
        r.demoGenerado = false;
        r.simulado = false;
        r.demoAutomatico = false;
        count++;
    });
    registrarAuditoria('Corrección masiva', `${count} alumnos · ${fecha} · ${estado}`);
    renderAsistencia();
    toast(`${count} registros actualizados`, 'success');
}
