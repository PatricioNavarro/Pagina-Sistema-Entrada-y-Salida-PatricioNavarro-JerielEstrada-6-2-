(async function () {
    try {
        if (window.ET35Cloud)
            await window.ET35Cloud.bootstrap();
    }
    catch (err) {
        console.error('No se pudo abrir la conexión:', err);
    }
    const script = document.createElement('script');
    script.src = 'app.js';
    script.onerror = () => alert('No se pudo cargar app.js. Revisá que los archivos estén en la misma carpeta.');
    document.body.appendChild(script);
})();
