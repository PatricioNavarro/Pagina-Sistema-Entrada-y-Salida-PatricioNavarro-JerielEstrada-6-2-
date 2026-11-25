function todayISO(date = new Date()) {
    const d = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return d.toISOString().slice(0, 10);
}

function esc(valor) { return String(valor ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

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

function et35FechaVisible(iso) { return /^\d{4}-\d{2}-\d{2}$/.test(iso || '') ? iso.split('-').reverse().join('/') : iso || '—'; }

function et35UsuarioActivo() { return currentUser?.usuario || ('alumno' + currentUser?.alumnoId) || 'sistema'; }

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
