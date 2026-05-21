-- Ejecuta esto en el SQL Editor de tu proyecto Supabase
-- Crea la tabla para almacenar las cotizaciones

create table if not exists cotizaciones (
  id uuid primary key default gen_random_uuid(),
  creado_en timestamptz not null default now(),
  nombre text not null,
  email text not null,
  telefono text not null,
  mensaje text default '',
  tipo_web text not null,
  extras jsonb default '[]'::jsonb,
  total_estimado integer not null
);

-- Habilita Row Level Security (opcional, pero recomendado)
alter table cotizaciones enable row level security;

-- Permite inserts desde el anon key (solo insert, no read/update/delete)
create policy "Permitir inserción anónima" on cotizaciones
  for insert
  to anon
  with check (true);
