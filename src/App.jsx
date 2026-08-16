import { useEffect, useState, useCallback, useRef, lazy, Suspense } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
const Admin = lazy(() => import('./components/Admin'));
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Testimonios from './components/Testimonios';
import About from './components/About';
import PortfolioSection from './components/Portfolio';
import CtaBanner from './components/CtaBanner';
import FloatingActions from './components/FloatingActions';
import ExitPopup from './components/ExitPopup';
import Reveal from './components/Reveal';
import ErrorBoundary from './components/ErrorBoundary';
import CookieConsent from './components/CookieConsent';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import useScrollLock from './hooks/useScrollLock';
import Cookies from './components/Cookies';
import { CotizadorSkeleton } from './components/Skeletons';


const Cotizador = lazy(() => import('./components/Cotizador'));

const navLinks = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Sobre Mí', id: 'sobre-mi' },
  { label: 'Cómo funciona', id: 'proceso' },
  { label: 'Portafolio', id: 'portafolio' },
  { label: 'Cotizar', id: 'cotizador' },
];

const Home = () => {
  return (
    <main>
      <Hero />
      <PortfolioSection />
      <CtaBanner />
      <Suspense fallback={<CotizadorSkeleton />}>
        <Cotizador />
      </Suspense>
      <Testimonios />
    </main>
  );
};

const PortfolioPage = () => <PortfolioSection fullPage />;

const ProcesoPage = lazy(() => import('./components/Proceso'));

const AboutPage = () => (
  <main>
    <About />
  </main>
);

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ background: '#09090B' }}>
    <Reveal animation="fade-up" className="text-center max-w-lg">
      <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
        <span className="text-3xl sm:text-4xl font-bold font-heading text-white/60">404</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-gradient-chrome">Página no encontrada</h2>
      <p className="text-[#A1A1AA] mb-8">La página que buscas no existe o fue movida.</p>
      <Link to="/" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-medium">
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const logoClicksRef = useRef(0);
  const logoTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  // El scroll ocurre en el contenedor interno, no en window
  const scrollerRef = useRef(null);

  useScrollLock(menuOpen);

  useEffect(() => {
    return () => { clearTimeout(scrollTimeoutRef.current); };
  }, []);

  // Easter egg: 3 clicks seguidos en el logo abren el panel admin
  const handleLogoClick = useCallback(() => {
    clearTimeout(logoTimeoutRef.current);
    logoClicksRef.current += 1;
    if (logoClicksRef.current >= 3) {
      logoClicksRef.current = 0;
      navigate('/admin');
      return;
    }
    logoTimeoutRef.current = setTimeout(() => { logoClicksRef.current = 0; }, 2000);
  }, [navigate]);

  useEffect(() => {
    return () => { clearTimeout(logoTimeoutRef.current); };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = el.scrollTop;
          setScrolled(y > 60);
          setShowBackToTop(y > 300);
          const max = el.scrollHeight - el.clientHeight;
          setScrollProgress(max > 0 ? Math.min((y / max) * 100, 100) : 0);
          ticking = false;
        });
        ticking = true;
      }
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Al cambiar de ruta el contenedor conserva el scroll anterior.
  // Instantáneo a propósito: animarlo en un cambio de página se siente lento.
  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const scrollToTop = useCallback(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    clearTimeout(scrollTimeoutRef.current);
    if (id === 'portafolio' || id === 'proceso' || id === 'sobre-mi') {
      navigate(`/${id}`);
      return;
    }
    if (id === 'cotizador') {
      if (location.pathname !== '/') {
        navigate('/');
        scrollTimeoutRef.current = setTimeout(() => {
          const el = document.getElementById('cotizador');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('cotizador');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      scrollTimeoutRef.current = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate, location.pathname]);

  return (
    <div className="h-screen flex flex-col text-white selection:bg-white/30 selection:text-white overflow-hidden" style={{ background: '#09090B' }}>
      {/* Scroll Progress */}
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${scrollProgress / 100})` }} />

      {/* Trust Bar */}
      <nav className={`border-b transition-[background,border-color,box-shadow] duration-500 ease-out backdrop-blur-md sticky top-0 z-50 ${
        scrolled ? 'bg-[#09090B]/80 border-white/[0.06] shadow-lg shadow-black/20' : 'bg-[#09090B]/40 border-white/[0.04]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center">
          <Link to="/" onClick={(e) => { e.preventDefault(); handleLogoClick(); setMenuOpen(false); }} className="flex items-center gap-1.5 sm:gap-2 group">
            <svg viewBox="0 2 40 26" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" style={{ animation: 'fade-slide-in 0.6s ease-out' }}>
              <path d="M20 6C12 6 7 12 7 19v4a3 3 0 003 3h20a3 3 0 003-3v-4c0-7-5-13-13-13z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.6" className="group-hover:stroke-[#2563EB] group-hover:stroke-opacity-100 t-smooth duration-500" />
              <path d="M11 9L7 3l7 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" className="group-hover:stroke-[#2563EB] group-hover:stroke-opacity-100 t-smooth duration-500" />
              <path d="M29 9l4-6-7 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" className="group-hover:stroke-[#2563EB] group-hover:stroke-opacity-100 t-smooth duration-500" />
              <circle cx="15" cy="18" r="3.5" stroke="white" strokeWidth="1.6" strokeOpacity="0.6" className="group-hover:stroke-[#2563EB] group-hover:stroke-opacity-100 t-smooth duration-500" />
              <circle cx="25" cy="18" r="3.5" stroke="white" strokeWidth="1.6" strokeOpacity="0.6" className="group-hover:stroke-[#2563EB] group-hover:stroke-opacity-100 t-smooth duration-500" />
              <circle cx="15" cy="18" r="1.5" fill="white" fillOpacity="0.8" className="group-hover:fill-[#2563EB] t-smooth duration-500" />
              <circle cx="25" cy="18" r="1.5" fill="white" fillOpacity="0.8" className="group-hover:fill-[#2563EB] t-smooth duration-500" />
              <path d="M18.5 23l1.5 2 1.5-2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" className="group-hover:stroke-[#2563EB] group-hover:stroke-opacity-100 t-smooth duration-500" />
            </svg>
            <span className="font-bold text-lg sm:text-xl tracking-tight" style={{ animation: 'fade-slide-in 0.6s ease-out 0.1s both' }}>
              <span className="text-gradient-blue">BS</span><span className="text-gradient-chrome">DigitalTech</span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 items-center justify-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="group relative px-3 py-1.5 text-[13px] font-medium rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/[0.03] transition-[color,background] duration-300"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute inset-x-2 bottom-1 h-[1px] bg-blue-500/60 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
              aria-label="Menú"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer - outside nav to avoid z-index conflict */}
      <div className={`md:hidden fixed inset-0 z-[60] t-smooth duration-300 ${menuOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-[85vw] max-w-80 bg-gradient-to-b from-[#0C0C0F] via-[#09090B] to-[#09090B] border-l border-blue-500/10 shadow-2xl shadow-black/50 flex flex-col transition-transform duration-300 ease-out backdrop-blur-xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <span className="font-bold text-base tracking-tight">
              <span className="text-gradient-blue">BS</span><span className="text-gradient-chrome">DigitalTech</span>
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-[#A1A1AA] hover:text-white transition-colors rounded-lg hover:bg-white/[0.05]"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="relative flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => { scrollTo(link.id); setMenuOpen(false); }}
                className="group relative block w-full text-left px-4 py-3 text-sm font-medium text-[#A1A1AA] hover:text-white t-smooth duration-300 rounded-xl hover:bg-blue-500/[0.06]"
                style={{ animation: menuOpen ? `fade-slide-in 0.3s ease-out ${0.05 + i * 0.04}s both` : 'none' }}
              >
                <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-blue-500/60 rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-top" />
                <span className="relative z-10 t-smooth duration-300 group-hover:text-blue-400 group-hover:translate-x-1">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>
          <div className="relative px-5 py-4 border-t border-white/[0.06]">
            <a
              href="https://wa.me/56933933434?text=%C2%A1Hola!%20Quisiera%20una%20cotizaci%C3%B3n%20para%20un%20proyecto%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 t-smooth duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div ref={scrollerRef} className="app-scroller flex-1 overflow-y-auto">
        <ErrorBoundary>
          <div key={location.pathname} className="page-enter">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portafolio" element={<PortfolioPage />} />
              <Route path="/proceso" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400"><div className="animate-pulse text-sm">Cargando...</div></div>}><ErrorBoundary><ProcesoPage /></ErrorBoundary></Suspense>} />
              <Route path="/sobre-mi" element={<AboutPage />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/terminos" element={<Terms />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/admin" element={<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400"><div className="animate-pulse text-sm">Cargando panel...</div></div>}><ErrorBoundary><Admin /></ErrorBoundary></Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </ErrorBoundary>

        <Reveal animation="fade-up" as="footer" className="border-t border-white/5 backdrop-blur-md py-6 sm:py-8 px-4 sm:px-6 text-center" style={{ background: '#09090B' }}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-4">
            <Link to="/privacidad" className="text-xs sm:text-sm text-[#A1A1AA] hover:text-blue-400 transition-colors">Política de Privacidad</Link>
            <Link to="/terminos" className="text-xs sm:text-sm text-[#A1A1AA] hover:text-blue-400 transition-colors">Términos y Condiciones</Link>
            <Link to="/cookies" className="text-xs sm:text-sm text-[#A1A1AA] hover:text-blue-400 transition-colors">Política de Cookies</Link>
          </div>
          <p className="text-[#A1A1AA] text-xs mb-2">Santiago, Región Metropolitana, Chile</p>
          <p className="text-[#A1A1AA] text-xs sm:text-sm">© 2026 BS DigitalTech — Desarrollo Web para PYMEs Chilenas · Hosting $0</p>
        </Reveal>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-4 left-4 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/[0.05] border border-blue-500/20 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/20 hover:bg-blue-600/10 hover:border-blue-500/40 hover:scale-110 transition-[background,border-color,transform,opacity] duration-500 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Volver arriba"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <FloatingActions />
      <CookieConsent />
      <ExitPopup />
    </div>
  );
}

export default App;
