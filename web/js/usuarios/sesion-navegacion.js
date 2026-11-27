function setTab(t) {
    loginTab = t;
    ['prec', 'jefa', 'alumno'].forEach(role => document.getElementById('tab-' + role)?.classList.toggle('active', role === t));
    document.getElementById('login-user').value = t === 'jefa' ? 'jefa' : t === 'alumno' ? 'alumno10' : 'preceptor01';
    document.getElementById('login-pass').value = t === 'jefa' ? 'admin123' : t === 'alumno' ? 'alumno123' : '123456';
}

async function doLogin() {
    if (window.ET35Cloud?.getStatus().active && !window.ET35Cloud.getStatus().ready)
        await window.ET35Cloud.start();
    const u = document.getElementById('login-user').value.trim();
    const p = document.getElementById('login-pass').value.trim();
    if (!u || !p) {
        toast('Completá usuario y contraseña', 'error');
        return;
    }
    const alMatch = /^alumno(\d+)$/.exec(u);
    if (loginTab === 'alumno' && alMatch) {
        const al = getAlumno(Number(alMatch[1]));
        if (al && p !== (al.pass || 'alumno123')) {
            toast('Credenciales incorrectas', 'error');
            return;
        }
        if (!al || al.activo === false) {
            toast('Alumno inexistente o cuenta desactivada', 'error');
            return;
        }
        currentUser = { rol: 'alumno', alumnoId: al.id, nombre: al.nombre, apellido: al.apellido, cursoAsignado: al.curso };
    }
    else if (loginTab === 'jefa' && u === JEFA.usuario && p === JEFA.pass) {
        currentUser = { ...JEFA };
    }
    else if (loginTab === 'prec') {
        const prec = PRECEPTORES.find(x => x.usuario === u && x.pass === p);
        if (!prec || prec.activo === false) {
            toast('Credenciales incorrectas o cuenta desactivada', 'error');
            return;
        }
        currentUser = { ...prec, rol: 'preceptor' };
    }
    else {
        toast('Credenciales incorrectas para ese perfil', 'error');
        return;
    }
    sessionStorage.setItem('et35_user', JSON.stringify(currentUser));
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').classList.add('visible');
    location.href = et35RutaPagina(currentUser.rol === 'alumno' ? 'mi-asistencia' : 'dashboard');
}

function doLogout() {
    sessionStorage.removeItem('et35_user');
    currentUser = null;
    document.getElementById('app').classList.remove('visible');
    document.getElementById('login-screen').style.display = 'flex';
    location.href = et35RutaPagina('index');
}

function updateClock() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('live-clock').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    document.getElementById('live-date').textContent = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
}

function buildNav() {
    const nav = document.getElementById('sidebar-nav');
    const items = currentUser?.rol === 'alumno' ? [{ section: 'Mi espacio', links: [
                { id: 'mi-asistencia', icon: '📋', label: 'Mi asistencia' },
                { id: 'mi-qr', icon: '🔳', label: 'Mi código QR' },
                { id: 'presentar-justificativos', icon: '📎', label: 'Presentar justificativos' },
                { id: 'mi-calendario', icon: '🗓️', label: 'Mi calendario' },
                { id: 'horarios', icon: '🕒', label: 'Mis horarios' },
            ] }] : isJefa() ? [
        { section: 'Principal', links: [
                { id: 'dashboard', icon: '📊', label: 'Panel de Control' },
            ] },
        { section: 'Gestión', links: [
                { id: 'asistencia', icon: '📋', label: 'Registro Asistencia' },
                { id: 'justificaciones', icon: '📄', label: 'Justificaciones', badge2: true },
                { id: 'alumnos', icon: '👥', label: 'Alumnos' },
                { id: 'horarios', icon: '🕒', label: 'Horarios y turnos' },
            ] },
        { section: 'Análisis', links: [
                { id: 'grafico', icon: '📊', label: 'Gráfico por Curso' },
                { id: 'reportes', icon: '📈', label: 'Reportes' },
                { id: 'calendario', icon: '🗓️', label: 'Calendario' },
                { id: 'notificaciones', icon: '🔔', label: 'Notificaciones' },
            ] },
        { section: 'Administración', links: [
                { id: 'admin', icon: '⭐', label: 'Panel Admin' },
                { id: 'configuracion', icon: '⚙️', label: 'Configuración' },
            ] },
    ] : [
        { section: 'Principal', links: [
                { id: 'dashboard', icon: '📊', label: 'Panel de Control' },
            ] },
        { section: 'Mis cursos', links: [
                { id: 'asistencia', icon: '📋', label: 'Registro Asistencia' },
                { id: 'justificaciones', icon: '📄', label: 'Justificaciones', badge2: true },
                { id: 'alumnos', icon: '👥', label: 'Mis alumnos' },
                { id: 'horarios', icon: '🕒', label: 'Horarios y turnos' },
            ] },
        { section: 'Reportes', links: [
                { id: 'grafico', icon: '📊', label: 'Gráfico por Curso' },
                { id: 'reportes', icon: '📈', label: 'Reportes' },
                { id: 'calendario', icon: '🗓️', label: 'Calendario' },
                { id: 'notificaciones', icon: '🔔', label: 'Notificaciones' },
                { id: 'configuracion', icon: '⚙️', label: 'Configuración' },
            ] },
    ];
    nav.innerHTML = items.map(s => `
    <div class="nav-section">
      <div class="nav-label">${s.section}</div>
      ${s.links.map(l => `
        <a class="nav-item" id="nav-${l.id}" href="${et35RutaPagina(l.id)}">
          <span class="icon">${l.icon}</span>${l.label}
          ${l.badge ? `<span class="nav-badge" id="pending-badge">0</span>` : ''}
          ${l.badge2 ? `<span class="nav-badge" id="pending-just-badge">0</span>` : ''}
        </a>`).join('')}
    </div>`).join('');
    updateBadges();
}

function updateBadges() {
    const b = document.getElementById('pending-badge');
    const b2 = document.getElementById('pending-just-badge');
    if (b)
        b.textContent = SCAN_LOG.filter(s => s.tipo === 'Entrada').length;
    if (b2)
        b2.textContent = justificacionesAutorizadas().filter(j => j.estado === 'En revisión').length;
}

function navigateTo(page) {
    if (typeof et35NavegarRapido === 'function')
        void et35NavegarRapido(et35RutaPagina(page));
    else
        window.location.href = et35RutaPagina(page);
}

async function et35NavegarRapido(destino, { guardarHistorial = true } = {}) {
    let url;
    try {
        url = new URL(destino, document.baseURI);
    }
    catch {
        return false;
    }
    if (url.origin !== location.origin || !/^[a-z-]+\.html$/.test(url.pathname.split('/').pop()))
        return false;
    const pagina = url.pathname.split('/').pop().replace(/\.html$/, '');
    if (!currentUser || pagina === 'index' || pagina === 'conexion')
        return false;
    const exclusivasAlumno = new Set(['mi-asistencia', 'mi-qr', 'mi-calendario', 'presentar-justificativos']);
    if (currentUser.rol === 'alumno' && !(exclusivasAlumno.has(pagina) || pagina === 'horarios'))
        return false;
    if (currentUser.rol !== 'alumno' && exclusivasAlumno.has(pagina))
        return false;
    if (pagina === 'admin' && !isJefa())
        return false;
    if (url.href === location.href)
        return true;
    const secuencia = ++et35NavegacionSecuencia;
    const contenedor = document.getElementById('main-content');
    if (!contenedor)
        return false;
    contenedor.setAttribute('aria-busy', 'true');
    try {
        const resp = await fetch(url.href, { cache: 'default' });
        if (!resp.ok)
            throw new Error('Página no disponible: ' + resp.status);
        const doc = new DOMParser().parseFromString(await resp.text(), 'text/html');
        const contenido = doc.getElementById('main-content');
        if (!contenido || !contenido.querySelector('#page-' + pagina))
            throw new Error('No se encontró la pantalla ' + pagina);
        if (secuencia !== et35NavegacionSecuencia)
            return false;
        for (const modal of doc.querySelectorAll('.modal-overlay[id]')) {
            if (modal.closest('#main-content') || document.getElementById(modal.id))
                continue;
            const copy = document.importNode(modal, true);
            document.getElementById('toast-container')?.before(copy);
        }
        contenedor.replaceChildren(...Array.from(contenido.childNodes).map(n => document.importNode(n, true)));
        currentPage = pagina;
        if (guardarHistorial)
            history.pushState({ et35: true }, '', url.pathname + url.search + url.hash);
        if (doc.title)
            document.title = doc.title;
        document.querySelectorAll('.nav-item.active').forEach(el => el.classList.remove('active'));
        if (pagina === 'dashboard')
            et35VistaDashboard = 'diaria';
        fillCursoSelects();
        fillSelectAlumnos();
        if (pagina === 'asistencia') {
            const params = url.searchParams;
            const fecha = document.getElementById('filter-fecha-asistencia');
            const curso = document.getElementById('filter-curso-asistencia');
            if (fecha && /^\d{4}-\d{2}-\d{2}$/.test(params.get('fecha') || ''))
                fecha.value = params.get('fecha');
            if (curso && getCursosUsuario().includes(params.get('curso')))
                curso.value = params.get('curso');
        }
        renderCurrentPage();
        et35PrepararCamposFecha();
        closeSidebar();
        window.scrollTo(0, 0);
        return true;
    }
    catch (err) {
        console.warn('Navegación rápida no disponible; se abrirá la página normalmente:', err);
        location.assign(url.href);
        return false;
    }
    finally {
        if (secuencia === et35NavegacionSecuencia)
            contenedor.removeAttribute('aria-busy');
    }
}

function renderCurrentPage() {
    document.querySelectorAll('.et35-filtro-anio').forEach(el => el.style.display = isJefa() ? 'flex' : 'none');
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    const pageElement = document.getElementById('page-' + page);
    if (pageElement)
        pageElement.classList.add('active');
    const el = document.getElementById('nav-' + page);
    if (el)
        el.classList.add('active');
    const titles = { dashboard: 'Panel de Control', scanner: 'Escáner QR', asistencia: 'Registro de Asistencia', justificaciones: 'Gestión de Justificaciones', alumnos: 'Alumnos', grafico: 'Gráfico por Curso', reportes: 'Reportes', admin: 'Panel de Administración', configuracion: 'Configuración', 'mi-asistencia': 'Mi asistencia', 'mi-qr': 'Mi código QR', 'presentar-justificativos': 'Presentar justificativos', 'mi-calendario': 'Mi calendario', calendario: 'Calendario de Asistencia', notificaciones: 'Notificaciones', horarios: 'Horarios y turnos' };
    document.getElementById('topbar-title').textContent = titles[page] || 'Panel de Control';
    if (page === 'mi-asistencia')
        renderPortalAlumno();
    if (page === 'mi-qr')
        renderPortalQR();
    if (page === 'presentar-justificativos')
        renderPortalJustificaciones();
    if (page === 'mi-calendario')
        renderPortalCalendario();
    if (page === 'horarios')
        renderHorarios();
    if (page === 'dashboard')
        renderDashboardFecha();
    if (page === 'scanner') {
        document.getElementById('scanner-curso-label').textContent = isJefa() ? 'Todos los cursos' : getCursosUsuario().join(' · ');
        renderScannerRecent();
    }
    const renders = { asistencia: renderAsistencia, alumnos: renderAlumnos, justificaciones: renderJustificaciones, grafico: renderGrafico, reportes: renderReportes, admin: renderAdmin, calendario: renderCalendarioCursos, notificaciones: renderNotificaciones };
    if (renders[page])
        renders[page]();
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebar-overlay').classList.toggle('open');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-overlay').classList.remove('open');
}

function initApp() {
    document.getElementById('sidebar-avatar').textContent = `${currentUser.nombre[0]}${currentUser.apellido[0]}`;
    document.getElementById('sidebar-username').textContent = `${currentUser.nombre} ${currentUser.apellido}`;
    document.getElementById('sidebar-role').textContent = currentUser.rol === 'alumno' ? `Estudiante — ${currentUser.cursoAsignado} · ${et35InfoCurso(currentUser.cursoAsignado)?.turno || ''} · ${et35InfoCurso(currentUser.cursoAsignado)?.especialidad || ''}` : isJefa() ? 'Jefa de Preceptores' : `Preceptor/a — ${getCursosUsuario().join(' / ') || 'Sin cursos'}`;
    const paginasDelAlumno = new Set(['mi-asistencia', 'mi-qr', 'presentar-justificativos', 'mi-calendario', 'horarios']);
    if (currentUser.rol === 'alumno' && !paginasDelAlumno.has(currentPage)) {
        location.replace(et35RutaPagina('mi-asistencia'));
        return;
    }
    if (!isJefa() && currentPage === 'admin') {
        location.replace(et35RutaPagina('dashboard'));
        return;
    }
    const paginasExclusivasDelAlumno = new Set(['mi-asistencia', 'mi-qr', 'presentar-justificativos', 'mi-calendario']);
    if (currentUser.rol !== 'alumno' && paginasExclusivasDelAlumno.has(currentPage)) {
        location.replace(et35RutaPagina('dashboard'));
        return;
    }
    buildNav();
    fillCursoSelects();
    fillSelectAlumnos();
    document.querySelectorAll('.et35-filtro-anio').forEach(el => el.style.display = isJefa() ? 'flex' : 'none');
    const fechaInput = document.getElementById('filter-fecha-asistencia');
    if (fechaInput) {
        const params = new URLSearchParams(location.search), fecha = params.get('fecha'), curso = params.get('curso');
        if (fecha && /^\d{4}-\d{2}-\d{2}$/.test(fecha))
            fechaInput.value = fecha;
        else if (!fechaInput.value)
            fechaInput.value = todayISO();
        const fc = document.getElementById('filter-curso-asistencia');
        if (fc && getCursosUsuario().includes(curso))
            fc.value = curso;
    }
    renderCurrentPage();
    et35PrepararCamposFecha();
}
