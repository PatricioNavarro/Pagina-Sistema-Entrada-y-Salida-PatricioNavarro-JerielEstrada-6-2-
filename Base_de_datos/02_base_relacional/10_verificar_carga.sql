-- Comprobación de la carga inicial en SQL Editor:
SELECT 'cursos' AS tabla,count(*) AS registros FROM public.cursos
UNION ALL SELECT 'alumnos',count(*) FROM public.alumnos
UNION ALL SELECT 'preceptores',count(*) FROM public.preceptores
UNION ALL SELECT 'usuarios',count(*) FROM public.usuarios
UNION ALL SELECT 'asistencias',count(*) FROM public.asistencias
UNION ALL SELECT 'horarios',count(*) FROM public.horarios
UNION ALL SELECT 'justificaciones',count(*) FROM public.justificaciones;
