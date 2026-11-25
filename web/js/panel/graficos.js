function renderGrafico() {
    const sel = document.getElementById('grafico-curso');
    const autorizados = getCursosUsuario();
    let curso = '';
    if (sel) {
        if (isJefa())
            et35FiltroAnioCurso('grafico-anio', 'grafico-curso', { permitirTodos: false, vacioInicial: true });
        else {
            const previo = sel.value;
            sel.innerHTML = '<option value="">Seleccioná un curso...</option>' + autorizados.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
            sel.value = autorizados.includes(previo) ? previo : '';
        }
        curso = sel.value;
    }
    const fecha = todayISO(), alumnos = getMiAlumnos(), idsPorCurso = new Map();
    autorizados.forEach(c => idsPorCurso.set(c, new Set(alumnos.filter(a => a.curso === c).map(a => a.id))));
    const registrosDeHoy = ASISTENCIAS.filter(r => r.fecha === fecha && et35SesionRegistro(r) === 'principal');
    const byCurso = {};
    autorizados.forEach(c => {
        const grupo = alumnos.filter(a => a.curso === c), ids = idsPorCurso.get(c);
        const registros = registrosDeHoy.filter(r => ids.has(r.alumnoId));
        byCurso[c] = {
            total: grupo.length,
            registros: registros.length,
            faltas: grupo.reduce((s, a) => s + a.faltas, 0),
            tarde: registros.filter(r => r.estado === 'Tarde').length,
            presente: registros.filter(r => ['Presente', 'Retiro'].includes(r.estado)).length,
            ausente: registros.filter(r => r.estado === 'Ausente').length,
            sinRegistro: Math.max(0, grupo.length - registros.length)
        };
    });
    const chart = document.getElementById('curso-chart');
    const legend = document.getElementById('curso-chart-legend');
    if (chart && legend) {
        const panel = document.getElementById('grafico-selector-panel');
        if (panel) {
            panel.classList.toggle('sin-curso', !curso);
            panel.classList.toggle('con-curso', !!curso);
        }
        chart.classList.toggle('grafico-sin-curso', !curso);
        chart.classList.toggle('et35-chart-horizontal', !!curso);
        if (!curso) {
            chart.innerHTML = '<div class="grafico-placeholder"><strong>Elegí un curso para comenzar</strong><span>Usá el selector destacado de arriba para ver presentes, ausentes y llegadas tarde.</span></div>';
            legend.innerHTML = '';
        }
        else {
            const d = byCurso[curso];
            const series = [
                { nombre: 'Presentes', valor: d.presente, color: 'var(--green)' },
                { nombre: 'Ausentes', valor: d.ausente, color: 'var(--red)' },
                { nombre: 'Llegadas tarde', valor: d.tarde, color: 'var(--orange)' }
            ];
            chart.classList.add('et35-chart-horizontal');
            chart.innerHTML = series.map(x => {
                const porcentaje = d.total ? Math.round(x.valor * 100 / d.total) : 0;
                return `<div class="et35-chart-row" title="${esc(x.nombre)}: ${x.valor} de ${d.total}">
          <strong class="et35-chart-label">${esc(x.nombre)}</strong>
          <div class="et35-chart-track" role="progressbar" aria-label="${esc(x.nombre)}" aria-valuenow="${x.valor}" aria-valuemin="0" aria-valuemax="${d.total}">
            <div class="et35-chart-fill" style="width:${porcentaje}%;background:${x.color}"></div>
          </div>
          <strong class="et35-chart-pct">${porcentaje}%</strong>
          <span class="et35-chart-value">${x.valor}/${d.total}</span>
        </div>`;
            }).join('');
            legend.innerHTML = `<p class="helper-text"><strong>${esc(curso)}</strong> · ${et35FechaVisible(fecha)} · ${d.total} alumnos · ${d.sinRegistro} sin registrar. Los retiros se incluyen entre los presentes.</p>`;
        }
    }
    const detalle = document.getElementById('curso-detail-tbody');
    const anioDetalle = et35RellenarAnioDetalle('grafico-detalle-anio');
    const cursosDetalle = autorizados.filter(c => !isJefa() || !anioDetalle || c.startsWith(anioDetalle + '°'));
    if (detalle)
        detalle.innerHTML = cursosDetalle.map((c, i) => {
            const d = byCurso[c], riesgo = alumnos.filter(a => a.curso === c && a.faltas >= 3).length;
            const encabezado = isJefa() && (!i || c.split('°')[0] !== cursosDetalle[i - 1].split('°')[0]) ? `<tr class="et35-fila-anio"><th colspan="8">${esc(c.split('°')[0])}° año</th></tr>` : '';
            return `${encabezado}<tr><td><strong>${esc(c)}</strong></td><td>${d.total}</td><td style="color:var(--green)">${d.presente}</td><td style="color:var(--red);font-weight:700">${d.ausente}</td><td style="color:var(--orange)">${d.tarde}</td><td>${d.sinRegistro}</td><td>${formatoFaltas(d.faltas)}</td><td>${riesgo}</td></tr>`;
        }).join('') || '<tr><td colspan="8">No hay cursos asignados.</td></tr>';
}

function buildBarChart() {
    const el = document.getElementById('bar-chart');
    if (!el)
        return;
    const fechas = fechasLectivasHistoricas().slice(-7);
    const asis = getMiAsistencias(), mapa = new Map(fechas.map(f => [f, { Presente: 0, Tarde: 0, Ausente: 0, Retiro: 0 }]));
    asis.filter(r => et35SesionRegistro(r) === 'principal').forEach(r => { const m = mapa.get(r.fecha); if (m && m[r.estado] !== undefined)
        m[r.estado]++; });
    const maxVal = Math.max(1, ...fechas.map(f => mapa.get(f).Presente + mapa.get(f).Retiro + mapa.get(f).Tarde));
    el.innerHTML = fechas.map(f => {
        const d = mapa.get(f), presentes = d.Presente + d.Retiro, tard = d.Tarde, abs = d.Ausente;
        return `<div class="bar-col" title="${f}: ${presentes} presentes, ${abs} ausentes y ${tard} tardanzas">
      <div class="bar-val">${presentes}</div>
      <div class="bar-fill green" style="height:${Math.max(3, presentes / maxVal * 125)}px"></div>
      <div class="bar-fill red" style="height:${Math.max(3, abs / maxVal * 125)}px"></div>
      <div class="bar-fill orange" style="height:${Math.max(3, tard / maxVal * 125)}px"></div>
      <div class="bar-label">${f.slice(5)}</div>
    </div>`;
    }).join('');
}

function renderEvolucionMensual() {
    const sel = document.getElementById('evolucion-curso'), el = document.getElementById('evolucion-chart');
    if (!sel || !el)
        return;
    const curso = sel.value;
    if (!getCursosUsuario().includes(curso))
        return;
    const meses = ['03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(m => '2026-' + m).filter(m => m <= et35MesActual());
    const ids = new Set(getMiAlumnos().filter(a => a.curso === curso).map(a => a.id));
    const conteos = meses.map(m => ASISTENCIAS.filter(r => r.fecha.startsWith(m) && ids.has(r.alumnoId)).reduce((s, r) => s + valorFaltaRegistro(r), 0));
    const max = Math.max(1, ...conteos), nombres = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    el.innerHTML = meses.map((mes, i) => `<div class="evolucion-mes"><strong>${formatoFaltas(conteos[i])}</strong><div class="barra" style="height:${Math.max(3, Math.round(conteos[i] / max * 150))}px" title="${mes}: ${formatoFaltas(conteos[i])} faltas equivalentes"></div><small>${nombres[Number(mes.slice(5)) - 1]}</small></div>`).join('');
    const total = conteos.reduce((a, b) => a + b, 0);
    document.getElementById('evolucion-resumen').textContent = `${curso} · ${formatoFaltas(total)} faltas equivalentes (1 por ausencia y 0,5 por tardanza) · Máximo mensual: ${formatoFaltas(max)}`;
}
