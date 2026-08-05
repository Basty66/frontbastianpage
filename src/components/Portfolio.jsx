import { useState, useRef, useCallback, useEffect } from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';
import { supabase } from '../lib/supabaseClient';
import { proyectos as fallbackProyectos } from '../data/portfolio';

const colores = [
  'from-blue-600/20 to-blue-500/5',
  'from-blue-500/15 to-blue-400/5',
  'from-blue-600/20 to-blue-500/5',
  'from-blue-500/15 to-blue-400/5',
  'from-blue-600/20 to-blue-500/5',
  'from-blue-500/15 to-blue-400/5',
];

function Thumbnail({ proj, idx, compact }) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const initials = proj.titulo
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const gradient = colores[idx % colores.length];

  const showGradient = !proj.screenshot || imgError;

  return (
    <div className="relative w-full h-full bg-slate-800 overflow-hidden">
      {showGradient && (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <span className={`text-white/15 font-heading font-black select-none ${compact ? 'text-3xl' : 'text-5xl sm:text-6xl'}`}>{initials}</span>
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 transition-opacity duration-500" />
    </div>
  );
}

function TiltCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const shineRef = useRef(null);
  const rafRef = useRef(null);

  const handleMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const angleX = ((y - cy) / cy) * -8;
      const angleY = ((x - cx) / cx) * 8;
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02,1.02,1.02)`;
      if (shineRef.current) {
        shineRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    if (shineRef.current) {
      shineRef.current.style.background = 'transparent';
    }
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={shineRef} className="absolute inset-0 pointer-events-none z-10 rounded-2xl transition-colors duration-300" />
      {children}
    </div>
  );
}

const Portfolio = ({ fullPage = false }) => {
  const [proyectos, setProyectos] = useState(fallbackProyectos);
  const [loading, setLoading] = useState(true);
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
        if (mounted && data && data.length > 0) {
          setProyectos(data);
        }
      } catch (err) {
        console.error('Error al cargar proyectos desde Supabase, usando fallback:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchProyectos();
    return () => { mounted = false; };
  }, []);

  const displayProjects = fullPage ? proyectos : proyectos.slice(0, 3);

  return (
    <section id="portafolio" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className={`font-heading font-bold mb-4 tracking-tight ${fullPage ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
            <span className="text-white">Proyectos </span>
            <span className="text-white">en vivo</span>
          </h2>
          <p className="text-slate-300">
            Sitios web y aplicaciones que he desarrollado y desplegado en producción.
          </p>
        </Reveal>

        {loading ? (
          <div className={`grid gap-6 sm:gap-8 ${fullPage ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {Array.from({ length: fullPage ? 2 : 3 }).map((_, i) => (
              <div key={i} className={`${fullPage ? 'h-80' : 'h-64'} bg-white/[0.01] border border-white/5 rounded-2xl animate-pulse`} />
            ))}
          </div>
        ) : proyectos.length === 0 ? (
          <Reveal animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 bg-white/[0.02] border border-white/10 px-6 py-4 rounded-2xl">
              <span>Próximamente estaré agregando proyectos aquí.</span>
            </div>
          </Reveal>
        ) : (
          <>
            <div className={`grid gap-6 sm:gap-8 ${fullPage ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {displayProjects.map((proj, i) => (
                <Reveal key={proj.id} animation="fade-up" delay={i * 80}>
                  <TiltCard>
                  <div className={`group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm md:backdrop-blur-lg transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-white/[0.12] hover:shadow-xl hover:shadow-white/[0.03] h-full flex flex-col ${!fullPage ? 'cursor-pointer' : ''}`} onClick={!fullPage ? () => navigate('/portafolio') : undefined}>
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block relative overflow-hidden ${fullPage ? 'aspect-video' : 'aspect-[4/3]'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Thumbnail proj={proj} idx={i} compact={!fullPage} />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <span className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Ver proyecto
                        </span>
                      </div>
                    </a>
                    <div className={`flex flex-col flex-1 ${fullPage ? 'p-5 sm:p-6' : 'p-4'}`}>
                      <h3 className={`text-white font-heading font-semibold mb-1.5 ${fullPage ? 'text-base sm:text-lg' : 'text-sm'}`}>{proj.titulo}</h3>
                      <p className={`text-slate-400 leading-relaxed mb-3 flex-1 ${fullPage ? 'text-xs sm:text-sm' : 'text-xs line-clamp-2'}`}>{proj.desc || proj.descripcion}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(proj.tags || []).slice(0, fullPage ? undefined : 3).map((tag) => (
                          <span
                            key={tag}
                            className={`font-medium text-white/60 bg-white/[0.03] border border-white/[0.06] rounded-full ${fullPage ? 'text-[10px] px-2 py-0.5' : 'text-[9px] px-1.5 py-0.5'}`}
                          >
                            {tag}
                          </span>
                        ))}
                        {!fullPage && (proj.tags || []).length > 3 && (
                          <span className="text-[9px] text-white/30 px-1.5 py-0.5">+{(proj.tags || []).length - 3}</span>
                        )}
                      </div>
                      {fullPage && (
                        <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link text-xs text-slate-400 hover:text-white/60 transition-colors flex items-center gap-1"
                          >
                            <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/link:rotate-45" />
                            Visitar
                          </a>
                          {proj.repo && (
                            <a
                              href={proj.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/link text-xs text-slate-400 hover:text-white/60 transition-colors flex items-center gap-1"
                            >
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              Código
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>

            {!fullPage && proyectos.length > 3 && (
              <Reveal animation="fade-up" className="text-center mt-10">
                <button
                  onClick={() => navigate('/portafolio')}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-sm text-slate-300 font-medium hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all duration-300"
                >
                  Ver todos los proyectos
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Reveal>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
