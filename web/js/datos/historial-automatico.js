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
