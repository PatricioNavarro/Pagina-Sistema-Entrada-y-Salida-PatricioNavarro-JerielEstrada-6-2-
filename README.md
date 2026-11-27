# Sistema de entrada y salida — ET35

[Ingresar al sistema](https://patricionavarro.github.io/Pagina-Sistema-Entrada-y-Salida-PatricioNavarro-JerielEstrada-6-2-/web/index.html)

## Conexión automática de la versión de prueba

1. En el proyecto Supabase existente, abrir SQL Editor y ejecutar `Base_de_datos/01_conexion_web/ACTIVAR_CONEXION_AUTOMATICA.sql` una sola vez.
2. Publicar el contenido de esta carpeta en la rama `main` de GitHub, con Pages configurado en `/ (root)`.
3. Abrir el enlace del sistema. En la primera carga se inicializa el espacio compartido con el padrón ficticio. El inicio de sesión escolar de prueba se mantiene sin cambios.
4. Abrir la web en otro navegador o dispositivo. No hay que completar `conexion.html`. Esa página solo comprueba el estado de la conexión.
5. Cambiar la asistencia de un alumno ficticio y comprobar el cambio en otro navegador. En Supabase, Table Editor → `et35_demo_compartida` mostrará la fila `et35` y su versión.

La tabla `et35_workspace` privada y sus datos anteriores no se modifican ni se migran automáticamente. La nueva tabla se inicializa por separado. El SQL relacional original se conserva pero la aplicación sincroniza el estado JSON, no las tablas relacionales directamente.

## Alcance y seguridad

**Exclusivamente demostración con datos ficticios.** El espacio compartido permite lectura y modificación públicas mediante la API; los roles escolares de prueba no constituyen autenticación ni autorización real del servidor. Cualquier persona con la clave pública puede modificar el espacio de prueba, aun fuera de la página. No ingresar datos personales, justificativos reales, contraseñas reales ni información institucional privada. La clave pública no es una contraseña; no se incluye ninguna clave secreta de Supabase.

Para uso real se requiere una integración de Supabase Auth por usuario, autorización por rol en el servidor y políticas RLS específicas. No usar esta versión para un despliegue institucional. Para desactivar la demostración, ejecutar `revoke all on public.et35_demo_compartida from anon;` en SQL Editor.

El proyecto conserva la documentación original; este README describe los cambios de conexión de la versión pública.

Los archivos adjuntos de justificativos permanecen en el navegador (IndexedDB), como en la versión original; solo se sincronizan sus datos y estados.
