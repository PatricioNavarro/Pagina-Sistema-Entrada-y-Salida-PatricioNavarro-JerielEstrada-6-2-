function actualizarOpcionesCursos(el, cursos, permiteTodos = false, etiquetaTodos = 'Todos mis cursos') {
    if (!el)
        return;
    const anterior = el.dataset.et35CursosCargados === '1' ? el.value : null;
    el.innerHTML = cursos.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('') +
        (permiteTodos ? `<option value="">${esc(etiquetaTodos)}</option>` : '');
    el.value = anterior !== null && (cursos.includes(anterior) || (permiteTodos && anterior === ''))
        ? anterior : (cursos[0] || '');
    el.dataset.et35CursosCargados = '1';
}

function et35FiltroAnioCurso(anioId, cursoId, { permitirTodos = true, etiquetaTodos = 'Todos los cursos', vacioInicial = false } = {}) {
    const anioEl = document.getElementById(anioId), cursoEl = document.getElementById(cursoId);
    if (!anioEl || !cursoEl || !isJefa())
        return;
    anioEl.closest('.et35-filtro-anio')?.style.setProperty('display', 'flex');
    const disponibles = getCursosUsuario();
    const anios = [6, 5, 4, 3, 2, 1].filter(n => disponibles.some(c => c.startsWith(n + '°'))).map(String);
    const clave = anioId + '|' + cursoId;
    const cache = et35SeleccionAnioMemoria[clave];
    if (anioEl.dataset.et35Iniciado !== '1') {
        anioEl.innerHTML = anios.map(n => `<option value="${n}">${n}° año</option>`).join('') + '<option value="">Todos los años</option>';
        anioEl.dataset.et35Iniciado = '1';
        anioEl.value = cache && (anios.includes(cache.anio) || cache.anio === '') ? cache.anio : (anios[0] || '');
    }
    const anio = anioEl.value;
    const cambiaAnio = cursoEl.dataset.et35AnioAnterior !== anio;
    const lista = disponibles.filter(c => !anio || c.startsWith(anio + '°'));
    const firmas = lista.join('|') + '|' + permitirTodos + '|' + vacioInicial + '|' + etiquetaTodos;
    const necesitaOpciones = cursoEl.dataset.et35FirmaCursos !== firmas;
    const prevValor = cursoEl.value;
    if (necesitaOpciones) {
        cursoEl.innerHTML = (vacioInicial ? '<option value="">Seleccioná una división...</option>' : '') +
            lista.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('') +
            (permitirTodos && !vacioInicial ? `<option value="">${esc(etiquetaTodos)}</option>` : '');
        cursoEl.dataset.et35FirmaCursos = firmas;
    }
    const anterior = !cambiaAnio ? prevValor : (!cursoEl.dataset.et35AnioAnterior && cache?.anio === anio ? cache.curso : null);
    if (anterior !== null && anterior !== undefined && (lista.includes(anterior) || (anterior === '' && (permitirTodos || vacioInicial))))
        cursoEl.value = anterior;
    else
        cursoEl.value = vacioInicial ? '' : (lista[0] || '');
    cursoEl.dataset.et35AnioAnterior = anio;
    et35SeleccionAnioMemoria[clave] = { anio, curso: cursoEl.value };
}

function et35CambiarAnio(anioId, cursoId, renderNombre) {
    const anio = document.getElementById(anioId), curso = document.getElementById(cursoId);
    if (anio)
        et35SeleccionAnioMemoria[anioId + '|' + cursoId] = { anio: anio.value, curso: null };
    if (curso)
        curso.dataset.et35AnioAnterior = 'CAMBIO';
    if (typeof window[renderNombre] === 'function')
        window[renderNombre]();
}

function et35RellenarAnioDetalle(id) {
    const el = document.getElementById(id);
    if (!el || !isJefa())
        return '';
    el.closest('.et35-filtro-anio')?.style.setProperty('display', 'flex');
    if (el.dataset.et35Iniciado !== '1') {
        el.innerHTML = [6, 5, 4, 3, 2, 1].map(n => `<option value="${n}">${n}° año</option>`).join('') + '<option value="">Todos los años</option>';
        el.dataset.et35Iniciado = '1';
        el.value = et35SeleccionAnioMemoria[id]?.anio ?? '6';
    }
    et35SeleccionAnioMemoria[id] = { anio: el.value };
    return el.value;
}

function et35PuntajeBusquedaAlumno(a, termino) {
    if (!termino)
        return 0;
    const q = termino.trim().toLocaleLowerCase('es');
    const apellido = String(a.apellido || '').toLocaleLowerCase('es');
    const nombre = String(a.nombre || '').toLocaleLowerCase('es');
    const dni = String(a.dni || '');
    const id = String(a.id);
    if (apellido.startsWith(q))
        return 0;
    if (apellido.includes(q))
        return 1;
    if (dni.startsWith(q) || id === q)
        return 2;
    if (dni.includes(q) || id.includes(q))
        return 3;
    if (nombre.startsWith(q))
        return 4;
    if (nombre.includes(q))
        return 5;
    return Infinity;
}

function fillCursoSelects() {
    const selects = ['filter-curso-asistencia', 'filter-curso-alumnos', 'al-curso', 'asign-curso', 'rep-curso', 'prec-curso-asign'];
    const conTodos = new Set(['filter-curso-asistencia', 'filter-curso-alumnos', 'rep-curso']);
    const globales = new Set(['al-curso', 'asign-curso', 'prec-curso-asign']);
    selects.forEach(id => actualizarOpcionesCursos(document.getElementById(id), globales.has(id) ? CURSOS : getCursosUsuario(), conTodos.has(id), id === 'filter-curso-alumnos' ? 'Todos los cursos' : 'Todos mis cursos'));
}

function fillSelectAlumnos() {
    const bases = ['just-alumno', 'mail-alumno-sel'];
    bases.forEach(sid => {
        const el = document.getElementById(sid);
        if (!el)
            return;
        el.innerHTML = '<option value="">— Seleccionar —</option>' +
            getMiAlumnos().map(a => `<option value="${a.id}">${a.apellido}, ${a.nombre} (${a.curso})</option>`).join('');
    });
}
