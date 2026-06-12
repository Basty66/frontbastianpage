-- Add RLS policies for Admin panel operations (approve/delete)
-- Run this AFTER adding the aprobado column

-- Allow anonymous users to update testimonios (admin panel)
create policy "Anyone can update testimonios"
  on public.testimonios
  for update
  to anon
  using (true)
  with check (true);

-- Allow anonymous users to delete testimonios (admin panel)
create policy "Anyone can delete testimonios"
  on public.testimonios
  for delete
  to anon
  using (true);
