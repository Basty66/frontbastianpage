import { useState, useRef, useCallback, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import Reveal from './Reveal';
import { supabase } from '../lib/supabaseClient';
import { proyectos as fallbackProyectos } from '../data/portfolio';

const colores = [
  'from-blue-600/20 to-blue-500/5',
  'from-blue-500/15 to-blue-400/5',
  'from-blue-600/20 to-blue-500/5',
  'from-blue-500/15 to-blue-400/5',
];

function Thumbnail({ proj, idx }) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials = proj.titulo.split(/[\s-]+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const gradient = colores[idx % colores.length];
  const showGradient = !proj.screenshot || imgError;

  return (
    <div className="relative w-full h-full bg-slate-800 overflow-hidden">
      {showGradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <span className="text-white/15 font-heading font-black select-none text-4xl sm:text-5xl">{initials}</span>
          </div>
        </div>
      )}
      {proj.screenshot && (
        <img
          src={proj.screenshot}
          alt={proj.titulo}
          className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
    </div>
  );
}

const Portfolio = ({ fullPage = false }) => {
  const [proyectos, setProyectos] = useState(fallbackProyectos);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    const fetchProyectos = async () => {
      try {
        if (!supabase) { setLoading(false); return; }
        const { data, error } = await supabase
          .from('proyectos')
          .select('*')
          .eq('visible', true)
          .order('orden', { ascending: true });
        if (error) throw error;
        if (mounted && data && data.length > 0) setProyectos(data);
      } catch (err) {
        console.error('Error al cargar proyectos:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProyectos();
    return () => { mounted = false; };
  }, []);

  const displayProjects = fullPage ? proyectos : proyectos.slice(0, 3);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { el.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
  }, [checkScroll, loading]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.querySelector('[data-card]')?.offsetWidth || 320;
    el.scrollBy({ left: dir * (cardW + 16), behavior: 'smooth' });
  };

  const handleKeyDown = useCallback((e) => {
    if (lightboxIdx === null) return;
    if (e.key === 'Escape') setLightboxIdx(null);
    if (e.key === 'ArrowRight') setLightboxIdx((prev) => Math.min(prev + 1, displayProjects.length - 1));
    if (e.key === 'ArrowLeft') setLightboxIdx((prev) => Math.max(prev - 1, 0));
  }, [lightboxIdx, displayProjects.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (fullPage) {
    return (
      <section id="portafolio" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6" style={{ background: '#09090B' }}>
        <div className="max-w-7xl mx-auto">
          <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              <span className="text-white">Proyectos </span>
              <span className="text-gradient-blue">en vivo</span>
            </h2>
            <p className="text-[#A1A1AA]">Sitios web y aplicaciones que he desarrollado y desplegado en producción.</p>
          </Reveal>
          {loading ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-80 bg-white/[0.02] border border-white/[0.06] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              {displayProjects.map((proj, i) => (
                <CaseStudyCard key={proj.id} proj={proj} idx={i} onImageClick={() => setLightboxIdx(i)} />
              ))}
            </div>
          )}
        </div>
        {lightboxIdx !== null && (
          <Lightbox
            proj={displayProjects[lightboxIdx]}
            onClose={() => setLightboxIdx(null)}
            onPrev={() => setLightboxIdx(Math.max(lightboxIdx - 1, 0))}
            onNext={() => setLightboxIdx(Math.min(lightboxIdx + 1, displayProjects.length - 1))}
            hasPrev={lightboxIdx > 0}
            hasNext={lightboxIdx < displayProjects.length - 1}
          />
        )}
      </section>
    );
  }

  return (
    <section id="portafolio" className="py-16 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3 tracking-tight">
            <span className="text-white">Casos de </span>
            <span className="text-gradient-blue">éxito</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base">Así ayudé a otros negocios a vender más con su web.</p>
        </Reveal>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[85vw] sm:w-[400px] h-80 bg-white/[0.02] border border-white/[0.06] rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="relative">
            {canScrollLeft && (
              <button onClick={() => scroll(-1)} className="hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 items-center justify-center text-white/60 hover:bg-white/[0.1] hover:text-white transition-all duration-300 backdrop-blur-md">
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {canScrollRight && (
              <button onClick={() => scroll(1)} className="hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 items-center justify-center text-white/60 hover:bg-white/[0.1] hover:text-white transition-all duration-300 backdrop-blur-md">
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {displayProjects.map((proj, i) => (
                <Reveal key={proj.id} animation="fade-up" delay={i * 80} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-start" data-card>
                  <CaseStudyCard proj={proj} idx={i} compact onImageClick={() => setLightboxIdx(i)} />
                </Reveal>
              ))}

              <Reveal animation="fade-up" delay={displayProjects.length * 80} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-start">
                <button
                  onClick={() => navigate('/portafolio')}
                  className="group w-full h-full min-h-[380px] bg-white/[0.02] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-500/[0.03] transition-all duration-500"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/[0.08] border border-blue-500/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <ArrowUpRight className="w-6 h-6 text-blue-400/70 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/70 font-medium text-sm group-hover:text-white transition-colors">Ver todos los proyectos</p>
                    <p className="text-white/30 text-xs mt-1">{proyectos.length} proyectos en total</p>
                  </div>
                </button>
              </Reveal>
            </div>
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          proj={displayProjects[lightboxIdx]}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => setLightboxIdx(Math.max(lightboxIdx - 1, 0))}
          onNext={() => setLightboxIdx(Math.min(lightboxIdx + 1, displayProjects.length - 1))}
          hasPrev={lightboxIdx > 0}
          hasNext={lightboxIdx < displayProjects.length - 1}
        />
      )}
    </section>
  );
};

function CaseStudyCard({ proj, idx, compact, onImageClick }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials = proj.titulo.split(/[\s-]+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const gradient = colores[idx % colores.length];

  return (
    <div className={`group bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col h-full ${compact ? '' : 'md:flex-row'}`}>
      <div className={`relative overflow-hidden ${compact ? 'aspect-video' : 'md:w-1/2 aspect-video md:aspect-auto'}`}>
        {!proj.screenshot || imgError ? (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="text-white/15 font-heading font-black select-none text-5xl">{initials}</span>
            </div>
          </div>
        ) : (
          <img
            src={proj.screenshot}
            alt={proj.titulo}
            className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {proj.tipo && (
          <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/20 backdrop-blur-md z-10">
            {proj.tipo === 'ecommerce' ? 'E-commerce' : 'Landing Page'}
          </span>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onImageClick(); }}
          className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-black/60 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 z-20"
          aria-label="Ver imagen"
        >
          <Eye className="w-4 h-4" />
        </button>

        {compact && proj.problema && (
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 pointer-events-none">
            <div className="space-y-1.5 bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/[0.06]">
              <div>
                <span className="text-[9px] text-red-400/80 font-semibold uppercase tracking-wider">Problema</span>
                <p className="text-[11px] text-white/80 leading-snug mt-0.5 line-clamp-2">{proj.problema}</p>
              </div>
              <div>
                <span className="text-[9px] text-blue-400/80 font-semibold uppercase tracking-wider">Solución</span>
                <p className="text-[11px] text-white/80 leading-snug mt-0.5 line-clamp-2">{proj.solucion}</p>
              </div>
              <div>
                <span className="text-[9px] text-emerald-400/80 font-semibold uppercase tracking-wider">Resultado</span>
                <p className="text-[11px] text-white/80 leading-snug mt-0.5 line-clamp-2">{proj.resultado}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`flex flex-col flex-1 ${compact ? 'p-4' : 'p-5 sm:p-6 md:w-1/2'}`}>
        <div className="mb-2">
          <span className="text-[10px] text-blue-400/60 font-medium uppercase tracking-wider">{proj.cliente || proj.titulo}</span>
        </div>
        <h3 className="text-white font-heading font-semibold text-sm sm:text-base mb-2">{proj.titulo}</h3>

        {compact && proj.problema ? (
          <div className="flex-1">
            <p className="text-xs text-[#A1A1AA] leading-relaxed mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">{proj.desc}</p>
            <div className="space-y-1.5 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden">
              <div>
                <span className="text-[9px] text-red-400/70 font-semibold uppercase tracking-wider">Problema</span>
                <p className="text-[11px] text-[#A1A1AA] leading-snug mt-0.5">{proj.problema}</p>
              </div>
              <div>
                <span className="text-[9px] text-blue-400/70 font-semibold uppercase tracking-wider">Solución</span>
                <p className="text-[11px] text-[#A1A1AA] leading-snug mt-0.5">{proj.solucion}</p>
              </div>
              <div>
                <span className="text-[9px] text-emerald-400/70 font-semibold uppercase tracking-wider">Resultado</span>
                <p className="text-[11px] text-[#A1A1AA] leading-snug mt-0.5">{proj.resultado}</p>
              </div>
            </div>
          </div>
        ) : compact ? (
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3 line-clamp-2 flex-1">{proj.desc}</p>
        ) : !compact && proj.problema ? (
          <div className="space-y-2 mb-3 flex-1">
            <div>
              <span className="text-[10px] text-red-400/70 font-semibold uppercase tracking-wider">Problema</span>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{proj.problema}</p>
            </div>
            <div>
              <span className="text-[10px] text-blue-400/70 font-semibold uppercase tracking-wider">Solución</span>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{proj.solucion}</p>
            </div>
            <div>
              <span className="text-[10px] text-emerald-400/70 font-semibold uppercase tracking-wider">Resultado</span>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mt-0.5">{proj.resultado}</p>
            </div>
          </div>
        ) : !compact ? (
          <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3 flex-1">{proj.desc}</p>
        ) : null}

        <div className="flex flex-wrap gap-1 mb-3">
          {(proj.tags || []).slice(0, compact ? 3 : undefined).map((tag) => (
            <span key={tag} className="text-[9px] font-medium text-white/50 bg-blue-500/[0.06] border border-blue-500/10 rounded-full px-1.5 py-0.5">
              {tag}
            </span>
          ))}
          {!compact && (proj.tags || []).length > 3 && (
            <span className="text-[9px] text-white/30 px-1.5 py-0.5">+{(proj.tags || []).length - 3}</span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-white/5">
          <a
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link text-xs text-[#A1A1AA] hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <ExternalLink className="w-3 h-3 transition-transform duration-300 group-hover/link:rotate-12" />
            Visitar
          </a>
          {proj.repo && (
            <a
              href={proj.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link text-xs text-[#A1A1AA] hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Lightbox({ proj, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, []);

  if (!proj) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#18181B] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div>
            <h4 className="text-sm font-heading font-bold text-white">{proj.titulo}</h4>
            <p className="text-[10px] text-[#A1A1AA]">{proj.cliente}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-[#A1A1AA] hover:text-white flex items-center justify-center transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex-1 min-h-0 bg-black">
          {proj.screenshot ? (
            <img src={proj.screenshot} alt={proj.titulo} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/20 text-lg font-heading">Sin imagen</div>
          )}
          {hasPrev && (
            <button onClick={onPrev} className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {hasNext && (
            <button onClick={onNext} className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all">
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="px-4 py-3 border-t border-white/[0.06] space-y-2">
          {proj.problema && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[9px] text-red-400/70 font-semibold uppercase tracking-wider">Problema</span>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">{proj.problema}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[9px] text-blue-400/70 font-semibold uppercase tracking-wider">Solución</span>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">{proj.solucion}</p>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.02]">
                <span className="text-[9px] text-emerald-400/70 font-semibold uppercase tracking-wider">Resultado</span>
                <p className="text-[11px] text-[#A1A1AA] mt-0.5">{proj.resultado}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 pt-1">
            <a href={proj.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
              <ExternalLink className="w-3 h-3" /> Visitar sitio
            </a>
            {proj.repo && (
              <a href={proj.repo} target="_blank" rel="noopener noreferrer" className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1 transition-colors">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                Código
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Portfolio;
