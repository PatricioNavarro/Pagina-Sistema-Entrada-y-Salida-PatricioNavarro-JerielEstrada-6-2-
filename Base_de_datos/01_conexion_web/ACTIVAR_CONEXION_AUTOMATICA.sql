begin;
create table if not exists public.et35_demo_compartida (
  id text primary key check (id = 'et35'),
  version bigint not null default 1 check (version > 0),
  payload jsonb not null check (
    jsonb_typeof(payload) = 'object'
    and payload ?& array['ALUMNOS', 'ASISTENCIAS', 'PRECEPTORES']
    and jsonb_typeof(payload->'ALUMNOS') = 'array'
    and jsonb_typeof(payload->'ASISTENCIAS') = 'array'
    and jsonb_typeof(payload->'PRECEPTORES') = 'array'
    and octet_length(payload::text) <= 12000000
  )
);
alter table public.et35_demo_compartida enable row level security;
revoke all on public.et35_demo_compartida from public, anon, authenticated;
grant select, insert on public.et35_demo_compartida to anon;
grant update (version, payload) on public.et35_demo_compartida to anon;
drop policy if exists et35_demo_leer on public.et35_demo_compartida;
create policy et35_demo_leer on public.et35_demo_compartida for select to anon using (id = 'et35');
drop policy if exists et35_demo_insertar on public.et35_demo_compartida;
create policy et35_demo_insertar on public.et35_demo_compartida for insert to anon with check (id = 'et35' and version = 1);
drop policy if exists et35_demo_actualizar on public.et35_demo_compartida;
create policy et35_demo_actualizar on public.et35_demo_compartida for update to anon using (id = 'et35') with check (id = 'et35');
notify pgrst, 'reload schema';
commit;
