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
