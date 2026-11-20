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
function todayISO(date = new Date()) {
    const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return d.toISOString().slice(0, 10);
}
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
function esc(valor) { return String(valor ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function et35SesionRegistro(r) { return r?.sesion || 'principal'; }
function et35SesionesDia(curso, fecha) {
    return window.ET35Horarios?.sesionesFecha(curso, fecha) || [{ id: 'principal', nombre: 'Jornada principal' }];
}
function et35SesionDisponible(curso, fecha, sesion) {
    const dia = et35TipoDia(fecha, curso)?.tipo;
    if (dia !== 'clase' && dia !== 'ecpa')
        return false;
    if (dia === 'ecpa' && sesion !== 'principal')
        return false;
    return et35SesionesDia(curso, fecha).some(s => s.id === sesion);
}
function et35NombreSesion(r) {
    return ({ principal: 'Jornada principal', contraturno: 'Contraturno', educacion_fisica: 'Educación Física' })[et35SesionRegistro(r)] || 'Jornada principal';
}
function et35ValorJornada(curso, fecha, sesion = 'principal') {
    const sesiones = et35SesionesDia(curso, fecha);
    if (sesion !== 'principal' && !sesiones.some(s => s.id === sesion))
        return 0;
    return sesion === 'principal' ? (sesiones.length > 1 ? 0.5 : 1) : 0.5;
}
function valorFaltaRegistro(registro) {
    if (!registro || !['Ausente', 'Tarde'].includes(registro.estado))
        return 0;
    const alumno = getAlumno(registro.alumnoId);
    const valor = et35ValorJornada(alumno?.curso, registro.fecha, et35SesionRegistro(registro));
    return registro.estado === 'Ausente' ? valor : valor / 2;
}
function bimestresEscolares(anio = Number(todayISO().slice(0, 4))) {
    const y = Number(anio);
    if (!Number.isInteger(y) || y < 2000 || y > 2100)
        return [];
    const partes = [
        ['03-02', '05-08', 'Marzo, abril y primera semana de mayo'],
        ['05-11', '07-17', 'Resto de mayo, junio y julio hasta vacaciones'],
        ['08-03', '09-30', 'Regreso de vacaciones de invierno a fin de septiembre'],
        ['10-01', '11-27', 'Primera semana de octubre al 27 de noviembre']
    ];
    return partes.map(([inicio, fin, descripcion], i) => ({
        key: `${y}-B${i + 1}`, numero: i + 1, nombre: `${i + 1}.º bimestre`, descripcion,
        inicio: `${y}-${inicio}`, fin: `${y}-${fin}`
    }));
}
function bimestreDeFecha(fecha) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || ''))
        return null;
    return bimestresEscolares(Number(fecha.slice(0, 4))).find(b => fecha >= b.inicio && fecha <= b.fin) || null;
}
function bimestreVigente(fecha = todayISO()) { return bimestreDeFecha(fecha); }
function faltasPorBimestre(alumnoId, bimestre, fechaHasta = todayISO()) {
    if (!bimestre)
        return 0;
    const base = ASISTENCIAS.reduce((n, r) => n + (r.alumnoId === Number(alumnoId) && r.fecha >= bimestre.inicio && r.fecha <= bimestre.fin && r.fecha <= fechaHasta ? valorFaltaRegistro(r) : 0), 0);
    const a = ALUMNOS.find(x => x.id === Number(alumnoId));
    const ajuste = Number(a?.ajustesBimestrales?.[bimestre.key] || 0);
    return Math.max(0, Math.round((base + ajuste) * 4) / 4);
}
function faltasTotalesAnio(alumnoId, anio) {
    return bimestresEscolares(anio).reduce((n, b) => n + faltasPorBimestre(alumnoId, b), 0);
}
function periodoTexto(b) { return b ? `${b.nombre} (${b.descripcion})` : 'Fuera de los cuatro bimestres configurados'; }
function resumenBimestresAlumno(a, anio) {
    return bimestresEscolares(anio).map(b => {
        const registros = ASISTENCIAS.filter(r => r.alumnoId === a.id && r.fecha >= b.inicio && r.fecha <= b.fin && r.fecha <= todayISO());
        return { ...b, registros, ausencias: registros.filter(r => r.estado === 'Ausente').length,
            tardanzas: registros.filter(r => r.estado === 'Tarde').length,
            justificadas: registros.filter(r => r.estado === 'Justificado').length,
            ajuste: Number(a.ajustesBimestrales?.[b.key] || 0),
            faltas: faltasPorBimestre(a.id, b) };
    });
}
function formatoFaltas(n) {
    return Number(n || 0).toLocaleString('es-AR', { maximumFractionDigits: 1 });
}
function faltasColor(f) {
    if (f === 0)
        return 'var(--green)';
    if (f <= 1)
        return '#f5c518';
    if (f <= 2)
        return '#f5a818';
    if (f <= 3)
        return '#f07a10';
    if (f <= 4)
        return '#e04010';
    return 'var(--red)';
}
function faltasEstado(f) {
    if (f === 0)
        return '<span class="badge present">Sin faltas</span>';
    if (f <= 2)
        return '<span class="badge late">Atención</span>';
    if (f < 4)
        return '<span class="badge" style="background:#fff3e0;color:#c97a10">⚠ Precaución</span>';
    if (f < 5)
        return '<span class="badge absent">⚠ Límite</span>';
    return '<span class="badge absent" style="background:#8b0000;color:#fff">🚨 Libre</span>';
}
function faltasDots(f) {
    const total = Math.max(0, Number(f) || 0);
    let dots = '';
    for (let i = 1; i <= 5; i++) {
        const completo = total >= i;
        const fraccion = Math.max(0, Math.min(1, total - (i - 1)));
        const parcial = fraccion > 0 && !completo;
        const cls = completo ? `used f${i}` : '';
        const estilo = parcial ? ` style="background:linear-gradient(90deg,var(--orange) ${Math.round(fraccion * 100)}%,var(--gray-border) ${Math.round(fraccion * 100)}%)"` : '';
        dots += `<div class="faltas-dot ${cls}"${estilo} title="Falta ${i}"></div>`;
    }
    return `<div class="faltas-bar"><div class="faltas-dots">${dots}</div><span class="faltas-count" style="color:${faltasColor(total)}">${formatoFaltas(total)}/5</span></div>`;
}
function badgeClass(e) {
    const m = { Presente: 'present', Tarde: 'late', Ausente: 'absent', Retiro: 'early', Justificado: 'justified', 'En revisión': 'review', Denegado: 'denied' };
    return m[e] || 'present';
}
function badgeJust(e) {
    const m = { Justificado: 'justified', 'En revisión': 'review', Denegado: 'denied', Aprobada: 'present', Pendiente: 'late' };
    return m[e] || 'late';
}
function tiposJust(t) {
    const m = { medica: 'Cert. médico', familiar: 'Razón familiar', deportiva: 'Deportiva', otra: 'Otra' };
    return m[t] || t;
}
function evaluarEstado(hora, curso = '') {
    return window.ET35Horarios?.estadoEntrada(curso, hora).estado || 'Sin registrar';
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
function recalcStats() {
    if (document.getElementById('dashboard-fecha')) {
        renderDashboardFecha();
    }
}
let loginTab = 'prec';
function setTab(t) {
    loginTab = t;
    ['prec', 'jefa', 'alumno'].forEach(role => document.getElementById('tab-' + role)?.classList.toggle('active', role === t));
    document.getElementById('login-user').value = t === 'jefa' ? 'jefa' : t === 'alumno' ? 'alumno10' : 'preceptor01';
    document.getElementById('login-pass').value = t === 'jefa' ? 'admin123' : t === 'alumno' ? 'alumno123' : '123456';
}
function doLogin() {
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
    location.href = currentUser.rol === 'alumno' ? 'mi-asistencia.html' : 'dashboard.html';
}
function doLogout() {
    sessionStorage.removeItem('et35_user');
    currentUser = null;
    document.getElementById('app').classList.remove('visible');
    document.getElementById('login-screen').style.display = 'flex';
    location.href = 'index.html';
}
document.getElementById('login-pass').addEventListener('keydown', e => { if (e.key === 'Enter')
    doLogin(); });
document.getElementById('login-user').addEventListener('keydown', e => { if (e.key === 'Enter')
    doLogin(); });
function updateClock() {
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('live-clock').textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    document.getElementById('live-date').textContent = `${days[now.getDay()]}, ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;
}
setInterval(updateClock, 1000);
updateClock();
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
        <a class="nav-item" id="nav-${l.id}" href="${l.id}.html">
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
        void et35NavegarRapido(page + '.html');
    else
        window.location.href = page + '.html';
}
let et35NavegacionSecuencia = 0;
async function et35NavegarRapido(destino, { guardarHistorial = true } = {}) {
    let url;
    try {
        url = new URL(destino, location.href);
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
function toast(msg, type = 'info') {
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    const icono = document.createElement('span'), mensaje = document.createElement('span');
    icono.textContent = icons[type] || '•';
    mensaje.textContent = String(msg);
    t.append(icono, mensaje);
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => { t.style.animation = 'slideOut .3s ease forwards'; setTimeout(() => t.remove(), 300); }, 3500);
}
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
function renderRecentList() {
    const el = document.getElementById('recent-list');
    const recent = getMiAsistencias().filter(r => r.fecha === todayISO()).slice(-6).reverse();
    if (!recent.length) {
        el.innerHTML = '<p>Sin registros hoy.</p>';
        return;
    }
    el.innerHTML = recent.map(r => {
        const a = getAlumno(r.alumnoId);
        if (!a)
            return '';
        return `<div class="recent-entry"><div class="entry-avatar">${a.nombre[0]}${a.apellido[0]}</div><div><div class="entry-name">${esc(a.apellido)}, ${esc(a.nombre)}</div><div class="entry-sub">${esc(a.curso)} · <span class="badge ${badgeClass(r.estado)}">${r.estado}</span></div></div><div class="entry-time">${r.entrada || '--:--'}</div></div>`;
    }).join('');
}
function renderProgressByYear() {
    const el = document.getElementById('progress-by-year');
    if (!el)
        return;
    const misAlumnos = getMiAlumnos(), cursos = CURSOS.filter(c => misAlumnos.some(a => a.curso === c));
    const hoy = todayISO(), hoyPorAlumno = new Map(getMiAsistencias().filter(r => r.fecha === hoy).map(r => [r.alumnoId, r]));
    el.innerHTML = cursos.map(c => {
        const alumnos = misAlumnos.filter(a => a.curso === c);
        const presentes = alumnos.filter(a => ['Presente', 'Tarde', 'Retiro'].includes(hoyPorAlumno.get(a.id)?.estado)).length;
        const pct = alumnos.length ? Math.round(presentes / alumnos.length * 100) : 0;
        return `<div class="progress-row" title="${presentes} de ${alumnos.length} alumnos presentes en ${c}">
      <div class="progress-label">${c}</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:var(--green)"></div></div>
      <div class="progress-pct">${pct}%</div>
      <span class="progress-count">${presentes}/${alumnos.length}</span>
    </div>`;
    }).join('') || '<p>Sin cursos asignados.</p>';
}
function renderDonut() {
    const asis = getMiAsistencias().filter(r => r.fecha === todayISO());
    const p = asis.filter(r => r.estado === 'Presente').length;
    const au = asis.filter(r => r.estado === 'Ausente').length;
    const t = asis.filter(r => r.estado === 'Tarde').length;
    const j = asis.filter(r => r.estado === 'Justificado').length;
    const total = asis.length || 1;
    const circ = 2 * Math.PI * 45;
    let offset = 0;
    function seg(val, color) {
        const dash = (val / total) * circ;
        const el = `<circle cx="60" cy="60" r="45" fill="none" stroke="${color}" stroke-width="14"
      stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${-offset}" stroke-linecap="round"/>`;
        offset += dash;
        return el;
    }
    const pct = Math.round(p / total * 100);
    document.getElementById('donut-container').innerHTML = `
    <div class="donut-wrap">
      <div class="donut">
        <svg viewBox="0 0 120 120" width="110" height="110">
          <circle cx="60" cy="60" r="45" fill="none" stroke="#dde3ef" stroke-width="14"/>
          ${seg(p, 'var(--green)')}${seg(au, 'var(--red)')}${seg(t, 'var(--orange)')}${seg(j, 'var(--purple)')}
        </svg>
        <div class="donut-center"><div class="donut-pct">${pct}%</div><div class="donut-sub">presencia</div></div>
      </div>
      <div class="donut-legend">
        <div class="dl-item"><div class="dl-dot" style="background:var(--green)"></div>Presentes (${p})</div>
        <div class="dl-item"><div class="dl-dot" style="background:var(--red)"></div>Ausentes (${au})</div>
        <div class="dl-item"><div class="dl-dot" style="background:var(--orange)"></div>Tarde (${t})</div>
        <div class="dl-item"><div class="dl-dot" style="background:var(--purple)"></div>Justificados (${j})</div>
      </div>
    </div>`;
}
let alumnoHistorialAusenciasId = null;
const diasSemanaAusencias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
function fechaLegibleAusencias(iso) {
    const [anio, mes, dia] = iso.split('-').map(Number);
    const fecha = new Date(Date.UTC(anio, mes - 1, dia));
    return `${diasSemanaAusencias[fecha.getUTCDay()]} ${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${anio}`;
}
function abrirHistorialAusencias(alumnoId) {
    const a = getAlumno(Number(alumnoId));
    if (!a || !['preceptor', 'jefa'].includes(currentUser?.rol) || !cursoDeAlumnoAutorizado(a.id)) {
        toast('No tenés permiso para consultar las ausencias de ese alumno', 'error');
        return;
    }
    alumnoHistorialAusenciasId = a.id;
    document.getElementById('ausencias-alumno-nombre').textContent = `${a.apellido}, ${a.nombre} · ${a.curso} · ID ${a.id}`;
    const filtro = document.getElementById('ausencias-alumno-filtro');
    if (filtro)
        filtro.value = 'todas';
    const selector = document.getElementById('ausencias-alumno-bimestre');
    if (selector) {
        const anios = [...new Set([Number(todayISO().slice(0, 4)), ...ASISTENCIAS.filter(r => r.alumnoId === a.id).map(r => Number(r.fecha.slice(0, 4)))])].sort((a, b) => b - a);
        selector.innerHTML = '<option value="">Todos los bimestres</option>' + anios.flatMap(y => bimestresEscolares(y)).map(b => `<option value="${b.key}">${b.nombre} · ${b.descripcion} ${b.key.slice(0, 4)}</option>`).join('');
        selector.value = '';
    }
    renderHistorialAusencias();
    openModal('modal-ausencias-alumno');
}
function renderHistorialAusencias() {
    const a = getAlumno(alumnoHistorialAusenciasId);
    if (!a || !['preceptor', 'jefa'].includes(currentUser?.rol) || !cursoDeAlumnoAutorizado(a.id))
        return;
    const registros = ASISTENCIAS.filter(r => r.alumnoId === a.id && ['Ausente', 'Justificado', 'Tarde'].includes(r.estado))
        .sort((x, y) => y.fecha.localeCompare(x.fecha));
    const faltas = registros.filter(r => r.estado === 'Ausente').length;
    const justificadas = registros.filter(r => r.estado === 'Justificado').length;
    const tardanzas = registros.filter(r => r.estado === 'Tarde').length;
    const b = bimestreVigente();
    document.getElementById('ausencias-alumno-resumen').textContent = `${formatoFaltas(a.faltas)}/5 faltas en el ${periodoTexto(b)} · Histórico: ${faltas} ausencias sin justificar, ${tardanzas} tardanzas, ${justificadas} justificadas`;
    const filtro = document.getElementById('ausencias-alumno-filtro')?.value || 'todas';
    const filtroBim = document.getElementById('ausencias-alumno-bimestre')?.value || '';
    const visibles = registros.filter(r => (!filtroBim || bimestreDeFecha(r.fecha)?.key === filtroBim) && (filtro === 'todas' || (filtro === 'ausentes' && r.estado === 'Ausente') || (filtro === 'justificadas' && r.estado === 'Justificado') || (filtro === 'tardes' && r.estado === 'Tarde')));
    document.getElementById('ausencias-alumno-tbody').innerHTML = visibles.map(r => {
        const j = JUSTIFICACIONES.find(j => j.alumnoId === a.id && j.fecha === r.fecha && et35SesionRegistro(j) === et35SesionRegistro(r));
        const detalle = j ? `<span class="badge ${badgeJust(j.estado)}">${esc(j.estado)}</span>` : (r.estado === 'Justificado' ? 'Justificada en registro' : r.estado === 'Tarde' ? 'Llegada tarde' : 'Sin justificación aprobada');
        return `<tr><td class="mono">${fechaLegibleAusencias(r.fecha)}<small style="display:block;color:#64748b">${esc(et35NombreSesion(r))}</small></td><td>${esc(bimestreDeFecha(r.fecha)?.nombre || 'Fuera de bimestre')}</td><td><span class="badge ${badgeClass(r.estado)}">${r.estado}</span></td><td>${formatoFaltas(valorFaltaRegistro(r))}</td><td>${detalle}</td></tr>`;
    }).join('') || '<tr><td colspan="5" style="text-align:center;padding:1.3rem">No hay fechas para este filtro.</td></tr>';
}
function etiquetaTipoRegistro(r) {
    if (r.demoAutomatico === true)
        return 'Automático';
    if (r.simulado === true)
        return 'Automático';
    const t = String(r.tipo || '');
    if (t === 'Demo' || t === 'Histórico demo') {
        return r.estado === 'Ausente' ? 'Sistema' : r.estado === 'Justificado' ? 'Justificación' : r.estado === 'Retiro' ? 'Manual' : 'QR';
    }
    return t.replace(/\s*\(simulad[oa]\)/gi, '').trim();
}
function et35SesionSeleccionada() { return document.getElementById('filter-sesion-asistencia')?.value || 'principal'; }
function et35ActualizarOpcionesSesion() {
    const selector = document.getElementById('filter-sesion-asistencia');
    if (!selector)
        return 'principal';
    const anterior = selector.value || 'principal';
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    const curso = document.getElementById('filter-curso-asistencia')?.value || '';
    const cursos = curso ? [curso] : getCursosUsuario();
    const sesiones = new Set(['principal']);
    for (const c of cursos)
        for (const sesion of et35SesionesDia(c, fecha))
            sesiones.add(sesion.id);
    const nombres = { principal: 'Jornada principal', contraturno: 'Contraturno', educacion_fisica: 'Educación Física' };
    selector.innerHTML = [...sesiones].map(id => `<option value="${id}">${nombres[id] || id}</option>`).join('');
    selector.value = sesiones.has(anterior) ? anterior : 'principal';
    return selector.value;
}
function renderAsistencia() {
    const search = (document.getElementById('search-asistencia')?.value || '').trim().toLocaleLowerCase('es');
    const fe = document.getElementById('filter-estado')?.value || '';
    et35FiltroAnioCurso('asistencia-anio', 'filter-curso-asistencia');
    const curso = document.getElementById('filter-curso-asistencia')?.value || '';
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    const sesion = et35ActualizarOpcionesSesion();
    const alumnos = getMiAlumnos().filter(a => (!curso || a.curso === curso) && et35InscriptosEnFecha(a, fecha) && et35SesionDisponible(a.curso, fecha, sesion));
    const ids = new Set(alumnos.map(a => a.id));
    const porAlumno = new Map(ASISTENCIAS.filter(r => r.fecha === fecha && ids.has(r.alumnoId) && et35SesionRegistro(r) === sesion).map(r => [r.alumnoId, r]));
    const rows = alumnos.filter(a => {
        const estado = porAlumno.get(a.id)?.estado || 'Sin registrar';
        const coincide = Number.isFinite(et35PuntajeBusquedaAlumno(a, search)) || a.curso.toLocaleLowerCase('es').includes(search);
        return coincide && (!fe || estado === fe);
    }).sort((a, b) => (search ? (et35PuntajeBusquedaAlumno(a, search) - et35PuntajeBusquedaAlumno(b, search)) || 0 : 0) || a.curso.localeCompare(b.curso, 'es') || a.apellido.localeCompare(b.apellido, 'es') || a.nombre.localeCompare(b.nombre, 'es') || a.id - b.id);
    const body = document.getElementById('asistencia-tbody');
    if (!body)
        return;
    body.innerHTML = rows.map(a => {
        const r = porAlumno.get(a.id), estado = r?.estado || 'Sin registrar';
        const estadoBadge = r ? `<span class="badge ${badgeClass(estado)}">${esc(estado)}</span>` : '<span class="badge et35-pendiente">Sin registrar</span>';
        return `<tr><td class="mono">${a.id}</td><td><strong>${esc(a.apellido)}</strong>, ${esc(a.nombre)}</td><td><strong>${esc(a.curso)}</strong></td><td class="mono">${esc(r?.entrada || '—')}</td><td class="mono">${esc(r?.salida || '—')}</td><td>${estadoBadge}</td><td>${r ? esc(etiquetaTipoRegistro(r)) : '—'}</td><td><div class="acciones-registro"><button class="btn btn-ghost btn-sm" onclick="abrirHistorialAusencias(${a.id})">📅 Ver ausencias</button><button class="btn btn-ghost btn-sm" onclick="abrirCorreccionAlumno(${a.id})">${r ? '✏️ Editar' : '➕ Registrar'}</button></div></td></tr>`;
    }).join('') || '<tr><td colspan="8" style="text-align:center;padding:1.5rem">No hay alumnos que coincidan con los filtros.</td></tr>';
    const registros = [...porAlumno.values()];
    const ausentes = registros.filter(r => r.estado === 'Ausente').length;
    const sinRegistro = Math.max(0, alumnos.length - porAlumno.size);
    const foot = document.getElementById('asistencia-foot');
    if (foot)
        foot.textContent = `${et35FechaVisible(fecha)} · ${rows.length} alumnos visibles de ${alumnos.length} · ${registros.length} registrados · ${ausentes} ausentes · ${sinRegistro} sin registrar. Sin registrar NO significa ausente.`;
    const title = document.getElementById('asistencia-table-title');
    if (title)
        title.textContent = `Alumnos y asistencias del ${et35FechaVisible(fecha)}`;
}
let editingAsistAlumnoNuevo = null, editingAsistFechaNueva = null;
function abrirCorreccionAlumno(alumnoId) {
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    const a = getAlumno(Number(alumnoId));
    if (!a || !cursoDeAlumnoAutorizado(a.id))
        return toast('No tenés permiso sobre ese alumno', 'error');
    if (fecha > todayISO())
        return toast('No podés registrar una fecha futura', 'warning');
    if (!et35SesionDisponible(a.curso, fecha, et35SesionSeleccionada()))
        return toast('Ese curso no tiene clases de esa jornada en la fecha elegida', 'warning');
    if (!et35InscriptosEnFecha(a, fecha))
        return toast('El alumno no está inscripto en esa fecha', 'warning');
    const sesion = et35SesionSeleccionada();
    if (!et35SesionDisponible(a.curso, fecha, sesion))
        return toast('Ese curso no tiene esa jornada en la fecha elegida', 'warning');
    const registrado = ASISTENCIAS.find(r => r.alumnoId === a.id && r.fecha === fecha && et35SesionRegistro(r) === sesion);
    if (registrado) {
        editingAsistAlumnoNuevo = null;
        editingAsistFechaNueva = null;
        abrirCorreccion(registrado.id);
        return;
    }
    editingAsistId = null;
    editingAsistAlumnoNuevo = a.id;
    editingAsistFechaNueva = fecha;
    document.getElementById('corr-desc').textContent = `Nuevo registro: ${a.apellido}, ${a.nombre} — ${et35FechaVisible(fecha)} · ${et35NombreSesion({ sesion })}. Se guardará cuando confirmes.`;
    document.getElementById('corr-entrada').value = '';
    document.getElementById('corr-salida').value = '';
    document.getElementById('corr-estado').value = 'Presente';
    document.getElementById('corr-tipo').value = 'Manual';
    document.getElementById('corr-obs').value = '';
    openModal('modal-corregir');
}
function abrirCorreccion(id) {
    editingAsistId = id;
    const r = ASISTENCIAS.find(x => x.id === id);
    if (!r)
        return;
    if (!cursoDeAlumnoAutorizado(r.alumnoId)) {
        toast('No tenés acceso a ese curso', 'error');
        return;
    }
    const a = getAlumno(r.alumnoId);
    document.getElementById('corr-desc').textContent = `Corrigiendo: ${a.apellido}, ${a.nombre} — ${r.fecha} · ${et35NombreSesion(r)}`;
    document.getElementById('corr-entrada').value = r.entrada || '';
    document.getElementById('corr-salida').value = r.salida || '';
    document.getElementById('corr-estado').value = r.estado;
    document.getElementById('corr-tipo').value = r.tipo;
    document.getElementById('corr-obs').value = '';
    openModal('modal-corregir');
}
function guardarCorreccion() {
    let r = editingAsistId != null ? ASISTENCIAS.find(x => x.id === editingAsistId) : null;
    const alumnoId = r?.alumnoId ?? editingAsistAlumnoNuevo;
    if (!alumnoId || !cursoDeAlumnoAutorizado(alumnoId))
        return toast('Alumno no autorizado', 'error');
    const esNuevo = !r;
    const sesion = r ? et35SesionRegistro(r) : et35SesionSeleccionada();
    if (!r) {
        const fecha = editingAsistFechaNueva;
        if (!et35SesionDisponible(getAlumno(alumnoId)?.curso, fecha, sesion))
            return toast('Esa jornada no corresponde al horario del curso', 'warning');
        if (!fecha || fecha > todayISO())
            return toast('Fecha inválida', 'error');
        if (ASISTENCIAS.some(x => x.alumnoId === alumnoId && x.fecha === fecha && et35SesionRegistro(x) === sesion))
            return toast('Ya existe un registro para esa fecha. Actualizá la tabla.', 'warning');
        let max = 0;
        for (const x of ASISTENCIAS)
            if (x.id > max)
                max = x.id;
        r = { id: max + 1, alumnoId, fecha, sesion };
        ASISTENCIAS.push(r);
    }
    r.sesion = sesion;
    r.entrada = document.getElementById('corr-entrada').value;
    r.salida = document.getElementById('corr-salida').value;
    r.estado = document.getElementById('corr-estado').value;
    r.tipo = 'Manual';
    r.obs = document.getElementById('corr-obs').value.trim();
    r.demoGenerado = false;
    r.simulado = false;
    r.demoAutomatico = false;
    editingAsistId = null;
    editingAsistAlumnoNuevo = null;
    editingAsistFechaNueva = null;
    if (currentUser && ['jefa', 'preceptor'].includes(currentUser.rol)) {
        const alumno = getAlumno(alumnoId);
        AUDITORIA.unshift({ fecha: new Date().toISOString(), usuario: et35UsuarioActivo(),
            accion: esNuevo ? 'Registro manual de asistencia' : 'Corrección de asistencia',
            detalle: `${alumno?.apellido || 'Alumno'} ID ${alumnoId} · ${r.fecha} · ${et35NombreSesion(r)} · ${r.estado}` });
        AUDITORIA = AUDITORIA.slice(0, 400);
    }
    saveDemoData();
    closeModal('modal-corregir');
    renderAsistencia();
    toast('Asistencia guardada correctamente', 'success');
}
function exportCSV() {
    const now = new Date();
    const fecha = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const rows = [
        [''], ['ESCUELA TÉCNICA N°35 D.E.18 — ING. EDUARDO LATZINA'],
        ['Sistema de Registro de Asistencia QR'],
        [`Fecha de exportación: ${fecha}`],
        [''],
        ['ID alumno', 'Apellido', 'Nombre', 'DNI', 'Curso', 'Fecha', 'Hora Entrada', 'Hora Salida', 'Jornada', 'Estado', 'Tipo Registro']
    ];
    getMiAsistencias().filter(r => r.fecha === (document.getElementById('filter-fecha-asistencia')?.value || todayISO()) && (!document.getElementById('filter-curso-asistencia')?.value || getAlumno(r.alumnoId)?.curso === document.getElementById('filter-curso-asistencia').value)).forEach(r => {
        const a = getAlumno(r.alumnoId);
        if (a)
            rows.push([a.id, a.apellido, a.nombre, a.dni, a.curso, r.fecha, r.entrada || '', r.salida || '', et35NombreSesion(r), r.estado, etiquetaTipoRegistro(r)]);
    });
    rows.push([''], ['Total registros exportados', rows.length - 6]);
    const safeCSV = c => {
        let t = String(c ?? '');
        if (/^[=+@\t\r]/.test(t))
            t = "'" + t;
        return '"' + t.replace(/"/g, '""') + '"';
    };
    const csv = rows.map(r => r.map(safeCSV).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asistencia_ET35_${document.getElementById('filter-fecha-asistencia')?.value || fecha}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('CSV exportado correctamente', 'success');
}
function simulateScan() {
    procesarCodigoQR(document.getElementById('qr-input')?.value || '');
}
function registrarMovimiento(al, tipo = 'entrada', origen = 'QR') {
    if (!isMiCurso(al.curso)) {
        toast('No tenés permiso sobre ese curso', 'error');
        return false;
    }
    const fecha = todayISO(), ahora = new Date();
    const hora = String(ahora.getHours()).padStart(2, '0') + ':' + String(ahora.getMinutes()).padStart(2, '0');
    let r = ASISTENCIAS.find(x => x.alumnoId === al.id && x.fecha === fecha && et35SesionRegistro(x) === 'principal');
    if (tipo === 'salida' || tipo === 'retiro') {
        if (!r || !r.entrada) {
            toast('Primero registrá el ingreso de hoy', 'warning');
            return false;
        }
        if (r.salida) {
            toast('La salida de hoy ya está registrada', 'warning');
            return false;
        }
        r.salida = hora;
        if (tipo === 'retiro')
            r.estado = 'Retiro';
    }
    else if (tipo === 'ausencia_presencia') {
        if (!r) {
            r = { id: ASISTENCIAS.reduce((max, x) => Math.max(max, Number(x.id) > 0 ? Number(x.id) : 0), 0) + 1, alumnoId: al.id, fecha, sesion: 'principal', entrada: hora, salida: '', estado: 'Ausente', tipo: origen };
            ASISTENCIAS.push(r);
        }
        else {
            r.entrada = hora;
            r.estado = 'Ausente';
        }
    }
    else {
        if (r?.entrada) {
            toast('La entrada de hoy ya está registrada', 'warning');
            return false;
        }
        let estado = tipo === 'tarde' ? 'Tarde' : (origen === 'QR' && document.getElementById('qr-demo-horario')?.checked ? 'Presente' : evaluarEstado(hora, al.curso));
        if (r) {
            r.entrada = hora;
            r.estado = estado;
            r.salida = '';
            r.tipo = origen;
            r.obs = et35EstadoHorario(al.curso, hora).observacion;
        }
        else {
            r = { id: ASISTENCIAS.reduce((max, x) => Math.max(max, Number(x.id) > 0 ? Number(x.id) : 0), 0) + 1, alumnoId: al.id, fecha, sesion: 'principal', entrada: hora, salida: '', estado, tipo: origen, obs: et35EstadoHorario(al.curso, hora).observacion };
            ASISTENCIAS.push(r);
        }
    }
    SCAN_LOG.unshift({ alumno: al, tipo: tipo === 'salida' ? 'Salida' : 'Entrada', hora, estado: r.estado });
    SCAN_LOG = SCAN_LOG.slice(0, 20);
    saveDemoData();
    renderScannerRecent();
    updateBadges();
    toast(`${al.apellido}, ${al.nombre} (${al.curso}) · ${tipo} ${hora} · ${r.estado}`, 'success');
    return true;
}
function procesarCodigoQR(valor) {
    const codigo = valor.trim().toUpperCase();
    if (!codigo) {
        toast('Ingresá o escaneá un código QR', 'warning');
        return false;
    }
    const a = getMiAlumnos().find(a => qrCodigo(a) === codigo);
    if (!a) {
        toast('QR desconocido o alumno de otro curso', 'error');
        return false;
    }
    const tipo = document.getElementById('qr-movimiento')?.value || 'entrada';
    const ok = registrarMovimiento(a, tipo, 'QR');
    if (ok) {
        document.getElementById('qr-input').value = '';
        document.getElementById('qr-resultado').textContent = `✔ ${a.apellido}, ${a.nombre} · ${a.curso}`;
    }
    return ok;
}
let qrStream = null, qrTimer = null, qrBusy = false, qrDecoder = null, qrDecoderLoad = null;
const QR_JS_LIBS = [
    'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
    'https://unpkg.com/jsqr@1.4.0/dist/jsQR.js'
];
function informarCamaraQR(mensaje) {
    const el = document.getElementById('qr-estado-camara');
    if (el)
        el.textContent = mensaje;
}
function cargarScriptQR(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.onload = () => typeof window.jsQR === 'function' ? resolve() : reject(new Error('La biblioteca no se cargó correctamente'));
        script.onerror = () => reject(new Error('No se pudo descargar el lector QR'));
        document.head.append(script);
    });
}
async function obtenerDecoderQR() {
    if (qrDecoder)
        return qrDecoder;
    if ('BarcodeDetector' in window) {
        try {
            const formatos = await BarcodeDetector.getSupportedFormats();
            if (formatos.includes('qr_code')) {
                qrDecoder = { tipo: 'nativo', lector: new BarcodeDetector({ formats: ['qr_code'] }) };
                return qrDecoder;
            }
        }
        catch (e) {
            console.warn('Detector nativo no disponible', e);
        }
    }
    if (typeof window.jsQR === 'function')
        return qrDecoder = { tipo: 'jsqr' };
    if (!qrDecoderLoad) {
        qrDecoderLoad = (async () => {
            for (const url of QR_JS_LIBS) {
                try {
                    await cargarScriptQR(url);
                    break;
                }
                catch (e) {
                    console.warn(e.message);
                }
            }
            if (typeof window.jsQR !== 'function')
                throw new Error('No se pudo cargar el lector QR alternativo. Conectate a internet o ingresá el código manualmente.');
            return { tipo: 'jsqr' };
        })().catch(e => { qrDecoderLoad = null; throw e; });
    }
    return qrDecoder = await qrDecoderLoad;
}
function canvasParaQR(origen, maxLado = 1100) {
    const ancho = origen.videoWidth || origen.naturalWidth || origen.width;
    const alto = origen.videoHeight || origen.naturalHeight || origen.height;
    if (!ancho || !alto)
        throw new Error('La imagen no tiene dimensiones válidas.');
    const factor = Math.min(1, maxLado / Math.max(ancho, alto));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(ancho * factor));
    canvas.height = Math.max(1, Math.round(alto * factor));
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx)
        throw new Error('No se pudo preparar la imagen.');
    ctx.drawImage(origen, 0, 0, canvas.width, canvas.height);
    return canvas;
}
async function decodificarCanvasQR(canvas, decoder) {
    if (decoder.tipo === 'nativo') {
        const codigos = await decoder.lector.detect(canvas);
        return codigos.find(c => c.rawValue)?.rawValue || null;
    }
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const resultado = window.jsQR(img.data, img.width, img.height, { inversionAttempts: 'attemptBoth' });
    return resultado?.data || null;
}
async function iniciarCamaraQR() {
    if (qrStream)
        return;
    if (!navigator.mediaDevices?.getUserMedia) {
        informarCamaraQR('La cámara necesita permisos y una conexión segura (Live Server en localhost o HTTPS).');
        return;
    }
    informarCamaraQR('Preparando lector QR...');
    const iniciar = document.getElementById('qr-iniciar');
    if (iniciar)
        iniciar.disabled = true;
    try {
        const decoder = await obtenerDecoderQR();
        qrStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
        const video = document.getElementById('qr-video');
        if (!video)
            throw new Error('No se encontró la pantalla de la cámara.');
        video.srcObject = qrStream;
        video.style.display = 'block';
        await video.play();
        document.getElementById('qr-iniciar').style.display = 'none';
        document.getElementById('qr-detener').style.display = 'inline-flex';
        informarCamaraQR('Cámara activa. Enfocá un QR de la carpeta de códigos QR o el QR del alumno.');
        qrTimer = setInterval(async () => {
            if (qrBusy || !qrStream || video.readyState < 2)
                return;
            qrBusy = true;
            try {
                const codigo = await decodificarCanvasQR(canvasParaQR(video, 720), decoder);
                if (codigo) {
                    detenerCamaraQR(false);
                    const registrado = procesarCodigoQR(codigo);
                    informarCamaraQR(registrado ? 'Asistencia registrada. Podés activar la cámara nuevamente para el siguiente alumno.' : 'QR leído, pero no registrado. Revisá la confirmación.');
                }
            }
            catch (e) {
                console.warn('Error al leer cuadro QR', e);
            }
            finally {
                qrBusy = false;
            }
        }, 300);
    }
    catch (e) {
        detenerCamaraQR(false);
        let msg = e.message || 'Error desconocido';
        if (e.name === 'NotAllowedError')
            msg = 'Permiso de cámara denegado: habilitalo desde el ícono del navegador.';
        else if (e.name === 'NotFoundError')
            msg = 'No se encontró una cámara conectada.';
        else if (e.name === 'NotReadableError')
            msg = 'La cámara está ocupada por otra aplicación.';
        informarCamaraQR('No se pudo activar la cámara. ' + msg);
    }
    finally {
        if (iniciar)
            iniciar.disabled = false;
    }
}
function detenerCamaraQR(reset = true) {
    if (qrTimer)
        clearInterval(qrTimer);
    qrTimer = null;
    qrStream?.getTracks().forEach(track => track.stop());
    qrStream = null;
    const video = document.getElementById('qr-video');
    if (video) {
        video.pause();
        video.srcObject = null;
        video.style.display = 'none';
    }
    const iniciar = document.getElementById('qr-iniciar'), detener = document.getElementById('qr-detener');
    if (iniciar)
        iniciar.style.display = 'inline-flex';
    if (detener)
        detener.style.display = 'none';
    if (reset)
        informarCamaraQR('Cámara detenida. Podés volver a activarla.');
}
async function prepararImagenQR(archivo) {
    if (typeof createImageBitmap === 'function') {
        try {
            return await createImageBitmap(archivo);
        }
        catch (e) {
            console.warn('No se pudo cargar la imagen como bitmap', e);
        }
    }
    const url = URL.createObjectURL(archivo);
    try {
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = () => reject(new Error('El archivo no es una imagen válida')); });
        img.url = url;
        return img;
    }
    catch (e) {
        URL.revokeObjectURL(url);
        throw e;
    }
}
async function leerImagenQR(archivo) {
    if (!archivo)
        return;
    const input = document.getElementById('qr-imagen');
    const boton = document.getElementById('qr-subir-label');
    if (boton)
        boton.textContent = 'Procesando imagen...';
    informarCamaraQR('Buscando código QR en la imagen seleccionada...');
    try {
        if (!archivo.type.startsWith('image/'))
            throw new Error('Seleccioná una imagen PNG o JPG.');
        if (archivo.size > 12 * 1024 * 1024)
            throw new Error('La imagen no puede superar los 12 MB.');
        const decoder = await obtenerDecoderQR();
        const bitmap = await prepararImagenQR(archivo);
        let codigo;
        try {
            codigo = await decodificarCanvasQR(canvasParaQR(bitmap, 1500), decoder);
        }
        finally {
            bitmap.close?.();
            if (bitmap.url)
                URL.revokeObjectURL(bitmap.url);
        }
        if (!codigo)
            throw new Error('No se encontró un QR legible. Probá con una imagen más nítida o acercá el código.');
        const registrado = procesarCodigoQR(codigo);
        informarCamaraQR(registrado ? 'QR leído desde la imagen y asistencia registrada.' : 'QR leído, pero no registrado. Revisá la confirmación.');
    }
    catch (e) {
        informarCamaraQR('No se pudo leer la imagen: ' + e.message);
        toast('No se pudo leer el QR: ' + e.message, 'error');
    }
    finally {
        if (input)
            input.value = '';
        if (boton)
            boton.textContent = '🖼️ Leer QR desde imagen';
    }
}
window.addEventListener('pagehide', () => { if (qrStream)
    detenerCamaraQR(false); });
function limpiarRegistrosDemoHoy() {
    const hoy = todayISO();
    const antes = ASISTENCIAS.length;
    ASISTENCIAS = ASISTENCIAS.filter(r => !(r.fecha === hoy && r.demoGenerado === true));
    const quitados = antes - ASISTENCIAS.length;
    saveDemoData();
    renderScannerRecent();
    updateBadges();
    toast(quitados ? `Se quitaron ${quitados} registros automáticos de hoy.` : 'No había registros automáticos de hoy.', 'info');
}
function renderScannerRecent() {
    const el = document.getElementById('scanner-recent');
    if (!SCAN_LOG.length) {
        el.innerHTML = '<p style="color:var(--gray-muted);font-size:.82rem;padding:.5rem">Sin escaneos registrados todavía.</p>';
        return;
    }
    el.innerHTML = SCAN_LOG.map(s => `
    <div class="recent-entry">
      <div class="entry-avatar">${s.alumno.nombre[0]}${s.alumno.apellido[0]}</div>
      <div><div class="entry-name">${esc(s.alumno.apellido)}, ${esc(s.alumno.nombre)}</div>
      <div class="entry-sub">${esc(s.alumno.curso)} · ${s.tipo} · <span class="badge ${badgeClass(s.estado)}">${s.estado}</span></div></div>
      <div class="entry-time">${s.hora}</div>
    </div>`).join('');
}
function registrarManual() {
    const q = document.getElementById('manual-search').value.trim().toLowerCase(), tipo = document.getElementById('manual-tipo').value;
    if (!q) {
        toast('Ingresá nombre o DNI', 'warning');
        return;
    }
    const al = getMiAlumnos().find(a => `${a.nombre} ${a.apellido}`.toLowerCase().includes(q) || `${a.apellido} ${a.nombre}`.toLowerCase().includes(q) || a.dni.includes(q));
    if (!al) {
        toast('Alumno no encontrado en tu curso', 'error');
        return;
    }
    if (registrarMovimiento(al, tipo, 'Manual'))
        clearManual();
}
function clearManual() {
    document.getElementById('manual-search').value = '';
    document.getElementById('manual-obs').value = '';
    document.getElementById('manual-tipo').value = 'entrada';
}
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
const et35SeleccionAnioMemoria = Object.create(null);
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
function et35AusenciasParaJustificar(alumnoId) {
    const id = Number(alumnoId);
    if (!id || !cursoDeAlumnoAutorizado(id))
        return [];
    const solicitadas = new Set(JUSTIFICACIONES.filter(j => j.alumnoId === id && j.estado !== 'Denegado').map(j => j.fecha + '|' + et35SesionRegistro(j)));
    const fechas = new Set();
    return ASISTENCIAS.filter(r => r.alumnoId === id && r.estado === 'Ausente' && r.fecha <= todayISO() && !solicitadas.has(r.fecha + '|' + et35SesionRegistro(r)))
        .filter(r => { const key = r.fecha + '|' + et35SesionRegistro(r); if (fechas.has(key))
        return false; fechas.add(key); return true; })
        .sort((a, b) => b.fecha.localeCompare(a.fecha));
}
function actualizarFechasJustificables() {
    const sel = document.getElementById('just-fecha');
    if (!sel)
        return;
    const alumnoId = Number(document.getElementById('just-alumno')?.value || 0);
    const anterior = sel.value;
    const fechas = et35AusenciasParaJustificar(alumnoId);
    sel.innerHTML = '<option value="">— Seleccioná una ausencia —</option>' + fechas.map(r => `<option value="${r.fecha}|${et35SesionRegistro(r)}">${esc(et35DiaSemanaCorto(r.fecha))} ${esc(et35FechaVisible(r.fecha))} · ${esc(et35NombreSesion(r))} · Ausente</option>`).join('');
    sel.value = fechas.some(r => r.fecha + '|' + et35SesionRegistro(r) === anterior) ? anterior : '';
    sel.disabled = !fechas.length;
    const ayuda = document.getElementById('just-fecha-ayuda');
    if (ayuda)
        ayuda.textContent = !alumnoId ? 'Elegí primero un alumno.' : fechas.length ? `${fechas.length} ausencia(s) disponibles para justificar.` : 'Este alumno no tiene ausencias pendientes para justificar.';
    const enviar = document.getElementById('just-enviar');
    if (enviar)
        enviar.disabled = !fechas.length;
}
function puedeRevisarJustificacion(j) {
    return !!j && (isJefa() || (currentUser?.rol === 'preceptor' && cursoDeAlumnoAutorizado(j.alumnoId)));
}
function justificacionesAutorizadas() {
    return JUSTIFICACIONES.filter(j => puedeRevisarJustificacion(j));
}
function renderJustificaciones() {
    const tbody = document.getElementById('just-tbody');
    if (!tbody)
        return;
    const filtro = document.getElementById('just-filtro-estado')?.value || 'En revisión';
    const curso = document.getElementById('just-filtro-curso');
    const solicitudes = justificacionesAutorizadas();
    if (curso) {
        const anterior = curso.dataset.et35JustIniciado === '1' ? curso.value : '';
        const pendientesCurso = new Map();
        solicitudes.filter(j => j.estado === 'En revisión').forEach(j => {
            const c = getAlumno(j.alumnoId)?.curso;
            if (c)
                pendientesCurso.set(c, (pendientesCurso.get(c) || 0) + 1);
        });
        const porAnio = [6, 5, 4, 3, 2, 1].map(n => {
            const lista = getCursosUsuario().filter(c => c.startsWith(n + '°'));
            return lista.length ? `<optgroup label="${n}° año">${lista.map(c => {
                const pendientes = pendientesCurso.get(c) || 0;
                return `<option value="${esc(c)}">${pendientes ? '🔴 ' : ''}${esc(c)}${pendientes ? ' · ' + pendientes + ' pendiente(s)' : ''}</option>`;
            }).join('')}</optgroup>` : '';
        }).join('');
        curso.innerHTML = porAnio + '<option value="">Todos los cursos</option>';
        curso.value = getCursosUsuario().includes(anterior) ? anterior : '';
        curso.dataset.et35JustIniciado = '1';
    }
    const pendientes = solicitudes.filter(j => j.estado === 'En revisión').length;
    const aprobadas = solicitudes.filter(j => j.estado === 'Justificado').length;
    const denegadas = solicitudes.filter(j => j.estado === 'Denegado').length;
    const resumen = document.getElementById('just-resumen');
    if (resumen)
        resumen.textContent = `${pendientes} pendientes · ${aprobadas} aprobadas · ${denegadas} denegadas · Solo cursos autorizados`;
    const visibles = solicitudes.filter(j => (!filtro || filtro === 'Todas' || j.estado === filtro) && (!curso?.value || getAlumno(j.alumnoId)?.curso === curso.value))
        .sort((x, y) => (x.estado === 'En revisión' ? 0 : 1) - (y.estado === 'En revisión' ? 0 : 1) || y.fecha.localeCompare(x.fecha) || y.id - x.id);
    tbody.innerHTML = visibles.map(j => {
        const a = getAlumno(j.alumnoId);
        return `<tr>
      <td><strong>${esc(a?.apellido || '—')}</strong>, ${esc(a?.nombre || '—')}<div class="helper-text">${esc(a?.curso || '—')}</div></td>
      <td class="mono">${et35FechaVisible(j.fecha)}<small style="display:block;color:#64748b">${esc(et35NombreSesion(j))}</small></td>
      <td>${esc(tiposJust(j.tipo))}<div class="helper-text">${esc(j.obs || 'Sin observación')}</div></td>
      <td>${j.archivoNombre ? `<button class="btn btn-ghost btn-sm" onclick="verComprobanteJust(${j.id})">📎 ${esc(j.archivoNombre)}</button>` : '<span class="helper-text">No adjuntó</span>'}</td>
      <td><span class="badge ${badgeJust(j.estado)}">${j.estado === 'Justificado' ? 'Aprobado' : esc(j.estado)}</span>${j.revisadoPor ? `<div class="helper-text">Por ${esc(j.revisadoPor)} · ${esc(j.revisadoEl ? new Date(j.revisadoEl).toLocaleString('es-AR') : '')}</div>` : ''}</td>
      <td><button class="btn btn-primary btn-sm" onclick="abrirRevisionJust(${j.id})">🔎 Revisar</button>
      ${j.estado === 'En revisión' ? `<button class="btn btn-green btn-sm" onclick="abrirRevisionJust(${j.id},'Justificado')">✔ Aprobar</button><button class="btn btn-danger btn-sm" onclick="abrirRevisionJust(${j.id},'Denegado')">✘ Denegar</button>` : ''}</td>
    </tr>`;
    }).join('') || '<tr><td colspan="6" class="helper-text" style="text-align:center;padding:1rem">No hay solicitudes para este filtro.</td></tr>';
    actualizarFechasJustificables();
    updateBadges();
}
const ET35_TIPOS_COMPROBANTE = new Set(['application/pdf', 'image/png', 'image/jpeg']);
const ET35_LIMITE_COMPROBANTE = 8 * 1024 * 1024;
function validarComprobante(file) {
    if (!file)
        return true;
    if (!ET35_TIPOS_COMPROBANTE.has(file.type)) {
        toast('El comprobante debe ser PDF, PNG o JPG', 'warning');
        return false;
    }
    if (file.size > ET35_LIMITE_COMPROBANTE) {
        toast('El archivo supera los 8 MB', 'warning');
        return false;
    }
    return true;
}
function abrirBaseComprobantes() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB)
            return reject(new Error('Este navegador no permite guardar comprobantes'));
        const req = indexedDB.open('et35_comprobantes_demo', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('archivos', { keyPath: 'id' });
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error || new Error('No se pudo abrir la base local'));
    });
}
async function guardarComprobanteJust(id, file) {
    const db = await abrirBaseComprobantes();
    try {
        await new Promise((resolve, reject) => {
            const tx = db.transaction('archivos', 'readwrite');
            tx.objectStore('archivos').put({ id, blob: file, nombre: file.name, tipo: file.type });
            tx.oncomplete = resolve;
            tx.onerror = () => reject(tx.error || new Error('No se pudo guardar el archivo'));
            tx.onabort = () => reject(tx.error || new Error('Guardado cancelado'));
        });
    }
    finally {
        db.close();
    }
}
async function leerComprobanteJust(id) {
    const db = await abrirBaseComprobantes();
    try {
        return await new Promise((resolve, reject) => {
            const tx = db.transaction('archivos', 'readonly');
            const req = tx.objectStore('archivos').get(id);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => reject(req.error || new Error('No se pudo leer el archivo'));
        });
    }
    finally {
        db.close();
    }
}
let et35ArchivoRevisionURL = null;
async function verComprobanteJust(id) {
    const j = JUSTIFICACIONES.find(x => x.id === id);
    const autorizado = puedeRevisarJustificacion(j) || (currentUser?.rol === 'alumno' && currentUser.alumnoId === j?.alumnoId);
    if (!autorizado) {
        toast('No tenés permiso para ver este comprobante', 'error');
        return;
    }
    let el = document.getElementById('just-review-file-preview');
    if (!el) {
        abrirRevisionJust(id);
        el = document.getElementById('just-review-file-preview');
    }
    if (!el)
        return;
    el.textContent = 'Cargando comprobante local...';
    try {
        const contenido = await leerComprobanteJust(id);
        if (!contenido) {
            el.textContent = 'Este comprobante no se guardó en este navegador. Si se cargó en otra computadora, no está disponible acá.';
            return;
        }
        if (et35ArchivoRevisionURL)
            URL.revokeObjectURL(et35ArchivoRevisionURL);
        et35ArchivoRevisionURL = URL.createObjectURL(contenido.blob);
        const enlace = `<a href="${et35ArchivoRevisionURL}" target="_blank" rel="noopener noreferrer">Abrir ${esc(contenido.nombre)}</a>`;
        el.innerHTML = `<p>${enlace} · Archivo guardado solo en este navegador.</p>` +
            (contenido.tipo === 'application/pdf' ? `<iframe title="Comprobante PDF" src="${et35ArchivoRevisionURL}" style="width:100%;height:250px;border:1px solid #ddd"></iframe>` : `<img alt="Comprobante adjunto" src="${et35ArchivoRevisionURL}" style="max-width:100%;max-height:250px">`);
    }
    catch (e) {
        el.textContent = 'No se pudo abrir el comprobante: ' + String(e.message || e);
    }
}
function validarNuevaSolicitud(alumnoId, fecha, sesion = 'principal') {
    const a = getAlumno(alumnoId);
    if (!a || !/^\d{4}-\d{2}-\d{2}$/.test(fecha) || fecha > todayISO()) {
        toast('Elegí un alumno y una fecha de inasistencia válida', 'warning');
        return false;
    }
    if (!(cursoDeAlumnoAutorizado(alumnoId) || (currentUser?.rol === 'alumno' && currentUser.alumnoId === alumnoId))) {
        toast('No tenés permiso para presentar esa solicitud', 'error');
        return false;
    }
    const registro = ASISTENCIAS.find(r => r.alumnoId === alumnoId && r.fecha === fecha && et35SesionRegistro(r) === sesion);
    if (!registro || registro.estado !== 'Ausente') {
        toast('Solo podés solicitar la justificación de una fecha registrada como Ausente', 'warning');
        return false;
    }
    if (currentUser?.rol !== 'alumno' && !et35AusenciasParaJustificar(alumnoId).some(r => r.fecha === fecha && et35SesionRegistro(r) === sesion)) {
        toast('Seleccioná una fecha de la lista de ausencias justificables', 'warning');
        return false;
    }
    if (JUSTIFICACIONES.some(j => j.alumnoId === alumnoId && j.fecha === fecha && et35SesionRegistro(j) === sesion && j.estado !== 'Denegado')) {
        toast('Ya existe una solicitud pendiente o aprobada para esa fecha', 'warning');
        return false;
    }
    return true;
}
let et35SolicitudEnCurso = false;
async function crearSolicitudJustificacion(alumnoId, fecha, tipo, obs, archivo, sesion = 'principal') {
    if (et35SolicitudEnCurso)
        return false;
    if (!validarNuevaSolicitud(alumnoId, fecha, sesion) || !validarComprobante(archivo))
        return false;
    if (!['medica', 'familiar', 'deportiva', 'otra'].includes(tipo)) {
        toast('Elegí un motivo válido', 'warning');
        return false;
    }
    et35SolicitudEnCurso = true;
    try {
        const id = Math.max(0, ...JUSTIFICACIONES.map(j => j.id)) + 1;
        if (archivo) {
            try {
                await guardarComprobanteJust(id, archivo);
            }
            catch (e) {
                toast('No se pudo conservar el comprobante. No se envió la solicitud. ' + String(e.message || e), 'error');
                return false;
            }
        }
        JUSTIFICACIONES.push({ id, alumnoId, fecha, sesion, tipo, obs, estado: 'En revisión', obsJefa: '', archivoNombre: archivo?.name || '', presentadoPor: et35UsuarioActivo(), presentadoEl: new Date().toISOString() });
        saveDemoData();
        if (currentUser?.rol !== 'alumno')
            registrarAuditoria('Solicitud de justificación', `Solicitud ${id} · Alumno ${alumnoId} · ${fecha}`);
        toast('Solicitud presentada. Quedó pendiente de revisión.', 'success');
        return true;
    }
    finally {
        et35SolicitudEnCurso = false;
    }
}
async function cargarJustificacion() {
    const alumnoId = Number(document.getElementById('just-alumno')?.value), eleccion = document.getElementById('just-fecha')?.value || '';
    const [fecha, sesion = 'principal'] = eleccion.split('|');
    const tipo = document.getElementById('just-tipo')?.value, obs = document.getElementById('just-obs')?.value.trim();
    const archivo = document.getElementById('just-file')?.files?.[0];
    try {
        if (await crearSolicitudJustificacion(alumnoId, fecha, tipo, obs, archivo, sesion)) {
            clearJust();
            renderJustificaciones();
        }
    }
    catch (e) {
        console.error('Error al presentar justificativo:', e);
        toast('No se pudo cargar el justificativo: ' + String(e.message || e), 'error');
    }
}
function clearJust() {
    for (const id of ['just-alumno', 'just-fecha', 'just-obs']) {
        const el = document.getElementById(id);
        if (el)
            el.value = '';
    }
    const tipo = document.getElementById('just-tipo');
    if (tipo)
        tipo.value = 'medica';
    const archivo = document.getElementById('just-file');
    if (archivo)
        archivo.value = '';
    const preview = document.getElementById('just-file-preview');
    if (preview)
        preview.textContent = 'Seleccioná un PDF o una imagen. Se conservará solamente en este navegador.';
    actualizarFechasJustificables();
}
function abrirRevisionJust(id, estado = '') {
    const j = JUSTIFICACIONES.find(x => x.id === id);
    if (!puedeRevisarJustificacion(j)) {
        toast('Solo podés revisar justificaciones de tus cursos', 'error');
        return;
    }
    editingJustId = id;
    const a = getAlumno(j.alumnoId);
    const detalle = document.getElementById('just-review-detail');
    if (!detalle)
        return;
    detalle.innerHTML = `<strong>Alumno:</strong> ${esc(a?.apellido)}, ${esc(a?.nombre)} (${esc(a?.curso)})<br>
    <strong>Fecha:</strong> ${et35FechaVisible(j.fecha)} · ${esc(et35NombreSesion(j))}<br>
    <strong>Tipo:</strong> ${esc(tiposJust(j.tipo))}<br>
    <strong>Motivo:</strong> ${esc(j.obs || 'Sin observación')}<br>
    <strong>Presentado por:</strong> ${esc(j.presentadoPor || 'Registro inicial')}<br>
    <strong>Estado actual:</strong> <span class="badge ${badgeJust(j.estado)}">${esc(j.estado)}</span>` +
        (j.revisadoPor ? `<br><strong>Última revisión:</strong> ${esc(j.revisadoPor)} · ${esc(j.revisadoEl ? new Date(j.revisadoEl).toLocaleString('es-AR') : '')}` : '');
    document.getElementById('just-new-estado').value = estado || j.estado;
    document.getElementById('just-review-obs').value = j.obsJefa || '';
    const archivo = document.getElementById('just-review-file-preview');
    if (archivo)
        archivo.innerHTML = j.archivoNombre ? `<button class="btn btn-ghost btn-sm" onclick="verComprobanteJust(${j.id})">📎 Abrir ${esc(j.archivoNombre)}</button>` : '<span class="helper-text">No se adjuntó un comprobante.</span>';
    openModal('modal-revisar-just');
}
function cambiarEstadoJustificacion(j, nuevoEstado) {
    if (!puedeRevisarJustificacion(j))
        return false;
    if (!['En revisión', 'Justificado', 'Denegado'].includes(nuevoEstado)) {
        toast('Estado inválido', 'error');
        return false;
    }
    const r = ASISTENCIAS.find(r => r.alumnoId === j.alumnoId && r.fecha === j.fecha && et35SesionRegistro(r) === et35SesionRegistro(j));
    if (nuevoEstado === 'Justificado') {
        if (!r || !['Ausente', 'Justificado'].includes(r.estado)) {
            toast('Para aprobar debe haber una ausencia registrada en esa fecha', 'warning');
            return false;
        }
        if (r.estado === 'Justificado' && r.justificacionId && r.justificacionId !== j.id) {
            toast('La ausencia ya fue justificada por otra solicitud', 'warning');
            return false;
        }
        r.estado = 'Justificado';
        r.tipo = 'Justificación';
        r.demoGenerado = false;
        r.simulado = false;
        r.demoAutomatico = false;
        r.justificacionId = j.id;
    }
    else if (j.estado === 'Justificado' && r?.estado === 'Justificado' && (!r.justificacionId || r.justificacionId === j.id) && r.tipo === 'Justificación') {
        r.estado = 'Ausente';
        r.tipo = 'Manual (justificación revocada)';
        r.demoGenerado = false;
        r.simulado = false;
        r.demoAutomatico = false;
        delete r.justificacionId;
    }
    j.estado = nuevoEstado;
    recalcularFaltasDesdeRegistros();
    return true;
}
function guardarRevisionJust() {
    const j = JUSTIFICACIONES.find(x => x.id === editingJustId);
    if (!puedeRevisarJustificacion(j)) {
        toast('No tenés permiso para revisar esta solicitud', 'error');
        return;
    }
    const nuevoEstado = document.getElementById('just-new-estado').value;
    const observacion = document.getElementById('just-review-obs').value.trim();
    if (nuevoEstado === 'Denegado' && !observacion) {
        toast('Indicá por qué se deniega la justificación', 'warning');
        return;
    }
    const anterior = j.estado;
    if (!cambiarEstadoJustificacion(j, nuevoEstado))
        return;
    j.obsJefa = observacion;
    if (anterior !== nuevoEstado || !j.revisadoPor) {
        j.revisadoPor = [currentUser?.nombre, currentUser?.apellido].filter(Boolean).join(' ') || et35UsuarioActivo();
        j.revisadoUsuario = et35UsuarioActivo();
        j.revisadoEl = new Date().toISOString();
    }
    saveDemoData();
    registrarAuditoria('Revisión de justificación', `Solicitud ${j.id} · Alumno ${j.alumnoId} · ${anterior} → ${nuevoEstado} · ${observacion || 'Sin observación'}`);
    closeModal('modal-revisar-just');
    renderJustificaciones();
    if (isJefa())
        renderAdmin();
    renderAlumnos();
    recalcStats();
    updateBadges();
    toast(nuevoEstado === 'Justificado' ? 'Justificación aprobada' : nuevoEstado === 'Denegado' ? 'Justificación denegada' : 'Solicitud marcada en revisión', 'success');
}
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
function renderReportes() {
    const now = new Date();
    const ms = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const rp = document.getElementById('rep-periodo');
    if (rp && !rp.value)
        rp.value = ms;
    const rf = document.getElementById('rep-fecha');
    if (rf && !rf.value)
        rf.value = todayISO();
    buildBarChart();
    const tbody = document.getElementById('reporte-tbody');
    const at_risk = getMiAlumnos().filter(a => a.faltas >= 3).sort((a, b) => b.faltas - a.faltas);
    tbody.innerHTML = at_risk.map(a => `<tr>
    <td><strong>${esc(a.apellido)}</strong>, ${esc(a.nombre)}</td>
    <td>${esc(a.curso)}</td>
    <td style="font-weight:700;color:${faltasColor(a.faltas)}">${formatoFaltas(a.faltas)}</td>
    <td>${JUSTIFICACIONES.filter(j => j.alumnoId === a.id && j.estado === 'Justificado').length}</td>
    <td>${faltasEstado(a.faltas)}</td>
    <td><button class="btn btn-ghost btn-sm" onclick="abrirModalMailAlumno(${a.id})">📧 Notificar</button></td>
  </tr>`).join('') || '<tr><td colspan="6" style="text-align:center;padding:1.5rem;color:var(--gray-muted)">Sin alumnos en riesgo.</td></tr>';
    fillSelectAlumnos();
    const rc = document.getElementById('rep-curso');
    if (rc) {
        actualizarOpcionesCursos(rc, getCursosUsuario(), true);
    }
    const alumnoSel = document.getElementById('rep-alumno');
    if (alumnoSel) {
        const anterior = alumnoSel.value;
        alumnoSel.innerHTML = '<option value="">— Seleccionar alumno —</option>' + getMiAlumnos().map(a => `<option value="${a.id}">${esc(a.apellido)}, ${esc(a.nombre)} (${esc(a.curso)})</option>`).join('');
        if (getMiAlumnos().some(a => String(a.id) === anterior))
            alumnoSel.value = anterior;
    }
}
function generarReporte() {
    const tipo = document.getElementById('rep-tipo').value;
    const mes = document.getElementById('rep-periodo').value;
    const fecha = document.getElementById('rep-fecha')?.value || todayISO();
    const curso = document.getElementById('rep-curso').value;
    const alumnoId = Number(document.getElementById('rep-alumno')?.value || 0);
    if (!['diario', 'mensual', 'alumno', 'curso'].includes(tipo))
        return;
    if (tipo === 'curso' && !curso) {
        toast('Elegí un curso para el reporte por curso', 'warning');
        return;
    }
    if (tipo === 'alumno' && !alumnoId) {
        toast('Elegí un alumno para el reporte individual', 'warning');
        return;
    }
    if (tipo !== 'diario' && !/^\d{4}-\d{2}$/.test(mes)) {
        toast('Elegí un mes válido', 'warning');
        return;
    }
    if (tipo === 'diario' && !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
        toast('Elegí una fecha válida', 'warning');
        return;
    }
    if (curso && !getCursosUsuario().includes(curso)) {
        toast('Curso no autorizado', 'error');
        return;
    }
    if (tipo === 'alumno' && !cursoDeAlumnoAutorizado(alumnoId)) {
        toast('Alumno no autorizado', 'error');
        return;
    }
    let registros = getMiAsistencias().filter(r => tipo === 'diario' ? r.fecha === fecha : r.fecha.startsWith(mes));
    if (curso)
        registros = registros.filter(r => getAlumno(r.alumnoId)?.curso === curso);
    if (tipo === 'alumno')
        registros = registros.filter(r => r.alumnoId === alumnoId);
    if (!registros.length) {
        toast('No hay registros para esos filtros', 'warning');
        return;
    }
    const columnas = ['ID alumno', 'Apellido', 'Nombre', 'DNI', 'Curso', 'Fecha', 'Bimestre', 'Entrada', 'Salida', 'Jornada', 'Estado', 'Tipo', 'Faltas equivalentes'];
    const filas = [columnas];
    registros.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.alumnoId - b.alumnoId).forEach(r => {
        const a = getAlumno(r.alumnoId);
        if (a)
            filas.push([a.id, a.apellido, a.nombre, a.dni, a.curso, r.fecha, bimestreDeFecha(r.fecha)?.nombre || 'Fuera del ciclo', r.entrada || '', r.salida || '', et35NombreSesion(r), r.estado, etiquetaTipoRegistro(r), formatoFaltas(valorFaltaRegistro(r))]);
    });
    const csv = filas.map(f => f.map(c => {
        let t = String(c ?? '');
        if (/^[=+@\t\r]/.test(t))
            t = "'" + t;
        return '"' + t.replace(/"/g, '""') + '"';
    }).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `reporte_ET35_${tipo}_${tipo === 'diario' ? fecha : mes}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(`Reporte CSV creado con ${filas.length - 1} registros.`, 'success');
}
function enviarReportes() {
    const alumnos = getMiAlumnos().filter(a => a.faltas >= 3);
    if (!alumnos.length) {
        toast('No hay alumnos con 3 o más faltas', 'info');
        return;
    }
    toast(`Hay ${alumnos.length} avisos pendientes. Preparalos individualmente desde Alumnos; no se enviaron correos automáticamente.`, 'warning');
}
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
function quickRevision(id, estado) {
    if (!puedeRevisarJustificacion(JUSTIFICACIONES.find(x => x.id === id)))
        return;
    abrirRevisionJust(id, estado);
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
function initApp() {
    document.getElementById('sidebar-avatar').textContent = `${currentUser.nombre[0]}${currentUser.apellido[0]}`;
    document.getElementById('sidebar-username').textContent = `${currentUser.nombre} ${currentUser.apellido}`;
    document.getElementById('sidebar-role').textContent = currentUser.rol === 'alumno' ? `Estudiante — ${currentUser.cursoAsignado} · ${et35InfoCurso(currentUser.cursoAsignado)?.turno || ''} · ${et35InfoCurso(currentUser.cursoAsignado)?.especialidad || ''}` : isJefa() ? 'Jefa de Preceptores' : `Preceptor/a — ${getCursosUsuario().join(' / ') || 'Sin cursos'}`;
    const paginasDelAlumno = new Set(['mi-asistencia', 'mi-qr', 'presentar-justificativos', 'mi-calendario', 'horarios']);
    if (currentUser.rol === 'alumno' && !paginasDelAlumno.has(currentPage)) {
        location.replace('mi-asistencia.html');
        return;
    }
    if (!isJefa() && currentPage === 'admin') {
        location.replace('dashboard.html');
        return;
    }
    const paginasExclusivasDelAlumno = new Set(['mi-asistencia', 'mi-qr', 'presentar-justificativos', 'mi-calendario']);
    if (currentUser.rol !== 'alumno' && paginasExclusivasDelAlumno.has(currentPage)) {
        location.replace('dashboard.html');
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
function et35FechaVisible(iso) { return /^\d{4}-\d{2}-\d{2}$/.test(iso || '') ? iso.split('-').reverse().join('/') : iso || '—'; }
function et35UsuarioActivo() { return currentUser?.usuario || ('alumno' + currentUser?.alumnoId) || 'sistema'; }
function registrarAuditoria(accion, detalle) {
    if (!currentUser || !['jefa', 'preceptor'].includes(currentUser.rol))
        return;
    AUDITORIA.unshift({ fecha: new Date().toISOString(), usuario: et35UsuarioActivo(), accion: String(accion), detalle: String(detalle) });
    AUDITORIA = AUDITORIA.slice(0, 400);
    saveDemoData();
}
function crearTablaCSV(filas, nombre) {
    const csv = filas.map(row => row.map(c => { let t = String(c ?? ''); if (/^[=+@\t\r]/.test(t))
        t = "'" + t; return '"' + t.replace(/"/g, '""') + '"'; }).join(',')).join('\r\n');
    const u = URL.createObjectURL(new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = u;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
}
function et35MesActual() { return todayISO().slice(0, 7); }
function et35MesValido(v) { return /^\d{4}-(0[1-9]|1[0-2])$/.test(v || ''); }
function et35CalendarioMes(mes, callback) {
    if (!et35MesValido(mes))
        return '';
    const [y, m] = mes.split('-').map(Number), n = new Date(Date.UTC(y, m, 0)).getUTCDate(), offset = (new Date(Date.UTC(y, m - 1, 1)).getUTCDay() + 6) % 7;
    return Array.from({ length: offset }, () => '<div class="cal-day empty"></div>').join('') +
        Array.from({ length: n }, (_, i) => callback(`${mes}-${String(i + 1).padStart(2, '0')}`, i + 1)).join('');
}
function et35DiaSemanaCorto(fecha) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || ''))
        return '—';
    const d = new Date(fecha + 'T12:00:00Z');
    return Number.isNaN(d.getTime()) ? '—' : ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'][d.getUTCDay()];
}
function et35ActualizarDiasFechas() {
    document.querySelectorAll('input[type="date"]').forEach(input => {
        const e = input.parentElement?.querySelector('.et35-dia-semana');
        if (e)
            e.textContent = et35DiaSemanaCorto(input.value);
    });
}
function et35PrepararCamposFecha() {
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (input.dataset.et35DiaPreparado === '1')
            return;
        const marco = document.createElement('span'), dia = document.createElement('span');
        marco.className = 'et35-fecha-con-dia';
        dia.className = 'et35-dia-semana';
        dia.setAttribute('aria-hidden', 'true');
        input.parentNode.insertBefore(marco, input);
        marco.appendChild(dia);
        marco.appendChild(input);
        input.setAttribute('lang', 'es-AR');
        input.dataset.et35DiaPreparado = '1';
        input.addEventListener('input', et35ActualizarDiasFechas);
        input.addEventListener('change', et35ActualizarDiasFechas);
    });
    et35ActualizarDiasFechas();
}
function moverFechaEnInput(inputId, dias, actualizar) {
    const input = document.getElementById(inputId);
    if (!input)
        return;
    const actual = /^\d{4}-\d{2}-\d{2}$/.test(input.value) ? input.value : todayISO();
    const fecha = new Date(actual + 'T12:00:00Z');
    if (Number.isNaN(fecha.getTime()))
        return;
    fecha.setUTCDate(fecha.getUTCDate() + Number(dias));
    input.value = fecha.toISOString().slice(0, 10);
    et35ActualizarDiasFechas();
    actualizar();
}
let et35VistaDashboard = 'diaria';
function et35CambiarVistaDashboard(vista) {
    if (vista !== 'diaria' && vista !== 'mensual')
        return;
    et35VistaDashboard = vista;
    ['diaria', 'mensual'].forEach(v => {
        const panel = document.getElementById('et35-dashboard-' + v);
        const tab = document.getElementById('et35-tab-' + v);
        if (panel)
            panel.hidden = v !== vista;
        if (tab) {
            tab.classList.toggle('active', v === vista);
            tab.setAttribute('aria-selected', String(v === vista));
            tab.tabIndex = v === vista ? 0 : -1;
        }
    });
    const filtroFecha = document.getElementById('et35-dashboard-fecha-contexto');
    const notaFecha = document.getElementById('dashboard-fecha-nota');
    if (filtroFecha)
        filtroFecha.hidden = vista !== 'diaria';
    if (notaFecha)
        notaFecha.hidden = vista !== 'diaria';
    const curso = document.getElementById('dashboard-curso');
    if (vista === 'mensual' && curso && !curso.value) {
        const primero = Array.from(curso.options).find(o => o.value && getCursosUsuario().includes(o.value));
        if (primero)
            curso.value = primero.value;
    }
    if (vista === 'mensual')
        renderSeguimientoMensualCurso();
    else
        renderDashboardFecha();
}
function et35CursoPanelCambio() {
    const anioWrap = document.getElementById('dashboard-anio')?.closest('label');
    if (anioWrap)
        anioWrap.style.display = isJefa() ? 'flex' : 'none';
    const selector = document.getElementById('dashboard-curso');
    if (selector) {
        if (isJefa())
            et35FiltroAnioCurso('dashboard-anio', 'dashboard-curso');
        else
            actualizarOpcionesCursos(selector, getCursosUsuario(), true);
    }
    if (et35VistaDashboard === 'mensual') {
        if (selector && !selector.value) {
            const primero = Array.from(selector.options).find(o => o.value && getCursosUsuario().includes(o.value));
            if (primero)
                selector.value = primero.value;
        }
        renderSeguimientoMensualCurso();
    }
    else
        renderDashboardFecha();
}
function moverFechaDashboard(dias) { moverFechaEnInput('dashboard-fecha', dias, renderDashboardFecha); }
function moverFechaAsistencia(dias) { moverFechaEnInput('filter-fecha-asistencia', dias, renderAsistencia); }
function setFechaDashboardHoy() { const el = document.getElementById('dashboard-fecha'); if (el) {
    el.value = todayISO();
    et35ActualizarDiasFechas();
    renderDashboardFecha();
} }
function renderDashboardFecha() {
    const d = document.getElementById('dashboard-fecha');
    if (!d)
        return;
    if (!d.value)
        d.value = todayISO();
    const selector = document.getElementById('dashboard-curso');
    const autorizados = getCursosUsuario();
    const anioWrap = document.getElementById('dashboard-anio')?.closest('label');
    if (anioWrap)
        anioWrap.style.display = isJefa() ? 'flex' : 'none';
    let curso = '';
    if (selector) {
        if (isJefa())
            et35FiltroAnioCurso('dashboard-anio', 'dashboard-curso');
        else
            actualizarOpcionesCursos(selector, autorizados, true);
        curso = selector.value;
    }
    if (et35VistaDashboard === 'mensual') {
        renderSeguimientoMensualCurso();
        return;
    }
    const fecha = d.value;
    const alumnos = getMiAlumnos().filter(a => (!curso || a.curso === curso) && et35InscriptosEnFecha(a, d.value));
    const ids = new Set(alumnos.map(a => a.id));
    const registrosFecha = ASISTENCIAS.filter(r => r.fecha === fecha);
    const asis = registrosFecha.filter(r => ids.has(r.alumnoId) && et35SesionRegistro(r) === 'principal');
    const map = new Map(asis.map(r => [r.alumnoId, r]));
    const contar = e => asis.filter(r => r.estado === e).length;
    const put = (id, val) => { const e = document.getElementById(id); if (e)
        e.textContent = val; };
    put('stat-present', contar('Presente'));
    put('stat-absent', contar('Ausente'));
    put('stat-late', contar('Tarde'));
    put('stat-early', contar('Retiro'));
    put('stat-just', contar('Justificado'));
    put('stat-riesgo', alumnos.filter(a => a.faltas >= 3).length);
    put('stat-sinregistro', Math.max(0, alumnos.length - asis.length));
    put('dashboard-bimestre-nota', `Alertas y límite: ${periodoTexto(bimestreVigente())} · 5 faltas por bimestre`);
    put('stat-present-meta', `${asis.length} registros de ${alumnos.length} alumnos · ${et35FechaVisible(fecha)} · ${curso || 'todos mis cursos'}`);
    put('stat-just-meta', `En revisión: ${JUSTIFICACIONES.filter(j => j.estado === 'En revisión' && ids.has(j.alumnoId)).length}`);
    const simulados = asis.filter(r => r.demoAutomatico === true).length;
    const avisoDemo = document.getElementById('et35-aviso-automatico');
    if (avisoDemo) {
        avisoDemo.hidden = fecha !== todayISO() || !esDiaLectivoDemo(fecha);
        avisoDemo.textContent = `⏰ Actualización automática del ${et35InfoCurso(curso)?.turno || 'turno asignado'}: ${simulados} registros no verificados por QR. Los escaneos y las correcciones manuales tienen prioridad.`;
    }
    put('dashboard-fecha-nota', fecha === todayISO() ? 'Se actualiza automáticamente según el reloj del turno asignado.' : 'Consulta de registros históricos');
    renderReglasHorariasCurso(curso);
    const turnoElegido = et35InfoCurso(curso);
    put('stat-late-meta', turnoElegido ? `${turnoElegido.jornada.tardeDesde}–${turnoElegido.jornada.tardeHasta} · ${formatoFaltas(et35ValorJornada(curso, fecha) / 2)} falta(s)` : 'Según turno y jornada del alumno');
    put('stat-early-meta', turnoElegido ? 'Jornada hasta ' + turnoElegido.jornada.fin : 'Según el turno del curso');
    put('dashboard-resumen-faltas', `${formatoFaltas(registrosFecha.filter(r => ids.has(r.alumnoId)).reduce((n, r) => n + valorFaltaRegistro(r), 0))} faltas equivalentes del día, incluyendo las jornadas de contraturno que tengan registro (jornada normal con contraturno: ausencia 0,5; tardanza 0,25 por sesión)`);
    const recientes = registrosFecha.filter(r => ids.has(r.alumnoId) && et35SesionRegistro(r) === 'principal')
        .sort((a, b) => (b.entrada || '').localeCompare(a.entrada || '')).slice(0, 7);
    const rec = document.getElementById('recent-list');
    if (rec)
        rec.innerHTML = recientes.map(r => {
            const a = getAlumno(r.alumnoId);
            return !a ? '' : `<div class="recent-entry"><div class="entry-avatar">${esc(a.nombre[0] + a.apellido[0])}</div><div><div class="entry-name">${esc(a.apellido)}, ${esc(a.nombre)}</div><div class="entry-sub">${esc(a.curso)} · <span class="badge ${badgeClass(r.estado)}">${esc(r.estado)}</span></div></div><div class="entry-time">${esc(r.entrada || '—')}</div></div>`;
        }).join('') || '<p class="helper-text">Todavía no hay registros en el curso y la fecha seleccionados.</p>';
    const selectorAnio = document.getElementById('panel-por-curso-anio');
    const marcoAnio = document.getElementById('panel-por-curso-anio-wrap');
    let anioElegido = '';
    if (marcoAnio)
        marcoAnio.style.display = isJefa() ? '' : 'none';
    if (selectorAnio && isJefa()) {
        const anterior = selectorAnio.dataset.cargado === '1' ? selectorAnio.value : null;
        selectorAnio.innerHTML = [6, 5, 4, 3, 2, 1].map(y => `<option value="${y}">${y}° año</option>`).join('') + '<option value="">Todos los años</option>';
        selectorAnio.value = anterior !== null ? anterior : '6';
        selectorAnio.dataset.cargado = '1';
        anioElegido = selectorAnio.value;
    }
    const cursos = autorizados.filter(c => !isJefa() || !anioElegido || c.startsWith(anioElegido + '°'));
    const alumnosAutorizados = getMiAlumnos();
    const porCurso = new Map();
    for (const c of cursos)
        porCurso.set(c, { total: 0, presentes: 0 });
    for (const a of alumnosAutorizados) {
        const v = porCurso.get(a.curso);
        if (v && et35InscriptosEnFecha(a, fecha))
            v.total++;
    }
    for (const r of registrosFecha) {
        if (et35SesionRegistro(r) !== 'principal' || !['Presente', 'Tarde', 'Retiro'].includes(r.estado))
            continue;
        const a = getAlumno(r.alumnoId), v = a && porCurso.get(a.curso);
        if (v && et35InscriptosEnFecha(a, fecha))
            v.presentes++;
    }
    const progresos = document.getElementById('progress-by-year');
    if (progresos)
        progresos.innerHTML = cursos.map(c => {
            const v = porCurso.get(c), pct = v.total ? Math.round(100 * v.presentes / v.total) : 0;
            return `<div class="progress-row"><div class="progress-label">${esc(c)}</div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:var(--green)"></div></div><div class="progress-pct">${pct}%</div><span class="progress-count">${v.presentes}/${v.total}</span></div>`;
        }).join('') || '<p class="helper-text">No hay cursos en esta selección.</p>';
    const alumnosDistribucion = alumnos;
    const asisDistribucion = asis;
    const contarDistribucion = e => asisDistribucion.filter(r => r.estado === e).length;
    const total = asisDistribucion.length, p = asisDistribucion.filter(r => ['Presente', 'Tarde', 'Retiro'].includes(r.estado)).length;
    const donut = document.getElementById('donut-container');
    if (donut) {
        const pct = alumnosDistribucion.length ? Math.round(p / alumnosDistribucion.length * 100) : 0;
        donut.innerHTML = `<div class="donut-wrap"><div class="donut" style="border-radius:50%;background:conic-gradient(var(--green) ${pct}%,var(--gray-border) ${pct}%);"><div class="donut-center" style="inset:13px;background:white;border-radius:50%"><div class="donut-pct">${pct}%</div><div class="donut-sub">presentismo</div></div></div><div class="donut-legend"><div class="dl-item">Registrados: ${total} / ${alumnosDistribucion.length}</div><div class="dl-item">Presentes / tardanzas / retiros: ${p}</div><div class="dl-item">Ausentes: ${contarDistribucion('Ausente')}</div><div class="dl-item">Tardanzas: ${contarDistribucion('Tarde')}</div><div class="dl-item">Justificados: ${contarDistribucion('Justificado')}</div><div class="dl-item">Sin registro: ${Math.max(0, alumnosDistribucion.length - total)}</div></div></div>`;
    }
    const rankingSelectorAnio = document.getElementById('dashboard-top-ausencias-anio');
    const rankingAnioWrap = document.getElementById('dashboard-top-ausencias-anio-wrap');
    let rankingAnio = '';
    if (rankingAnioWrap)
        rankingAnioWrap.style.display = isJefa() ? '' : 'none';
    if (rankingSelectorAnio && isJefa()) {
        const anterior = rankingSelectorAnio.dataset.cargado === '1' ? rankingSelectorAnio.value : null;
        rankingSelectorAnio.innerHTML = [6, 5, 4, 3, 2, 1].map(y => `<option value="${y}">${y}° año</option>`).join('') + '<option value="">Todos los años</option>';
        rankingSelectorAnio.value = anterior !== null ? anterior : '6';
        rankingSelectorAnio.dataset.cargado = '1';
        rankingAnio = rankingSelectorAnio.value;
    }
    const cursosRanking = autorizados.filter(c => !isJefa() || !rankingAnio || c.startsWith(rankingAnio + '°'));
    const rankingPorCurso = new Map(cursosRanking.map(c => [c, { curso: c, total: 0, aus: 0 }]));
    for (const a of alumnosAutorizados) {
        const r = rankingPorCurso.get(a.curso);
        if (r && et35InscriptosEnFecha(a, fecha))
            r.total++;
    }
    for (const r of registrosFecha) {
        if (et35SesionRegistro(r) !== 'principal' || r.estado !== 'Ausente')
            continue;
        const alumno = getAlumno(r.alumnoId), res = alumno && rankingPorCurso.get(alumno.curso);
        if (res && et35InscriptosEnFecha(alumno, fecha))
            res.aus++;
    }
    const filaRanking = r => `<div class="progress-row"><div class="progress-label">${esc(r.curso)}</div><div class="progress-bar"><div class="progress-fill" style="background:var(--red);width:${r.total ? Math.round(r.aus / r.total * 100) : 0}%"></div></div><div class="progress-pct">${r.aus}/${r.total}</div></div>`;
    const ordenarRanking = (a, b) => b.aus - a.aus || autorizados.indexOf(a.curso) - autorizados.indexOf(b.curso);
    const top = document.getElementById('dashboard-top-ausencias');
    if (top) {
        if (isJefa() && !rankingAnio) {
            top.innerHTML = [6, 5, 4, 3, 2, 1].map(anio => {
                const lista = [...rankingPorCurso.values()].filter(r => r.curso.startsWith(anio + '°')).sort(ordenarRanking);
                if (!lista.length)
                    return '';
                return `<section class="et35-ranking-anio"><h4>${anio}° año <span>· ${lista.length} cursos · ${lista.reduce((n, r) => n + r.aus, 0)} ausencias</span></h4>${lista.map(filaRanking).join('')}</section>`;
            }).join('') || '<p class="helper-text">No hay cursos disponibles.</p>';
        }
        else {
            top.innerHTML = [...rankingPorCurso.values()].sort(ordenarRanking).map(filaRanking).join('') || '<p class="helper-text">Sin cursos asignados.</p>';
        }
    }
}
const et35RenderDonutAnterior = renderDonut;
renderDonut = function () { et35RenderDonutAnterior(); renderDashboardFecha(); };
function mostrarConfirmacionQR(ok, msg, a, tipo) {
    const e = document.getElementById('qr-confirmacion');
    if (!e)
        return;
    e.className = 'qr-confirmacion ' + (ok ? 'exito' : 'error');
    e.innerHTML = `<div class="qr-confirmacion-ico">${ok ? '✅' : '⛔'}</div><div><strong>${esc(ok ? 'Registro confirmado' : 'No se registró')}</strong><p>${esc(msg)}</p></div>`;
}
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
function actualizarSeleccionMasiva() { const n = document.querySelectorAll('.asis-seleccion:checked').length, e = document.getElementById('bulk-cantidad'); if (e)
    e.textContent = n + ' seleccionados'; }
function marcarTodosAsistencia(v) { document.querySelectorAll('.asis-seleccion').forEach(e => e.checked = v); actualizarSeleccionMasiva(); }
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
function aplicarAsistenciaMasiva() {
    if (!['jefa', 'preceptor'].includes(currentUser?.rol))
        return toast('Acceso no autorizado', 'error');
    const ids = [...document.querySelectorAll('.asis-seleccion:checked')].map(x => Number(x.value));
    if (!ids.length)
        return toast('Seleccioná al menos un alumno', 'warning');
    const estado = document.getElementById('asistencia-bulk-estado')?.value;
    if (!['Presente', 'Ausente', 'Tarde', 'Justificado'].includes(estado))
        return toast('Elegí un estado válido', 'warning');
    const fecha = document.getElementById('filter-fecha-asistencia')?.value || todayISO();
    if (fecha > todayISO())
        return toast('No se pueden marcar asistencias futuras', 'warning');
    if (!ids.every(id => ['clase', 'ecpa'].includes(et35TipoDia(fecha, getAlumno(id)?.curso).tipo)))
        return toast('La fecha elegida no corresponde a un día lectivo del curso', 'warning');
    if (!ids.every(id => cursoDeAlumnoAutorizado(id) && (!getAlumno(id)?.fechaAlta || fecha >= getAlumno(id).fechaAlta)))
        return toast('Uno de los alumnos no está autorizado para esa fecha', 'error');
    if (!confirm(`¿Cambiar ${ids.length} registros del ${et35FechaVisible(fecha)} a ${estado}?`))
        return;
    const sesion = et35SesionSeleccionada();
    if (!ids.every(id => et35SesionDisponible(getAlumno(id)?.curso, fecha, sesion)))
        return toast('Algunos alumnos no tienen esa jornada programada', 'warning');
    const porAlumno = new Map(ASISTENCIAS.filter(x => x.fecha === fecha && et35SesionRegistro(x) === sesion).map(r => [r.alumnoId, r]));
    let maxId = 0;
    for (const r of ASISTENCIAS)
        if (r.id > maxId)
            maxId = r.id;
    let count = 0;
    ids.forEach(id => {
        let r = porAlumno.get(id);
        if (!r) {
            r = { id: ++maxId, alumnoId: id, fecha, sesion };
            ASISTENCIAS.push(r);
            porAlumno.set(id, r);
        }
        r.sesion = sesion;
        r.estado = estado;
        const reglas = et35InfoCurso(getAlumno(r.alumnoId)?.curso)?.jornada;
        r.entrada = ['Ausente', 'Justificado'].includes(estado) ? '' : estado === 'Tarde' ? (reglas?.nombre === 'Tarde' ? '13:50' : '08:05') : (reglas?.nombre === 'Tarde' ? '13:35' : '07:45');
        r.salida = ['Ausente', 'Justificado'].includes(estado) ? '' : (reglas?.fin || '13:00');
        r.tipo = 'Manual';
        r.obs = 'Corrección múltiple · ' + et35NombreSesion(r);
        r.demoGenerado = false;
        r.simulado = false;
        r.demoAutomatico = false;
        count++;
    });
    registrarAuditoria('Corrección masiva', `${count} alumnos · ${fecha} · ${estado}`);
    renderAsistencia();
    toast(`${count} registros actualizados`, 'success');
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
function mostrarVistaPreviaComprobante() {
    const input = document.getElementById('just-file'), el = document.getElementById('just-file-preview');
    if (!el)
        return;
    if (et35ComprobanteURL) {
        URL.revokeObjectURL(et35ComprobanteURL);
        et35ComprobanteURL = null;
    }
    const f = input?.files?.[0];
    if (!f) {
        el.textContent = 'No seleccionaste ningún comprobante.';
        return;
    }
    if (f.size > 8 * 1024 * 1024) {
        input.value = '';
        el.textContent = 'Archivo demasiado grande: máximo 8 MB para la vista previa.';
        return;
    }
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(f.type)) {
        input.value = '';
        el.textContent = 'El archivo debe ser PDF, JPG o PNG.';
        return;
    }
    et35ComprobanteURL = URL.createObjectURL(f);
    el.innerHTML = `<p>Vista previa de <strong>${esc(f.name)}</strong>. Al enviar se guardará en este navegador, no en un servidor.</p>` + (f.type === 'application/pdf' ? `<iframe src="${et35ComprobanteURL}" title="Vista previa del PDF"></iframe>` : `<img src="${et35ComprobanteURL}" alt="Vista previa del comprobante">`);
}
function imprimirReportePDF() {
    const tipo = document.getElementById('rep-tipo')?.value, mes = document.getElementById('rep-periodo')?.value, fecha = document.getElementById('rep-fecha')?.value || todayISO(), curso = document.getElementById('rep-curso')?.value || '', alId = Number(document.getElementById('rep-alumno')?.value || 0);
    if (tipo === 'curso' && !curso)
        return toast('Elegí un curso', 'warning');
    if (tipo === 'alumno' && !alId)
        return toast('Elegí un alumno', 'warning');
    if (tipo !== 'diario' && !et35MesValido(mes))
        return toast('Elegí un mes válido', 'warning');
    if (tipo === 'diario' && !/^\d{4}-\d{2}-\d{2}$/.test(fecha))
        return toast('Elegí una fecha válida', 'warning');
    if (curso && !getCursosUsuario().includes(curso))
        return toast('Curso no autorizado', 'error');
    if (tipo === 'alumno' && !cursoDeAlumnoAutorizado(alId))
        return toast('Alumno no autorizado', 'error');
    let rows = getMiAsistencias().filter(r => tipo === 'diario' ? r.fecha === fecha : r.fecha.startsWith(mes));
    if (curso)
        rows = rows.filter(r => getAlumno(r.alumnoId)?.curso === curso);
    if (tipo === 'alumno')
        rows = rows.filter(r => r.alumnoId === alId);
    if (!rows.length)
        return toast('No hay registros para estos filtros', 'warning');
    rows.sort((a, b) => a.fecha.localeCompare(b.fecha) || a.alumnoId - b.alumnoId);
    const p = window.open('', '_blank');
    if (!p)
        return toast('Permití las ventanas emergentes para generar el PDF', 'warning');
    const titulo = `Reporte ET35 · ${tipo} · ${tipo === 'diario' ? fecha : mes}`;
    const style = `body{font-family:Arial,sans-serif;color:#222;margin:25px}header{border-bottom:3px solid #b52828;padding-bottom:12px;margin-bottom:18px}h1{font-size:21px;margin:0 0 6px;color:#b52828}p{font-size:12px}table{width:100%;border-collapse:collapse;font-size:10px}th,td{border:1px solid #ddd;padding:6px;text-align:left}th{background:#eee}tr:nth-child(even){background:#f7f7f7}.nota{color:#777;font-size:11px}@page{size:A4 landscape;margin:13mm}@media print{button{display:none}}`;
    const tab = rows.map(r => { const a = getAlumno(r.alumnoId); return !a ? '' : `<tr><td>${a.id}</td><td>${esc(a.apellido)}, ${esc(a.nombre)}</td><td>${esc(a.curso)}</td><td>${r.fecha}</td><td>${esc(r.entrada || '—')}</td><td>${esc(r.salida || '—')}</td><td>${esc(r.estado)}</td><td>${esc(etiquetaTipoRegistro(r))}</td></tr>`; }).join('');
    p.document.open();
    p.document.write(`<!doctype html><html lang="es"><head><meta charset="UTF-8"><title>${esc(titulo)}</title><style>${style}</style></head><body><header><h1>Escuela Técnica N.º 35 — Eduardo Latzina</h1><p>${esc(titulo)} · ${rows.length} registros · Generado: ${et35FechaVisible(todayISO())}</p></header><button onclick="window.print()">Imprimir / Guardar como PDF</button><p class="nota">Datos de prueba. Este documento no reemplaza los registros oficiales de la escuela.</p><table><thead><tr><th>ID</th><th>Alumno</th><th>Curso</th><th>Fecha</th><th>Entrada</th><th>Salida</th><th>Estado</th><th>Tipo</th></tr></thead><tbody>${tab}</tbody></table></body></html>`);
    p.document.close();
    p.focus();
    setTimeout(() => p.print(), 350);
    toast('Se abrió el reporte. En Imprimir elegí «Guardar como PDF».', 'info');
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
function abrirFechaCalendario(fecha) {
    const curso = document.getElementById('cal-curso')?.value || '';
    if (!getCursosUsuario().includes(curso))
        return;
    location.href = 'asistencia.html?fecha=' + encodeURIComponent(fecha) + '&curso=' + encodeURIComponent(curso);
}
function renderCalendarioCursos() {
    const sel = document.getElementById('cal-curso'), mes = document.getElementById('cal-mes'), e = document.getElementById('cal-mes-grid');
    if (!sel || !mes || !e)
        return;
    const old = sel.value, permitidos = getCursosUsuario();
    sel.innerHTML = permitidos.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
    sel.value = permitidos.includes(old) ? old : (permitidos[0] || '');
    if (!mes.value)
        mes.value = et35MesActual();
    const curso = sel.value, ids = new Set(getMiAlumnos().filter(a => a.curso === curso).map(a => a.id)), registros = ASISTENCIAS.filter(r => r.fecha.startsWith(mes.value) && ids.has(r.alumnoId));
    const map = new Map();
    registros.forEach(r => { if (!map.has(r.fecha))
        map.set(r.fecha, []); map.get(r.fecha).push(r); });
    let ausencias = 0, diasClase = 0, diasECPA = 0, diasFinde = 0, diasCerrados = 0;
    e.innerHTML = et35CalendarioMes(mes.value, (iso, day) => {
        const regs = map.get(iso) || [], nAus = regs.filter(r => r.estado === 'Ausente').length;
        ausencias += nAus;
        const info = et35TipoDia(iso, curso);
        const ecpa = info.tipo === 'ecpa', school = info.tipo === 'clase' || ecpa;
        if (ecpa)
            diasECPA++;
        else if (school)
            diasClase++;
        else if (info.tipo === 'fin-de-semana')
            diasFinde++;
        else
            diasCerrados++;
        const futuro = iso > todayISO();
        const cl = ecpa ? 'dia-ecpa' : school ? 'dia-clase' : info.tipo === 'fin-de-semana' ? 'dia-finde' : 'dia-sin-clases';
        const lbl = ecpa ? 'ECPA · 1° año' : school ? (futuro ? 'Clases previstas' : regs.length ? `${nAus} aus. · ${regs.length} reg.` : 'Hubo clases · sin registros') : info.motivo;
        const titulo = `${et35FechaVisible(iso)} · ${ecpa ? 'ECPA de 1.º año' : school ? 'Día de clases' : info.tipo === 'fin-de-semana' ? 'Fin de semana' : 'Sin clases'} · ${lbl}`;
        return `<button type="button" class="cal-day ${cl}" ${school ? 'onclick="abrirFechaCalendario(\'' + iso + '\')"' : 'disabled'} title="${esc(titulo)}" aria-label="${esc(titulo)}"><span class="cal-number">${day}</span><small>${esc(lbl)}</small></button>`;
    });
    const periodos = document.getElementById('cal-bimestres-info');
    if (periodos)
        periodos.innerHTML = bimestresEscolares(Number(mes.value.slice(0, 4))).map(b => `<span><strong>${esc(b.nombre)}:</strong> ${et35FechaVisible(b.inicio)} – ${et35FechaVisible(b.fin)}</span>`).join('');
    const resumen = document.getElementById('cal-resumen');
    if (resumen)
        resumen.textContent = `${curso} · ${mes.value} · ${diasClase} días de clase (incluye previstos) · ${diasECPA} días de ECPA (solo 1°) · ${diasFinde} de fin de semana · ${diasCerrados} sin clases por otros motivos · ${ausencias} ausencias registradas. No se cuentan como ausentes los alumnos sin registro.`;
    const admin = document.getElementById('cal-admin-cierres');
    if (admin)
        admin.style.display = isJefa() ? '' : 'none';
    const listado = document.getElementById('cal-cierres-personalizados');
    if (listado && isJefa()) {
        const cierres = Object.entries(DIAS_SIN_CLASES).filter(([fecha]) => fecha.startsWith(mes.value)).sort((a, b) => a[0].localeCompare(b[0]));
        listado.innerHTML = cierres.map(([fecha, motivo]) => `<div class="cal-cierre-fila"><span><strong>${et35FechaVisible(fecha)}:</strong> ${esc(motivo)}</span><button class="btn btn-ghost btn-sm" onclick="eliminarDiaSinClases('${fecha}')">Eliminar</button></div>`).join('') || '<p class="helper-text">No hay cierres particulares cargados para este mes.</p>';
    }
}
function guardarDiaSinClases() {
    if (!isJefa())
        return toast('Solo la jefa puede modificar el calendario', 'error');
    const fecha = document.getElementById('cal-cierre-fecha')?.value, motivo = document.getElementById('cal-cierre-motivo')?.value.trim();
    if (!/^2026-\d{2}-\d{2}$/.test(fecha || '') || !Number.isFinite(Date.parse(fecha)) || new Date(fecha + 'T12:00:00Z').toISOString().slice(0, 10) !== fecha) {
        toast('Seleccioná una fecha válida de 2026', 'warning');
        return;
    }
    if (!motivo || motivo.length < 5 || motivo.length > 140) {
        toast('Escribí un motivo de 5 a 140 caracteres', 'warning');
        return;
    }
    if ([0, 6].includes(new Date(fecha + 'T12:00:00Z').getUTCDay())) {
        toast('Los fines de semana ya están marcados en gris', 'warning');
        return;
    }
    DIAS_SIN_CLASES[fecha] = motivo;
    ASISTENCIAS = ASISTENCIAS.filter(r => r.fecha !== fecha || r.demoGenerado !== true);
    recalcularFaltasDesdeRegistros();
    saveDemoData();
    registrarAuditoria('Suspensión de clases', fecha + ' · ' + motivo);
    document.getElementById('cal-cierre-motivo').value = '';
    document.getElementById('cal-mes').value = fecha.slice(0, 7);
    renderCalendarioCursos();
    toast('Día sin clases y motivo guardados', 'success');
}
function eliminarDiaSinClases(fecha) {
    if (!isJefa() || !Object.prototype.hasOwnProperty.call(DIAS_SIN_CLASES, fecha))
        return;
    delete DIAS_SIN_CLASES[fecha];
    construirHistorialDemo();
    saveDemoData();
    registrarAuditoria('Reapertura del calendario', fecha);
    renderCalendarioCursos();
    toast('Cierre personalizado eliminado', 'success');
}
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
function et35TipoDia(fecha, curso = '') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || ''))
        return { tipo: 'sin-clases', motivo: 'Fecha inválida' };
    const dd = new Date(fecha + 'T12:00:00Z').getUTCDay();
    if (dd === 0 || dd === 6)
        return { tipo: 'fin-de-semana', motivo: 'Fin de semana' };
    if (DIAS_SIN_CLASES[fecha])
        return { tipo: 'sin-clases', motivo: DIAS_SIN_CLASES[fecha] };
    if (fecha >= '2026-02-16' && fecha <= '2026-02-27' && String(curso).startsWith('1°')) {
        return { tipo: 'ecpa', motivo: 'ECPA · período de ingreso exclusivo para primer año (fechas estimadas según información escolar)' };
    }
    if (fecha < '2026-03-02')
        return { tipo: 'sin-clases', motivo: 'Fuera del ciclo lectivo general (antes del 2 de marzo)' };
    if (fecha > '2026-12-18')
        return { tipo: 'sin-clases', motivo: 'Fuera del ciclo lectivo (después del 18 de diciembre)' };
    if (fecha >= '2026-07-20' && fecha <= '2026-07-31')
        return { tipo: 'sin-clases', motivo: 'Vacaciones de invierno' };
    if (FERIADOS_CABA_2026.has(fecha))
        return { tipo: 'sin-clases', motivo: FERIADOS_CABA_2026.get(fecha) };
    if (ASUETOS_ESCOLARES_DEMO_2026.has(fecha))
        return { tipo: 'sin-clases', motivo: ASUETOS_ESCOLARES_DEMO_2026.get(fecha) };
    return { tipo: 'clase', motivo: 'Día de clase' };
}
function esDiaLectivoDemo(fecha) { return et35TipoDia(fecha).tipo === 'clase'; }
function fechasLectivasHistoricas() {
    const hasta = todayISO();
    const d = new Date(HISTORIAL_INICIO + 'T12:00:00Z');
    const fechas = [];
    while (d.toISOString().slice(0, 10) < hasta && d.getUTCFullYear() === 2026) {
        const fecha = d.toISOString().slice(0, 10);
        if (esDiaLectivoDemo(fecha))
            fechas.push(fecha);
        d.setUTCDate(d.getUTCDate() + 1);
    }
    return fechas;
}
function azarDemo(alumnoId, fecha, sal = 0) {
    let x = (Math.imul(alumnoId + sal, 0x9e3779b1) ^ Math.imul(Number(fecha.replace(/-/g, '')), 0x85ebca77)) >>> 0;
    x ^= x >>> 16;
    x = Math.imul(x, 0x7feb352d);
    x ^= x >>> 15;
    x = Math.imul(x, 0x846ca68b);
    x ^= x >>> 16;
    return (x >>> 0) / 4294967296;
}
function construirHistorialDemo() {
    const ayer = todayISO();
    ASISTENCIAS = ASISTENCIAS.filter(r => !(r.fecha < ayer && (r.demoGenerado === true || r.tipo === 'Demo' || r.tipo === 'Histórico demo')));
    const existentes = new Set(ASISTENCIAS.filter(r => et35SesionRegistro(r) === 'principal').map(r => r.fecha + '|' + r.alumnoId));
    const fechasHistoricas = fechasLectivasHistoricas();
    const dEcpa = new Date(ECPA_INICIO + 'T12:00:00Z');
    for (; dEcpa.toISOString().slice(0, 10) <= ECPA_FIN; dEcpa.setUTCDate(dEcpa.getUTCDate() + 1)) {
        const fecha = dEcpa.toISOString().slice(0, 10);
        if (et35TipoDia(fecha, '1°1').tipo === 'ecpa')
            fechasHistoricas.push(fecha);
    }
    for (const fecha of fechasHistoricas) {
        for (const a of ALUMNOS) {
            if (fecha < '2026-03-02' && !a.curso.startsWith('1°'))
                continue;
            if (!et35InscriptosEnFecha(a, fecha))
                continue;
            const llave = fecha + '|' + a.id;
            if (existentes.has(llave))
                continue;
            const n = azarDemo(a.id, fecha), h = azarDemo(a.id, fecha, 19);
            const estado = n < 0.016 ? 'Ausente' : n < 0.024 ? 'Justificado' : n < 0.080 ? 'Tarde' : n < 0.092 ? 'Retiro' : 'Presente';
            const turno = et35InfoCurso(a.curso)?.turno || 'Mañana';
            const tarde = turno === 'Tarde', noche = turno === 'Noche';
            const entrada = estado === 'Ausente' || estado === 'Justificado' ? '' : estado === 'Tarde' ?
                (noche ? `18:${String(35 + Math.floor(h * 25)).padStart(2, '0')}` : tarde ? `13:${String(45 + Math.floor(h * 25)).padStart(2, '0')}` : `08:${String(1 + Math.floor(h * 19)).padStart(2, '0')}`) :
                (noche ? `18:${String(20 + Math.floor(h * 14)).padStart(2, '0')}` : tarde ? `13:${String(30 + Math.floor(h * 14)).padStart(2, '0')}` : `07:${String(40 + Math.floor(h * 14)).padStart(2, '0')}`);
            ASISTENCIAS.push({
                id: -(Number(fecha.replace(/-/g, '')) * 10000 + a.id), alumnoId: a.id, fecha,
                entrada,
                salida: estado === 'Ausente' || estado === 'Justificado' ? '' : estado === 'Retiro' ? (noche ? '20:00' : tarde ? '16:00' : '10:30') : (noche ? '21:30' : tarde ? '18:00' : '13:00'),
                estado,
                tipo: estado === 'Ausente' ? 'Sistema' : estado === 'Justificado' ? 'Justificación' : estado === 'Retiro' ? 'Manual' : 'QR',
                demoGenerado: true
            });
        }
    }
    recalcularFaltasDesdeRegistros();
}
function recalcularFaltasDesdeRegistros(fechaReferencia = todayISO()) {
    const periodo = bimestreVigente(fechaReferencia), conteo = new Map();
    if (periodo) {
        ASISTENCIAS.forEach(r => {
            if (r.fecha >= periodo.inicio && r.fecha <= periodo.fin && r.fecha <= fechaReferencia && et35InscriptosEnFecha(getAlumno(r.alumnoId), r.fecha)) {
                const puntos = valorFaltaRegistro(r);
                if (puntos)
                    conteo.set(r.alumnoId, (conteo.get(r.alumnoId) || 0) + puntos);
            }
        });
    }
    ALUMNOS.forEach(a => {
        const ajuste = periodo ? Number(a.ajustesBimestrales?.[periodo.key] || 0) : 0;
        a.faltas = Math.max(0, Math.round(((conteo.get(a.id) || 0) + ajuste) * 4) / 4);
    });
}
let AUDITORIA = [];
let BORRADORES = [];
let DIAS_SIN_CLASES = {};
const storeKey = 'et35_demo_v2';
const ET35_CURSO_ANTERIOR = { "3°1": "3°1 C", "3°2": "3°2 A", "3°3": "3°3 C", "3°4": "3°4 C", "3°5": "3°5 A", "3°6": "3°6 C", "3°7": "3°7 A", "3°8": "3°8 A", "3°9": "3°9 M", "4°1": "4°1 A", "4°2": "4°2 A", "4°3": "4°3 C", "4°4": "4°4 C", "4°5": "4°5 C", "4°6": "4°6 A", "4°7": "4°7 A", "5°1": "5°1 C", "5°2": "5°2 C", "5°3": "5°3 C", "5°4": "5°4 A", "5°5": "5°5 A", "6°1": "6°1 C", "6°2": "6°2 C", "6°3": "6°3 C", "6°4": "6°4 A", "6°5": "6°5 A" };
function et35ActualizarCursosGuardados(estado) {
    if (!estado || Number(estado.datasetVersion || 0) >= 16)
        return estado;
    const traducir = c => ET35_CURSO_ANTERIOR[c] || c;
    if (Array.isArray(estado.ALUMNOS))
        for (const a of estado.ALUMNOS)
            a.curso = traducir(a.curso);
    if (Array.isArray(estado.PRECEPTORES))
        for (const p of estado.PRECEPTORES) {
            if (Array.isArray(p.cursos))
                p.cursos = [...new Set(p.cursos.map(traducir))];
            if (p.cursoAsignado)
                p.cursoAsignado = traducir(p.cursoAsignado);
        }
    estado.datasetVersion = 16;
    return estado;
}
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
function et35MinutosReloj(ahora) { return ahora.getHours() * 60 + ahora.getMinutes(); }
function et35PlanDelDia(fecha) {
    const porCurso = new Map();
    for (const a of ALUMNOS) {
        if (!et35InscriptosEnFecha(a, fecha))
            continue;
        if (!porCurso.has(a.curso))
            porCurso.set(a.curso, []);
        porCurso.get(a.curso).push(a);
    }
    const plan = [];
    for (const [curso, grupo] of porCurso) {
        grupo.sort((a, b) => a.id - b.id);
        const rotacion = Math.floor(azarDemo(grupo[0].id, fecha, 222) * grupo.length);
        for (let i = 0; i < grupo.length; i++) {
            const a = grupo[i], pos = (i + rotacion) % grupo.length;
            const fraccion = pos / grupo.length;
            const tipo = fraccion >= 11 / 12 ? 'retiro' : fraccion >= 10 / 12 ? 'ausente' : fraccion >= 9 / 12 ? 'tarde' : 'presente';
            const r1 = azarDemo(a.id, fecha, 223), r2 = azarDemo(a.id, fecha, 224);
            let entradaMin = 0, salidaMin = 0;
            const turno = et35InfoCurso(curso)?.turno || 'Mañana';
            const tarde = turno === 'Tarde', noche = turno === 'Noche';
            if (tipo === 'presente' || tipo === 'retiro')
                entradaMin = (noche ? 18 * 60 + 20 : tarde ? 13 * 60 + 30 : 7 * 60 + 40) + Math.floor(r1 * 15);
            if (tipo === 'tarde')
                entradaMin = (noche ? 18 * 60 + 35 : tarde ? 13 * 60 + 45 : 7 * 60 + 55) + Math.floor(r1 * 26);
            if (tipo === 'retiro')
                salidaMin = (noche ? 20 * 60 : tarde ? 15 * 60 + 45 : 10 * 60 + 5) + Math.floor(r2 * 45);
            if (tipo === 'presente' || tipo === 'tarde')
                salidaMin = noche ? 21 * 60 + 30 : tarde ? 18 * 60 : 13 * 60;
            plan.push({ alumno: a, tipo, entradaMin, salidaMin });
        }
    }
    return plan;
}
function et35HoraMin(min) { return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0'); }
function actualizarAsistenciasAutomaticas(ahora = new Date(), actualizarVista = true) {
    const fecha = todayISO(ahora), mins = et35MinutosReloj(ahora);
    if (et35DiaAutoAnterior !== fecha) {
        ASISTENCIAS = ASISTENCIAS.filter(r => r.demoAutomatico !== true);
        et35DiaAutoAnterior = fecha;
    }
    if (!esDiaLectivoDemo(fecha))
        return 0;
    const vistos = new Map(ASISTENCIAS.filter(r => r.fecha === fecha && et35SesionRegistro(r) === 'principal').map(r => [r.alumnoId, r]));
    let cambios = 0;
    for (const p of et35PlanDelDia(fecha)) {
        let estado = '', entrada = '', salida = '';
        if (p.tipo === 'ausente') {
            if (mins >= window.ET35Horarios.minutos(et35InfoCurso(p.alumno.curso)?.jornada.ausenteDesde || '08:21'))
                estado = 'Ausente';
        }
        else if (mins >= p.entradaMin) {
            estado = p.tipo === 'tarde' ? 'Tarde' : 'Presente';
            entrada = et35HoraMin(p.entradaMin);
            if (p.salidaMin && mins >= p.salidaMin) {
                salida = et35HoraMin(p.salidaMin);
                if (p.tipo === 'retiro')
                    estado = 'Retiro';
            }
        }
        const actual = vistos.get(p.alumno.id);
        if (actual && actual.demoAutomatico !== true)
            continue;
        if (!estado) {
            if (actual?.demoAutomatico === true) {
                ASISTENCIAS = ASISTENCIAS.filter(r => r !== actual);
                vistos.delete(p.alumno.id);
                cambios++;
            }
            continue;
        }
        if (actual) {
            if (actual.estado !== estado || actual.entrada !== entrada || actual.salida !== salida) {
                actual.estado = estado;
                actual.entrada = entrada;
                actual.salida = salida;
                cambios++;
            }
        }
        else {
            const r = { id: -(Number(fecha.replace(/-/g, '')) * 10000 + p.alumno.id), alumnoId: p.alumno.id, fecha, entrada, salida,
                estado, tipo: 'Automático', demoGenerado: true, demoAutomatico: true, simulado: true,
                obs: 'Registro generado automáticamente; no verificado por QR.' };
            ASISTENCIAS.push(r);
            vistos.set(p.alumno.id, r);
            cambios++;
        }
    }
    if (cambios) {
        recalcularFaltasDesdeRegistros();
        if (actualizarVista && currentUser) {
            if (currentPage === 'dashboard')
                renderDashboardFecha();
            else if (currentPage === 'asistencia')
                renderAsistencia();
            else if (currentPage === 'alumnos')
                renderAlumnos();
            else if (currentPage === 'mi-asistencia')
                renderPortalAlumno();
            else if (currentPage === 'mi-calendario')
                renderCalendarioAlumno();
            else if (currentPage === 'presentar-justificativos')
                renderPortalJustificaciones();
            else if (currentPage === 'calendario')
                renderCalendarioCursos();
            else if (currentPage === 'grafico')
                renderGrafico();
        }
    }
    return cambios;
}
actualizarAsistenciasAutomaticas(new Date(), false);
setInterval(() => actualizarAsistenciasAutomaticas(), 15000);
function saveDemoData() {
    recalcularFaltasDesdeRegistros();
    const manuales = ASISTENCIAS.filter(r => r.demoGenerado !== true && r.tipo !== 'Histórico demo');
    let siguienteId = 0;
    for (const r of manuales)
        if (Number.isSafeInteger(r.id) && r.id > 0)
            siguienteId = Math.max(siguienteId, r.id);
    const idsUsados = new Set();
    for (const r of manuales) {
        if (!Number.isSafeInteger(r.id) || r.id <= 0 || idsUsados.has(r.id))
            r.id = ++siguienteId;
        idsUsados.add(r.id);
    }
    const estadoGuardable = { datasetVersion: 16, ALUMNOS, ASISTENCIAS: manuales, JUSTIFICACIONES, PRECEPTORES, SCAN_LOG, AUDITORIA, BORRADORES, DIAS_SIN_CLASES };
    try {
        localStorage.setItem(storeKey, JSON.stringify(estadoGuardable));
    }
    catch (e) {
        console.error('No se pudo guardar:', e);
        toast('No se pudo guardar: almacenamiento del navegador lleno o bloqueado', 'error');
    }
    if (window.ET35Cloud?.getStatus().active)
        window.ET35Cloud.save(estadoGuardable);
}
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
function et35FechaBaseMatricula(a) {
    return a.fechaAlta || (String(a.curso).startsWith('1°') ? '2026-02-16' : '2026-03-02');
}
const et35CacheMatricula = new WeakMap();
function et35MovimientosMatricula(a) {
    if (!a)
        return [];
    const original = a.movimientosMatricula;
    const anterior = et35CacheMatricula.get(a);
    if (anterior && anterior.original === original)
        return anterior.ordenados;
    const ordenados = (Array.isArray(original) ? original : [])
        .filter(m => m && /^\d{4}-\d{2}-\d{2}$/.test(m.fecha) && ['baja', 'reingreso'].includes(m.tipo))
        .sort((x, y) => x.fecha.localeCompare(y.fecha));
    et35CacheMatricula.set(a, { original, ordenados });
    return ordenados;
}
function et35InscriptosEnFecha(a, fecha) {
    if (!a || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(fecha || '') || fecha < et35FechaBaseMatricula(a))
        return false;
    if (!Array.isArray(a.movimientosMatricula) || a.movimientosMatricula.length === 0)
        return true;
    let inscrito = true;
    for (const mov of et35MovimientosMatricula(a)) {
        if (mov.fecha > fecha)
            break;
        inscrito = mov.tipo === 'reingreso';
    }
    return inscrito;
}
function et35CambiarAnioMatricula() { et35CursoPanelCambio(); }
function et35MoverMesMatricula(cantidad) {
    const input = document.getElementById('matricula-mes');
    if (!input)
        return;
    const actual = /^\d{4}-(0[1-9]|1[0-2])$/.test(input.value) ? input.value : todayISO().slice(0, 7);
    const [anio, mes] = actual.split('-').map(Number);
    const destino = new Date(Date.UTC(anio, mes - 1 + Number(cantidad), 1));
    input.value = destino.toISOString().slice(0, 7);
    renderSeguimientoMensualCurso();
}
function et35PrepararSelectorMatricula() {
    const mes = document.getElementById('matricula-mes');
    if (!mes)
        return;
    if (!mes.value)
        mes.value = (document.getElementById('dashboard-fecha')?.value || todayISO()).slice(0, 7);
    const curso = document.getElementById('dashboard-curso')?.value || '';
    const etiqueta = document.getElementById('et35-mensual-curso-contexto');
    if (etiqueta)
        etiqueta.textContent = curso ? `Curso seleccionado: ${curso}` : 'Elegí una división en el filtro superior para consultar sus estadísticas mensuales.';
}
function et35SeguimientoDatosMes(curso, mes, hoy = todayISO()) {
    if (!getCursosUsuario().includes(curso) || !/^\d{4}-(0[1-9]|1[0-2])$/.test(mes))
        return null;
    const anio = Number(mes.slice(0, 4)), mesNumero = Number(mes.slice(5));
    const hasta = new Date(Date.UTC(anio, mesNumero, 0)).getUTCDate();
    const inicio = mes + '-01', fin = mes + '-' + String(hasta).padStart(2, '0');
    const alumnado = ALUMNOS.filter(a => a.curso === curso);
    const ids = new Set(alumnado.map(a => a.id));
    const mapaDia = new Map();
    const acumulado = new Map();
    for (const r of ASISTENCIAS) {
        if (r.fecha > fin || r.fecha > hoy || !ids.has(r.alumnoId))
            continue;
        const a = getAlumno(r.alumnoId);
        if (!et35InscriptosEnFecha(a, r.fecha))
            continue;
        const bim = bimestreDeFecha(r.fecha);
        if (r.fecha < inicio) {
            if (bim) {
                const clave = bim.key + '|' + r.alumnoId;
                acumulado.set(clave, (acumulado.get(clave) || 0) + valorFaltaRegistro(r));
            }
        }
        else {
            if (!mapaDia.has(r.fecha))
                mapaDia.set(r.fecha, []);
            mapaDia.get(r.fecha).push(r);
        }
    }
    const dias = [], total = { presentes: 0, tardes: 0, retiros: 0, ausentes: 0, justificados: 0, sinRegistro: 0, jornadas: 0 };
    let inscriptosPrevios = null;
    for (let d = 1; d <= hasta; d++) {
        const fecha = mes + '-' + String(d).padStart(2, '0');
        if (fecha > hoy)
            break;
        const tipoDia = et35TipoDia(fecha, curso).tipo;
        if (tipoDia !== 'clase' && tipoDia !== 'ecpa')
            continue;
        const inscritos = alumnado.filter(a => et35InscriptosEnFecha(a, fecha));
        const setIds = new Set(inscritos.map(a => a.id));
        const registros = (mapaDia.get(fecha) || []).filter(r => setIds.has(r.alumnoId));
        const porId = new Map(registros.filter(r => et35SesionRegistro(r) === 'principal').map(r => [r.alumnoId, r]));
        const conteo = { presentes: 0, tardes: 0, retiros: 0, ausentes: 0, justificados: 0, sinRegistro: 0 };
        for (const a of inscritos) {
            const r = porId.get(a.id);
            if (!r) {
                conteo.sinRegistro++;
                continue;
            }
            if (r.estado === 'Presente')
                conteo.presentes++;
            else if (r.estado === 'Tarde')
                conteo.tardes++;
            else if (r.estado === 'Retiro')
                conteo.retiros++;
            else if (r.estado === 'Ausente')
                conteo.ausentes++;
            else if (r.estado === 'Justificado')
                conteo.justificados++;
            else
                conteo.sinRegistro++;
            const bim = bimestreDeFecha(fecha);
            if (bim) {
                const clave = bim.key + '|' + a.id;
                acumulado.set(clave, (acumulado.get(clave) || 0) + valorFaltaRegistro(r));
            }
        }
        const bim = bimestreDeFecha(fecha);
        for (const r of registros.filter(r => et35SesionRegistro(r) !== 'principal')) {
            const b = bimestreDeFecha(r.fecha);
            if (!b)
                continue;
            const clave = b.key + '|' + r.alumnoId;
            acumulado.set(clave, (acumulado.get(clave) || 0) + valorFaltaRegistro(r));
        }
        const libres = bim ? inscritos.filter(a => (acumulado.get(bim.key + '|' + a.id) || 0) >= 5).length : 0;
        const fila = { fecha, inscriptos: inscritos.length, regulares: inscritos.length - libres, libres,
            variacion: inscriptosPrevios === null ? null : inscritos.length - inscriptosPrevios, ...conteo };
        inscriptosPrevios = inscritos.length;
        dias.push(fila);
        for (const k of Object.keys(total))
            if (k !== 'jornadas')
                total[k] += conteo[k];
        total.jornadas += inscritos.length;
    }
    total.asistencias = total.presentes + total.tardes + total.retiros;
    total.porcentaje = total.jornadas ? 100 * total.asistencias / total.jornadas : 0;
    total.promedio = dias.length ? total.asistencias / dias.length : 0;
    total.faltasEquivalentes = ASISTENCIAS.filter(r => r.fecha >= inicio && r.fecha <= fin && r.fecha <= hoy && ids.has(r.alumnoId) && et35InscriptosEnFecha(getAlumno(r.alumnoId), r.fecha)).reduce((s, r) => s + valorFaltaRegistro(r), 0);
    return { curso, mes, dias, total, ultimaMatricula: dias.length ? dias[dias.length - 1].inscriptos : 0 };
}
function renderSeguimientoMensualCurso() {
    const tabla = document.getElementById('matricula-tbody');
    if (!tabla)
        return;
    et35PrepararSelectorMatricula();
    const curso = document.getElementById('dashboard-curso')?.value;
    const mes = document.getElementById('matricula-mes')?.value;
    const d = et35SeguimientoDatosMes(curso, mes);
    const resumen = document.getElementById('matricula-resumen'), tfoot = document.getElementById('matricula-tfoot'), mensaje = document.getElementById('matricula-mensaje');
    if (!d) {
        tabla.innerHTML = '<tr><td colspan="10">Seleccioná un curso y un mes válidos.</td></tr>';
        if (resumen)
            resumen.innerHTML = '';
        if (tfoot)
            tfoot.innerHTML = '';
        const totales = document.getElementById('matricula-totales-visibles');
        if (totales)
            totales.textContent = 'Seleccioná un curso y un mes para consultar los totales.';
        return;
    }
    const t = d.total;
    if (mensaje)
        mensaje.textContent = `${curso} · ${mes.split('-').reverse().join('/')} · ${d.dias.length} día(s) lectivo(s) transcurrido(s). Las variaciones reflejan bajas, altas o reincorporaciones registradas.`;
    if (resumen)
        resumen.innerHTML = [
            ['Inscriptos (último día)', String(d.ultimaMatricula)],
            ['Asistencias', String(t.asistencias)],
            ['Inasistencias', String(t.ausentes)],
            ['Tardanzas', String(t.tardes)],
            ['Porcentaje de asistencia', t.porcentaje.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + '%'],
            ['Media diaria', t.promedio.toLocaleString('es-AR', { maximumFractionDigits: 1 }) + ' alumnos']
        ].map(([rotulo, valor]) => `<div class="et35-matricula-metrica"><small>${esc(rotulo)}</small><strong>${esc(valor)}</strong></div>`).join('');
    const totalesVisibles = document.getElementById('matricula-totales-visibles');
    if (totalesVisibles) {
        const items = [
            ['Presentes', t.presentes],
            ['Retiros', t.retiros],
            ['Tardanzas', t.tardes],
            ['Ausentes', t.ausentes],
            ['Justificados', t.justificados],
            ['Sin registrar', t.sinRegistro],
            ['Jornadas principales posibles', t.jornadas],
            ['Faltas equivalentes', t.faltasEquivalentes.toLocaleString('es-AR')]
        ];
        totalesVisibles.innerHTML = items.map(([nombre, cantidad]) => `<div class="et35-matricula-total-item"><span>${esc(nombre)}</span><strong>${esc(String(cantidad))}</strong></div>`).join('');
    }
    tabla.innerHTML = d.dias.map(f => {
        const variacion = f.variacion === null ? '—' : f.variacion > 0 ? '+' + f.variacion : String(f.variacion);
        return `<tr><td>${esc(et35DiaSemanaCorto(f.fecha))} ${esc(et35FechaVisible(f.fecha))}</td><td><strong>${f.inscriptos}</strong></td><td class="${f.variacion > 0 ? 'et35-mat-alta' : f.variacion < 0 ? 'et35-mat-baja' : ''}">${variacion}</td><td>${f.regulares}</td><td>${f.libres}</td><td>${f.presentes + f.retiros}</td><td>${f.tardes}</td><td>${f.ausentes}</td><td>${f.justificados}</td><td>${f.sinRegistro}</td></tr>`;
    }).join('') || '<tr><td colspan="10">No transcurrieron días de clase en este mes para el curso seleccionado.</td></tr>';
    if (tfoot)
        tfoot.innerHTML = `<tr><th>Totales del mes</th><th>${d.ultimaMatricula}*</th><th>—</th><th>—</th><th>—</th><th>${t.presentes + t.retiros}</th><th>${t.tardes}</th><th>${t.ausentes}</th><th>${t.justificados}</th><th>${t.sinRegistro}</th></tr><tr><td colspan="10">Asistencias: <strong>${t.asistencias}</strong> (presentes, tardanzas y retiros) · Jornadas posibles: <strong>${t.jornadas}</strong> · Faltas equivalentes: <strong>${t.faltasEquivalentes.toLocaleString('es-AR')}</strong> · Promedio: <strong>${t.promedio.toLocaleString('es-AR', { maximumFractionDigits: 1 })}</strong> asistencias/día · Asistencia: <strong>${t.porcentaje.toLocaleString('es-AR', { maximumFractionDigits: 1 })}%</strong>. *Último día de clase contabilizado.</td></tr>`;
}
function abrirGestionMatricula(id) {
    if (!isJefa())
        return toast('Solo la jefa puede modificar la matrícula', 'error');
    const a = getAlumno(id);
    if (!a)
        return;
    et35AlumnoMatriculaActivoId = a.id;
    const titulo = document.getElementById('matricula-alumno-nombre');
    if (titulo)
        titulo.textContent = `${a.apellido}, ${a.nombre} · ${a.curso} · Inscripto desde ${et35FechaVisible(et35FechaBaseMatricula(a))}`;
    const fecha = document.getElementById('matricula-alumno-fecha');
    if (fecha) {
        fecha.value = todayISO();
        fecha.min = et35FechaBaseMatricula(a);
        fecha.max = todayISO();
    }
    const nota = document.getElementById('matricula-alumno-nota');
    if (nota)
        nota.value = '';
    const tipo = document.getElementById('matricula-alumno-tipo');
    if (tipo)
        tipo.value = et35InscriptosEnFecha(a, todayISO()) ? 'baja' : 'reingreso';
    renderHistorialMovimientosMatricula();
    openModal('modal-matricula-alumno');
}
function renderHistorialMovimientosMatricula() {
    const a = getAlumno(et35AlumnoMatriculaActivoId), div = document.getElementById('matricula-alumno-historial');
    if (!div || !a)
        return;
    const eventos = et35MovimientosMatricula(a);
    div.innerHTML = `<div class="et35-mat-historial"><strong>Movimientos registrados</strong>${eventos.length ? `<ul>${eventos.map(m => `<li>${esc(et35FechaVisible(m.fecha))}: ${m.tipo === 'baja' ? 'Baja' : 'Reincorporación'}${m.motivo ? ' · ' + esc(m.motivo) : ''}</li>`).join('')}</ul><button class="btn btn-ghost btn-sm" onclick="deshacerUltimoMovimientoMatricula()">Deshacer último movimiento</button>` : '<p class="helper-text">No hay bajas ni reincorporaciones registradas.</p>'}</div>`;
}
function guardarMovimientoMatricula() {
    if (!isJefa())
        return;
    const a = getAlumno(et35AlumnoMatriculaActivoId), fecha = document.getElementById('matricula-alumno-fecha')?.value;
    const tipo = document.getElementById('matricula-alumno-tipo')?.value;
    const motivo = (document.getElementById('matricula-alumno-nota')?.value || '').trim().slice(0, 180);
    if (!a || !/^\d{4}-\d{2}-\d{2}$/.test(fecha || '') || fecha < et35FechaBaseMatricula(a) || fecha > todayISO())
        return toast('Elegí una fecha válida entre el alta inicial y hoy', 'warning');
    if (!['baja', 'reingreso'].includes(tipo))
        return toast('Elegí un movimiento válido', 'warning');
    const prev = et35MovimientosMatricula(a), ultimo = prev[prev.length - 1];
    if (ultimo && fecha <= ultimo.fecha)
        return toast('La fecha debe ser posterior al último movimiento; podés deshacerlo si es incorrecto', 'warning');
    const estaba = et35InscriptosEnFecha(a, fecha);
    if (tipo === 'baja' && !estaba)
        return toast('El alumno ya figura de baja en esa fecha', 'warning');
    if (tipo === 'reingreso' && estaba)
        return toast('El alumno ya figura inscripto en esa fecha', 'warning');
    a.movimientosMatricula = prev.concat([{ fecha, tipo, motivo, usuario: et35UsuarioActivo() }]);
    saveDemoData();
    registrarAuditoria('Matrícula', `${a.apellido}, ${a.nombre} · ${a.curso} · ${tipo} · ${fecha}`);
    renderHistorialMovimientosMatricula();
    renderAlumnos();
    toast('Movimiento de matrícula guardado', 'success');
}
function deshacerUltimoMovimientoMatricula() {
    if (!isJefa())
        return;
    const a = getAlumno(et35AlumnoMatriculaActivoId);
    if (!a)
        return;
    const prev = et35MovimientosMatricula(a);
    if (!prev.length)
        return;
    if (!confirm(`¿Deshacer el movimiento del ${et35FechaVisible(prev[prev.length - 1].fecha)}?`))
        return;
    a.movimientosMatricula = prev.slice(0, -1);
    saveDemoData();
    registrarAuditoria('Matrícula', `${a.apellido}, ${a.nombre} · anulación último movimiento`);
    renderHistorialMovimientosMatricula();
    renderAlumnos();
    toast('Movimiento anulado', 'success');
}
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
            location.replace(currentUser.rol === 'alumno' ? 'mi-asistencia.html' : 'dashboard.html');
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
    location.replace('index.html');
}
function abrirRegistroDesdePanel() {
    const fecha = document.getElementById('dashboard-fecha')?.value || todayISO();
    const curso = document.getElementById('dashboard-curso')?.value || '';
    void et35NavegarRapido(`asistencia.html?fecha=${encodeURIComponent(fecha)}&curso=${encodeURIComponent(curso)}`);
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
