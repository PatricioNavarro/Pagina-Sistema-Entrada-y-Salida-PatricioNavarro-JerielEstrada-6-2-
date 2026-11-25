create table if not exists public.et35_workspace (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  version bigint not null default 1 check (version > 0),
  payload jsonb not null,
  modified_at timestamptz not null default now()
);
alter table public.et35_workspace enable row level security;
revoke all on public.et35_workspace from anon;
grant select, insert, update on public.et35_workspace to authenticated;
drop policy if exists "et35_read_own" on public.et35_workspace;
create policy "et35_read_own" on public.et35_workspace for select to authenticated
 using (owner_id = (select auth.uid()));
drop policy if exists "et35_insert_own" on public.et35_workspace;
create policy "et35_insert_own" on public.et35_workspace for insert to authenticated
 with check (owner_id = (select auth.uid()));
drop policy if exists "et35_update_own" on public.et35_workspace;
create policy "et35_update_own" on public.et35_workspace for update to authenticated
 using (owner_id = (select auth.uid()))
 with check (owner_id = (select auth.uid()));
