function abrirFechaCalendario(fecha) {
    const curso = document.getElementById('cal-curso')?.value || '';
    if (!getCursosUsuario().includes(curso))
        return;
    location.href = et35RutaPagina('asistencia') + '?fecha=' + encodeURIComponent(fecha) + '&curso=' + encodeURIComponent(curso);
}

function renderCalendarioCursos() {
    const sel = document.getElementById('cal-curso'), mes = document.getElementById('cal-mes'), e = document.getElementById('cal-mes-grid');
    if (!sel || !mes || !e)
        return;
    const old = sel.value, permitidos = getCursosUsuario();
    sel.innerHTML = permitidos.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
    sel.value = permitidos.includes(old) ? old : (permitidos[0] || '');
    if (!mes.value)
        mes.value = et35MesActual();
    const curso = sel.value, ids = new Set(getMiAlumnos().filter(a => a.curso === curso).map(a => a.id)), registros = ASISTENCIAS.filter(r => r.fecha.startsWith(mes.value) && ids.has(r.alumnoId));
    const map = new Map();
    registros.forEach(r => { if (!map.has(r.fecha))
        map.set(r.fecha, []); map.get(r.fecha).push(r); });
    let ausencias = 0, diasClase = 0, diasECPA = 0, diasFinde = 0, diasCerrados = 0;
    e.innerHTML = et35CalendarioMes(mes.value, (iso, day) => {
        const regs = map.get(iso) || [], nAus = regs.filter(r => r.estado === 'Ausente').length;
        ausencias += nAus;
        const info = et35TipoDia(iso, curso);
        const ecpa = info.tipo === 'ecpa', school = info.tipo === 'clase' || ecpa;
        if (ecpa)
            diasECPA++;
        else if (school)
            diasClase++;
        else if (info.tipo === 'fin-de-semana')
            diasFinde++;
        else
            diasCerrados++;
        const futuro = iso > todayISO();
        const cl = ecpa ? 'dia-ecpa' : school ? 'dia-clase' : info.tipo === 'fin-de-semana' ? 'dia-finde' : 'dia-sin-clases';
        const lbl = ecpa ? 'ECPA · 1° año' : school ? (futuro ? 'Clases previstas' : regs.length ? `${nAus} aus. · ${regs.length} reg.` : 'Hubo clases · sin registros') : info.motivo;
        const titulo = `${et35FechaVisible(iso)} · ${ecpa ? 'ECPA de 1.º año' : school ? 'Día de clases' : info.tipo === 'fin-de-semana' ? 'Fin de semana' : 'Sin clases'} · ${lbl}`;
        return `<button type="button" class="cal-day ${cl}" ${school ? 'onclick="abrirFechaCalendario(\'' + iso + '\')"' : 'disabled'} title="${esc(titulo)}" aria-label="${esc(titulo)}"><span class="cal-number">${day}</span><small>${esc(lbl)}</small></button>`;
    });
    const periodos = document.getElementById('cal-bimestres-info');
    if (periodos)
        periodos.innerHTML = bimestresEscolares(Number(mes.value.slice(0, 4))).map(b => `<span><strong>${esc(b.nombre)}:</strong> ${et35FechaVisible(b.inicio)} – ${et35FechaVisible(b.fin)}</span>`).join('');
    const resumen = document.getElementById('cal-resumen');
    if (resumen)
        resumen.textContent = `${curso} · ${mes.value} · ${diasClase} días de clase (incluye previstos) · ${diasECPA} días de ECPA (solo 1°) · ${diasFinde} de fin de semana · ${diasCerrados} sin clases por otros motivos · ${ausencias} ausencias registradas. No se cuentan como ausentes los alumnos sin registro.`;
    const admin = document.getElementById('cal-admin-cierres');
    if (admin)
        admin.style.display = isJefa() ? '' : 'none';
    const listado = document.getElementById('cal-cierres-personalizados');
    if (listado && isJefa()) {
        const cierres = Object.entries(DIAS_SIN_CLASES).filter(([fecha]) => fecha.startsWith(mes.value)).sort((a, b) => a[0].localeCompare(b[0]));
        listado.innerHTML = cierres.map(([fecha, motivo]) => `<div class="cal-cierre-fila"><span><strong>${et35FechaVisible(fecha)}:</strong> ${esc(motivo)}</span><button class="btn btn-ghost btn-sm" onclick="eliminarDiaSinClases('${fecha}')">Eliminar</button></div>`).join('') || '<p class="helper-text">No hay cierres particulares cargados para este mes.</p>';
    }
}

function guardarDiaSinClases() {
    if (!isJefa())
        return toast('Solo la jefa puede modificar el calendario', 'error');
    const fecha = document.getElementById('cal-cierre-fecha')?.value, motivo = document.getElementById('cal-cierre-motivo')?.value.trim();
    if (!/^2026-\d{2}-\d{2}$/.test(fecha || '') || !Number.isFinite(Date.parse(fecha)) || new Date(fecha + 'T12:00:00Z').toISOString().slice(0, 10) !== fecha) {
        toast('Seleccioná una fecha válida de 2026', 'warning');
        return;
    }
    if (!motivo || motivo.length < 5 || motivo.length > 140) {
        toast('Escribí un motivo de 5 a 140 caracteres', 'warning');
        return;
    }
    if ([0, 6].includes(new Date(fecha + 'T12:00:00Z').getUTCDay())) {
        toast('Los fines de semana ya están marcados en gris', 'warning');
        return;
    }
    DIAS_SIN_CLASES[fecha] = motivo;
    ASISTENCIAS = ASISTENCIAS.filter(r => r.fecha !== fecha || r.demoGenerado !== true);
    recalcularFaltasDesdeRegistros();
    saveDemoData();
    registrarAuditoria('Suspensión de clases', fecha + ' · ' + motivo);
    document.getElementById('cal-cierre-motivo').value = '';
    document.getElementById('cal-mes').value = fecha.slice(0, 7);
    renderCalendarioCursos();
    toast('Día sin clases y motivo guardados', 'success');
}

function eliminarDiaSinClases(fecha) {
    if (!isJefa() || !Object.prototype.hasOwnProperty.call(DIAS_SIN_CLASES, fecha))
        return;
    delete DIAS_SIN_CLASES[fecha];
    construirHistorialDemo();
    saveDemoData();
    registrarAuditoria('Reapertura del calendario', fecha);
    renderCalendarioCursos();
    toast('Cierre personalizado eliminado', 'success');
}

function et35TipoDia(fecha, curso = '') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || ''))
        return { tipo: 'sin-clases', motivo: 'Fecha inválida' };
    const dd = new Date(fecha + 'T12:00:00Z').getUTCDay();
    if (dd === 0 || dd === 6)
        return { tipo: 'fin-de-semana', motivo: 'Fin de semana' };
    if (DIAS_SIN_CLASES[fecha])
        return { tipo: 'sin-clases', motivo: DIAS_SIN_CLASES[fecha] };
    if (fecha >= '2026-02-16' && fecha <= '2026-02-27' && String(curso).startsWith('1°')) {
        return { tipo: 'ecpa', motivo: 'ECPA · período de ingreso exclusivo para primer año (fechas estimadas según información escolar)' };
    }
    if (fecha < '2026-03-02')
        return { tipo: 'sin-clases', motivo: 'Fuera del ciclo lectivo general (antes del 2 de marzo)' };
    if (fecha > '2026-12-18')
        return { tipo: 'sin-clases', motivo: 'Fuera del ciclo lectivo (después del 18 de diciembre)' };
    if (fecha >= '2026-07-20' && fecha <= '2026-07-31')
        return { tipo: 'sin-clases', motivo: 'Vacaciones de invierno' };
    if (FERIADOS_CABA_2026.has(fecha))
        return { tipo: 'sin-clases', motivo: FERIADOS_CABA_2026.get(fecha) };
    if (ASUETOS_ESCOLARES_DEMO_2026.has(fecha))
        return { tipo: 'sin-clases', motivo: ASUETOS_ESCOLARES_DEMO_2026.get(fecha) };
    return { tipo: 'clase', motivo: 'Día de clase' };
}

function esDiaLectivoDemo(fecha) { return et35TipoDia(fecha).tipo === 'clase'; }

function fechasLectivasHistoricas() {
    const hasta = todayISO();
    const d = new Date(HISTORIAL_INICIO + 'T12:00:00Z');
    const fechas = [];
    while (d.toISOString().slice(0, 10) < hasta && d.getUTCFullYear() === 2026) {
        const fecha = d.toISOString().slice(0, 10);
        if (esDiaLectivoDemo(fecha))
            fechas.push(fecha);
        d.setUTCDate(d.getUTCDate() + 1);
    }
    return fechas;
}
