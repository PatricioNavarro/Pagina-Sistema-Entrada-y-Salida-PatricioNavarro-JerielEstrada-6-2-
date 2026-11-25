BEGIN;
CREATE OR REPLACE VIEW public.faltas_por_bimestre WITH (security_invoker=true) AS
SELECT a.id AS alumno_id,b.anio,b.numero AS bimestre,b.limite_faltas,
 greatest(0,coalesce(sum(CASE WHEN r.estado IN ('Ausente','Tarde') THEN
 (CASE WHEN r.sesion <> 'principal' OR EXISTS (
 SELECT 1 FROM public.horarios h WHERE h.curso_codigo=a.curso_codigo AND h.dia_semana=extract(isodow FROM r.fecha) AND h.sesion <> 'principal'
 ) THEN 0.5 ELSE 1 END) * (CASE WHEN r.estado='Tarde' THEN 0.5 ELSE 1 END)
 ELSE 0 END),0)+coalesce(aj.valor,0)) AS faltas
FROM public.alumnos a CROSS JOIN public.bimestres b
LEFT JOIN public.asistencias r ON r.alumno_id=a.id AND r.fecha BETWEEN b.inicio AND b.fin
LEFT JOIN public.ajustes_bimestrales aj ON aj.alumno_id=a.id AND aj.anio=b.anio AND aj.bimestre=b.numero
GROUP BY a.id,b.anio,b.numero,b.limite_faltas,aj.valor;
-- Mantiene las secuencias listas para nuevos registros después de la carga inicial.
SELECT setval(pg_get_serial_sequence('public.alumnos','id'),greatest(1,(SELECT max(id) FROM public.alumnos)),true);
SELECT setval(pg_get_serial_sequence('public.preceptores','id'),greatest(1,(SELECT max(id) FROM public.preceptores)),true);
SELECT setval(pg_get_serial_sequence('public.justificaciones','id'),greatest(1,(SELECT max(id) FROM public.justificaciones)),true);
SELECT setval(pg_get_serial_sequence('public.asistencias','id'),greatest(1,coalesce((SELECT max(id) FROM public.asistencias WHERE id>0),0)),true);
REVOKE ALL ON public.faltas_por_bimestre FROM anon,authenticated;
COMMIT;
