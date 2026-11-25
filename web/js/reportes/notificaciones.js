function abrirModalMailAlumno(id) {
    pendingMailAlumnoId = id;
    const a = getAlumno(id);
    if (!a || !cursoDeAlumnoAutorizado(id))
        return;
    const tipos = { inasistencia: 'Aviso de inasistencia', tardanza: 'Llegada tarde', riesgo: 'Alerta de riesgo', personalizado: 'Mensaje personalizado' };
    document.getElementById('modal-mail-body').innerHTML = `
    <p style="font-size:.85rem;color:var(--gray-muted);margin-bottom:.8rem">
      Enviando notificación a: <strong>${esc(a.emailResp)}</strong><br>
      Responsable de: ${esc(a.apellido)}, ${esc(a.nombre)} (${esc(a.curso)}) · ${formatoFaltas(a.faltas)} faltas en el ${periodoTexto(bimestreVigente())}
    </p>
    <div class="form-group" style="margin-bottom:.8rem">
      <label>Tipo de notificación</label>
      <select id="modal-mail-tipo">
        ${Object.entries(tipos).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label>Mensaje adicional</label>
      <textarea id="modal-mail-msg" rows="4" placeholder="Agregá un mensaje personalizado opcional..."></textarea>
    </div>`;
    openModal('modal-mail');
}

function previewMail() {
    const id = parseInt(document.getElementById('mail-alumno-sel').value);
    if (!id) {
        toast('Seleccioná un alumno', 'warning');
        return;
    }
    const a = getAlumno(id);
    if (!a)
        return;
    const tipo = document.getElementById('mail-tipo-sel').value;
    const msg = document.getElementById('mail-msg').value;
    const msgs = {
        inasistencia: `Estimado/a responsable, le informamos que ${esc(a.nombre)} ${esc(a.apellido)} (${esc(a.curso)}) registró una inasistencia hoy.`,
        tardanza: `Estimado/a responsable, ${esc(a.nombre)} ${esc(a.apellido)} llegó tarde hoy al establecimiento.`,
        riesgo: `ALERTA: ${esc(a.nombre)} ${esc(a.apellido)} acumula ${formatoFaltas(a.faltas)} faltas en el ${periodoTexto(bimestreVigente())}. Por favor comuníquese con preceptoría.`,
        personalizado: msg || 'Mensaje personalizado.',
    };
    const prev = document.getElementById('mail-preview');
    prev.style.display = 'block';
    prev.innerHTML = `<strong>Para:</strong> ${esc(a.emailResp)}<br><strong>Asunto:</strong> ET N°35 — Asistencia de ${esc(a.nombre)} ${esc(a.apellido)}<br><br>${msgs[tipo]}${msg && tipo !== 'personalizado' ? `<br><br>${esc(msg)}` : ''}`;
}

function confirmarEnvioMail() {
    const a = getAlumno(pendingMailAlumnoId);
    if (!a || !cursoDeAlumnoAutorizado(a.id))
        return;
    const tipo = document.getElementById('modal-mail-tipo')?.value || 'riesgo';
    const extra = document.getElementById('modal-mail-msg')?.value || '';
    const asunto = `ET35 — Aviso de asistencia de ${a.nombre} ${a.apellido}`;
    const cuerpo = `Estimado/a responsable: comunicamos que ${a.nombre} ${a.apellido}, curso ${a.curso}, acumula ${formatoFaltas(a.faltas)} faltas en el ${periodoTexto(bimestreVigente())} (jornada con contraturno: ausencia 0,5 y tardanza 0,25 por sesión). Tipo de aviso: ${tipo}. ${extra}\n\nAtentamente, Preceptoría ET35.`;
    const mail = 'mailto:' + encodeURIComponent(a.emailResp) + '?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpo);
    closeModal('modal-mail');
    window.location.href = mail;
    toast('Se abrió tu aplicación de correo. Revisá el borrador y presioná Enviar; el sistema no envía mensajes automáticamente.', 'warning');
    pendingMailAlumnoId = null;
}

function enviarMailIndividual() {
    const id = parseInt(document.getElementById('mail-alumno-sel').value);
    if (!id) {
        toast('Seleccioná un alumno', 'warning');
        return;
    }
    abrirModalMailAlumno(id);
}

function renderNotificaciones() {
    const el = document.getElementById('noti-alumnos');
    if (!el)
        return;
    const cursoSel = document.getElementById('noti-curso');
    actualizarOpcionesCursos(cursoSel, getCursosUsuario(), true);
    const curso = cursoSel.value, riesgo = getMiAlumnos().filter(a => a.faltas >= 3 && (!curso || a.curso === curso)).sort((a, b) => b.faltas - a.faltas);
    el.innerHTML = riesgo.map(a => `<tr><td><strong>${esc(a.apellido)}, ${esc(a.nombre)}</strong></td><td>${esc(a.curso)}</td><td>${a.faltas}</td><td>${faltasEstado(a.faltas)}</td><td><button class="btn btn-gold btn-sm" onclick="abrirModalMailAlumno(${a.id})">📧 Preparar correo</button></td></tr>`).join('') || '<tr><td colspan="5">Sin alumnos con alerta para este filtro.</td></tr>';
    document.getElementById('noti-riesgo').textContent = riesgo.length;
    document.getElementById('noti-just').textContent = JUSTIFICACIONES.filter(j => j.estado === 'En revisión' && cursoDeAlumnoAutorizado(j.alumnoId)).length;
    const vistos = BORRADORES.filter(b => cursoDeAlumnoAutorizado(b.alumnoId));
    document.getElementById('noti-borradores').textContent = vistos.length;
    document.getElementById('noti-historial').innerHTML = vistos.map(b => { const a = getAlumno(b.alumnoId); return `<tr><td>${esc(new Date(b.fecha).toLocaleString('es-AR'))}</td><td>${a ? esc(a.apellido + ', ' + a.nombre) : 'Alumno ' + b.alumnoId}</td><td>${esc(b.email)}</td><td>${esc(b.usuario)}</td></tr>`; }).join('') || '<tr><td colspan="4">Todavía no se prepararon borradores desde esta versión.</td></tr>';
}
