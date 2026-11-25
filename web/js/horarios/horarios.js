(function (root) {
    'use strict';
    const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const TURNO_MANANA = { nombre: 'Mañana', inicio: '07:40', fin: '13:00', normalHasta: '07:54', tardeDesde: '07:55', tardeHasta: '08:20', ausenteDesde: '08:21', presenciaDesde: '09:00' };
    const TURNO_TARDE = { nombre: 'Tarde', inicio: '13:30', fin: '18:00', normalHasta: '13:44', tardeDesde: '13:45', tardeHasta: '14:10', ausenteDesde: '14:11', presenciaDesde: '14:50' };
    const TURNO_NOCHE = { nombre: 'Noche', inicio: '18:20', fin: '21:30', normalHasta: '18:34', tardeDesde: '18:35', tardeHasta: '19:00', ausenteDesde: '19:01', presenciaDesde: '19:40' };
    const DATOS_CURSOS = [{ "curso": "1°1", "anio": 1, "division": 1, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "1°2", "anio": 1, "division": 2, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "1°3", "anio": 1, "division": 3, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "1°4", "anio": 1, "division": 4, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "1°5", "anio": 1, "division": 5, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "1°6", "anio": 1, "division": 6, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "1°7", "anio": 1, "division": 7, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "1°8", "anio": 1, "division": 8, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "1°9", "anio": 1, "division": 9, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "1°10", "anio": 1, "division": 10, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "1°11", "anio": 1, "division": 11, "turno": "Noche", "especialidad": "Sin especialidad" }, { "curso": "1°12", "anio": 1, "division": 12, "turno": "Noche", "especialidad": "Sin especialidad" }, { "curso": "2°1", "anio": 2, "division": 1, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "2°2", "anio": 2, "division": 2, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "2°3", "anio": 2, "division": 3, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "2°4", "anio": 2, "division": 4, "turno": "Mañana", "especialidad": "Sin especialidad" }, { "curso": "2°5", "anio": 2, "division": 5, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "2°6", "anio": 2, "division": 6, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "2°7", "anio": 2, "division": 7, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "2°8", "anio": 2, "division": 8, "turno": "Noche", "especialidad": "Sin especialidad" }, { "curso": "2°9", "anio": 2, "division": 9, "turno": "Tarde", "especialidad": "Sin especialidad" }, { "curso": "2°10", "anio": 2, "division": 10, "turno": "Noche", "especialidad": "Sin especialidad" }, { "curso": "3°1 C", "anio": 3, "division": 1, "turno": "Mañana", "especialidad": "Computación" }, { "curso": "3°2 A", "anio": 3, "division": 2, "turno": "Mañana", "especialidad": "Automotor" }, { "curso": "3°3 C", "anio": 3, "division": 3, "turno": "Tarde", "especialidad": "Computación" }, { "curso": "3°4 C", "anio": 3, "division": 4, "turno": "Tarde", "especialidad": "Computación" }, { "curso": "3°5 A", "anio": 3, "division": 5, "turno": "Tarde", "especialidad": "Automotor" }, { "curso": "3°6 C", "anio": 3, "division": 6, "turno": "Noche", "especialidad": "Computación" }, { "curso": "3°7 A", "anio": 3, "division": 7, "turno": "Mañana", "especialidad": "Automotor" }, { "curso": "3°8 A", "anio": 3, "division": 8, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "3°9 M", "anio": 3, "division": 9, "turno": "Tarde", "especialidad": "A confirmar (anotado M)" }, { "curso": "4°1 A", "anio": 4, "division": 1, "turno": "Mañana", "especialidad": "Automotor" }, { "curso": "4°1 C", "anio": 4, "division": 1, "turno": "Tarde", "especialidad": "Computación" }, { "curso": "4°2 A", "anio": 4, "division": 2, "turno": "Mañana", "especialidad": "Automotor" }, { "curso": "4°2 C", "anio": 4, "division": 2, "turno": "Tarde", "especialidad": "Computación" }, { "curso": "4°3 C", "anio": 4, "division": 3, "turno": "Noche", "especialidad": "Computación" }, { "curso": "4°4 A", "anio": 4, "division": 4, "turno": "Tarde", "especialidad": "Automotor" }, { "curso": "4°4 C", "anio": 4, "division": 4, "turno": "Tarde", "especialidad": "Computación" }, { "curso": "4°5 A", "anio": 4, "division": 5, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "4°5 C", "anio": 4, "division": 5, "turno": "Mañana", "especialidad": "Computación" }, { "curso": "4°6 A", "anio": 4, "division": 6, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "4°7 A", "anio": 4, "division": 7, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "5°1 A", "anio": 5, "division": 1, "turno": "Mañana", "especialidad": "Automotor" }, { "curso": "5°1 C", "anio": 5, "division": 1, "turno": "Mañana", "especialidad": "Computación" }, { "curso": "5°2 C", "anio": 5, "division": 2, "turno": "Mañana", "especialidad": "Computación" }, { "curso": "5°3 A", "anio": 5, "division": 3, "turno": "Tarde", "especialidad": "Automotor" }, { "curso": "5°3 C", "anio": 5, "division": 3, "turno": "Noche", "especialidad": "Computación" }, { "curso": "5°4 A", "anio": 5, "division": 4, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "5°4 C", "anio": 5, "division": 4, "turno": "Noche", "especialidad": "Computación" }, { "curso": "5°5 A", "anio": 5, "division": 5, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "6°1 A", "anio": 6, "division": 1, "turno": "Tarde", "especialidad": "Automotor" }, { "curso": "6°1 C", "anio": 6, "division": 1, "turno": "Mañana", "especialidad": "Computación" }, { "curso": "6°2 A", "anio": 6, "division": 2, "turno": "Tarde", "especialidad": "Automotor" }, { "curso": "6°2 C", "anio": 6, "division": 2, "turno": "Mañana", "especialidad": "Computación" }, { "curso": "6°3 C", "anio": 6, "division": 3, "turno": "Noche", "especialidad": "Computación" }, { "curso": "6°4 A", "anio": 6, "division": 4, "turno": "Noche", "especialidad": "Automotor" }, { "curso": "6°5 A", "anio": 6, "division": 5, "turno": "Noche", "especialidad": "Automotor" }];
    const CURSOS = DATOS_CURSOS.map(c => c.curso);
    const mapa = new Map(DATOS_CURSOS.map(c => [c.curso, c]));
    const cacheHorarios = new Map();
    const sesion = (dia, inicio, fin, tipo, observacion = '') => ({ dia, inicio, fin, tipo, observacion });
    function minutos(hora) { const m = /^(\d{2}):(\d{2})$/.exec(hora || ''); return m ? Number(m[1]) * 60 + Number(m[2]) : NaN; }
    function bloqueOpuesto(turno) { return turno === 'Mañana' ? TURNO_TARDE : turno === 'Tarde' ? TURNO_MANANA : TURNO_TARDE; }
    function cursoInfo(curso) {
        if (cacheHorarios.has(curso))
            return cacheHorarios.get(curso);
        const ficha = mapa.get(curso);
        if (!ficha)
            return null;
        const { anio, division, turno, especialidad } = ficha;
        const jornada = turno === 'Mañana' ? TURNO_MANANA : turno === 'Tarde' ? TURNO_TARDE : TURNO_NOCHE;
        const contra = bloqueOpuesto(turno);
        const sesiones = DIAS.map((_, d) => sesion(d, jornada.inicio, jornada.fin, 'Clase', 'Turno principal'));
        let contras = [], ef;
        const efEnLibre = (dia) => {
            if (turno === 'Mañana')
                return sesion(dia, '18:00', '20:00', 'Educación Física');
            if (turno === 'Tarde')
                return sesion(dia, '10:30', '12:30', 'Educación Física');
            return sesion(dia, '16:00', '18:00', 'Educación Física');
        };
        if (anio <= 2) {
            const dias = division % 2 ? [0, 1] : [3, 4];
            contras = dias.map(d => sesion(d, contra.inicio, contra.fin, 'Contraturno', 'Jornada completa'));
            ef = efEnLibre(2);
        }
        else if (curso === '5°2 C') {
            contras = [sesion(0, '15:45', '18:00', 'Contraturno', 'Media jornada'), sesion(1, '13:30', '18:00', 'Contraturno', 'Jornada completa'), sesion(3, '13:30', '15:45', 'Contraturno', 'Media jornada'), sesion(4, '15:45', '18:00', 'Contraturno', 'Media jornada')];
            ef = sesion(2, '18:00', '20:00', 'Educación Física');
        }
        else if (anio <= 4) {
            const dias = especialidad === 'Computación' ? [0, 2, 4] : [0, 1, 3];
            contras = dias.map(d => sesion(d, contra.inicio, contra.fin, 'Contraturno', 'Jornada completa · ' + especialidad));
            ef = efEnLibre(especialidad === 'Computación' ? 1 : 2);
        }
        else {
            const dias = especialidad === 'Computación' ? ([[0, 1, 2, 4], [0, 2, 3, 4], [0, 1, 3, 4]][(division + anio) % 3]) : [0, 1, 3, 4];
            const libre = DIAS.map((_, i) => i).find(d => !dias.includes(d));
            contras = dias.map((d, i) => {
                if (i < 2)
                    return sesion(d, contra.inicio, contra.fin, 'Contraturno', 'Jornada completa');
                const inicio = turno === 'Tarde' ? (i === 2 ? '07:40' : '10:20') : (i === 2 ? '13:30' : '15:45');
                const fin = turno === 'Tarde' ? (i === 2 ? '10:20' : '13:00') : (i === 2 ? '15:45' : '18:00');
                return sesion(d, inicio, fin, 'Contraturno', 'Media jornada');
            });
            ef = efEnLibre(libre);
        }
        sesiones.push(...contras, ef);
        const info = { ...ficha, jornada: { ...jornada }, contraturno: contras, educacionFisica: ef, sesiones,
            fuente: curso === '5°2 C' ? 'Contraturno informado para 5°2 Computación. Turno principal según foto.' : 'Turno y especialidad: foto proporcionada. Contraturno y Educación Física: horario ilustrativo a confirmar.' };
        cacheHorarios.set(curso, info);
        return info;
    }
    function estadoEntrada(curso, hora) {
        const info = cursoInfo(curso);
        if (!info)
            return { estado: 'Sin registrar', observacion: 'Curso no encontrado en la nómina de turnos' };
        const r = info.jornada, n = minutos(hora);
        if (!Number.isFinite(n))
            return { estado: 'Sin registrar', observacion: 'Hora inválida' };
        if (n < minutos(r.inicio))
            return { estado: 'Sin registrar', observacion: 'Aún no comienza el ingreso del turno ' + info.turno };
        if (n > minutos(r.fin))
            return { estado: 'Sin registrar', observacion: 'La jornada del turno ' + info.turno + ' ya terminó' };
        if (n <= minutos(r.normalHasta))
            return { estado: 'Presente', observacion: '' };
        if (n <= minutos(r.tardeHasta)) {
            const fecha = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
            const dosJornadas = sesionesFecha(curso, fecha).length > 1;
            return { estado: 'Tarde', observacion: dosJornadas ? 'Llegada tarde · 0,25 falta' : 'Llegada tarde · 0,5 falta' };
        }
        if (n >= minutos(r.presenciaDesde))
            return { estado: 'Ausente', observacion: 'Ausente con presencia' };
        return { estado: 'Ausente', observacion: 'Ingreso fuera del horario de tolerancia' };
    }
    function sesionesFecha(curso, fecha) {
        const info = cursoInfo(curso);
        if (!info || !/^\d{4}-\d{2}-\d{2}$/.test(fecha || ''))
            return [];
        const dia = new Date(fecha + 'T12:00:00Z').getUTCDay();
        if (dia === 0 || dia === 6)
            return [];
        const indice = dia - 1;
        const disponibles = [{ id: 'principal', nombre: 'Jornada principal', inicio: info.jornada.inicio, fin: info.jornada.fin }];
        const contra = info.contraturno.find(s => s.dia === indice);
        if (contra)
            disponibles.push({ id: 'contraturno', nombre: 'Contraturno', inicio: contra.inicio, fin: contra.fin });
        const ef = info.educacionFisica;
        if (ef?.dia === indice)
            disponibles.push({ id: 'educacion_fisica', nombre: 'Educación Física', inicio: ef.inicio, fin: ef.fin });
        return disponibles;
    }
    root.ET35Horarios = { CURSOS, DATOS_CURSOS, DIAS, TURNO_MANANA, TURNO_TARDE, TURNO_NOCHE, cursoInfo, estadoEntrada, minutos, sesionesFecha };
})(typeof window !== 'undefined' ? window : globalThis);
