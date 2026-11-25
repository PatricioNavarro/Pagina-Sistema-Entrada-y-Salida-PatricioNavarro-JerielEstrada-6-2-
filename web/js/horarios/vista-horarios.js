function renderReglasHorariasCurso(curso) {
    const contenedor = document.getElementById('et35-reglas-horarias');
    if (!contenedor)
        return;
    const info = et35InfoCurso(curso);
    if (!info) {
        contenedor.innerHTML = '<p class="helper-text">Elegí un curso para consultar sus horarios de ingreso.</p>';
        return;
    }
    const r = info.jornada;
    const lineas = [['var(--green)', r.inicio + ' – ' + r.normalHasta, 'Asistencia normal'], ['var(--orange)', r.tardeDesde + ' – ' + r.tardeHasta, 'Llegada tarde (0,25 con contraturno, 0,5 sin contraturno)'], ['var(--red)', r.ausenteDesde + ' en adelante', 'Ausente'], ['var(--purple)', r.presenciaDesde + ' en adelante', 'Ausente con presencia (se registra como ausencia)']];
    contenedor.innerHTML = `<p class="helper-text" style="margin-bottom:.6rem"><strong>${esc(curso)} · ${esc(info.turno)} · ${esc(info.especialidad)}</strong><br>Jornada: ${esc(r.inicio)}–${esc(r.fin)} · Días con contraturno: ausencia 0,5 y tardanza 0,25 por sesión; sin contraturno: ausencia 1 y tardanza 0,5</p>` + lineas.map(([color, titulo, descripcion]) => `<div class="rule-box"><div class="rule-dot" style="background:${color}"></div><div><div class="rule-title">${titulo}</div><div class="rule-desc">${descripcion}</div></div></div>`).join('');
}

function renderHorarios() {
    const selector = document.getElementById('horarios-curso'), wrap = document.getElementById('horarios-anio-wrap');
    if (!selector)
        return;
    const alumno = currentUser?.rol === 'alumno';
    const cursos = alumno ? [getAlumno(currentUser.alumnoId)?.curso].filter(Boolean) : getCursosUsuario();
    if (wrap)
        wrap.hidden = !isJefa();
    if (isJefa()) {
        const anio = document.getElementById('horarios-anio');
        if (anio && !anio.dataset.cargado) {
            anio.innerHTML = [6, 5, 4, 3, 2, 1].map(y => `<option value="${y}">${y}° año</option>`).join('');
            anio.dataset.cargado = '1';
        }
        const filtrados = cursos.filter(c => c.startsWith(anio.value + '°'));
        const previo = selector.value;
        selector.innerHTML = filtrados.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
        selector.value = filtrados.includes(previo) ? previo : filtrados[0] || '';
    }
    else {
        const previo = selector.value;
        selector.innerHTML = cursos.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
        selector.value = cursos.includes(previo) ? previo : cursos[0] || '';
    }
    if (alumno) {
        document.getElementById('horarios-selector-wrap').hidden = true;
    }
    mostrarHorarioCurso();
}

function mostrarHorarioCurso() {
    const curso = currentUser?.rol === 'alumno' ? getAlumno(currentUser.alumnoId)?.curso : document.getElementById('horarios-curso')?.value;
    const info = et35InfoCurso(curso), salida = document.getElementById('horarios-contenido');
    if (!salida)
        return;
    if (!info) {
        salida.innerHTML = '<p class="helper-text">No hay cursos disponibles para este usuario.</p>';
        return;
    }
    const counts = { Contraturno: info.contraturno.length, 'Educación Física': 1 };
    const etiquetas = { Clase: 'Clase regular', Contraturno: 'Contraturno', 'Educación Física': 'Educación Física' };
    salida.innerHTML = `<div class="et35-horario-cabecera"><div><p class="et35-horario-etiqueta">${info.anio}° año · ${info.division}° división</p><h3>${esc(curso)} — ${esc(info.especialidad)}</h3><p>Turno principal: <strong>${esc(info.turno)}</strong> · ${esc(info.jornada.inicio)} a ${esc(info.jornada.fin)}</p></div><div class="et35-horario-cifras"><span>${counts.Contraturno} días de contraturno</span><span>Educación Física · 2 horas</span></div></div><p class="et35-horario-origen">${esc(info.fuente)}</p><div class="et35-horario-grid">${window.ET35Horarios.DIAS.map((dia, i) => {
        const agenda = info.sesiones.filter(s => s.dia === i).sort((a, b) => a.inicio.localeCompare(b.inicio));
        return `<div class="et35-horario-dia"><h4>${dia}</h4>${agenda.map(s => `<div class="et35-horario-sesion et35-horario-${s.tipo === 'Clase' ? 'clase' : s.tipo === 'Contraturno' ? 'contra' : 'ef'}"><strong>${etiquetas[s.tipo]}</strong><span>${esc(s.inicio)} – ${esc(s.fin)}</span>${s.observacion ? `<small>${esc(s.observacion)}</small>` : ''}</div>`).join('')}</div>`;
    }).join('')}</div><p class="helper-text" style="margin-top:1rem">El escáner QR actual controla la <strong>entrada del turno principal</strong>; el contraturno y Educación Física se muestran como horario informativo y aún no generan una segunda asistencia independiente.</p>`;
}

function horariosCambiarAnio() { renderHorarios(); }
