import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Star } from 'lucide-react';
import Reveal from './Reveal';
import useCountUp from '../hooks/useCountUp';
import useRipple from '../hooks/useRipple';

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

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 3 + 1.5,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 5,
  blue: i < 14,
}));

function ROICalculator() {
  const [hostingCost, setHostingCost] = useState(15000);
  const yearly = hostingCost * 12;

  return (
    <div className="space-y-2 font-normal not-italic">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#A1A1AA]">Hosting actual:</span>
        <span className="text-white font-semibold">${hostingCost.toLocaleString('es-CL')}/mes</span>
      </div>
      <input
        type="range"
        min="5000"
        max="50000"
        step="1000"
        value={hostingCost}
        onChange={(e) => setHostingCost(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[#A1A1AA]">$5.000</span>
        <span className="text-[10px] text-[#A1A1AA]">$50.000</span>
      </div>
      <div className="pt-1 border-t border-white/5 mt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#A1A1AA]">Ahorras al año:</span>
          <span className="text-white font-bold text-sm">${yearly.toLocaleString('es-CL')}</span>
        </div>
      </div>
    </div>
  );
}

function CounterBlock({ target, suffix, label }) {
  const [ref, count, started] = useCountUp(target);
  const display = suffix === '%' ? `${count}%` : `${count}+`;
  return (
    <div ref={ref} className="text-center min-w-0">
      <span className={`block text-xl sm:text-2xl md:text-3xl font-bold font-heading text-white transition-all duration-700 ${started ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {started ? display : suffix === '%' ? '0%' : '0+'}
      </span>
      <span className="text-[10px] sm:text-xs text-slate-400 whitespace-nowrap">{label}</span>
    </div>
  );
}

const Hero = () => {
  const innerRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [typewriterText, setTypewriterText] = useState('');
  const createRipple = useRipple();

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
    const text = 'venda más';
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypewriterText(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setTypewriterDone(true), 600);
      }
    }, 80);
    return () => clearInterval(interval);
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
    <section id="inicio" className="relative min-h-[90vh] flex flex-col lg:flex-row items-center justify-between py-12 sm:py-16 px-4 sm:px-6 max-w-7xl mx-auto gap-8 sm:gap-12 overflow-x-hidden bg-grid">
      {/* Particles - hidden on mobile for perf */}
      <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className={`absolute rounded-full ${p.blue ? 'bg-blue-400/40' : 'bg-white/25'}`}
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              boxShadow: p.blue ? `0 0 ${p.size * 3}px rgba(37,99,235,0.4)` : 'none',
              animation: `particle-float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        {floatingOwls.map((owl, i) => (
          <div
            key={i}
            className={`absolute pointer-events-auto group cursor-default ${i > 2 ? 'hidden sm:block' : ''}`}
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
              <div className="relative transition-all duration-500 ease-out group-hover:scale-[2.5] group-hover:drop-shadow-[0_0_16px_rgba(37,99,235,0.9)]">
                <OwlSprite size={owl.size} className="text-blue-400/50 transition-all duration-500 group-hover:text-blue-400" />
                <span className="absolute inset-0 rounded-full bg-white/0 scale-0 transition-all duration-500 ease-out group-hover:scale-[2] group-hover:bg-white/[0.06]" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Reveal animation="fade-left" className="relative z-10 flex-1 space-y-5 sm:space-y-6 text-center lg:text-left">
        <span className="inline-block text-white/60 font-semibold tracking-wider text-xs sm:text-sm uppercase px-2.5 sm:px-3 py-1 bg-white/[0.03] rounded-full border border-white/[0.06] backdrop-blur-sm">
          Agencia Digital · Chile
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight">
          <span className="bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
            Tu negocio necesita una web que
          </span>{' '}
          <span className="text-white">
            {typewriterText}{!typewriterDone && <span className="animate-typewriter-cursor text-blue-500">|</span>}
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#A1A1AA] max-w-2xl">
          Creamos páginas web profesionales para negocios chilenos. Sin costos mensuales, sin complicaciones técnicas, sin sorpresas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-3 sm:pt-4">
          <button
            onClick={(e) => { createRipple(e); scrollToCotizador(); }}
            className="ripple-container relative overflow-hidden group bg-blue-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-500 ease-out hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5 text-sm sm:text-base glow-blue-sm"
          >
            <span className="relative z-10">Cotizar mi proyecto</span>
          </button>
          <button
            onClick={(e) => { createRipple(e); navigate('/portafolio'); }}
            className="ripple-container relative overflow-hidden group border border-white/10 text-white font-medium px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-500 ease-out bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/20 hover:-translate-y-0.5 text-sm sm:text-base">
            <span className="relative z-10">Ver Portafolio</span>
          </button>
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-4 sm:pt-6 flex-wrap">
          <CounterBlock refKey="proy" target={20} suffix="+" label="Proyectos" />
          <div className="w-px h-8 sm:h-10 bg-white/10" />
          <CounterBlock refKey="cli" target={15} suffix="+" label="Clientes" />
          <div className="w-px h-8 sm:h-10 bg-white/10" />
          <CounterBlock refKey="disp" target={100} suffix="%" label="Disponibilidad" />
        </div>
        <Reveal animation="fade-up" delay={400} className="pt-4 sm:pt-6">
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 backdrop-blur-sm max-w-sm mx-auto lg:mx-0">
            <div className="flex -space-x-2">
              {['M', 'C', 'P'].map((initial, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-white/[0.06] border-2 border-[#09090B] flex items-center justify-center text-white/60 text-xs font-bold">
                  {initial}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 fill-blue-400/60 text-blue-400/60" />
                ))}
              </div>
              <p className="text-[10px] text-[#A1A1AA] truncate">+15 clientes satisfechos</p>
            </div>
          </div>
        </Reveal>
      </Reveal>
      <Reveal animation="fade-right" delay={200} className="relative z-10 flex-1 w-full max-w-xl">
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-sm md:backdrop-blur-lg md:animate-float">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 mb-6">
            <div className="flex gap-2">
              <span className="w-3 h-3 bg-white/20 rounded-full" />
              <span className="w-3 h-3 bg-white/10 rounded-full" />
              <span className="w-3 h-3 bg-white/5 rounded-full" />
            </div>
            <span className="text-xs text-[#A1A1AA] font-heading">frontbastianpage.cl</span>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
              <div className="text-xs text-[#A1A1AA] mb-1">Rendimiento Core Web Vitals</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold font-heading text-white">100%</div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-white/60 h-full w-full rounded-full" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                <div className="text-xs text-[#A1A1AA] mb-1">Costo Fijo de Servidor</div>
                <div className="text-xl font-bold font-heading text-white">$0 CLP <span className="text-xs text-[#A1A1AA]">Hosting incluido</span></div>
              </div>
              <div className="p-4 bg-white/[0.02] rounded-xl border border-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                <div className="text-xs text-[#A1A1AA] mb-1">Ahorro Anual vs Hosting</div>
                <div className="text-xl font-bold font-heading text-white">
                  <ROICalculator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Hero;