-- Cierra las políticas que dejaban a cualquier visitante (rol anon, cuya
-- llave va en el bundle público) modificar o leer datos de más.
-- Pegar en Supabase > SQL Editor. Se puede correr más de una vez.

-- Testimonios: el público solo inserta y lee los aprobados.
drop policy if exists "Anyone can update testimonios" on public.testimonios;
drop policy if exists "Anyone can delete testimonios" on public.testimonios;
drop policy if exists "Anyone can read testimonios" on public.testimonios;
drop policy if exists "Leer solo testimonios aprobados" on public.testimonios;
do $$ begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'testimonios' and column_name = 'aprobado') then
    create policy "Leer solo testimonios aprobados" on public.testimonios
      for select to anon using (aprobado = true);
  end if;
end $$;

-- Leads: "for select using (true)" sin rol dejaba leer todos los correos.
-- El service role no necesita política: se salta RLS.
drop policy if exists "Allow read for service role" on public.leads;

-- Portafolio y blog: "for all using (true)" sin rol dejaba editarlos a cualquiera.
do $$ begin
  if to_regclass('public.proyectos') is not null then
    drop policy if exists "Authenticated users can manage proyectos" on public.proyectos;
  end if;
  if to_regclass('public.posts') is not null then
    drop policy if exists "Authenticated users can manage posts" on public.posts;
  end if;
end $$;
