function renderAdmin() {
    if (!isJefa())
        return;
    const asignados = new Set(PRECEPTORES.flatMap(p => p.cursos));
    const resumen = document.getElementById('resumen-asignaciones');
    if (resumen)
        resumen.textContent = `${asignados.size}/${CURSOS.length} cursos con preceptor · ${PRECEPTORES.length} preceptores registrados · ideal: 2 cursos por persona (máximo excepcional: ${MAX_CURSOS_POR_PRECEPTOR})`;
    const tbody = document.getElementById('prec-tbody');
    tbody.innerHTML = PRECEPTORES.map(p => `<tr>
    <td><strong>${esc(p.apellido)}</strong>, ${esc(p.nombre)}</td>
    <td class="mono">${esc(p.usuario)}</td>
    <td>${p.cursos.length ? p.cursos.map(c => `<span class="badge present" style="margin:2px">${c}</span>`).join('') : '<span class="badge late">Sin cursos</span>'}</td>
    <td><span style="font-weight:700">${p.cursos.length}/${MAX_CURSOS_POR_PRECEPTOR}</span></td>
  </tr>`).join('');
    const sp = document.getElementById('asign-prec');
    const prevPrec = sp.value;
    sp.innerHTML = '<option value="">— Seleccionar —</option>' + PRECEPTORES.map(p => `<option value="${p.id}">${esc(p.apellido)}, ${esc(p.nombre)} (${p.cursos.length}/${MAX_CURSOS_POR_PRECEPTOR})</option>`).join('');
    if (PRECEPTORES.some(p => String(p.id) === prevPrec))
        sp.value = prevPrec;
    const sc = document.getElementById('asign-curso');
    const prevCurso = sc.value;
    sc.innerHTML = '<option value="">— Seleccionar curso —</option>' + [6, 5, 4, 3, 2, 1].map(n => `<optgroup label="${n}° año">` + CURSOS.filter(c => c.startsWith(n + '°')).map(c => {
        const dueno = PRECEPTORES.find(p => p.cursos.includes(c));
        return `<option value="${c}">${c} — ${dueno ? dueno.apellido + ', ' + dueno.nombre : 'Sin asignar'}</option>`;
    }).join('') + '</optgroup>').join('');
    if (CURSOS.includes(prevCurso))
        sc.value = prevCurso;
    const jbody = document.getElementById('admin-just-tbody');
    jbody.innerHTML = JUSTIFICACIONES.map(j => {
        const a = getAlumno(j.alumnoId);
        return `<tr>
      <td><strong>${a?.apellido || '—'}</strong>, ${a?.nombre || '—'}</td>
      <td>${a?.curso || '—'}</td>
      <td class="mono">${j.fecha}</td>
      <td>${tiposJust(j.tipo)}</td>
      <td style="font-size:.78rem;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(j.obs || '—')}</td>
      <td><span class="badge ${badgeJust(j.estado)}">${esc(j.estado)}</span>${j.revisadoPor ? `<div class="helper-text">Por ${esc(j.revisadoPor)}</div>` : ''}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="abrirRevisionJust(${j.id})">Revisar</button>
        ${j.estado === 'En revisión' ? `
          <button class="btn btn-green btn-sm" onclick="quickRevision(${j.id},'Justificado')">✔</button>
          <button class="btn btn-danger btn-sm" onclick="quickRevision(${j.id},'Denegado')">✘</button>
        ` : ''}
      </td>
    </tr>`;
    }).join('') || '<tr><td colspan="7" style="text-align:center;padding:1rem;color:var(--gray-muted)">Sin justificaciones</td></tr>';
    const al = document.getElementById('asignaciones-list');
    al.innerHTML = '<div style="font-size:.78rem;font-weight:700;color:var(--gray-text);text-transform:uppercase;margin-bottom:.5rem">Asignaciones actuales</div>' +
        PRECEPTORES.map(p => `
      <div style="display:flex;align-items:center;gap:.5rem;padding:.4rem 0;border-bottom:1px solid var(--gray-border);font-size:.82rem">
        <span style="flex:1;font-weight:600">${esc(p.apellido)}, ${esc(p.nombre)}</span>
        <span>${p.cursos.join(' · ') || 'Sin cursos'}</span>
      </div>`).join('');
    const matriz = document.getElementById('matriz-cursos-tbody');
    if (matriz) {
        const cantidades = new Map(CURSOS.map(c => [c, 0]));
        for (const a of ALUMNOS)
            cantidades.set(a.curso, (cantidades.get(a.curso) || 0) + 1);
        matriz.innerHTML = [6, 5, 4, 3, 2, 1].map(anio => {
            const cursosAnio = CURSOS.filter(c => c.startsWith(anio + '°'));
            return `<tr class="et35-fila-anio"><th colspan="6">${anio}° año · ${cursosAnio.length} divisiones</th></tr>` + cursosAnio.map(c => {
                const p = PRECEPTORES.find(p => p.cursos.includes(c));
                const meta = et35InfoCurso(c);
                return `<tr><td><strong>${esc(c)}</strong></td><td>${cantidades.get(c)}</td><td>${esc(meta?.turno || '—')}</td><td>${esc(meta?.especialidad || '—')}</td><td>${p ? esc(p.apellido + ', ' + p.nombre) : '⚠️ Sin preceptor'}</td><td>${p ? esc(p.usuario) : '—'}</td></tr>`;
            }).join('');
        }).join('');
    }
}

function asignarCurso() {
    if (!isJefa())
        return;
    const precId = Number(document.getElementById('asign-prec').value);
    const curso = document.getElementById('asign-curso').value;
    if (!precId || !CURSOS.includes(curso)) {
        toast('Seleccioná preceptor y curso', 'warning');
        return;
    }
    const destino = getPrec(precId), anterior = PRECEPTORES.find(p => p.cursos.includes(curso));
    if (!destino)
        return;
    if (anterior?.id === destino.id) {
        toast(`El curso ${curso} ya pertenece a ${destino.apellido}`, 'info');
        return;
    }
    if (destino.cursos.length >= MAX_CURSOS_POR_PRECEPTOR) {
        toast(`${destino.apellido} ya alcanzó el máximo excepcional de ${MAX_CURSOS_POR_PRECEPTOR} cursos. Se recomienda asignar 2 por preceptor.`, 'error');
        return;
    }
    if (anterior)
        anterior.cursos = anterior.cursos.filter(c => c !== curso);
    destino.cursos.push(curso);
    saveDemoData();
    renderAdmin();
    toast(`${curso} asignado a ${destino.nombre} ${destino.apellido}${anterior ? ` (antes: ${anterior.apellido})` : ''}`, 'success');
}

function guardarPreceptor() {
    if (!isJefa())
        return;
    const nombre = document.getElementById('prec-nombre').value.trim();
    const apellido = document.getElementById('prec-apellido').value.trim();
    const usuario = document.getElementById('prec-usuario').value.trim();
    const pass = document.getElementById('prec-pass').value.trim();
    const mail = document.getElementById('prec-mail').value.trim();
    const curso = document.getElementById('prec-curso-asign').value;
    if (!nombre || !apellido || !usuario || !pass) {
        toast('Completá todos los campos obligatorios', 'warning');
        return;
    }
    if (!/^[\p{L} .'-]{2,70}$/u.test(nombre) || !/^[\p{L} .'-]{2,70}$/u.test(apellido)) {
        toast('Nombre o apellido inválido', 'warning');
        return;
    }
    if (!/^[a-zA-Z0-9._-]{3,40}$/.test(usuario)) {
        toast('Usuario inválido: usá 3-40 letras, números, puntos o guiones', 'error');
        return;
    }
    if (PRECEPTORES.find(p => p.usuario === usuario) || usuario === JEFA.usuario || /^alumno\d+$/.test(usuario)) {
        toast('El usuario ya está reservado o registrado', 'error');
        return;
    }
    const id = Math.max(0, ...PRECEPTORES.map(p => p.id)) + 1;
    const nuevo = { id, nombre, apellido, usuario, pass, mail, cursos: [] };
    if (curso) {
        const anterior = PRECEPTORES.find(p => p.cursos.includes(curso));
        if (anterior)
            anterior.cursos = anterior.cursos.filter(c => c !== curso);
        nuevo.cursos.push(curso);
    }
    PRECEPTORES.push(nuevo);
    saveDemoData();
    closeModal('modal-prec');
    renderAdmin();
    toast(`Preceptor ${apellido}, ${nombre} creado${curso ? ` y asignado a ${curso}` : ''}`, 'success');
}

function registrarAuditoria(accion, detalle) {
    if (!currentUser || !['jefa', 'preceptor'].includes(currentUser.rol))
        return;
    AUDITORIA.unshift({ fecha: new Date().toISOString(), usuario: et35UsuarioActivo(), accion: String(accion), detalle: String(detalle) });
    AUDITORIA = AUDITORIA.slice(0, 400);
    saveDemoData();
}

function renderCuentasAlumnos() {
    if (!isJefa())
        return;
    const q = (document.getElementById('admin-cuentas-buscar')?.value || '').toLowerCase();
    const visibles = ALUMNOS.filter(a => `${a.apellido} ${a.nombre} ${a.id} ${a.curso}`.toLowerCase().includes(q)).slice(0, 75);
    const el = document.getElementById('admin-cuentas-alumnos');
    if (el)
        el.innerHTML = visibles.map(a => `<tr><td>${esc(a.apellido)}, ${esc(a.nombre)} (${esc(a.curso)})<div class="helper-text">alumno${a.id}</div></td><td>${a.activo === false ? '<span class="badge absent">Inactiva</span>' : '<span class="badge present">Activa</span>'}</td><td><button class="btn btn-ghost btn-sm" onclick="cambiarEstadoCuenta('alumno',${a.id})">${a.activo === false ? 'Activar' : 'Desactivar'}</button> <button class="btn btn-ghost btn-sm" onclick="restablecerClave('alumno',${a.id})">🔑 Clave</button></td></tr>`).join('') || '<tr><td colspan="3">Sin coincidencias</td></tr>';
}

function renderAuditoria() { if (!isJefa())
    return; const el = document.getElementById('auditoria-tbody'); if (el)
    el.innerHTML = AUDITORIA.map(x => `<tr><td>${esc(new Date(x.fecha).toLocaleString('es-AR'))}</td><td>${esc(x.usuario)}</td><td>${esc(x.accion)}</td><td>${esc(x.detalle)}</td></tr>`).join('') || '<tr><td colspan="4" class="helper-text">Aún no hay modificaciones registradas con esta versión.</td></tr>'; }

function renderCuentasAdmin() {
    if (!isJefa())
        return;
    const el = document.getElementById('admin-cuentas-preceptores');
    if (el)
        el.innerHTML = PRECEPTORES.map(p => `<tr><td>${esc(p.usuario)}<div class="helper-text">${esc(p.apellido)}, ${esc(p.nombre)}</div></td><td>${p.activo === false ? '<span class="badge absent">Inactiva</span>' : '<span class="badge present">Activa</span>'}</td><td><button class="btn btn-ghost btn-sm" onclick="cambiarEstadoCuenta('preceptor',${p.id})">${p.activo === false ? 'Activar' : 'Desactivar'}</button> <button class="btn btn-ghost btn-sm" onclick="restablecerClave('preceptor',${p.id})">🔑 Clave</button></td></tr>`).join('');
    renderCuentasAlumnos();
    renderAuditoria();
}

function cambiarEstadoCuenta(tipo, id) {
    if (!isJefa())
        return toast('Solo la jefa puede administrar cuentas', 'error');
    const u = tipo === 'preceptor' ? getPrec(id) : getAlumno(id);
    if (!u)
        return;
    const estadoNuevo = u.activo === false;
    if (!confirm(`${estadoNuevo ? 'Activar' : 'Desactivar'} la cuenta de ${u.apellido}, ${u.nombre}?`))
        return;
    u.activo = estadoNuevo;
    registrarAuditoria('Estado de cuenta', `${tipo} ${id} (${u.apellido}) · ${estadoNuevo ? 'activada' : 'desactivada'}`);
    saveDemoData();
    renderCuentasAdmin();
    toast('Estado de cuenta actualizado en este sistema', 'success');
}

function restablecerClave(tipo, id) {
    if (!isJefa())
        return toast('Solo la jefa puede restablecer contraseñas', 'error');
    const u = tipo === 'preceptor' ? getPrec(id) : getAlumno(id);
    if (!u)
        return;
    const clave = prompt(`Nueva contraseña para ${u.apellido}, ${u.nombre} (mínimo 6 caracteres):`);
    if (clave === null)
        return;
    if (clave.length < 6 || clave.length > 80)
        return toast('La contraseña debe contener entre 6 y 80 caracteres', 'warning');
    u.pass = clave;
    registrarAuditoria('Cambio de clave', `${tipo} ID ${id}; el valor de la clave no se incluye en el registro`);
    saveDemoData();
    toast('Contraseña actualizada', 'success');
}

function descargarAuditoria() { if (!isJefa())
    return; crearTablaCSV([['Fecha', 'Usuario', 'Acción', 'Detalle'], ...AUDITORIA.map(x => [x.fecha, x.usuario, x.accion, x.detalle])], 'auditoria_ET35.csv'); }
