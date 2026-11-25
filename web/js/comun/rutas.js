const ET35_RUTAS_PAGINAS = Object.freeze({
    "dashboard": "paginas/panel/dashboard.html",
    "asistencia": "paginas/gestion/asistencia.html",
    "alumnos": "paginas/gestion/alumnos.html",
    "justificaciones": "paginas/gestion/justificaciones.html",
    "horarios": "paginas/gestion/horarios.html",
    "grafico": "paginas/analisis/grafico.html",
    "reportes": "paginas/analisis/reportes.html",
    "calendario": "paginas/analisis/calendario.html",
    "notificaciones": "paginas/analisis/notificaciones.html",
    "admin": "paginas/administracion/admin.html",
    "configuracion": "paginas/administracion/configuracion.html",
    "mi-asistencia": "paginas/alumno/mi-asistencia.html",
    "mi-qr": "paginas/alumno/mi-qr.html",
    "presentar-justificativos": "paginas/alumno/presentar-justificativos.html",
    "mi-calendario": "paginas/alumno/mi-calendario.html",
    "index": "index.html",
    "conexion": "conexion.html"
});

function et35RutaPagina(pagina) {
    return new URL(ET35_RUTAS_PAGINAS[pagina] || pagina + ".html", document.baseURI).href;
}
