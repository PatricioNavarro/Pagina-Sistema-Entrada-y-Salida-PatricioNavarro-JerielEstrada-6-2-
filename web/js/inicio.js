const CURSOS = ["1°1", "1°2", "1°3", "1°4", "1°5", "1°6", "1°7", "1°8", "1°9", "1°10", "1°11", "1°12", "2°1", "2°2", "2°3", "2°4", "2°5", "2°6", "2°7", "2°8", "2°9", "2°10", "3°1 C", "3°2 A", "3°3 C", "3°4 C", "3°5 A", "3°6 C", "3°7 A", "3°8 A", "3°9 M", "4°1 A", "4°1 C", "4°2 A", "4°2 C", "4°3 C", "4°4 A", "4°4 C", "4°5 A", "4°5 C", "4°6 A", "4°7 A", "5°1 A", "5°1 C", "5°2 C", "5°3 A", "5°3 C", "5°4 A", "5°4 C", "5°5 A", "6°1 A", "6°1 C", "6°2 A", "6°2 C", "6°3 C", "6°4 A", "6°5 A"];
const PRECEPTORES_INICIALES = [
    { id: 1, nombre: 'María', apellido: 'Pérez', usuario: 'preceptor01', pass: '123456', mail: 'preceptor01@example.com', cursos: ['6°1 C', '6°2 C'] },
    { id: 2, nombre: 'Carlos', apellido: 'Rueda', usuario: 'preceptor02', pass: '123456', mail: 'preceptor02@example.com', cursos: ['5°1 C', '5°2 C'] },
    { id: 3, nombre: 'Ana', apellido: 'Villalba', usuario: 'preceptor03', pass: '123456', mail: 'preceptor03@example.com', cursos: ['4°1 A', '4°2 A'] },
    { id: 4, nombre: 'Jorge', apellido: 'Castillo', usuario: 'preceptor04', pass: '123456', mail: 'preceptor04@example.com', cursos: ['3°1 C', '3°2 A'] },
    { id: 5, nombre: 'Lucía', apellido: 'Sosa', usuario: 'preceptor05', pass: '123456', mail: 'preceptor05@example.com', cursos: ['1°1', '1°2'] },
    { id: 6, nombre: 'Diego', apellido: 'Ferreyra', usuario: 'preceptor06', pass: '123456', mail: 'preceptor06@example.com', cursos: ['2°1', '2°2'] },
    { id: 7, nombre: 'Florencia', apellido: 'Romero', usuario: 'preceptor07', pass: '123456', mail: 'preceptor07@example.com', cursos: ['1°3', '1°4'] },
    { id: 8, nombre: 'Martín', apellido: 'Aguirre', usuario: 'preceptor08', pass: '123456', mail: 'preceptor08@example.com', cursos: ['2°3', '2°4'] },
    { id: 9, nombre: 'Paula', apellido: 'Medina', usuario: 'preceptor09', pass: '123456', mail: 'preceptor09@example.com', cursos: ['3°3 C', '3°4 C'] },
    { id: 10, nombre: 'Gastón', apellido: 'Luna', usuario: 'preceptor10', pass: '123456', mail: 'preceptor10@example.com', cursos: ['5°4 A', '6°4 A'] },
    { id: 11, nombre: 'Silvina', apellido: 'Ramos', usuario: 'preceptor11', pass: '123456', mail: 'preceptor11@example.com', cursos: ['1°5', '1°6'] },
    { id: 12, nombre: 'Sergio', apellido: 'Varela', usuario: 'preceptor12', pass: '123456', mail: 'preceptor12@example.com', cursos: ['1°7', '1°8'] },
    { id: 13, nombre: 'Carolina', apellido: 'Molina', usuario: 'preceptor13', pass: '123456', mail: 'preceptor13@example.com', cursos: ['1°9', '1°10'] },
    { id: 14, nombre: 'Federico', apellido: 'Silva', usuario: 'preceptor14', pass: '123456', mail: 'preceptor14@example.com', cursos: ['2°5', '2°6'] },
    { id: 15, nombre: 'Mónica', apellido: 'Acosta', usuario: 'preceptor15', pass: '123456', mail: 'preceptor15@example.com', cursos: ['2°7', '2°8'] },
    { id: 16, nombre: 'Daniel', apellido: 'Gómez', usuario: 'preceptor16', pass: '123456', mail: 'preceptor16@example.com', cursos: ['2°9', '3°5 A'] },
    { id: 17, nombre: 'Rocío', apellido: 'Fernández', usuario: 'preceptor17', pass: '123456', mail: 'preceptor17@example.com', cursos: ['3°6 C', '3°7 A'] },
    { id: 18, nombre: 'Esteban', apellido: 'Cáceres', usuario: 'preceptor18', pass: '123456', mail: 'preceptor18@example.com', cursos: ['3°8 A', '3°9 M'] },
    { id: 19, nombre: 'Natalia', apellido: 'Torres', usuario: 'preceptor19', pass: '123456', mail: 'preceptor19@example.com', cursos: ['4°3 C', '4°4 C'] },
    { id: 20, nombre: 'Lucas', apellido: 'Ibarra', usuario: 'preceptor20', pass: '123456', mail: 'preceptor20@example.com', cursos: ['4°5 C', '4°6 A'] },
    { id: 21, nombre: 'Verónica', apellido: 'Benítez', usuario: 'preceptor21', pass: '123456', mail: 'preceptor21@example.com', cursos: ['5°3 C', '5°5 A', '6°3 C'] },
    { id: 22, nombre: 'Marcelo', apellido: 'Ortiz', usuario: 'preceptor22', pass: '123456', mail: 'preceptor22@example.com', cursos: ['6°5 A'] },
    { id: 23, nombre: 'Celina', apellido: 'Márquez', usuario: 'preceptor23', pass: '123456', mail: 'preceptor23@example.com', cursos: ["1°11", "1°12"] },
    { id: 24, nombre: 'Fabián', apellido: 'Duarte', usuario: 'preceptor24', pass: '123456', mail: 'preceptor24@example.com', cursos: ["2°10", "4°1 C"] },
    { id: 25, nombre: 'Lorena', apellido: 'Gutiérrez', usuario: 'preceptor25', pass: '123456', mail: 'preceptor25@example.com', cursos: ["4°2 C", "4°4 A"] },
    { id: 26, nombre: 'Pablo', apellido: 'Quiroga', usuario: 'preceptor26', pass: '123456', mail: 'preceptor26@example.com', cursos: ["4°5 A", "4°7 A"] },
    { id: 27, nombre: 'Patricia', apellido: 'Méndez', usuario: 'preceptor27', pass: '123456', mail: 'preceptor27@example.com', cursos: ["5°1 A", "5°3 A"] },
    { id: 28, nombre: 'Hernán', apellido: 'Godoy', usuario: 'preceptor28', pass: '123456', mail: 'preceptor28@example.com', cursos: ["5°4 C", "6°1 A"] },
    { id: 29, nombre: 'Silvia', apellido: 'Ferreyra', usuario: 'preceptor29', pass: '123456', mail: 'preceptor29@example.com', cursos: ["6°2 A"] },
];
let PRECEPTORES = PRECEPTORES_INICIALES.map(p => ({ ...p, cursos: [...p.cursos] }));
const MAX_CURSOS_POR_PRECEPTOR = 4;
const JEFA = { nombre: 'Laura', apellido: 'Martínez', usuario: 'jefa', pass: 'admin123', mail: 'l.martinez@et35.edu.ar', rol: 'jefa' };
let ALUMNOS = [
    { id: 1, nombre: 'Valentina', apellido: 'Rodríguez', dni: '41234567', curso: '1°2', email: 'v.rodriguez@et35.edu.ar', emailResp: 'padre1@gmail.com', faltas: 1 },
    { id: 2, nombre: 'Mateo', apellido: 'González', dni: '41234568', curso: '1°2', email: 'm.gonzalez@et35.edu.ar', emailResp: 'padre2@gmail.com', faltas: 2 },
    { id: 3, nombre: 'Sofía', apellido: 'López', dni: '41234569', curso: '2°3', email: 's.lopez@et35.edu.ar', emailResp: 'padre3@gmail.com', faltas: 3 },
    { id: 4, nombre: 'Lucas', apellido: 'Martínez', dni: '41234570', curso: '3°4 C', email: 'l.martinez@et35.edu.ar', emailResp: 'padre4@gmail.com', faltas: 0 },
    { id: 5, nombre: 'Isabella', apellido: 'Fernández', dni: '41234571', curso: '4°2 A', email: 'i.fernandez@et35.edu.ar', emailResp: 'padre5@gmail.com', faltas: 5 },
    { id: 6, nombre: 'Benjamín', apellido: 'García', dni: '41234572', curso: '2°3', email: 'b.garcia@et35.edu.ar', emailResp: 'padre6@gmail.com', faltas: 1 },
    { id: 7, nombre: 'Camila', apellido: 'Torres', dni: '41234573', curso: '3°3 C', email: 'c.torres@et35.edu.ar', emailResp: 'padre7@gmail.com', faltas: 2 },
    { id: 8, nombre: 'Santiago', apellido: 'Pérez', dni: '41234574', curso: '5°1 C', email: 's.perez@et35.edu.ar', emailResp: 'padre8@gmail.com', faltas: 4 },
    { id: 9, nombre: 'Valeria', apellido: 'Sánchez', dni: '41234575', curso: '5°1 C', email: 'v.sanchez@et35.edu.ar', emailResp: 'padre9@gmail.com', faltas: 0 },
    { id: 10, nombre: 'Nicolás', apellido: 'Díaz', dni: '41234576', curso: '6°2 C', email: 'n.diaz@et35.edu.ar', emailResp: 'padre10@gmail.com', faltas: 3 },
    { id: 11, nombre: 'Antonella', apellido: 'Ruiz', dni: '41234577', curso: '6°2 C', email: 'a.ruiz@et35.edu.ar', emailResp: 'padre11@gmail.com', faltas: 1 },
    { id: 12, nombre: 'Agustín', apellido: 'Ramírez', dni: '41234578', curso: '4°1 A', email: 'ag.ramirez@et35.edu.ar', emailResp: 'padre12@gmail.com', faltas: 0 },
    { id: 13, nombre: 'Luciana', apellido: 'Vega', dni: '41234579', curso: '3°3 C', email: 'l.vega@et35.edu.ar', emailResp: 'padre13@gmail.com', faltas: 5 },
    { id: 14, nombre: 'Tomás', apellido: 'Herrera', dni: '41234580', curso: '4°2 A', email: 't.herrera@et35.edu.ar', emailResp: 'padre14@gmail.com', faltas: 2 },
    { id: 15, nombre: 'Martina', apellido: 'Castro', dni: '41234581', curso: '1°2', email: 'm.castro@et35.edu.ar', emailResp: 'padre15@gmail.com', faltas: 4 },
];
let ASISTENCIAS = [
    { id: 1, alumnoId: 1, fecha: '2025-06-17', entrada: '07:42', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 2, alumnoId: 2, fecha: '2025-06-17', entrada: '08:10', salida: '13:00', estado: 'Tarde', tipo: 'QR' },
    { id: 3, alumnoId: 3, fecha: '2025-06-17', entrada: '', salida: '', estado: 'Ausente', tipo: 'Sistema' },
    { id: 4, alumnoId: 4, fecha: '2025-06-17', entrada: '07:43', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 5, alumnoId: 5, fecha: '2025-06-17', entrada: '07:48', salida: '10:30', estado: 'Retiro', tipo: 'Manual' },
    { id: 6, alumnoId: 6, fecha: '2025-06-17', entrada: '07:51', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 7, alumnoId: 7, fecha: '2025-06-17', entrada: '', salida: '', estado: 'Justificado', tipo: 'Manual' },
    { id: 8, alumnoId: 8, fecha: '2025-06-17', entrada: '08:05', salida: '13:00', estado: 'Tarde', tipo: 'QR' },
    { id: 9, alumnoId: 9, fecha: '2025-06-17', entrada: '07:40', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 10, alumnoId: 10, fecha: '2025-06-17', entrada: '', salida: '', estado: 'Ausente', tipo: 'Sistema' },
    { id: 11, alumnoId: 11, fecha: '2025-06-17', entrada: '07:45', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 12, alumnoId: 12, fecha: '2025-06-17', entrada: '07:52', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 13, alumnoId: 13, fecha: '2025-06-17', entrada: '', salida: '', estado: 'Ausente', tipo: 'Sistema' },
    { id: 14, alumnoId: 14, fecha: '2025-06-17', entrada: '07:50', salida: '13:00', estado: 'Presente', tipo: 'QR' },
    { id: 15, alumnoId: 15, fecha: '2025-06-17', entrada: '08:15', salida: '13:00', estado: 'Tarde', tipo: 'QR' },
];
let JUSTIFICACIONES = [
    { id: 1, alumnoId: 7, fecha: '2025-06-17', tipo: 'medica', obs: 'Turno médico programado', estado: 'En revisión', obsJefa: '' },
    { id: 2, alumnoId: 5, fecha: '2025-06-15', tipo: 'familiar', obs: 'Trámite familiar urgente', estado: 'Justificado', obsJefa: 'Aprobado con certificado' },
    { id: 3, alumnoId: 3, fecha: '2025-06-14', tipo: 'medica', obs: 'Post-operatorio', estado: 'Justificado', obsJefa: '' },
    { id: 4, alumnoId: 13, fecha: '2025-06-17', tipo: 'otra', obs: 'Sin comprobante', estado: 'Denegado', obsJefa: 'No presentó documentación' },
    { id: 5, alumnoId: 8, fecha: '2025-06-16', tipo: 'deportiva', obs: 'Competencia provincial', estado: 'En revisión', obsJefa: '' },
];
let SCAN_LOG = [];
let currentUser = null;
let editingAsistId = null;
let editingJustId = null;
let pendingMailAlumnoId = null;
let et35IndiceAlumnos = new Map(), et35CantidadIndexada = -1;
const getAlumno = id => {
    if (et35CantidadIndexada !== ALUMNOS.length) {
        et35IndiceAlumnos = new Map(ALUMNOS.map(a => [Number(a.id), a]));
        et35CantidadIndexada = ALUMNOS.length;
    }
    return et35IndiceAlumnos.get(Number(id));
};
const getPrec = id => PRECEPTORES.find(p => p.id === id);
const et35InfoCurso = curso => window.ET35Horarios?.cursoInfo(curso) || null;
const et35EstadoHorario = (curso, hora) => window.ET35Horarios?.estadoEntrada(curso, hora) || { estado: evaluarEstado(hora), observacion: '' };
const isJefa = () => currentUser && currentUser.rol === 'jefa';
const isMiCurso = c => isJefa() || (currentUser?.rol === 'preceptor' && getCursosUsuario().includes(c));
let loginTab = 'prec';
document.getElementById('login-pass').addEventListener('keydown', e => { if (e.key === 'Enter')
    doLogin(); });
document.getElementById('login-user').addEventListener('keydown', e => { if (e.key === 'Enter')
    doLogin(); });
setInterval(updateClock, 1000);
updateClock();
let et35NavegacionSecuencia = 0;
document.addEventListener('click', e => {
    const enlace = e.target.closest?.('a.nav-item[href]');
    if (!enlace || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || enlace.target)
        return;
    e.preventDefault();
    void et35NavegarRapido(enlace.href);
});
window.addEventListener('popstate', () => {
    if (currentUser && location.pathname.endsWith('.html'))
        void et35NavegarRapido(location.href, { guardarHistorial: false });
});
let alumnoHistorialAusenciasId = null;
const diasSemanaAusencias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
let editingAsistAlumnoNuevo = null, editingAsistFechaNueva = null;
let qrStream = null, qrTimer = null, qrBusy = false, qrDecoder = null, qrDecoderLoad = null;
const QR_JS_LIBS = [
    'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
    'https://unpkg.com/jsqr@1.4.0/dist/jsQR.js'
];
window.addEventListener('pagehide', () => { if (qrStream)
    detenerCamaraQR(false); });
const et35SeleccionAnioMemoria = Object.create(null);
const ET35_TIPOS_COMPROBANTE = new Set(['application/pdf', 'image/png', 'image/jpeg']);
const ET35_LIMITE_COMPROBANTE = 8 * 1024 * 1024;
let et35ArchivoRevisionURL = null;
let et35SolicitudEnCurso = false;
let et35VistaDashboard = 'diaria';
const et35RenderDonutAnterior = renderDonut;
renderDonut = function () { et35RenderDonutAnterior(); renderDashboardFecha(); };
const et35RegistrarMovimientoOriginal = registrarMovimiento;
registrarMovimiento = function (a, tipo = 'entrada', origen = 'QR') {
    if (!et35InscriptosEnFecha(a, todayISO()))
        return toast('El alumno no figura inscripto hoy; consultá los movimientos de matrícula', 'warning');
    const previo = ASISTENCIAS.find(r => r.alumnoId === a.id && r.fecha === todayISO() && et35SesionRegistro(r) === 'principal');
    if (previo?.simulado === true) {
        if (!isMiCurso(a.curso))
            return toast('Curso no autorizado', 'error'), false;
        if (tipo === 'salida' || tipo === 'retiro')
            return toast('Primero registrá una entrada real con el QR', 'warning'), false;
        ASISTENCIAS = ASISTENCIAS.filter(r => r !== previo);
    }
    const antes = previo ? { entrada: previo.entrada, salida: previo.salida, estado: previo.estado } : null;
    const ok = et35RegistrarMovimientoOriginal(a, tipo, origen);
    const ahora = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    mostrarConfirmacionQR(ok, ok ? `${a.apellido}, ${a.nombre} · ${a.curso} · ${ahora} · ${ASISTENCIAS.find(r => r.alumnoId === a.id && r.fecha === todayISO() && et35SesionRegistro(r) === 'principal')?.estado}` : `${a.apellido}, ${a.nombre} · ${a.curso}: ${antes?.entrada && tipo === 'entrada' ? 'Ya tiene entrada registrada hoy.' : antes?.salida ? 'Ya tiene salida registrada hoy.' : 'Revisá el código, el horario o el movimiento seleccionado.'}`, a, tipo);
    if (ok)
        registrarAuditoria('Movimiento de asistencia', `${a.apellido}, ${a.nombre} (${a.curso}) · ${tipo} · ${origen}`);
    return ok;
};
const et35ProcesarQRAnterior = procesarCodigoQR;
procesarCodigoQR = function (valor) {
    const codigo = String(valor || '').trim().toUpperCase();
    if (!getMiAlumnos().some(a => qrCodigo(a) === codigo)) {
        mostrarConfirmacionQR(false, 'Código inexistente o alumno fuera de tus cursos.');
        toast('Código QR inválido para este preceptor', 'error');
        return false;
    }
    return et35ProcesarQRAnterior(valor);
};
const et35RenderAsistenciaAnterior = renderAsistencia;
renderAsistencia = function () {
    et35RenderAsistenciaAnterior();
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO(), curso = document.getElementById('filter-curso-asistencia')?.value || '';
    const sesion = et35SesionSeleccionada();
    const alumnado = getMiAlumnos().filter(a => (!curso || a.curso === curso) && et35InscriptosEnFecha(a, fecha) && et35SesionDisponible(a.curso, fecha, sesion));
    const ids = new Set(alumnado.map(a => a.id));
    const rows = ASISTENCIAS.filter(r => r.fecha === fecha && ids.has(r.alumnoId) && et35SesionRegistro(r) === sesion);
    const update = (id, n) => { const e = document.getElementById(id); if (e)
        e.textContent = n; };
    const present = rows.filter(r => ['Presente', 'Retiro'].includes(r.estado)).length;
    update('asis-res-presentes', present);
    update('asis-res-ausentes', rows.filter(r => r.estado === 'Ausente').length);
    update('asis-res-tardes', rows.filter(r => r.estado === 'Tarde').length);
    update('asis-res-justificados', rows.filter(r => r.estado === 'Justificado').length);
    update('asis-res-sinregistro', Math.max(0, alumnado.length - rows.length));
    const body = document.getElementById('asistencia-tbody');
    if (!body)
        return;
    body.querySelectorAll('tr').forEach(tr => {
        const td = tr.querySelector('td');
        if (!td || !/^\d+$/.test(td.textContent.trim())) {
            tr.querySelector('td')?.setAttribute('colspan', '9');
            return;
        }
        const alumnoId = Number(td.textContent.trim());
        td.insertAdjacentHTML('beforebegin', `<td><input class="asis-seleccion" aria-label="Seleccionar alumno ${alumnoId}" type="checkbox" value="${alumnoId}" onchange="actualizarSeleccionMasiva()"></td>`);
    });
    const all = document.getElementById('asis-marcar-todos');
    if (all)
        all.checked = false;
    actualizarSeleccionMasiva();
};
const et35RenderAlumnosAnterior = renderAlumnos;
renderAlumnos = function () {
    et35RenderAlumnosAnterior();
    const body = document.getElementById('alumnos-tbody');
    if (!body)
        return;
    [...body.querySelectorAll('tr')].forEach(tr => {
        const td = tr.querySelector('td');
        if (!td || !/^\d+$/.test(td.textContent.trim()))
            return;
        const id = Number(td.textContent.trim());
        const btn = tr.querySelector('td:last-child .acciones-registro');
        if (btn)
            btn.insertAdjacentHTML('afterbegin', `<button class="btn btn-primary btn-sm" onclick="abrirPerfilAlumno(${id})">👤 Ver perfil</button>`);
    });
};
let et35ComprobanteURL = null;
const et35RenderGraficoAnterior = renderGrafico;
renderGrafico = function () {
    et35RenderGraficoAnterior();
    const sel = document.getElementById('evolucion-curso');
    if (!sel)
        return;
    const old = sel.value, cursoGrafico = document.getElementById('grafico-curso')?.value || '';
    const permitidos = getCursosUsuario();
    if (isJefa()) {
        et35FiltroAnioCurso('evolucion-anio', 'evolucion-curso', { permitirTodos: false });
        const cursosDelAnio = permitidos.filter(c => c.startsWith(document.getElementById('evolucion-anio')?.value + '°'));
        if (cursosDelAnio.includes(cursoGrafico) && !cursosDelAnio.includes(old))
            sel.value = cursoGrafico;
    }
    else {
        sel.innerHTML = permitidos.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
        sel.value = (permitidos.includes(old) ? old : (permitidos.includes(cursoGrafico) ? cursoGrafico : permitidos[0])) || '';
    }
    renderEvolucionMensual();
};
const et35RenderAdminAnterior = renderAdmin;
renderAdmin = function () { et35RenderAdminAnterior(); renderCuentasAdmin(); };
const et35AsignarCursoAnterior = asignarCurso;
asignarCurso = function () { const curso = document.getElementById('asign-curso')?.value, antes = PRECEPTORES.find(p => p.cursos.includes(curso))?.id; et35AsignarCursoAnterior(); const despues = PRECEPTORES.find(p => p.cursos.includes(curso))?.id; if (antes !== despues)
    registrarAuditoria('Reasignación de curso', `${curso}: ${antes || 'sin asignar'} → ${despues}`); };
const et35GuardarPreceptorAnterior = guardarPreceptor;
guardarPreceptor = function () { const n = PRECEPTORES.length; et35GuardarPreceptorAnterior(); if (PRECEPTORES.length > n)
    registrarAuditoria('Alta de preceptor', PRECEPTORES[PRECEPTORES.length - 1].usuario); };
const et35GuardarAlumnoAnterior = guardarAlumno;
guardarAlumno = function () { const n = ALUMNOS.length; et35GuardarAlumnoAnterior(); if (ALUMNOS.length > n)
    registrarAuditoria('Alta de alumno', `ID ${ALUMNOS[ALUMNOS.length - 1].id} · ${ALUMNOS[ALUMNOS.length - 1].curso}`); };
const et35EditarFaltasAnterior = editarFaltas;
editarFaltas = function (id) { const a = getAlumno(id), before = a?.faltas; et35EditarFaltasAnterior(id); if (a && before !== a.faltas)
    registrarAuditoria('Ajuste de faltas', `Alumno ${id}: ${before} → ${a.faltas}`); };
let et35MesPortal = '';
const et35ConfirmarEnvioAnterior = confirmarEnvioMail;
confirmarEnvioMail = function () {
    const id = pendingMailAlumnoId, a = getAlumno(id), tipo = document.getElementById('modal-mail-tipo')?.value || 'riesgo';
    if (!a || !cursoDeAlumnoAutorizado(id))
        return;
    BORRADORES.unshift({ fecha: new Date().toISOString(), alumnoId: id, usuario: et35UsuarioActivo(), email: a.emailResp, tipo });
    BORRADORES = BORRADORES.slice(0, 200);
    saveDemoData();
    et35ConfirmarEnvioAnterior();
    if (document.getElementById('noti-alumnos'))
        renderNotificaciones();
};
let currentPage = location.pathname.split('/').pop().replace('.html', '') || 'index';
const pageRenders = { renderAlumnos: 'alumnos', renderAsistencia: 'asistencia', renderGrafico: 'grafico', renderAdmin: 'admin', renderRecentList: 'dashboard', recalcStats: 'dashboard', renderJustificaciones: 'justificaciones', renderScannerRecent: 'scanner', renderProgressByYear: 'dashboard', renderDonut: 'dashboard', renderReportes: 'reportes', renderPortalAlumno: 'mi-asistencia', renderCalendarioCursos: 'calendario', renderNotificaciones: 'notificaciones' };
for (const [fn, page] of Object.entries(pageRenders)) {
    const original = globalThis[fn];
    if (typeof original === 'function')
        globalThis[fn] = function (...args) { if (currentPage === page)
            return original(...args); };
}
const HISTORIAL_INICIO = '2026-03-01';
const ECPA_INICIO = '2026-02-16', ECPA_FIN = '2026-02-27';
const FERIADOS_CABA_2026 = new Map([
    ['2026-03-23', 'Día no laborable con fines turísticos'],
    ['2026-03-24', 'Día Nacional de la Memoria por la Verdad y la Justicia'],
    ['2026-04-02', 'Día del Veterano y de los Caídos en Malvinas / Jueves Santo'],
    ['2026-04-03', 'Viernes Santo'],
    ['2026-05-01', 'Día del Trabajador'],
    ['2026-05-25', 'Día de la Revolución de Mayo'],
    ['2026-06-15', 'Paso a la Inmortalidad de Martín Miguel de Güemes'],
    ['2026-07-09', 'Día de la Independencia'],
    ['2026-07-10', 'Día no laborable con fines turísticos'],
    ['2026-08-17', 'Paso a la Inmortalidad de José de San Martín'],
    ['2026-10-12', 'Día del Respeto a la Diversidad Cultural'],
    ['2026-11-09', 'Feriado nacional por la visita del papa León XIV'],
    ['2026-11-10', 'Feriado en CABA por la visita del papa León XIV'],
    ['2026-11-23', 'Día de la Soberanía Nacional'],
    ['2026-12-07', 'Día no laborable con fines turísticos'],
    ['2026-12-08', 'Día de la Inmaculada Concepción de María']
]);
const ASUETOS_ESCOLARES_DEMO_2026 = new Map([
    ['2026-09-11', 'Día del Maestro (asueto escolar configurado)'],
    ['2026-09-21', 'Día del Estudiante (asueto escolar configurado)']
]);
let AUDITORIA = [];
let BORRADORES = [];
let DIAS_SIN_CLASES = {};
const storeKey = 'et35_demo_v2';
const ET35_CURSO_ANTERIOR = { "3°1": "3°1 C", "3°2": "3°2 A", "3°3": "3°3 C", "3°4": "3°4 C", "3°5": "3°5 A", "3°6": "3°6 C", "3°7": "3°7 A", "3°8": "3°8 A", "3°9": "3°9 M", "4°1": "4°1 A", "4°2": "4°2 A", "4°3": "4°3 C", "4°4": "4°4 C", "4°5": "4°5 C", "4°6": "4°6 A", "4°7": "4°7 A", "5°1": "5°1 C", "5°2": "5°2 C", "5°3": "5°3 C", "5°4": "5°4 A", "5°5": "5°5 A", "6°1": "6°1 C", "6°2": "6°2 C", "6°3": "6°3 C", "6°4": "6°4 A", "6°5": "6°5 A" };
let savedState = null;
try {
    savedState = window.ET35_BOOTSTRAP?.state || JSON.parse(localStorage.getItem(storeKey) || 'null');
    et35ActualizarCursosGuardados(savedState);
}
catch (e) { }
if (savedState) {
    if (savedState.DIAS_SIN_CLASES && typeof savedState.DIAS_SIN_CLASES === 'object' && !Array.isArray(savedState.DIAS_SIN_CLASES))
        Object.assign(DIAS_SIN_CLASES, savedState.DIAS_SIN_CLASES);
    for (const [key, arr] of [['ALUMNOS', ALUMNOS], ['ASISTENCIAS', ASISTENCIAS], ['JUSTIFICACIONES', JUSTIFICACIONES], ['PRECEPTORES', PRECEPTORES], ['SCAN_LOG', SCAN_LOG], ['AUDITORIA', AUDITORIA], ['BORRADORES', BORRADORES]]) {
        if (Array.isArray(savedState[key]))
            arr.splice(0, arr.length, ...savedState[key]);
    }
    if ((savedState.datasetVersion || 0) < 14 || CURSOS.some(c => !ALUMNOS.some(a => a.curso === c)))
        crearDatosEjemplo(true);
}
else {
    ASISTENCIAS.length = 0;
    crearDatosEjemplo();
}
ASISTENCIAS = ASISTENCIAS.filter(r => !(r.fecha === todayISO() && (r.demoGenerado === true || (r.simulado === true && r.tipo === 'Ejemplo (simulado)'))));
if (savedState && (savedState.datasetVersion || 0) < 9) {
    const iniciales = [
        ['07:42', '13:00', 'Presente', 'QR'], ['08:10', '13:00', 'Tarde', 'QR'], ['', '', 'Ausente', 'Sistema'],
        ['07:43', '13:00', 'Presente', 'QR'], ['07:48', '10:30', 'Retiro', 'Manual'],
        ['07:51', '13:00', 'Presente', 'QR'], ['', '', 'Justificado', 'Manual'],
        ['08:05', '13:00', 'Tarde', 'QR'], ['07:40', '13:00', 'Presente', 'QR'],
        ['', '', 'Ausente', 'Sistema'], ['07:45', '13:00', 'Presente', 'QR'],
        ['07:52', '13:00', 'Presente', 'QR'], ['', '', 'Ausente', 'Sistema'],
        ['07:50', '13:00', 'Presente', 'QR'], ['08:15', '13:00', 'Tarde', 'QR']
    ];
    ASISTENCIAS = ASISTENCIAS.filter(r => {
        if (r.fecha !== todayISO() || r.id < 1 || r.id > 15 || r.alumnoId !== r.id)
            return true;
        const base = iniciales[r.id - 1];
        return !base || ![r.entrada || '', r.salida || '', r.estado, r.tipo].every((v, i) => v === base[i]);
    });
}
normalizarPreceptores();
const periodoMigracion = bimestreVigente();
ALUMNOS.forEach(a => {
    if (Object.prototype.hasOwnProperty.call(a, 'faltasAjuste')) {
        const valor = Number(a.faltasAjuste) || 0;
        a.ajustesBimestrales = a.ajustesBimestrales || {};
        if (valor && periodoMigracion) {
            a.ajustesBimestrales[periodoMigracion.key] = Number(a.ajustesBimestrales[periodoMigracion.key] || 0) + valor;
            a.ajusteMigradoBimestre = periodoMigracion.key;
        }
        delete a.faltasAjuste;
    }
});
if (savedState && Number(savedState.datasetVersion || 0) < 12) {
    ALUMNOS.forEach(a => {
        const ajustes = a.ajustesBimestrales;
        if (!ajustes || typeof ajustes !== 'object')
            return;
        for (const key of Object.keys(ajustes)) {
            if (!/^\d{4}-B5$/.test(key))
                continue;
            const destino = key.replace(/-B5$/, '-B4');
            const valor = Number(ajustes[key]) || 0;
            if (valor) {
                ajustes[destino] = (Number(ajustes[destino]) || 0) + valor;
                a.avisoMigracionBimestres = 'Se trasladó un ajuste sin fecha exacta del anterior 5.º bimestre al 4.º. Verificar si corresponde.';
            }
            delete ajustes[key];
            if (a.ajusteMigradoBimestre === key)
                a.ajusteMigradoBimestre = destino;
        }
    });
}
construirHistorialDemo();
let et35DiaAutoAnterior = todayISO();
actualizarAsistenciasAutomaticas(new Date(), false);
setInterval(() => actualizarAsistenciasAutomaticas(), 15000);
if (!savedState || (savedState.datasetVersion || 0) < 16 || CURSOS.some(c => !(savedState.ALUMNOS || []).some(a => a.curso === c)))
    saveDemoData();
window.addEventListener('storage', e => { if (e.key !== storeKey || !e.newValue)
    return; try {
    const datos = JSON.parse(e.newValue);
    if (typeof window.et35AplicarEstadoRemoto === 'function')
        window.et35AplicarEstadoRemoto(datos);
    else
        location.reload();
}
catch (err) {
    console.warn('No se pudo actualizar la asistencia del lector local', err);
} });
let et35AlumnoMatriculaActivoId = null;
const et35CacheMatricula = new WeakMap();
const et35RenderAlumnosMatriculaAnterior = renderAlumnos;
renderAlumnos = function () {
    et35RenderAlumnosMatriculaAnterior();
    if (!isJefa())
        return;
    document.querySelectorAll('#alumnos-tbody tr').forEach(tr => {
        const td = tr.querySelector('td');
        if (!td || !/^[0-9]+$/.test(td.textContent.trim()))
            return;
        const id = Number(td.textContent.trim()), a = getAlumno(id), acciones = tr.querySelector('td:last-child .acciones-registro');
        if (!a || !acciones)
            return;
        const activo = et35InscriptosEnFecha(a, todayISO());
        acciones.insertAdjacentHTML('beforeend', `<button type="button" class="btn btn-ghost btn-sm" onclick="abrirGestionMatricula(${id})">🗂️ Matrícula</button>`);
        if (!activo)
            tr.querySelector('td:nth-child(7)')?.insertAdjacentHTML('beforeend', '<div class="et35-mat-baja">Baja registrada</div>');
    });
};
const savedUser = sessionStorage.getItem('et35_user');
if (savedUser) {
    try {
        currentUser = JSON.parse(savedUser);
        if (currentUser.rol === 'preceptor') {
            const p = PRECEPTORES.find(x => x.id === currentUser.id && x.usuario === currentUser.usuario);
            if (!p || p.activo === false)
                throw new Error('Preceptor inexistente o desactivado');
            currentUser = { ...p, rol: 'preceptor' };
        }
        if (currentUser.rol === 'alumno') {
            const a = getAlumno(currentUser.alumnoId);
            if (!a || a.activo === false)
                throw new Error('Alumno inexistente o desactivado');
            currentUser = { rol: 'alumno', alumnoId: a.id, nombre: a.nombre, apellido: a.apellido, cursoAsignado: a.curso };
        }
        if (currentPage === 'index') {
            location.replace(et35RutaPagina(currentUser.rol === 'alumno' ? 'mi-asistencia' : 'dashboard'));
        }
        else {
            document.getElementById('login-screen').style.display = 'none';
            document.getElementById('app').classList.add('visible');
            initApp();
        }
    }
    catch (e) {
        sessionStorage.removeItem('et35_user');
    }
}
else if (currentPage !== 'index') {
    location.replace(et35RutaPagina('index'));
}
window.et35AplicarEstadoRemoto = function (datos) {
    if (!datos || !Array.isArray(datos.ALUMNOS) || !Array.isArray(datos.ASISTENCIAS))
        return;
    const clavesReales = new Set(datos.ASISTENCIAS.map(r => `${r.alumnoId}|${r.fecha}|${et35SesionRegistro(r)}`));
    et35ActualizarCursosGuardados(datos);
    const historicosDemo = ASISTENCIAS.filter(r => r.demoGenerado === true && !clavesReales.has(`${r.alumnoId}|${r.fecha}|${et35SesionRegistro(r)}`));
    ASISTENCIAS = historicosDemo.concat(datos.ASISTENCIAS);
    for (const [nombre, lista] of [['ALUMNOS', ALUMNOS], ['PRECEPTORES', PRECEPTORES], ['JUSTIFICACIONES', JUSTIFICACIONES], ['AUDITORIA', AUDITORIA], ['BORRADORES', BORRADORES]]) {
        if (Array.isArray(datos[nombre]))
            lista.splice(0, lista.length, ...datos[nombre]);
    }
    if (Array.isArray(datos.SCAN_LOG))
        SCAN_LOG = datos.SCAN_LOG.slice();
    if (datos.DIAS_SIN_CLASES && typeof datos.DIAS_SIN_CLASES === 'object') {
        for (const clave of Object.keys(DIAS_SIN_CLASES))
            delete DIAS_SIN_CLASES[clave];
        Object.assign(DIAS_SIN_CLASES, datos.DIAS_SIN_CLASES);
    }
    et35CantidadIndexada = -1;
    recalcularFaltasDesdeRegistros();
    try {
        localStorage.setItem(storeKey, JSON.stringify(datos));
    }
    catch (err) {
        console.warn('Copia local no disponible', err);
    }
    if (currentUser && currentPage !== 'index') {
        if (currentUser.rol === 'preceptor') {
            const nuevo = PRECEPTORES.find(x => x.id === currentUser.id);
            if (nuevo)
                currentUser = { ...nuevo, rol: 'preceptor' };
        }
        renderCurrentPage();
        updateBadges();
    }
};
if (window.ET35Cloud?.getStatus().active) {
    window.ET35Cloud.start();
    const indicador = document.querySelector('.live-badge span');
    if (indicador)
        indicador.textContent = 'Nube conectada';
}
else {
    const indicador = document.querySelector('.live-badge span');
    if (indicador)
        indicador.textContent = 'Modo local · SIN sincronización entre dispositivos';
}
