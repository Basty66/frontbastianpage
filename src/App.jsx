import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Cotizador from './components/Cotizador';
import Reveal from './components/Reveal';

const navLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Sobre Mí', id: 'sobre-mi' },
  { label: 'Portafolio', id: 'portafolio' },
  { label: 'Cotizar', id: 'cotizador' },
];

const Home = () => {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Cotizador />
    </main>
  );
};

const Portfolio = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
    <Reveal animation="fade-up" className="text-center max-w-lg">
      <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
        <svg className="w-8 sm:w-10 h-8 sm:h-10 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
        </svg>
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">Portafolio</span>
          </h2>
      <p className="text-slate-300 mb-8">Próximamente estaré mostrando aquí los proyectos más recientes de mis clientes.</p>
      <Link to="/" className="inline-flex items-center gap-2 text-brand-cyan hover:text-cyan-300 transition-colors font-medium">
        <span>&larr;</span> Volver al inicio
      </Link>
    </Reveal>
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    if (id === 'portafolio') {
      navigate('/portafolio');
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate, location.pathname]);

  return (
    <div className="min-h-screen text-white selection:bg-brand-cyan/30 selection:text-white bg-gradient-to-tr from-[#030712] via-[#0b1329] to-[#0f172a]">
      <nav className={`border-b transition-all duration-700 ease-out backdrop-blur-xl sticky top-0 z-50 ${
        scrolled ? 'bg-slate-900/85 border-white/10 shadow-lg shadow-black/10' : 'bg-slate-900/40 border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-1.5 sm:gap-2 group">
            <svg viewBox="0 2 40 26" fill="none" className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" style={{ animation: 'fade-slide-in 0.6s ease-out' }}>
              <path d="M20 6C12 6 7 12 7 19v4a3 3 0 003 3h20a3 3 0 003-3v-4c0-7-5-13-13-13z" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-700" />
              <path d="M11 9L7 3l7 4" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-700" />
              <path d="M29 9l4-6-7 4" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-700" />
              <circle cx="15" cy="18" r="3.5" stroke="#22d3ee" strokeWidth="1.6" className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-700" />
              <circle cx="25" cy="18" r="3.5" stroke="#22d3ee" strokeWidth="1.6" className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-700" />
              <circle cx="15" cy="18" r="1.5" fill="#ffffff" className="transition-all duration-700" />
              <circle cx="25" cy="18" r="1.5" fill="#ffffff" className="transition-all duration-700" />
              <path d="M18.5 23l1.5 2 1.5-2" stroke="#22d3ee" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-700" />
            </svg>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-white" style={{ animation: 'fade-slide-in 0.6s ease-out 0.1s both' }}>
              Bastian<span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(34,211,238,0.25)]">.dev</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="group relative px-3 sm:px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.03] hover:scale-105"
                style={{ animation: `fade-slide-in 0.5s ease-out ${0.2 + i * 0.08}s both` }}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {link.label}
                </span>
                <span className="absolute inset-x-3 bottom-1.5 h-[2px] bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
              aria-label="Menú"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 space-y-1 border-t border-white/5 pt-3">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="group relative block w-full text-left px-4 py-3 text-base font-medium text-slate-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/[0.03] hover:scale-[1.02] overflow-hidden"
                style={{ animation: `fade-slide-in 0.4s ease-out ${0.1 + i * 0.06}s both` }}
              >
                <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-cyan-300 via-brand-cyan to-blue-400 rounded-full translate-x-0 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-top" />
                <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:translate-x-2">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portafolio" element={<Portfolio />} />
      </Routes>

      <Reveal animation="fade-up" as="footer" className="border-t border-white/5 bg-slate-900/30 backdrop-blur-md py-6 sm:py-8 px-4 sm:px-6 text-center text-slate-300 text-xs sm:text-sm">
        <p>© 2026 Bastian.dev — Analista Programador. Desarrollado con React y Tailwind CSS.</p>
      </Reveal>

      <a
        href="https://wa.me/56928122947?text=Hola%20Bastian%2C%20tengo%20una%20consulta%20sobre%20tus%20servicios%20de%20desarrollo%20web."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/50 hover:scale-110 transition-all duration-300 animate-float group"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-xl animate-pulse" />
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 relative z-10">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}

export default App;
