import { useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Reveal from './Reveal';

const OwlSprite = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 2 40 26" fill="none" className={className}>
    <path d="M20 6C12 6 7 12 7 19v4a3 3 0 003 3h20a3 3 0 003-3v-4c0-7-5-13-13-13z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11 9L7 3l7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M29 9l4-6-7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="15" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="25" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="15" cy="18" r="1.5" fill="currentColor" />
    <circle cx="25" cy="18" r="1.5" fill="currentColor" />
    <path d="M18.5 23l1.5 2 1.5-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const floatingOwls = [
  { top: '5%', left: '3%', size: 18, delay: 0, duration: 4.5 },
  { top: '8%', right: '8%', size: 26, delay: 1.3, duration: 5.2 },
  { top: '12%', left: '30%', size: 14, delay: 2.1, duration: 3.8 },
  { top: '18%', left: '60%', size: 22, delay: 0.5, duration: 4.7 },
  { top: '25%', right: '2%', size: 16, delay: 1.8, duration: 5.5 },
  { top: '30%', left: '8%', size: 28, delay: 0.9, duration: 4.2 },
  { top: '38%', left: '50%', size: 12, delay: 2.4, duration: 3.5 },
  { top: '42%', right: '5%', size: 20, delay: 0.3, duration: 5.8 },
  { top: '48%', left: '15%', size: 15, delay: 1.6, duration: 4 },
  { top: '55%', left: '70%', size: 24, delay: 0.7, duration: 5.1 },
  { top: '60%', right: '10%', size: 17, delay: 2.2, duration: 3.9 },
  { top: '65%', left: '4%', size: 11, delay: 1.1, duration: 4.8 },
  { top: '70%', left: '40%', size: 21, delay: 0.6, duration: 5.3 },
  { top: '75%', right: '3%', size: 13, delay: 1.9, duration: 4.1 },
  { top: '80%', left: '55%', size: 19, delay: 0.2, duration: 5.7 },
  { top: '83%', left: '15%', size: 25, delay: 1.4, duration: 4.4 },
  { top: '88%', right: '20%', size: 16, delay: 2.5, duration: 3.6 },
  { top: '92%', left: '75%', size: 22, delay: 0.8, duration: 5 },
  { top: '35%', left: '85%', size: 14, delay: 1.2, duration: 4.9 },
  { top: '50%', left: '30%', size: 10, delay: 2, duration: 3.7 },
];

const Hero = () => {
  const innerRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTimeoutRef = useRef(null);

  const scrollToCotizador = useCallback(() => {
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    if (location.pathname !== '/') {
      navigate('/');
      scrollTimeoutRef.current = setTimeout(() => {
        const el = document.getElementById('cotizador');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('cotizador');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const innerEls = innerRefs.current;
    let rafId;

    const handleMouse = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const mx = e.clientX / window.innerWidth;
        const my = e.clientY / window.innerHeight;
        innerEls.forEach((el, i) => {
          if (!el) return;
          const owl = floatingOwls[i];
          const nx = owl.left ? parseFloat(owl.left) / 100 : 1 - parseFloat(owl.right) / 100;
          const ny = parseFloat(owl.top) / 100;
          const strength = (owl.size / 30) * 120;
          const dx = (mx - nx) * strength;
          const dy = (my - ny) * strength;
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        });
      });
    };

    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto gap-8 sm:gap-12 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingOwls.map((owl, i) => (
          <div
            key={i}
            className="absolute pointer-events-auto group cursor-default"
            style={{
              top: owl.top,
              left: owl.left,
              right: owl.right,
              opacity: 0.12,
              animation: `float-owl ${owl.duration}s ease-in-out ${owl.delay}s infinite`,
            }}
          >
            <div
              ref={(el) => { innerRefs.current[i] = el; }}
              className="transition-transform duration-[1200ms] ease-out will-change-transform"
              style={{ transform: 'translate(0px, 0px)' }}
            >
              <div className="relative transition-all duration-500 ease-out group-hover:scale-[2.5] group-hover:drop-shadow-[0_0_16px_rgba(34,211,238,0.9)]">
                <OwlSprite size={owl.size} className="text-cyan-400 transition-all duration-500 group-hover:text-white" />
                <span className="absolute inset-0 rounded-full bg-cyan-400/0 scale-0 transition-all duration-500 ease-out group-hover:scale-[2] group-hover:bg-cyan-400/10" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Reveal animation="fade-left" className="relative z-10 flex-1 space-y-5 sm:space-y-6 text-center lg:text-left">
        <span className="inline-block text-brand-cyan font-semibold tracking-wider text-xs sm:text-sm uppercase px-2.5 sm:px-3 py-1 bg-brand-cyan/10 rounded-full border border-brand-cyan/20 backdrop-blur-sm">
          Analista Programador Independiente
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
          <span className="bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
            Llevamos tu negocio al mundo digital con
          </span>{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
            mantención $0
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl">
          Desarrollo software y plataformas e-commerce a medida bajo arquitecturas serverless de última generación. Rapidez extrema sin los costosos servidores tradicionales.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-3 sm:pt-4">
          <button
            onClick={scrollToCotizador}
            className="relative overflow-hidden group text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-500 ease-out border border-brand-cyan/30 bg-brand-cyan/5 shadow-lg shadow-brand-cyan/10 animate-neon hover:animate-none hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-brand-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Cotizar mi proyecto</span>
          </button>
          <button
            onClick={() => navigate('/portafolio')}
            className="relative overflow-hidden group border border-brand-cyan/30 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-500 ease-out bg-brand-cyan/5 shadow-lg shadow-brand-cyan/10 animate-neon hover:animate-none hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm sm:text-base">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-brand-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10">Ver Portafolio</span>
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4 sm:pt-6">
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-heading text-white">+20</span>
            <span className="text-xs text-slate-400">Proyectos entregados</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-heading text-white">+15</span>
            <span className="text-xs text-slate-400">Clientes satisfechos</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <span className="block text-2xl sm:text-3xl font-bold font-heading text-white">100%</span>
            <span className="text-xs text-slate-400">Disponibilidad</span>
          </div>
        </div>
      </Reveal>
      <Reveal animation="fade-right" delay={200} className="relative z-10 flex-1 w-full max-w-xl">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-lg animate-float">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 rounded-full blur-3xl -z-10" />
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-red-500/80 rounded-full animate-pulse" />
              <span className="w-3 h-3 bg-yellow-500/80 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              <span className="w-3 h-3 bg-green-500/80 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <span className="text-xs text-slate-400 font-heading">frontbastianpage.cl</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/20 hover:bg-white/[0.05]">
              <div className="text-xs text-slate-400 mb-1">Rendimiento Core Web Vitals</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold font-heading text-emerald-400">100%</div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-300 h-full w-full rounded-full animate-gradient" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/20 hover:bg-white/[0.05]">
                <div className="text-xs text-slate-400 mb-1">Costo Fijo de Servidor</div>
                <div className="text-xl font-bold font-heading text-white">$0 CLP <span className="text-xs text-emerald-400">Serverless</span></div>
              </div>
              <div className="p-4 bg-white/[0.03] rounded-xl border border-white/5 backdrop-blur-sm transition-all duration-300 hover:border-brand-cyan/20 hover:bg-white/[0.05]">
                <div className="text-xs text-slate-400 mb-1">Ventas Procesadas (Mes)</div>
                <div className="text-xl font-bold font-heading bg-gradient-to-r from-brand-cyan to-cyan-300 bg-clip-text text-transparent">+99.9% Up</div>
              </div>
            </div>

            <div className="p-4 bg-white/[0.02] rounded-xl font-mono text-xs text-brand-cyan/60 space-y-1 border border-white/5 backdrop-blur-sm">
              <p>
                <span className="text-purple-400">const</span> shop = <span className="text-yellow-400">createStore</span>(React);
                <span className="inline-block ml-1 w-1.5 h-4 bg-brand-cyan/80 align-middle animate-pulse" />
              </p>
              <p>
                <span className="text-purple-400">export default</span> serverlessEdgeContext;
                <span className="inline-block ml-1 w-1.5 h-4 bg-brand-cyan/80 align-middle animate-pulse" />
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;