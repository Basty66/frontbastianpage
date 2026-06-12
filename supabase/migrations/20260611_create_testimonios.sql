-- Create testimonios table
create table if not exists public.testimonios (
  id uuid not null default gen_random_uuid(),
  nombre text not null,
  empresa text,
  texto text not null,
  estrellas smallint not null default 5,
  created_at timestamp with time zone not null default now(),
  constraint testimonios_pkey primary key (id)
);

-- Enable Row Level Security
alter table public.testimonios enable row level security;

-- Allow anonymous inserts (so the public form works)
create policy "Anyone can insert testimonios"
  on public.testimonios
  for insert
  to anon
  with check (true);

-- Allow anyone to read testimonios
create policy "Anyone can read testimonios"
  on public.testimonios
  for select
  to anon
  using (true);
