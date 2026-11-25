function qrCodigo(a) { return `ET35-ALU-${String(a.id).padStart(4, '0')}`; }

function crearDatosEjemplo(soloNuevos = false) {
    const nuevos = new Set();
    const nombres = ["Milagros", "Franco", "Julieta", "Facundo", "Abril", "Thiago", "Morena", "Federico", "Malena", "Joaquín", "Brenda", "Ezequiel", "Delfina", "Ignacio", "Mía", "Bautista", "Agostina", "Lautaro", "Emilia", "Matías", "Catalina", "Juan", "Lucía", "Manuel", "Renata", "Simón", "Alma", "Bruno", "Clara", "Enzo", "Zoe", "Gonzalo", "Paula", "Florencia", "Dante", "Ana", "Ramiro", "Carolina", "Nahir", "Ángel", "Pilar", "Nicolás", "Victoria", "Martín", "Celeste", "Santino", "Sofía", "Valentín", "Tiziano", "Ismael", "Candela", "Lisandro", "Jazmín", "Alan", "Candela", "Agustín", "Danna", "Luciano", "Kiara", "Cristóbal", "Francesca", "Pedro", "Bianca", "Axel", "Maia", "Santiago", "Olivia", "Benicio", "Lola", "Nerea", "Nahuel", "Milena", "Brian", "Josefina", "Ulises", "Amparo", "Lorenzo", "Melina", "Elías", "Sol", "Ámbar", "Camilo", "Tobías", "Rocío", "Marcos", "Malena"];
    const apellidos = ["Suárez", "Flores", "Medina", "Acosta", "Romero", "Navarro", "Giménez", "Molina", "Silva", "Aguirre", "Ortiz", "Domínguez", "Cáceres", "Sosa", "Pereyra", "Ibarra", "Vázquez", "Ponce", "Benítez", "Álvarez", "Ojeda", "Ríos", "Luna", "Morales", "Rojas", "Vera", "Ferreyra", "Miranda", "Núñez", "Arce", "Méndez", "Figueroa", "Paz", "Correa", "Cabrera", "Gómez", "Quiroga", "Silveyra", "Valdez", "Mansilla", "Ledesma", "Godoy"];
    const config = { 1: [10, 30, 40], 2: [9, 30, 43], 3: [9, 30, 43], 4: [6, 35, 45], 5: [5, 37, 45], 6: [5, 37, 45] };
    let siguienteId = Math.max(0, ...ALUMNOS.map(a => a.id)) + 1;
    CURSOS.forEach(curso => {
        const anio = Number(curso.split('°')[0]), division = parseInt(curso.split('°')[1], 10);
        const [cantidad, min, max] = config[anio];
        const objetivo = min + (((division - 1) * 7 + anio * 3) % (max - min + 1));
        let enCurso = ALUMNOS.filter(a => a.curso === curso).length;
        while (enCurso < objetivo) {
            const id = siguienteId++, i = (id * 7 + division * 3) % nombres.length, j = (id * 13 + division * 5) % apellidos.length;
            ALUMNOS.push({ id, nombre: nombres[i], apellido: apellidos[j], dni: String(49000000 + id), curso,
                email: `alumno${id}@example.com`, emailResp: `responsable${id}@example.com`, faltas: 0 });
            enCurso++;
            nuevos.add(id);
        }
    });
}

function normalizarPreceptores() {
    if (savedState && Number(savedState.datasetVersion || 0) < 14) {
        const cuentasPrevias = new Map(PRECEPTORES.map(p => [p.usuario, p]));
        const migrados = PRECEPTORES_INICIALES.map(base => {
            const previa = cuentasPrevias.get(base.usuario);
            return { ...base, ...(previa || {}), cursos: [...base.cursos] };
        });
        for (const previa of PRECEPTORES) {
            if (!migrados.some(p => p.usuario === previa.usuario))
                migrados.push({ ...previa, cursos: [] });
        }
        PRECEPTORES.splice(0, PRECEPTORES.length, ...migrados);
    }
    const existentes = PRECEPTORES.map(p => ({ ...p }));
    const nombres = new Set(existentes.map(p => p.usuario));
    let nextId = Math.max(0, ...existentes.map(p => Number(p.id) || 0)) + 1;
    for (const base of PRECEPTORES_INICIALES) {
        if (!nombres.has(base.usuario)) {
            existentes.push({ ...base, id: nextId++, cursos: [] });
            nombres.add(base.usuario);
        }
    }
    const propietarios = new Set();
    const prev = new Map();
    for (const p of existentes) {
        prev.set(p.usuario, Array.isArray(p.cursos) ? p.cursos : [p.cursoAsignado].filter(Boolean));
        p.cursos = [];
    }
    const asignar = (p, curso) => {
        if (!p || !CURSOS.includes(curso) || propietarios.has(curso) || p.cursos.length >= MAX_CURSOS_POR_PRECEPTOR)
            return false;
        p.cursos.push(curso);
        propietarios.add(curso);
        return true;
    };
    for (const p of existentes) {
        for (const c of prev.get(p.usuario) || [])
            asignar(p, c);
    }
    for (const base of PRECEPTORES_INICIALES) {
        const p = existentes.find(x => x.usuario === base.usuario);
        for (const curso of base.cursos)
            asignar(p, curso);
    }
    for (const curso of CURSOS) {
        if (!propietarios.has(curso)) {
            const disponible = existentes.filter(p => p.cursos.length < MAX_CURSOS_POR_PRECEPTOR).sort((a, b) => a.cursos.length - b.cursos.length)[0];
            if (!asignar(disponible, curso))
                throw new Error('No hay preceptor para ' + curso);
        }
    }
    PRECEPTORES.splice(0, PRECEPTORES.length, ...existentes);
}

function cursosDePreceptor(id) { return getPrec(id)?.cursos || []; }

function getCursosUsuario() {
    if (isJefa())
        return CURSOS;
    if (currentUser?.rol !== 'preceptor')
        return [];
    return cursosDePreceptor(currentUser.id);
}

function cursoDeAlumnoAutorizado(id) {
    const a = getAlumno(id);
    return !!a && isMiCurso(a.curso);
}

function getMiAlumnos() {
    if (isJefa())
        return ALUMNOS;
    return ALUMNOS.filter(a => getCursosUsuario().includes(a.curso));
}

function getMiAsistencias() {
    const ids = new Set(getMiAlumnos().map(a => a.id));
    return ASISTENCIAS.filter(r => ids.has(r.alumnoId));
}
