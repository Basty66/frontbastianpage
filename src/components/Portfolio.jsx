import { ExternalLink, ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { proyectos } from '../data/portfolio';

const colores = [
  'from-cyan-500 to-blue-600',
  'from-purple-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-red-600',
  'from-indigo-500 to-violet-600',
];

function Thumbnail({ proj, idx }) {
  const initials = proj.titulo
    .split(/[\s-]+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const gradient = colores[idx % colores.length];

  return (
    <div className="relative w-full h-full bg-slate-800 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
          <span className="text-white/15 text-5xl sm:text-6xl font-heading font-black select-none">{initials}</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-500" />
    </div>
  );
}

const Portfolio = ({ fullPage = false }) => {
  return (
    <section id="portafolio" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className={`font-heading font-bold mb-4 tracking-tight ${fullPage ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl md:text-4xl'}`}>
            <span className="text-white">Proyectos </span>
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">en vivo</span>
          </h2>
          <p className="text-slate-300">
            Sitios web y aplicaciones que he desarrollado y desplegado en producción.
          </p>
        </Reveal>

        {proyectos.length === 0 ? (
          <Reveal animation="fade-up" className="text-center">
            <div className="inline-flex items-center gap-2 text-slate-500 bg-white/[0.02] border border-white/10 px-6 py-4 rounded-2xl">
              <span>Próximamente estaré agregando proyectos aquí.</span>
            </div>
          </Reveal>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {proyectos.map((proj, i) => (
              <Reveal key={proj.id} animation="fade-up" delay={i * 120}>
                <div className="group relative bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/10 h-full flex flex-col">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-video relative overflow-hidden"
                  >
                    <Thumbnail proj={proj} idx={i} />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver proyecto
                      </span>
                    </div>
                  </a>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="text-white font-heading font-semibold text-base sm:text-lg mb-1.5">{proj.titulo}</h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 flex-1">{proj.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link text-xs text-slate-400 hover:text-brand-cyan transition-colors flex items-center gap-1"
                      >
                        <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover/link:rotate-45" />
                        Visitar
                      </a>
                      {proj.repo && (
                        <a
                          href={proj.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link text-xs text-slate-400 hover:text-brand-cyan transition-colors flex items-center gap-1"
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
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
