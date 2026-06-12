import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
const Admin = lazy(() => import('./components/Admin'));
import { Menu, X, Palette } from 'lucide-react';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonios from './components/Testimonios';
import PortfolioSection from './components/Portfolio';
import About from './components/About';
import FAQ from './components/FAQ';
import LogoCarousel from './components/LogoCarousel';
import ExitPopup from './components/ExitPopup';
import Reveal from './components/Reveal';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Cookies from './components/Cookies';
import { WHATSAPP_FULL } from './lib/constants';

const Cotizador = lazy(() => import('./components/Cotizador'));

function CotizadorSkeleton() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="text-center mb-10 sm:mb-12 space-y-3">
          <div className="h-10 w-72 sm:h-12 sm:w-96 bg-white/5 rounded-xl mx-auto" />
          <div className="h-5 w-56 bg-white/5 rounded-lg mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-2xl" />
          ))}
        </div>
        <div className="h-96 bg-white/[0.02] border border-white/5 rounded-2xl" />
      </div>
    </section>
  );
}

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
      <Testimonios />
      <LogoCarousel />
      <PortfolioSection />
      <About />
      <FAQ />
      <Suspense fallback={<CotizadorSkeleton />}>
        <Cotizador />
      </Suspense>
    </main>
  );
};

const PortfolioPage = () => <PortfolioSection fullPage />;

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6">
    <Reveal animation="fade-up" className="text-center max-w-lg">
      <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold font-heading text-brand-cyan">404</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">Página no encontrada</h2>
      <p className="text-slate-300 mb-8">La página que buscas no existe o fue movida.</p>
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
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accent, setAccent] = useState(() => {
    try { return localStorage.getItem('bd-accent') || 'cyan'; } catch { return 'cyan'; }
  });
  const [logoClicks, setLogoClicks] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const logoTimeoutRef = useRef(null);

  const handleLogoClick = useCallback(() => {
    setLogoClicks((prev) => prev + 1);
    clearTimeout(logoTimeoutRef.current);
    logoTimeoutRef.current = setTimeout(() => setLogoClicks(0), 2000);
  }, []);

  useEffect(() => {
    if (logoClicks >= 5) {
      setLogoClicks(0);
      navigate('/admin');
    }
  }, [logoClicks, navigate]);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    try { localStorage.setItem('bd-accent', accent); } catch {}
  }, [accent]);

  useEffect(() => {
    return () => { clearTimeout(logoTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setShowBackToTop(y > 300);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? Math.min((y / docH) * 100, 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen text-white selection:bg-brand-cyan/30 selection:text-white bg-gradient-to-tr from-[#030712] via-[#0b1329] to-[#0f172a] overflow-x-hidden max-w-[100vw]">
      {/* Scroll Progress */}
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />

      {/* Trust Bar */}
      <nav className={`border-b transition-all duration-700 ease-out backdrop-blur-xl sticky top-0 z-50 ${
        scrolled ? 'bg-slate-900/85 border-white/10 shadow-lg shadow-black/10' : 'bg-slate-900/40 border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link to="/" onClick={(e) => { handleLogoClick(); setMenuOpen(false); }} className="flex items-center gap-1.5 sm:gap-2 group">
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
            <button
              onClick={() => setAccent(accent === 'cyan' ? 'blue' : accent === 'blue' ? 'purple' : 'cyan')}
              className="ml-2 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all duration-300"
              title="Cambiar color de acento"
            >
              <Palette className="w-4 h-4" />
            </button>
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

      <ErrorBoundary>
        <div key={location.pathname} className="page-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portafolio" element={<PortfolioPage />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/terminos" element={<Terms />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400">Cargando...</div>}><Admin /></Suspense>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </ErrorBoundary>

      <Reveal animation="fade-up" as="footer" className="border-t border-white/5 bg-slate-900/30 backdrop-blur-md py-6 sm:py-8 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
          <Link to="/privacidad" className="text-xs sm:text-sm text-slate-400 hover:text-brand-cyan transition-colors">Política de Privacidad</Link>
          <Link to="/terminos" className="text-xs sm:text-sm text-slate-400 hover:text-brand-cyan transition-colors">Términos y Condiciones</Link>
          <Link to="/cookies" className="text-xs sm:text-sm text-slate-400 hover:text-brand-cyan transition-colors">Política de Cookies</Link>
        </div>
        <p className="text-slate-300 text-xs sm:text-sm">© 2026 Bastian.dev — Analista Programador. Desarrollado con React y Tailwind CSS.</p>
      </Reveal>

      <a
        href={WHATSAPP_FULL}
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
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/20 hover:bg-white/[0.1] hover:border-white/20 hover:scale-110 transition-all duration-500 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Volver arriba"
      >
        <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <CookieConsent />
      <ExitPopup />
    </div>
  );
}

export default App;
