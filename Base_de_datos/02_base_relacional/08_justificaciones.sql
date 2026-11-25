BEGIN;
-- Cinco solicitudes iniciales adaptadas a ausencias del historial 2026: las fechas de las solicitudes
-- de ejemplo antiguas (2025) no tenían registros correspondientes en el historial vigente.

INSERT INTO public.justificaciones (id, asistencia_id, tipo, motivo, estado, observacion_revision, presentado_por) VALUES
(1, -202603050007, 'medica', 'Turno médico programado', 'En revisión', '', 'alumno7'),
(2, -202604280005, 'familiar', 'Trámite familiar urgente', 'Justificado', 'Aprobado con certificado', 'alumno5'),
(3, -202609160003, 'medica', 'Post-operatorio', 'Justificado', '', 'alumno3'),
(4, -202603020013, 'otra', 'Sin comprobante', 'Denegado', 'No presentó documentación', 'alumno13'),
(5, -202603110008, 'deportiva', 'Competencia provincial', 'En revisión', '', 'alumno8')
ON CONFLICT DO NOTHING;

-- Las tablas de movimientos, QR reales, auditoría, ajustes y notificaciones quedan listas para operaciones futuras.
-- No se inventan escaneos físicos, bajas ni correos enviados.
COMMIT;
