function recalcStats() {
    if (document.getElementById('dashboard-fecha')) {
        renderDashboardFecha();
    }
}

function renderRecentList() {
    const el = document.getElementById('recent-list');
    const recent = getMiAsistencias().filter(r => r.fecha === todayISO()).slice(-6).reverse();
    if (!recent.length) {
        el.innerHTML = '<p>Sin registros hoy.</p>';
        return;
    }
    el.innerHTML = recent.map(r => {
        const a = getAlumno(r.alumnoId);
        if (!a)
            return '';
        return `<div class="recent-entry"><div class="entry-avatar">${a.nombre[0]}${a.apellido[0]}</div><div><div class="entry-name">${esc(a.apellido)}, ${esc(a.nombre)}</div><div class="entry-sub">${esc(a.curso)} · <span class="badge ${badgeClass(r.estado)}">${r.estado}</span></div></div><div class="entry-time">${r.entrada || '--:--'}</div></div>`;
    }).join('');
}

function renderProgressByYear() {
    const el = document.getElementById('progress-by-year');
    if (!el)
        return;
    const misAlumnos = getMiAlumnos(), cursos = CURSOS.filter(c => misAlumnos.some(a => a.curso === c));
    const hoy = todayISO(), hoyPorAlumno = new Map(getMiAsistencias().filter(r => r.fecha === hoy).map(r => [r.alumnoId, r]));
    el.innerHTML = cursos.map(c => {
        const alumnos = misAlumnos.filter(a => a.curso === c);
        const presentes = alumnos.filter(a => ['Presente', 'Tarde', 'Retiro'].includes(hoyPorAlumno.get(a.id)?.estado)).length;
        const pct = alumnos.length ? Math.round(presentes / alumnos.length * 100) : 0;
        return `<div class="progress-row" title="${presentes} de ${alumnos.length} alumnos presentes en ${c}">
      <div class="progress-label">${c}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:var(--green)"></div></div>
      <div class="progress-pct">${pct}%</div>
      <span class="progress-count">${presentes}/${alumnos.length}</span>
    </div>`;
    }).join('') || '<p>Sin cursos asignados.</p>';
}

function renderDonut() {
    const asis = getMiAsistencias().filter(r => r.fecha === todayISO());
    const p = asis.filter(r => r.estado === 'Presente').length;
    const au = asis.filter(r => r.estado === 'Ausente').length;
    const t = asis.filter(r => r.estado === 'Tarde').length;
    const j = asis.filter(r => r.estado === 'Justificado').length;
    const total = asis.length || 1;
    const circ = 2 * Math.PI * 45;
    let offset = 0;
    function seg(val, color) {
        const dash = (val / total) * circ;
        const el = `<circle cx="60" cy="60" r="45" fill="none" stroke="${color}" stroke-width="14"
      stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${-offset}" stroke-linecap="round"/>`;
        offset += dash;
        return el;
    }
    const pct = Math.round(p / total * 100);
    document.getElementById('donut-container').innerHTML = `
    <div class="donut-wrap">
      <div class="donut">
        <svg viewBox="0 0 120 120" width="110" height="110">
          <circle cx="60" cy="60" r="45" fill="none" stroke="#dde3ef" stroke-width="14"/>
          ${seg(p, 'var(--green)')}${seg(au, 'var(--red)')}${seg(t, 'var(--orange)')}${seg(j, 'var(--purple)')}
        </svg>
        <div class="donut-center"><div class="donut-pct">${pct}%</div><div class="donut-sub">presencia</div></div>
      </div>
      <div class="donut-legend">
        <div class="dl-item"><div class="dl-dot" style="background:var(--green)"></div>Presentes (${p})</div>
        <div class="dl-item"><div class="dl-dot" style="background:var(--red)"></div>Ausentes (${au})</div>
        <div class="dl-item"><div class="dl-dot" style="background:var(--orange)"></div>Tarde (${t})</div>
        <div class="dl-item"><div class="dl-dot" style="background:var(--purple)"></div>Justificados (${j})</div>
      </div>
    </div>`;
}

function et35CambiarVistaDashboard(vista) {
    if (vista !== 'diaria' && vista !== 'mensual')
        return;
    et35VistaDashboard = vista;
    ['diaria', 'mensual'].forEach(v => {
        const panel = document.getElementById('et35-dashboard-' + v);
        const tab = document.getElementById('et35-tab-' + v);
        if (panel)
            panel.hidden = v !== vista;
        if (tab) {
            tab.classList.toggle('active', v === vista);
            tab.setAttribute('aria-selected', String(v === vista));
            tab.tabIndex = v === vista ? 0 : -1;
        }
    });
    const filtroFecha = document.getElementById('et35-dashboard-fecha-contexto');
    const notaFecha = document.getElementById('dashboard-fecha-nota');
    if (filtroFecha)
        filtroFecha.hidden = vista !== 'diaria';
    if (notaFecha)
        notaFecha.hidden = vista !== 'diaria';
    const curso = document.getElementById('dashboard-curso');
    if (vista === 'mensual' && curso && !curso.value) {
        const primero = Array.from(curso.options).find(o => o.value && getCursosUsuario().includes(o.value));
        if (primero)
            curso.value = primero.value;
    }
    if (vista === 'mensual')
        renderSeguimientoMensualCurso();
    else
        renderDashboardFecha();
}

function et35CursoPanelCambio() {
    const anioWrap = document.getElementById('dashboard-anio')?.closest('label');
    if (anioWrap)
        anioWrap.style.display = isJefa() ? 'flex' : 'none';
    const selector = document.getElementById('dashboard-curso');
    if (selector) {
        if (isJefa())
            et35FiltroAnioCurso('dashboard-anio', 'dashboard-curso');
        else
            actualizarOpcionesCursos(selector, getCursosUsuario(), true);
    }
    if (et35VistaDashboard === 'mensual') {
        if (selector && !selector.value) {
            const primero = Array.from(selector.options).find(o => o.value && getCursosUsuario().includes(o.value));
            if (primero)
                selector.value = primero.value;
        }
        renderSeguimientoMensualCurso();
    }
    else
        renderDashboardFecha();
}

function moverFechaDashboard(dias) { moverFechaEnInput('dashboard-fecha', dias, renderDashboardFecha); }

function setFechaDashboardHoy() { const el = document.getElementById('dashboard-fecha'); if (el) {
    el.value = todayISO();
    et35ActualizarDiasFechas();
    renderDashboardFecha();
} }

function renderDashboardFecha() {
    const d = document.getElementById('dashboard-fecha');
    if (!d)
        return;
    if (!d.value)
        d.value = todayISO();
    const selector = document.getElementById('dashboard-curso');
    const autorizados = getCursosUsuario();
    const anioWrap = document.getElementById('dashboard-anio')?.closest('label');
    if (anioWrap)
        anioWrap.style.display = isJefa() ? 'flex' : 'none';
    let curso = '';
    if (selector) {
        if (isJefa())
            et35FiltroAnioCurso('dashboard-anio', 'dashboard-curso');
        else
            actualizarOpcionesCursos(selector, autorizados, true);
        curso = selector.value;
    }
    if (et35VistaDashboard === 'mensual') {
        renderSeguimientoMensualCurso();
        return;
    }
    const fecha = d.value;
    const alumnos = getMiAlumnos().filter(a => (!curso || a.curso === curso) && et35InscriptosEnFecha(a, d.value));
    const ids = new Set(alumnos.map(a => a.id));
    const registrosFecha = ASISTENCIAS.filter(r => r.fecha === fecha);
    const asis = registrosFecha.filter(r => ids.has(r.alumnoId) && et35SesionRegistro(r) === 'principal');
    const map = new Map(asis.map(r => [r.alumnoId, r]));
    const contar = e => asis.filter(r => r.estado === e).length;
    const put = (id, val) => { const e = document.getElementById(id); if (e)
        e.textContent = val; };
    put('stat-present', contar('Presente'));
    put('stat-absent', contar('Ausente'));
    put('stat-late', contar('Tarde'));
    put('stat-early', contar('Retiro'));
    put('stat-just', contar('Justificado'));
    put('stat-riesgo', alumnos.filter(a => a.faltas >= 3).length);
    put('stat-sinregistro', Math.max(0, alumnos.length - asis.length));
    put('dashboard-bimestre-nota', `Alertas y límite: ${periodoTexto(bimestreVigente())} · 5 faltas por bimestre`);
    put('stat-present-meta', `${asis.length} registros de ${alumnos.length} alumnos · ${et35FechaVisible(fecha)} · ${curso || 'todos mis cursos'}`);
    put('stat-just-meta', `En revisión: ${JUSTIFICACIONES.filter(j => j.estado === 'En revisión' && ids.has(j.alumnoId)).length}`);
    const simulados = asis.filter(r => r.demoAutomatico === true).length;
    const avisoDemo = document.getElementById('et35-aviso-automatico');
    if (avisoDemo) {
        avisoDemo.hidden = fecha !== todayISO() || !esDiaLectivoDemo(fecha);
        avisoDemo.textContent = `⏰ Actualización automática del ${et35InfoCurso(curso)?.turno || 'turno asignado'}: ${simulados} registros no verificados por QR. Los escaneos y las correcciones manuales tienen prioridad.`;
    }
    put('dashboard-fecha-nota', fecha === todayISO() ? 'Se actualiza automáticamente según el reloj del turno asignado.' : 'Consulta de registros históricos');
    renderReglasHorariasCurso(curso);
    const turnoElegido = et35InfoCurso(curso);
    put('stat-late-meta', turnoElegido ? `${turnoElegido.jornada.tardeDesde}–${turnoElegido.jornada.tardeHasta} · ${formatoFaltas(et35ValorJornada(curso, fecha) / 2)} falta(s)` : 'Según turno y jornada del alumno');
    put('stat-early-meta', turnoElegido ? 'Jornada hasta ' + turnoElegido.jornada.fin : 'Según el turno del curso');
    put('dashboard-resumen-faltas', `${formatoFaltas(registrosFecha.filter(r => ids.has(r.alumnoId)).reduce((n, r) => n + valorFaltaRegistro(r), 0))} faltas equivalentes del día, incluyendo las jornadas de contraturno que tengan registro (jornada normal con contraturno: ausencia 0,5; tardanza 0,25 por sesión)`);
    const recientes = registrosFecha.filter(r => ids.has(r.alumnoId) && et35SesionRegistro(r) === 'principal')
        .sort((a, b) => (b.entrada || '').localeCompare(a.entrada || '')).slice(0, 7);
    const rec = document.getElementById('recent-list');
    if (rec)
        rec.innerHTML = recientes.map(r => {
            const a = getAlumno(r.alumnoId);
            return !a ? '' : `<div class="recent-entry"><div class="entry-avatar">${esc(a.nombre[0] + a.apellido[0])}</div><div><div class="entry-name">${esc(a.apellido)}, ${esc(a.nombre)}</div><div class="entry-sub">${esc(a.curso)} · <span class="badge ${badgeClass(r.estado)}">${esc(r.estado)}</span></div></div><div class="entry-time">${esc(r.entrada || '—')}</div></div>`;
        }).join('') || '<p class="helper-text">Todavía no hay registros en el curso y la fecha seleccionados.</p>';
    const selectorAnio = document.getElementById('panel-por-curso-anio');
    const marcoAnio = document.getElementById('panel-por-curso-anio-wrap');
    let anioElegido = '';
    if (marcoAnio)
        marcoAnio.style.display = isJefa() ? '' : 'none';
    if (selectorAnio && isJefa()) {
        const anterior = selectorAnio.dataset.cargado === '1' ? selectorAnio.value : null;
        selectorAnio.innerHTML = [6, 5, 4, 3, 2, 1].map(y => `<option value="${y}">${y}° año</option>`).join('') + '<option value="">Todos los años</option>';
        selectorAnio.value = anterior !== null ? anterior : '6';
        selectorAnio.dataset.cargado = '1';
        anioElegido = selectorAnio.value;
    }
    const cursos = autorizados.filter(c => !isJefa() || !anioElegido || c.startsWith(anioElegido + '°'));
    const alumnosAutorizados = getMiAlumnos();
    const porCurso = new Map();
    for (const c of cursos)
        porCurso.set(c, { total: 0, presentes: 0 });
    for (const a of alumnosAutorizados) {
        const v = porCurso.get(a.curso);
        if (v && et35InscriptosEnFecha(a, fecha))
            v.total++;
    }
    for (const r of registrosFecha) {
        if (et35SesionRegistro(r) !== 'principal' || !['Presente', 'Tarde', 'Retiro'].includes(r.estado))
            continue;
        const a = getAlumno(r.alumnoId), v = a && porCurso.get(a.curso);
        if (v && et35InscriptosEnFecha(a, fecha))
            v.presentes++;
    }
    const progresos = document.getElementById('progress-by-year');
    if (progresos)
        progresos.innerHTML = cursos.map(c => {
            const v = porCurso.get(c), pct = v.total ? Math.round(100 * v.presentes / v.total) : 0;
            return `<div class="progress-row"><div class="progress-label">${esc(c)}</div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:var(--green)"></div></div><div class="progress-pct">${pct}%</div><span class="progress-count">${v.presentes}/${v.total}</span></div>`;
        }).join('') || '<p class="helper-text">No hay cursos en esta selección.</p>';
    const alumnosDistribucion = alumnos;
    const asisDistribucion = asis;
    const contarDistribucion = e => asisDistribucion.filter(r => r.estado === e).length;
    const total = asisDistribucion.length, p = asisDistribucion.filter(r => ['Presente', 'Tarde', 'Retiro'].includes(r.estado)).length;
    const donut = document.getElementById('donut-container');
    if (donut) {
        const pct = alumnosDistribucion.length ? Math.round(p / alumnosDistribucion.length * 100) : 0;
        donut.innerHTML = `<div class="donut-wrap"><div class="donut" style="border-radius:50%;background:conic-gradient(var(--green) ${pct}%,var(--gray-border) ${pct}%);"><div class="donut-center" style="inset:13px;background:white;border-radius:50%"><div class="donut-pct">${pct}%</div><div class="donut-sub">presentismo</div></div></div><div class="donut-legend"><div class="dl-item">Registrados: ${total} / ${alumnosDistribucion.length}</div><div class="dl-item">Presentes / tardanzas / retiros: ${p}</div><div class="dl-item">Ausentes: ${contarDistribucion('Ausente')}</div><div class="dl-item">Tardanzas: ${contarDistribucion('Tarde')}</div><div class="dl-item">Justificados: ${contarDistribucion('Justificado')}</div><div class="dl-item">Sin registro: ${Math.max(0, alumnosDistribucion.length - total)}</div></div></div>`;
    }
    const rankingSelectorAnio = document.getElementById('dashboard-top-ausencias-anio');
    const rankingAnioWrap = document.getElementById('dashboard-top-ausencias-anio-wrap');
    let rankingAnio = '';
    if (rankingAnioWrap)
        rankingAnioWrap.style.display = isJefa() ? '' : 'none';
    if (rankingSelectorAnio && isJefa()) {
        const anterior = rankingSelectorAnio.dataset.cargado === '1' ? rankingSelectorAnio.value : null;
        rankingSelectorAnio.innerHTML = [6, 5, 4, 3, 2, 1].map(y => `<option value="${y}">${y}° año</option>`).join('') + '<option value="">Todos los años</option>';
        rankingSelectorAnio.value = anterior !== null ? anterior : '6';
        rankingSelectorAnio.dataset.cargado = '1';
        rankingAnio = rankingSelectorAnio.value;
    }
    const cursosRanking = autorizados.filter(c => !isJefa() || !rankingAnio || c.startsWith(rankingAnio + '°'));
    const rankingPorCurso = new Map(cursosRanking.map(c => [c, { curso: c, total: 0, aus: 0 }]));
    for (const a of alumnosAutorizados) {
        const r = rankingPorCurso.get(a.curso);
        if (r && et35InscriptosEnFecha(a, fecha))
            r.total++;
    }
    for (const r of registrosFecha) {
        if (et35SesionRegistro(r) !== 'principal' || r.estado !== 'Ausente')
            continue;
        const alumno = getAlumno(r.alumnoId), res = alumno && rankingPorCurso.get(alumno.curso);
        if (res && et35InscriptosEnFecha(alumno, fecha))
            res.aus++;
    }
    const filaRanking = r => `<div class="progress-row"><div class="progress-label">${esc(r.curso)}</div><div class="progress-bar"><div class="progress-fill" style="background:var(--red);width:${r.total ? Math.round(r.aus / r.total * 100) : 0}%"></div></div><div class="progress-pct">${r.aus}/${r.total}</div></div>`;
    const ordenarRanking = (a, b) => b.aus - a.aus || autorizados.indexOf(a.curso) - autorizados.indexOf(b.curso);
    const top = document.getElementById('dashboard-top-ausencias');
    if (top) {
        if (isJefa() && !rankingAnio) {
            top.innerHTML = [6, 5, 4, 3, 2, 1].map(anio => {
                const lista = [...rankingPorCurso.values()].filter(r => r.curso.startsWith(anio + '°')).sort(ordenarRanking);
                if (!lista.length)
                    return '';
                return `<section class="et35-ranking-anio"><h4>${anio}° año <span>· ${lista.length} cursos · ${lista.reduce((n, r) => n + r.aus, 0)} ausencias</span></h4>${lista.map(filaRanking).join('')}</section>`;
            }).join('') || '<p class="helper-text">No hay cursos disponibles.</p>';
        }
        else {
            top.innerHTML = [...rankingPorCurso.values()].sort(ordenarRanking).map(filaRanking).join('') || '<p class="helper-text">Sin cursos asignados.</p>';
        }
    }
}

function abrirRegistroDesdePanel() {
    const fecha = document.getElementById('dashboard-fecha')?.value || todayISO();
    const curso = document.getElementById('dashboard-curso')?.value || '';
    void et35NavegarRapido(`${et35RutaPagina('asistencia')}?fecha=${encodeURIComponent(fecha)}&curso=${encodeURIComponent(curso)}`);
}
