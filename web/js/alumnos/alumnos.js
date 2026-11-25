function renderAlumnos() {
    const search = (document.getElementById('search-alumnos')?.value || '').trim().toLocaleLowerCase('es');
    et35FiltroAnioCurso('alumnos-anio', 'filter-curso-alumnos');
    const fc = document.getElementById('filter-curso-alumnos')?.value || '';
    const base = getMiAlumnos();
    const periodo = bimestreVigente();
    const notaPeriodo = document.getElementById('alumnos-bimestre-actual');
    if (notaPeriodo)
        notaPeriodo.textContent = periodo ? `Límite: 5 faltas en el ${periodoTexto(periodo)} · se reinicia en el próximo bimestre.` : 'No hay un bimestre vigente: el límite se aplica únicamente entre el 2 de marzo y el 27 de noviembre (con los recesos indicados).';
    document.getElementById('alumnos-count').textContent = base.length;
    const btnNuevo = document.getElementById('btn-nuevo-alumno');
    if (btnNuevo)
        btnNuevo.style.display = isJefa() ? '' : 'none';
    const ordenElegido = document.getElementById('orden-alumnos')?.value || 'auto';
    const orden = ordenElegido === 'auto' ? (fc ? 'apellido' : 'id') : ordenElegido;
    const rows = base.filter(a => Number.isFinite(et35PuntajeBusquedaAlumno(a, search)) && (!fc || a.curso === fc)).sort((a, b) => {
        const apellido = () => a.apellido.localeCompare(b.apellido, 'es', { sensitivity: 'base' }) || a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }) || a.id - b.id;
        if (search)
            return et35PuntajeBusquedaAlumno(a, search) - et35PuntajeBusquedaAlumno(b, search) || apellido();
        if (orden === 'faltas')
            return b.faltas - a.faltas || apellido();
        if (orden === 'apellido')
            return apellido();
        return a.id - b.id;
    });
    document.getElementById('alumnos-tbody').innerHTML = rows.map(a => `<tr>
    <td class="mono">${a.id}</td><td><strong>${esc(a.apellido)}</strong>, ${esc(a.nombre)}</td><td class="mono">${esc(a.dni)}</td><td><strong>${esc(a.curso)}</strong></td>
    <td style="font-size:.78rem;color:var(--gray-muted)">${esc(a.email)}</td><td>${faltasDots(a.faltas)}</td>
    <td>${faltasEstado(a.faltas)}${a.faltas >= 5 ? '<div class="alerta-3">Situación: límite de 5 faltas en este bimestre (según el límite configurado)</div>' : a.faltas >= 3 ? '<div class="alerta-3">📨 Corresponde avisar al responsable</div>' : ''}</td>
    <td><div class="acciones-registro"><button class="btn btn-ghost btn-sm" onclick="abrirHistorialAusencias(${a.id})">📅 Ver ausencias</button>
    ${a.faltas >= 3 ? `<button class="btn btn-gold btn-sm" onclick="abrirModalMailAlumno(${a.id})">📨 Preparar aviso</button>` : ''}
    ${isJefa() ? `<button class="btn btn-ghost btn-sm" onclick="editarFaltas(${a.id})" title="Editar faltas">✏️</button>` : ''}</div></td></tr>`).join('') || '<tr><td colspan="8" style="text-align:center;padding:1.5rem">Sin alumnos</td></tr>';
    document.getElementById('alumnos-foot').textContent = `${rows.length} alumnos · ${rows.filter(a => a.faltas >= 3).length} alertas en el bimestre vigente (pendientes de envío manual)`;
}

function openModalAlumno() {
    if (!isJefa()) {
        toast('Solo la jefa de preceptores puede crear alumnos', 'error');
        return;
    }
    fillCursoSelects();
    openModal('modal-alumno');
}

function guardarAlumno() {
    if (!isJefa()) {
        toast('Solo la jefa puede crear alumnos', 'error');
        return;
    }
    const nombre = document.getElementById('al-nombre').value.trim();
    const apellido = document.getElementById('al-apellido').value.trim();
    const dni = document.getElementById('al-dni').value.trim();
    const curso = document.getElementById('al-curso').value;
    const email = document.getElementById('al-email').value.trim();
    const emailResp = document.getElementById('al-emailresp').value.trim();
    if (!nombre || !apellido || !dni || !email || !emailResp) {
        toast('Completá todos los campos', 'warning');
        return;
    }
    if (!/^[\p{L} .'-]{2,70}$/u.test(nombre) || !/^[\p{L} .'-]{2,70}$/u.test(apellido)) {
        toast('Nombre o apellido inválido', 'warning');
        return;
    }
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(emailResp)) {
        toast('Ingresá correos válidos', 'warning');
        return;
    }
    if (ALUMNOS.find(a => a.dni === dni)) {
        toast('DNI ya registrado', 'error');
        return;
    }
    const id = Math.max(...ALUMNOS.map(a => a.id)) + 1;
    if (!CURSOS.includes(curso)) {
        toast('Seleccioná un curso válido', 'warning');
        return;
    }
    if (!/^\d{7,9}$/.test(dni)) {
        toast('El DNI debe contener entre 7 y 9 dígitos', 'warning');
        return;
    }
    ALUMNOS.push({ id, nombre, apellido, dni, curso, email, emailResp, faltas: 0, fechaAlta: todayISO() });
    saveDemoData();
    fillSelectAlumnos();
    renderAlumnos();
    closeModal('modal-alumno');
    ['al-nombre', 'al-apellido', 'al-dni', 'al-email', 'al-emailresp'].forEach(i => document.getElementById(i).value = '');
    toast(`Alumno ${apellido}, ${nombre} registrado`, 'success');
}

function editarFaltas(id) {
    const a = getAlumno(id);
    if (!a)
        return;
    if (!isJefa()) {
        toast('Solo la jefa puede ajustar faltas', 'error');
        return;
    }
    const periodo = bimestreVigente();
    if (!periodo) {
        toast('No hay un bimestre vigente para ajustar faltas', 'warning');
        return;
    }
    const respuesta = prompt(`Faltas del ${periodoTexto(periodo)} de ${a.apellido}, ${a.nombre}\nValor actual: ${formatoFaltas(a.faltas)}\nNuevo valor (0 a 999; admite pasos de 0,25):`, a.faltas);
    if (respuesta === null)
        return;
    if (!respuesta.trim()) {
        toast('Ingresá un número', 'error');
        return;
    }
    const nf = Number(respuesta.replace(',', '.'));
    if (!Number.isFinite(nf) || !Number.isInteger(nf * 4) || nf < 0 || nf > 999) {
        toast('Ingresá un número de 0 a 999 en pasos de 0,25', 'error');
        return;
    }
    a.ajustesBimestrales = a.ajustesBimestrales || {};
    a.ajustesBimestrales[periodo.key] = Number(a.ajustesBimestrales[periodo.key] || 0) + (nf - a.faltas);
    a.faltas = nf;
    saveDemoData();
    renderAlumnos();
    renderGrafico();
    toast(`Faltas del ${periodo.nombre} actualizadas`, 'success');
}

function abrirPerfilAlumno(alumnoId, anioElegido) {
    const a = getAlumno(Number(alumnoId));
    if (!a || !cursoDeAlumnoAutorizado(a.id))
        return toast('No tenés acceso a este alumno', 'error');
    const actual = bimestreVigente(), anioActual = Number(todayISO().slice(0, 4));
    const anios = [...new Set([anioActual, ...ASISTENCIAS.filter(r => r.alumnoId === a.id && r.fecha >= '2000-01-01').map(r => Number(r.fecha.slice(0, 4)))])].filter(y => y >= 2000 && y <= 2100).sort((x, y) => y - x);
    const anio = anios.includes(Number(anioElegido)) ? Number(anioElegido) : anioActual;
    const registros = ASISTENCIAS.filter(r => r.alumnoId === a.id && r.fecha.slice(0, 4) === String(anio) && r.fecha <= todayISO()).sort((x, y) => y.fecha.localeCompare(x.fecha));
    const asistencia = registros.filter(r => ['Presente', 'Tarde', 'Retiro'].includes(r.estado)).length;
    const aus = registros.filter(r => r.estado === 'Ausente').length;
    const jus = registros.filter(r => r.estado === 'Justificado').length;
    const pct = registros.length ? Math.round(100 * asistencia / registros.length) : 0;
    const res = resumenBimestresAlumno(a, anio);
    const totalAnual = res.reduce((n, b) => n + b.faltas, 0);
    const presente = actual && actual.key.startsWith(`${anio}-`);
    const e = document.getElementById('perfil-alumno-contenido');
    if (!e)
        return;
    const filaBimestre = b => `<tr${actual?.key === b.key ? ' class="bim-actual"' : ''}><td><strong>${esc(b.nombre)}</strong></td><td>${b.ausencias}</td><td>${b.tardanzas}</td><td>${b.justificadas}</td><td><strong>${formatoFaltas(b.faltas)}/5</strong>${b.ajuste ? `<small style="display:block">Ajuste: ${formatoFaltas(b.ajuste)}</small>` : ''}</td></tr>`;
    const detalles = res.map(b => {
        const dias = b.registros.filter(r => ['Ausente', 'Tarde', 'Justificado'].includes(r.estado)).sort((x, y) => x.fecha.localeCompare(y.fecha));
        return `<details class="bim-detalle" ${actual?.key === b.key ? 'open' : ''}><summary><strong>${esc(b.nombre)}</strong><span>${formatoFaltas(b.faltas)} / 5 faltas · ${dias.length} fecha(s)</span></summary>
     <div class="table-wrap"><table><thead><tr><th>Día exacto</th><th>Estado</th><th>Motivo / revisión</th></tr></thead><tbody>${dias.map(r => {
            const j = JUSTIFICACIONES.filter(x => x.alumnoId === a.id && x.fecha === r.fecha && et35SesionRegistro(x) === et35SesionRegistro(r)).sort((x, y) => y.id - x.id)[0];
            const detalle = j ? `${j.estado}: ${j.obs || 'Sin motivo indicado'}${j.obsJefa ? ' · Revisión: ' + j.obsJefa : ''}` : r.estado === 'Justificado' ? 'Justificada en el registro' : r.estado === 'Tarde' ? 'Llegada tarde' : 'Sin justificación aprobada';
            return `<tr><td>${esc(fechaLegibleAusencias(r.fecha))}<small style="display:block;color:#64748b">${esc(et35NombreSesion(r))}</small></td><td><span class="badge ${badgeClass(r.estado)}">${esc(r.estado)}</span></td><td>${esc(detalle)}</td></tr>`;
        }).join('') || '<tr><td colspan="3">No hubo ausencias ni tardanzas registradas en este bimestre.</td></tr>'}</tbody></table></div>
   </details>`;
    }).join('');
    e.innerHTML = `<div class="perfil-info"><div class="perfil-dato"><small>Alumno / ID</small><strong>${esc(a.apellido)}, ${esc(a.nombre)} · ${a.id}</strong></div><div class="perfil-dato"><small>Curso</small><strong>${esc(a.curso)}</strong></div><div class="perfil-dato"><small>DNI</small><strong>${esc(a.dni)}</strong></div><div class="perfil-dato"><small>Email alumno</small><strong>${esc(a.email)}</strong></div><div class="perfil-dato"><small>Email responsable</small><strong>${esc(a.emailResp)}</strong></div><div class="perfil-dato"><small>Situación actual</small><strong>${a.faltas >= 5 ? 'LIBRE (según el límite configurado)' : a.faltas >= 3 ? 'Alerta por faltas' : 'Regular'}</strong></div></div>
 <div class="perfil-kpis"><div class="perfil-kpi"><strong>${pct}%</strong><span>Presentismo ${anio}</span></div><div class="perfil-kpi"><strong>${formatoFaltas(a.faltas)}/5</strong><span>Faltas del bimestre actual</span></div><div class="perfil-kpi"><strong>${formatoFaltas(totalAnual)}</strong><span>Faltas de ${anio} (todos los bimestres)</span></div><div class="perfil-kpi"><strong>${aus}</strong><span>Ausencias registradas ${anio}</span></div><div class="perfil-kpi"><strong>${jus}</strong><span>Justificadas ${anio}</span></div></div>
 <p class="helper-text">Las 5 faltas se cuentan por bimestre, no por año. Las faltas anteriores permanecen guardadas en el historial. ${actual ? `Bimestre vigente: ${esc(actual.nombre)}.` : 'No hay un bimestre vigente según el calendario configurado.'}</p>
 <div class="bim-titulo"><h4>Resumen por bimestre</h4><label class="inline-filter">Año <select class="filter-control" onchange="abrirPerfilAlumno(${a.id},this.value)">${anios.map(y => `<option value="${y}" ${y === anio ? 'selected' : ''}>${y}</option>`).join('')}</select></label></div>
 <div class="table-wrap"><table><thead><tr><th>Bimestre</th><th>Ausencias</th><th>Tardanzas</th><th>Justificadas</th><th>Faltas del período</th></tr></thead><tbody>${res.map(filaBimestre).join('')}</tbody><tfoot><tr><th>Total del año ${anio}</th><td>${res.reduce((n, b) => n + b.ausencias, 0)}</td><td>${res.reduce((n, b) => n + b.tardanzas, 0)}</td><td>${res.reduce((n, b) => n + b.justificadas, 0)}</td><td><strong>${formatoFaltas(totalAnual)}</strong></td></tr></tfoot></table></div>
 <div class="bim-titulo"><h4>Fechas de faltas y tardanzas</h4></div>${detalles}
 ${a.ajusteMigradoBimestre ? `<p class="helper-text">Aviso: se conservó un ajuste de faltas de una versión anterior en el período ${esc(a.ajusteMigradoBimestre)}, ya que no tenía una fecha asociada. La jefa puede corregirlo.</p>` : ''}
 ${a.avisoMigracionBimestres ? `<p class="helper-text">${esc(a.avisoMigracionBimestres)}</p>` : ''}
 <div class="form-actions"><button class="btn btn-ghost" onclick="closeModal('modal-perfil-alumno');abrirHistorialAusencias(${a.id})">📅 Ver historial de ausencias</button>${a.faltas >= 3 ? `<button class="btn btn-gold" onclick="closeModal('modal-perfil-alumno');abrirModalMailAlumno(${a.id})">📨 Preparar aviso</button>` : ''}</div>`;
    openModal('modal-perfil-alumno');
}
