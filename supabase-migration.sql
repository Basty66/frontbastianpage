-- Run this in Supabase Dashboard > SQL Editor
-- Creates tables for dynamic portfolio + blog

-- 1. PROYECTOS (portfolio)
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  url TEXT,
  repo TEXT,
  tags TEXT[] DEFAULT '{}',
  screenshot TEXT,
  orden SMALLINT DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read visible proyectos"
  ON proyectos FOR SELECT
  USING (visible = true);

CREATE POLICY "Authenticated users can manage proyectos"
  ON proyectos FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed: migrate existing portfolio data
INSERT INTO proyectos (titulo, descripcion, url, repo, tags, screenshot, orden) VALUES
('Bastian.dev', 'Landing page profesional con cotizador interactivo de presupuestos web, generación de PDF con firma digital, testimonios con Supabase y hosting serverless $0.', 'https://frontbastianpage.vercel.app', 'https://github.com/Basty66/frontbastianpage', ARRAY['React','Vite','Tailwind CSS','Supabase','jsPDF','Vercel'], '/screenshots/bastian-dev.png', 1),
('Piscina Oasis', 'Sistema de reservas para eventos en piscina. Landing con agenda interactiva, selección de fecha y generación automática de contrato al instante.', 'https://sistema-reservas-ruddy.vercel.app', 'https://github.com/Basty66/Sistema-Reservas', ARRAY['React','Vite','Tailwind CSS','jsPDF','Vercel'], '/screenshots/piscina-oasis.png', 2),
('DASHU FOR MEN', 'E-commerce de alisado coreano profesional. Catálogo de productos con Webpay Plus, Mercado Pago, SEO completo y schema.org para tienda.', 'https://dashu-store.vercel.app', 'https://github.com/Basty66/dashu-store', ARRAY['React','Vite','Tailwind CSS','SEO','Webpay','Vercel'], '/screenshots/dashu-store.png', 3),
('ViaKids', 'Plataforma de transporte escolar seguro con landing informativo, rutas, precios y formulario de contacto. Diseño responsivo con enfoque mobile-first.', 'https://via-kids-completo.vercel.app', 'https://github.com/Basty66/ViaKidsCompleto', ARRAY['React','Vite','Tailwind CSS','Mobile First','Vercel'], '/screenshots/viakids.png', 4);

-- 2. POSTS (blog)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  contenido TEXT NOT NULL,
  extracto TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published posts"
  ON posts FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can manage posts"
  ON posts FOR ALL
  USING (true)
  WITH CHECK (true);
