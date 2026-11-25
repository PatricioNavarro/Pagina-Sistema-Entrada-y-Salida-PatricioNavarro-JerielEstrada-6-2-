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
