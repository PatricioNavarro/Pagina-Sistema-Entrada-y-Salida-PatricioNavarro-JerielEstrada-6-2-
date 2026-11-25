(async function () {
    try {
        if (window.ET35Cloud)
            await window.ET35Cloud.bootstrap();
    }
    catch (err) {
        console.error('No se pudo abrir la conexión:', err);
    }
    const archivos = [
        "js/comun/utilidades.js",
        "js/datos/padron.js",
        "js/asistencia/faltas-bimestres.js",
        "js/usuarios/sesion-navegacion.js",
        "js/panel/vista-diaria.js",
        "js/asistencia/registro.js",
        "js/asistencia/lector-qr.js",
        "js/comun/filtros.js",
        "js/alumnos/alumnos.js",
        "js/justificaciones/solicitudes.js",
        "js/justificaciones/comprobantes.js",
        "js/panel/graficos.js",
        "js/reportes/reportes.js",
        "js/reportes/notificaciones.js",
        "js/usuarios/administracion.js",
        "js/alumnos/portal.js",
        "js/horarios/calendario.js",
        "js/datos/historial-automatico.js",
        "js/datos/almacenamiento.js",
        "js/alumnos/matricula.js",
        "js/panel/seguimiento-mensual.js",
        "js/horarios/vista-horarios.js"
    ];
    function cargarArchivo(ruta) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = ruta;
            script.onload = resolve;
            script.onerror = () => reject(new Error(ruta));
            document.body.appendChild(script);
        });
    }
    try {
        await Promise.all(archivos.map(cargarArchivo));
        await cargarArchivo('js/inicio.js');
    }
    catch (err) {
        console.error('No se pudo cargar el sistema:', err);
        alert('No se pudo cargar el sistema. Revisá que estén todos los archivos del proyecto.');
    }
})();
