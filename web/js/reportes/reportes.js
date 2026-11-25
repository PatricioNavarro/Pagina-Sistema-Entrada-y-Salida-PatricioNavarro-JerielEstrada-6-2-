function renderReportes() {
    const now = new Date();
    const ms = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const rp = document.getElementById('rep-periodo');
    if (rp && !rp.value)
        rp.value = ms;
    const rf = document.getElementById('rep-fecha');
    if (rf && !rf.value)
        rf.value = todayISO();
    buildBarChart();
    const tbody = document.getElementById('reporte-tbody');
    const at_risk = getMiAlumnos().filter(a => a.faltas >= 3).sort((a, b) => b.faltas - a.faltas);
    tbody.innerHTML = at_risk.map(a => `<tr>
    <td><strong>${esc(a.apellido)}</strong>, ${esc(a.nombre)}</td>
    <td>${esc(a.curso)}</td>
    <td style="font-weight:700;color:${faltasColor(a.faltas)}">${formatoFaltas(a.faltas)}</td>
    <td>${JUSTIFICACIONES.filter(j => j.alumnoId === a.id && j.estado === 'Justificado').length}</td>
    <td>${faltasEstado(a.faltas)}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="abrirModalMailAlumno(${a.id})">📧 Notificar</button></td>
  </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;padding:1.5rem;color:var(--gray-muted)">Sin alumnos en riesgo.</td></tr>';
    fillSelectAlumnos();
    const rc = document.getElementById('rep-curso');
    if (rc) {
        actualizarOpcionesCursos(rc, getCursosUsuario(), true);
    }
    const alumnoSel = document.getElementById('rep-alumno');
    if (alumnoSel) {
        const anterior = alumnoSel.value;
        alumnoSel.innerHTML = '<option value="">— Seleccionar alumno —</option>' + getMiAlumnos().map(a => `<option value="${a.id}">${esc(a.apellido)}, ${esc(a.nombre)} (${esc(a.curso)})</option>`).join('');
        if (getMiAlumnos().some(a => String(a.id) === anterior))
            alumnoSel.value = anterior;
    }
}

function generarReporte() {
    const tipo = document.getElementById('rep-tipo').value;
    const mes = document.getElementById('rep-periodo').value;
    const fecha = document.getElementById('rep-fecha')?.value || todayISO();
    const curso = document.getElementById('rep-curso').value;
    const alumnoId = Number(document.getElementById('rep-alumno')?.value || 0);
    if (!['diario', 'mensual', 'alumno', 'curso'].includes(tipo))
        return;
    if (tipo === 'curso' && !curso) {
        toast('Elegí un curso para el reporte por curso', 'warning');
        return;
    }
    if (tipo === 'alumno' && !alumnoId) {
        toast('Elegí un alumno para el reporte individual', 'warning');
        return;
    }
    if (tipo !== 'diario' && !/^\d{4}-\d{2}$/.test(mes)) {
        toast('Elegí un mes válido', 'warning');
        return;
    }
    if (tipo === 'diario' && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        toast('Elegí una fecha válida', 'warning');
        return;
    }
    if (curso && !getCursosUsuario().includes(curso)) {
        toast('Curso no autorizado', 'error');
        return;
    }
    if (tipo === 'alumno' && !cursoDeAlumnoAutorizado(alumnoId)) {
        toast('Alumno no autorizado', 'error');
        return;
    }
    let registros = getMiAsistencias().filter(r => tipo === 'diario' ? r.fecha === fecha : r.fecha.startsWith(mes));
    if (curso)
        registros = registros.filter(r => getAlumno(r.alumnoId)?.curso === curso);
    if (tipo === 'alumno')
        registros = registros.filter(r => r.alumnoId === alumnoId);
    if (!registros.length) {
        toast('No hay registros para esos filtros', 'warning');
        return;
    }
    const columnas = ['ID alumno', 'Apellido', 'Nombre', 'DNI', 'Curso', 'Fecha', 'Bimestre', 'Entrada', 'Salida', 'Jornada', 'Estado', 'Tipo', 'Faltas equivalentes'];
    const filas = [columnas];
    registros.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.alumnoId - b.alumnoId).forEach(r => {
        const a = getAlumno(r.alumnoId);
        if (a)
            filas.push([a.id, a.apellido, a.nombre, a.dni, a.curso, r.fecha, bimestreDeFecha(r.fecha)?.nombre || 'Fuera del ciclo', r.entrada || '', r.salida || '', et35NombreSesion(r), r.estado, etiquetaTipoRegistro(r), formatoFaltas(valorFaltaRegistro(r))]);
    });
    const csv = filas.map(f => f.map(c => {
        let t = String(c ?? '');
        if (/^[=+@\t\r]/.test(t))
            t = "'" + t;
        return '"' + t.replace(/"/g, '""') + '"';
    }).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_ET35_${tipo}_${tipo === 'diario' ? fecha : mes}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`Reporte CSV creado con ${filas.length - 1} registros.`, 'success');
}

function enviarReportes() {
    const alumnos = getMiAlumnos().filter(a => a.faltas >= 3);
    if (!alumnos.length) {
        toast('No hay alumnos con 3 o más faltas', 'info');
        return;
    }
    toast(`Hay ${alumnos.length} avisos pendientes. Preparalos individualmente desde Alumnos; no se enviaron correos automáticamente.`, 'warning');
}

function imprimirReportePDF() {
    const tipo = document.getElementById('rep-tipo')?.value, mes = document.getElementById('rep-periodo')?.value, fecha = document.getElementById('rep-fecha')?.value || todayISO(), curso = document.getElementById('rep-curso')?.value || '', alId = Number(document.getElementById('rep-alumno')?.value || 0);
    if (tipo === 'curso' && !curso)
        return toast('Elegí un curso', 'warning');
    if (tipo === 'alumno' && !alId)
        return toast('Elegí un alumno', 'warning');
    if (tipo !== 'diario' && !et35MesValido(mes))
        return toast('Elegí un mes válido', 'warning');
    if (tipo === 'diario' && !/^\d{4}-\d{2}-\d{2}$/.test(fecha))
        return toast('Elegí una fecha válida', 'warning');
    if (curso && !getCursosUsuario().includes(curso))
        return toast('Curso no autorizado', 'error');
    if (tipo === 'alumno' && !cursoDeAlumnoAutorizado(alId))
        return toast('Alumno no autorizado', 'error');
    let rows = getMiAsistencias().filter(r => tipo === 'diario' ? r.fecha === fecha : r.fecha.startsWith(mes));
    if (curso)
        rows = rows.filter(r => getAlumno(r.alumnoId)?.curso === curso);
    if (tipo === 'alumno')
        rows = rows.filter(r => r.alumnoId === alId);
    if (!rows.length)
        return toast('No hay registros para estos filtros', 'warning');
    rows.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.alumnoId - b.alumnoId);
    const p = window.open('', '_blank');
    if (!p)
        return toast('Permití las ventanas emergentes para generar el PDF', 'warning');
    const titulo = `Reporte ET35 · ${tipo} · ${tipo === 'diario' ? fecha : mes}`;
    const style = `body{font-family:Arial,sans-serif;color:#222;margin:25px}header{border-bottom:3px solid #b52828;padding-bottom:12px;margin-bottom:18px}h1{font-size:21px;margin:0 0 6px;color:#b52828}p{font-size:12px}table{width:100%;border-collapse:collapse;font-size:10px}th,td{border:1px solid #ddd;padding:6px;text-align:left}th{background:#eee}tr:nth-child(even){background:#f7f7f7}.nota{color:#777;font-size:11px}@page{size:A4 landscape;margin:13mm}@media print{button{display:none}}`;
    const tab = rows.map(r => { const a = getAlumno(r.alumnoId); return !a ? '' : `<tr><td>${a.id}</td><td>${esc(a.apellido)}, ${esc(a.nombre)}</td><td>${esc(a.curso)}</td><td>${r.fecha}</td><td>${esc(r.entrada || '—')}</td><td>${esc(r.salida || '—')}</td><td>${esc(r.estado)}</td><td>${esc(etiquetaTipoRegistro(r))}</td></tr>`; }).join('');
    p.document.open();
    p.document.write(`<!doctype html><html lang="es"><head><meta charset="UTF-8"><title>${esc(titulo)}</title><style>${style}</style></head><body><header><h1>Escuela Técnica N.º 35 — Eduardo Latzina</h1><p>${esc(titulo)} · ${rows.length} registros · Generado: ${et35FechaVisible(todayISO())}</p></header><button onclick="window.print()">Imprimir / Guardar como PDF</button><p class="nota">Datos de prueba. Este documento no reemplaza los registros oficiales de la escuela.</p><table><thead><tr><th>ID</th><th>Alumno</th><th>Curso</th><th>Fecha</th><th>Entrada</th><th>Salida</th><th>Estado</th><th>Tipo</th></tr></thead><tbody>${tab}</tbody></table></body></html>`);
    p.document.close();
    p.focus();
    setTimeout(() => p.print(), 350);
    toast('Se abrió el reporte. En Imprimir elegí «Guardar como PDF».', 'info');
}
