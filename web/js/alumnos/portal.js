function moverHistorialPortalMes(delta) {
    const sel = document.getElementById('portal-historial-mes');
    if (!sel || !et35MesValido(sel.value))
        return;
    const [anio, mes] = sel.value.split('-').map(Number);
    const siguiente = new Date(Date.UTC(anio, mes - 1 + delta, 1));
    sel.value = `${siguiente.getUTCFullYear()}-${String(siguiente.getUTCMonth() + 1).padStart(2, '0')}`;
    renderHistorialPortalMes();
}

function renderHistorialPortalMes() {
    const sel = document.getElementById('portal-historial-mes'), body = document.getElementById('portal-historial-tbody'), resumen = document.getElementById('portal-historial-resumen');
    const a = getAlumno(currentUser?.alumnoId);
    if (!a || !sel || !body || !et35MesValido(sel.value))
        return;
    const mes = sel.value;
    const registros = ASISTENCIAS.filter(r => r.alumnoId === a.id && r.fecha.startsWith(mes) && r.fecha <= todayISO()).sort((x, y) => y.fecha.localeCompare(x.fecha));
    if (resumen) {
        const nombreMes = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(mes + '-01T12:00:00Z'));
        resumen.textContent = `${nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)} · ${registros.length} ${registros.length === 1 ? 'registro' : 'registros'}`;
    }
    body.innerHTML = registros.map(r => `<tr><td>${esc(et35FechaVisible(r.fecha))}<small style="display:block;color:#64748b">${esc(et35NombreSesion(r))}</small></td><td>${esc(bimestreDeFecha(r.fecha)?.nombre || '—')}</td><td>${esc(r.entrada || '—')}</td><td>${esc(r.salida || '—')}</td><td><span class="badge ${badgeClass(r.estado)}">${esc(r.estado)}</span></td><td>${formatoFaltas(valorFaltaRegistro(r))}</td></tr>`).join('') || '<tr><td colspan="6" class="et35-historial-vacio">No hay asistencias registradas para este mes.</td></tr>';
}

function renderPortalAlumno() {
    const a = getAlumno(currentUser?.alumnoId), el = document.getElementById('portal-content');
    if (!el || !a)
        return;
    const registros = ASISTENCIAS.filter(r => r.alumnoId === a.id).sort((x, y) => y.fecha.localeCompare(x.fecha));
    const anioPortal = Number(todayISO().slice(0, 4));
    const ausencias = registros.filter(r => r.estado === 'Ausente').length;
    document.getElementById('portal-nombre').textContent = `${a.apellido}, ${a.nombre} · ${a.curso} · ${et35InfoCurso(a.curso)?.turno || ''} · ${et35InfoCurso(a.curso)?.especialidad || ''}`;
    el.innerHTML = `${a.faltas >= 5 ? '<p class="aviso-libre">🚨 Estado: LIBRE en el bimestre actual (regla configurada; requiere validación institucional).</p>' : ''}<div class="stats-grid"><div class="stat-card red"><div class="stat-label">Faltas del bimestre actual</div><div class="stat-value red">${formatoFaltas(a.faltas)}/5</div><div class="stat-meta">${esc(bimestreVigente()?.nombre || 'Fuera de bimestre')}</div></div><div class="stat-card orange"><div class="stat-label">Tardanzas registradas</div><div class="stat-value orange">${registros.filter(r => r.estado === 'Tarde').length}</div></div><div class="stat-card green"><div class="stat-label">Presentes registrados</div><div class="stat-value green">${registros.filter(r => r.estado === 'Presente').length}</div></div><div class="stat-card navy"><div class="stat-label">Ausencias visibles</div><div class="stat-value">${ausencias}</div><div class="stat-meta">Desde el 2 de marzo de 2026</div></div></div>
  <div class="card" style="margin-top:1rem"><div class="card-head"><h3>Mis faltas por bimestre (${anioPortal})</h3></div><div class="table-wrap"><table><thead><tr><th>Bimestre</th><th>Ausencias</th><th>Tardanzas</th><th>Faltas</th></tr></thead><tbody>${resumenBimestresAlumno(a, anioPortal).map(b => `<tr><td>${b.nombre}</td><td>${b.ausencias}</td><td>${b.tardanzas}</td><td><strong>${formatoFaltas(b.faltas)}</strong></td></tr>`).join('')}</tbody></table></div><p class="helper-text" style="margin:1rem">En cada bimestre el límite vuelve a 0. Las fechas anteriores siguen en el historial.</p></div>
  <div class="card"><div class="card-head et35-portal-hist-head"><div><h3>Mi historial de asistencia</h3><p class="helper-text" style="margin-top:.3rem">Consultá las entradas, salidas y faltas de un mes por vez.</p></div><div class="et35-portal-mes-selector"><label for="portal-historial-mes">Mes</label><div class="et35-mes-nav"><button type="button" class="btn btn-ghost btn-sm et35-mes-flecha" onclick="moverHistorialPortalMes(-1)" aria-label="Mes anterior" title="Mes anterior">‹</button><input id="portal-historial-mes" class="filter-control" type="month" value="${et35MesActual()}" onchange="renderHistorialPortalMes()"/><button type="button" class="btn btn-ghost btn-sm et35-mes-flecha" onclick="moverHistorialPortalMes(1)" aria-label="Mes siguiente" title="Mes siguiente">›</button></div></div></div><div class="card-body et35-historial-resumen" id="portal-historial-resumen" aria-live="polite"></div><div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Bimestre</th><th>Entrada</th><th>Salida</th><th>Estado</th><th>Faltas</th></tr></thead><tbody id="portal-historial-tbody"><tr><td colspan="6">Cargando registros del mes…</td></tr></tbody></table></div><div class="card-body et35-portal-descarga"><button type="button" class="btn btn-ghost btn-sm" onclick="descargarMisAsistencias()">⬇ Descargar historial completo (CSV)</button></div></div>
  `;
    renderHistorialPortalMes();
}

function renderCalendarioAlumno() {
    const a = getAlumno(currentUser?.alumnoId), el = document.getElementById('portal-calendario-grid'), sel = document.getElementById('portal-mes');
    if (!a || !el || !sel)
        return;
    if (!sel.value)
        sel.value = et35MesActual();
    const mapa = new Map(ASISTENCIAS.filter(r => r.alumnoId === a.id).map(r => [r.fecha, r]));
    el.innerHTML = et35CalendarioMes(sel.value, (iso, day) => {
        const r = mapa.get(iso), cl = r ? badgeClass(r.estado) : '';
        const title = r ? `${et35FechaVisible(iso)}: ${r.estado}` : `${et35FechaVisible(iso)}: sin registro`;
        return `<div class="alumno-cal-dia ${cl}" title="${esc(title)}">${day}</div>`;
    });
}

function descargarMisAsistencias() {
    const a = getAlumno(currentUser?.alumnoId);
    if (!a)
        return;
    const regs = ASISTENCIAS.filter(r => r.alumnoId === a.id).sort((x, y) => x.fecha.localeCompare(y.fecha));
    crearTablaCSV([['Fecha', 'Entrada', 'Salida', 'Estado', 'Tipo'], ...regs.map(r => [r.fecha, r.entrada, r.salida, r.estado, etiquetaTipoRegistro(r)])], `mis_asistencias_alumno${a.id}.csv`);
}

function et35PortalAlumnoDatos(idContenido) {
    if (currentUser?.rol !== 'alumno')
        return null;
    const a = getAlumno(currentUser.alumnoId);
    const contenedor = document.getElementById(idContenido);
    if (!a || !contenedor)
        return null;
    const nombre = document.getElementById('portal-nombre');
    if (nombre)
        nombre.textContent = `${a.apellido}, ${a.nombre} · ${a.curso}`;
    return { a, contenedor };
}

function renderPortalQR() {
    const datos = et35PortalAlumnoDatos('portal-qr-content');
    if (!datos)
        return;
    const { a, contenedor } = datos;
    contenedor.innerHTML = `<div class="card et35-portal-qr-card">
    <div class="card-head"><h3>Mi código QR</h3></div>
    <div class="card-body et35-portal-qr-body">
      <p>Mostrá este código al lector QR independiente de la entrada para registrar tu ingreso.</p>
      <div class="et35-portal-qr-ficha">
        <p class="et35-portal-qr-alumno"><strong>${esc(a.apellido)}, ${esc(a.nombre)}</strong><span>${esc(a.curso)}</span></p>
        <img src="codigos-qr/alumno-${a.id}.png" alt="Código QR del alumno ${esc(a.apellido)}" width="240" height="240"/>
        <p class="et35-portal-qr-codigo">${esc(qrCodigo(a))}</p>
      </div>
      <p class="helper-text">Este QR identifica al alumno, pero no sustituye una credencial segura para uso escolar real.</p>
    </div>
  </div>`;
}

function moverCalendarioAlumnoMes(delta) {
    const sel = document.getElementById('portal-mes');
    if (!sel || !et35MesValido(sel.value))
        return;
    const [anio, mes] = sel.value.split('-').map(Number);
    const d = new Date(Date.UTC(anio, mes - 1 + delta, 1));
    sel.value = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    renderCalendarioAlumno();
}

function renderPortalCalendario() {
    const datos = et35PortalAlumnoDatos('portal-calendario-content');
    if (!datos)
        return;
    const { a, contenedor } = datos;
    const regs = ASISTENCIAS.filter(r => r.alumnoId === a.id && et35SesionRegistro(r) === 'principal');
    const presente = regs.filter(r => ['Presente', 'Tarde', 'Retiro'].includes(r.estado)).length;
    const pct = regs.length ? Math.round(presente * 100 / regs.length) : 0;
    contenedor.innerHTML = `<div class="card et35-portal-cal-card">
    <div class="card-head et35-portal-hist-head"><div><h3>Mi calendario mensual</h3><p class="helper-text" style="margin-top:.3rem">Consultá tus registros por día.</p></div>
      <div class="et35-portal-mes-selector"><label for="portal-mes">Mes</label><div class="et35-mes-nav"><button type="button" class="btn btn-ghost btn-sm et35-mes-flecha" onclick="moverCalendarioAlumnoMes(-1)" aria-label="Mes anterior" title="Mes anterior">‹</button><input id="portal-mes" class="filter-control" type="month" onchange="renderCalendarioAlumno()" value="${et35MesActual()}"/><button type="button" class="btn btn-ghost btn-sm et35-mes-flecha" onclick="moverCalendarioAlumnoMes(1)" aria-label="Mes siguiente" title="Mes siguiente">›</button></div></div>
    </div>
    <div class="card-body"><p class="helper-text et35-portal-leyenda">🟢 Verde: presente · 🔴 Rojo: ausente · 🟡 Amarillo: llegada tarde (0,25 con contraturno; 0,5 sin contraturno) · 🟣 Violeta: justificado · ⚪ Gris: sin registro</p>
      <div class="cal-week-grid"><strong>Lun</strong><strong>Mar</strong><strong>Mié</strong><strong>Jue</strong><strong>Vie</strong><strong>Sáb</strong><strong>Dom</strong></div>
      <div class="alumno-cal-grid" id="portal-calendario-grid"></div>
      <p class="helper-text et35-portal-cal-pct">Presentismo de fechas registradas: <strong>${pct}%</strong></p>
    </div>
  </div>`;
    renderCalendarioAlumno();
}

function renderPortalJustificaciones() {
    const datos = et35PortalAlumnoDatos('portal-justificaciones-content');
    if (!datos)
        return;
    const { a, contenedor } = datos;
    const justific = JUSTIFICACIONES.filter(j => j.alumnoId === a.id).sort((x, y) => y.fecha.localeCompare(x.fecha) || y.id - x.id);
    const fechasAusentes = ASISTENCIAS.filter(r => r.alumnoId === a.id && r.estado === 'Ausente' && r.fecha <= todayISO() && !JUSTIFICACIONES.some(j => j.alumnoId === a.id && j.fecha === r.fecha && et35SesionRegistro(j) === et35SesionRegistro(r) && j.estado !== 'Denegado')).sort((x, y) => y.fecha.localeCompare(x.fecha));
    contenedor.innerHTML = `<div class="card"><div class="card-head"><h3>Presentar una justificación</h3></div><div class="card-body">
    <p class="helper-text">Elegí una de tus ausencias registradas, contá el motivo y adjuntá un comprobante si lo tenés. El preceptor de tu curso podrá aprobar o denegar la solicitud.</p>
    <div class="form-grid et35-portal-just-form">
      <div class="form-group"><label for="portal-just-fecha">Fecha de ausencia</label><select id="portal-just-fecha"><option value="">Elegir una falta...</option>${fechasAusentes.map(r => `<option value="${r.fecha}|${et35SesionRegistro(r)}">${esc(et35FechaVisible(r.fecha))} · ${esc(et35NombreSesion(r))}</option>`).join('')}</select></div>
      <div class="form-group"><label for="portal-just-tipo">Motivo</label><select id="portal-just-tipo"><option value="medica">Certificado médico</option><option value="familiar">Razón familiar</option><option value="deportiva">Evento deportivo</option><option value="otra">Otra</option></select></div>
      <div class="form-group full"><label for="portal-just-obs">Explicación</label><textarea id="portal-just-obs" rows="3" placeholder="Contá por qué faltaste..."></textarea></div>
      <div class="form-group full"><label for="portal-just-file">Comprobante (opcional; PDF, JPG o PNG, máximo 8 MB)</label><input id="portal-just-file" type="file" accept=".pdf,.jpg,.jpeg,.png"><p class="helper-text">El comprobante solo se guarda en este navegador. No llega a otros dispositivos.</p></div>
    </div>
    <div class="form-actions"><button type="button" class="btn btn-primary" onclick="enviarJustificacionAlumno()" ${fechasAusentes.length ? '' : 'disabled'}>📤 Enviar para revisión</button>${fechasAusentes.length ? '' : '<span class="helper-text">No tenés ausencias disponibles para justificar.</span>'}</div>
  </div></div>
  <div class="card section-spacer"><div class="card-head"><h3>Estado de mis justificaciones</h3></div>
    <div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Motivo</th><th>Estado</th><th>Revisado por</th><th>Respuesta</th></tr></thead><tbody>
      ${justific.map(j => `<tr><td>${esc(et35FechaVisible(j.fecha))}<small style="display:block;color:#64748b">${esc(et35NombreSesion(j))}</small></td><td>${esc(tiposJust(j.tipo))}</td><td><span class="badge ${badgeJust(j.estado)}">${j.estado === 'Justificado' ? 'Aprobado' : esc(j.estado)}</span></td><td>${esc(j.revisadoPor || '—')}</td><td>${esc(j.obsJefa || '—')}</td></tr>`).join('') || '<tr><td colspan="5">Sin solicitudes registradas.</td></tr>'}
    </tbody></table></div></div>`;
}

async function enviarJustificacionAlumno() {
    if (currentUser?.rol !== 'alumno')
        return;
    const alumnoId = currentUser.alumnoId;
    const [fecha, sesion = 'principal'] = (document.getElementById('portal-just-fecha')?.value || '').split('|');
    const tipo = document.getElementById('portal-just-tipo')?.value;
    const obs = document.getElementById('portal-just-obs')?.value.trim();
    const archivo = document.getElementById('portal-just-file')?.files?.[0];
    if (!obs) {
        toast('Contá el motivo de la ausencia', 'warning');
        return;
    }
    if (await crearSolicitudJustificacion(alumnoId, fecha, tipo, obs, archivo, sesion))
        renderPortalJustificaciones();
}
