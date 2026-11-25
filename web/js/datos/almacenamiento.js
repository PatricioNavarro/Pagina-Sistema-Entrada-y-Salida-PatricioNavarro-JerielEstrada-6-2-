function et35ActualizarCursosGuardados(estado) {
    if (!estado || Number(estado.datasetVersion || 0) >= 16)
        return estado;
    const traducir = c => ET35_CURSO_ANTERIOR[c] || c;
    if (Array.isArray(estado.ALUMNOS))
        for (const a of estado.ALUMNOS)
            a.curso = traducir(a.curso);
    if (Array.isArray(estado.PRECEPTORES))
        for (const p of estado.PRECEPTORES) {
            if (Array.isArray(p.cursos))
                p.cursos = [...new Set(p.cursos.map(traducir))];
            if (p.cursoAsignado)
                p.cursoAsignado = traducir(p.cursoAsignado);
        }
    estado.datasetVersion = 16;
    return estado;
}

function saveDemoData() {
    recalcularFaltasDesdeRegistros();
    const manuales = ASISTENCIAS.filter(r => r.demoGenerado !== true && r.tipo !== 'Histórico demo');
    let siguienteId = 0;
    for (const r of manuales)
        if (Number.isSafeInteger(r.id) && r.id > 0)
            siguienteId = Math.max(siguienteId, r.id);
    const idsUsados = new Set();
    for (const r of manuales) {
        if (!Number.isSafeInteger(r.id) || r.id <= 0 || idsUsados.has(r.id))
            r.id = ++siguienteId;
        idsUsados.add(r.id);
    }
    const estadoGuardable = { datasetVersion: 16, ALUMNOS, ASISTENCIAS: manuales, JUSTIFICACIONES, PRECEPTORES, SCAN_LOG, AUDITORIA, BORRADORES, DIAS_SIN_CLASES };
    try {
        localStorage.setItem(storeKey, JSON.stringify(estadoGuardable));
    }
    catch (e) {
        console.error('No se pudo guardar:', e);
        toast('No se pudo guardar: almacenamiento del navegador lleno o bloqueado', 'error');
    }
    if (window.ET35Cloud?.getStatus().active)
        window.ET35Cloud.save(estadoGuardable);
}
