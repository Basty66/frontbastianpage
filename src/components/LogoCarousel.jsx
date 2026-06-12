import Reveal from './Reveal';

const projects = [
  {
    id: 'dashu',
    name: 'DASHU FOR MEN',
    tag: 'E-commerce',
    img: '/screenshots/dashu-store.png',
    gradient: 'from-amber-500/20 via-orange-500/5 to-transparent',
    border: 'border-amber-500/20',
    glow: 'rgba(245,158,11,0.15)',
  },
  {
    id: 'oasis',
    name: 'Piscina Oasis',
    tag: 'Landing Page',
    img: '/screenshots/piscina-oasis.png',
    gradient: 'from-cyan-500/20 via-blue-500/5 to-transparent',
    border: 'border-cyan-500/20',
    glow: 'rgba(34,211,238,0.15)',
  },
  {
    id: 'viakids',
    name: 'ViaKids',
    tag: 'Web Corporativa',
    img: '/screenshots/viakids.png',
    gradient: 'from-emerald-500/20 via-teal-500/5 to-transparent',
    border: 'border-emerald-500/20',
    glow: 'rgba(16,185,129,0.15)',
  },
  {
    id: 'bastian',
    name: 'Bastian.dev',
    tag: 'Portfolio',
    img: '/screenshots/bastian-dev.png',
    gradient: 'from-purple-500/20 via-violet-500/5 to-transparent',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.15)',
  },
];

function ProjectCard({ project, index }) {
  return (
    <div
      className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
    >
      <div
        className={`relative rounded-2xl overflow-hidden border ${project.border} bg-gradient-to-b ${project.gradient} backdrop-blur-sm transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1`}
        style={{
          boxShadow: `0 8px 32px ${project.glow}`,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${project.glow.replace('0.15', '0.25')}, transparent 70%)`,
          }}
        />

        {/* Browser frame */}
        <div className="relative z-10">
          {/* Browser chrome */}
          <div className="flex items-center gap-1.5 px-4 pt-3.5 pb-2.5 bg-white/[0.03] border-b border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 group-hover:bg-red-500 transition-colors duration-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 group-hover:bg-yellow-500 transition-colors duration-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 group-hover:bg-green-500 transition-colors duration-300" />
            <div className="ml-3 flex-1 max-w-[180px] mx-auto">
              <div className="h-5 rounded-md bg-white/[0.04] border border-white/5 px-2 flex items-center">
                <span className="text-[9px] text-slate-500 truncate">{project.name.toLowerCase().replace(/\s+/g, '')}.cl</span>
              </div>
            </div>
          </div>

          {/* Screenshot */}
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-900/50">
            <img
              src={project.img}
              alt={project.name}
              className="w-full h-full object-cover object-top transition-all duration-[2s] group-hover:scale-105"
              loading={index < 4 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Project info */}
        <div className="relative z-10 px-4 py-3 flex items-center justify-between">
          <div>
            <span className="block text-sm font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 group-hover:bg-clip-text transition-all duration-500">
              {project.name}
            </span>
            <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              {project.tag}
            </span>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
            <span className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LogoCarousel() {
  const items = [...projects, ...projects, ...projects];

  return (
    <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-white/5 overflow-hidden">
      {/* Background decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <Reveal animation="fade-up" className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
            <span className="text-[10px] sm:text-xs font-medium text-slate-400 uppercase tracking-widest">Proyectos recientes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3">
            Trabajos que{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">hablan</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Cada proyecto es una historia de código, diseño y resultados medibles.
          </p>
        </Reveal>

        {/* Carousel */}
        <div className="relative">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

          {/* Track */}
          <div className="flex logo-carousel-track gap-5 sm:gap-6 md:gap-8 items-center py-2">
            {items.map((project, i) => (
              <ProjectCard key={`${project.id}-${i}`} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
