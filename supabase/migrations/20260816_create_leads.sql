CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  magnet TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for anon" ON public.leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow read for service role" ON public.leads
  FOR SELECT USING (true);
