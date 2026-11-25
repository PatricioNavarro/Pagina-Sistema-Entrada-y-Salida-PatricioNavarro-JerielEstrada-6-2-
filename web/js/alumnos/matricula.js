function et35FechaBaseMatricula(a) {
    return a.fechaAlta || (String(a.curso).startsWith('1°') ? '2026-02-16' : '2026-03-02');
}

function et35MovimientosMatricula(a) {
    if (!a)
        return [];
    const original = a.movimientosMatricula;
    const anterior = et35CacheMatricula.get(a);
    if (anterior && anterior.original === original)
        return anterior.ordenados;
    const ordenados = (Array.isArray(original) ? original : [])
        .filter(m => m && /^\d{4}-\d{2}-\d{2}$/.test(m.fecha) && ['baja', 'reingreso'].includes(m.tipo))
        .sort((x, y) => x.fecha.localeCompare(y.fecha));
    et35CacheMatricula.set(a, { original, ordenados });
    return ordenados;
}

function et35InscriptosEnFecha(a, fecha) {
    if (!a || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fecha || '') || fecha < et35FechaBaseMatricula(a))
        return false;
    if (!Array.isArray(a.movimientosMatricula) || a.movimientosMatricula.length === 0)
        return true;
    let inscrito = true;
    for (const mov of et35MovimientosMatricula(a)) {
        if (mov.fecha > fecha)
            break;
        inscrito = mov.tipo === 'reingreso';
    }
    return inscrito;
}

function abrirGestionMatricula(id) {
    if (!isJefa())
        return toast('Solo la jefa puede modificar la matrícula', 'error');
    const a = getAlumno(id);
    if (!a)
        return;
    et35AlumnoMatriculaActivoId = a.id;
    const titulo = document.getElementById('matricula-alumno-nombre');
    if (titulo)
        titulo.textContent = `${a.apellido}, ${a.nombre} · ${a.curso} · Inscripto desde ${et35FechaVisible(et35FechaBaseMatricula(a))}`;
    const fecha = document.getElementById('matricula-alumno-fecha');
    if (fecha) {
        fecha.value = todayISO();
        fecha.min = et35FechaBaseMatricula(a);
        fecha.max = todayISO();
    }
    const nota = document.getElementById('matricula-alumno-nota');
    if (nota)
        nota.value = '';
    const tipo = document.getElementById('matricula-alumno-tipo');
    if (tipo)
        tipo.value = et35InscriptosEnFecha(a, todayISO()) ? 'baja' : 'reingreso';
    renderHistorialMovimientosMatricula();
    openModal('modal-matricula-alumno');
}

function renderHistorialMovimientosMatricula() {
    const a = getAlumno(et35AlumnoMatriculaActivoId), div = document.getElementById('matricula-alumno-historial');
    if (!div || !a)
        return;
    const eventos = et35MovimientosMatricula(a);
    div.innerHTML = `<div class="et35-mat-historial"><strong>Movimientos registrados</strong>${eventos.length ? `<ul>${eventos.map(m => `<li>${esc(et35FechaVisible(m.fecha))}: ${m.tipo === 'baja' ? 'Baja' : 'Reincorporación'}${m.motivo ? ' · ' + esc(m.motivo) : ''}</li>`).join('')}</ul><button class="btn btn-ghost btn-sm" onclick="deshacerUltimoMovimientoMatricula()">Deshacer último movimiento</button>` : '<p class="helper-text">No hay bajas ni reincorporaciones registradas.</p>'}</div>`;
}

function guardarMovimientoMatricula() {
    if (!isJefa())
        return;
    const a = getAlumno(et35AlumnoMatriculaActivoId), fecha = document.getElementById('matricula-alumno-fecha')?.value;
    const tipo = document.getElementById('matricula-alumno-tipo')?.value;
    const motivo = (document.getElementById('matricula-alumno-nota')?.value || '').trim().slice(0, 180);
    if (!a || !/^\d{4}-\d{2}-\d{2}$/.test(fecha || '') || fecha < et35FechaBaseMatricula(a) || fecha > todayISO())
        return toast('Elegí una fecha válida entre el alta inicial y hoy', 'warning');
    if (!['baja', 'reingreso'].includes(tipo))
        return toast('Elegí un movimiento válido', 'warning');
    const prev = et35MovimientosMatricula(a), ultimo = prev[prev.length - 1];
    if (ultimo && fecha <= ultimo.fecha)
        return toast('La fecha debe ser posterior al último movimiento; podés deshacerlo si es incorrecto', 'warning');
    const estaba = et35InscriptosEnFecha(a, fecha);
    if (tipo === 'baja' && !estaba)
        return toast('El alumno ya figura de baja en esa fecha', 'warning');
    if (tipo === 'reingreso' && estaba)
        return toast('El alumno ya figura inscripto en esa fecha', 'warning');
    a.movimientosMatricula = prev.concat([{ fecha, tipo, motivo, usuario: et35UsuarioActivo() }]);
    saveDemoData();
    registrarAuditoria('Matrícula', `${a.apellido}, ${a.nombre} · ${a.curso} · ${tipo} · ${fecha}`);
    renderHistorialMovimientosMatricula();
    renderAlumnos();
    toast('Movimiento de matrícula guardado', 'success');
}

function deshacerUltimoMovimientoMatricula() {
    if (!isJefa())
        return;
    const a = getAlumno(et35AlumnoMatriculaActivoId);
    if (!a)
        return;
    const prev = et35MovimientosMatricula(a);
    if (!prev.length)
        return;
    if (!confirm(`¿Deshacer el movimiento del ${et35FechaVisible(prev[prev.length - 1].fecha)}?`))
        return;
    a.movimientosMatricula = prev.slice(0, -1);
    saveDemoData();
    registrarAuditoria('Matrícula', `${a.apellido}, ${a.nombre} · anulación último movimiento`);
    renderHistorialMovimientosMatricula();
    renderAlumnos();
    toast('Movimiento anulado', 'success');
}
