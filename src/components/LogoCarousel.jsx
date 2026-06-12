import Reveal from './Reveal';

const logos = [
  { id: 'dashu', name: 'DASHU FOR MEN', initial: 'D', color: 'from-amber-500 to-orange-600' },
  { id: 'oasis', name: 'Piscina Oasis', initial: 'O', color: 'from-cyan-500 to-blue-600' },
  { id: 'viakids', name: 'ViaKids', initial: 'V', color: 'from-emerald-500 to-teal-600' },
  { id: 'bastian', name: 'Bastian.dev', initial: 'B', color: 'from-purple-500 to-violet-600' },
];

export default function LogoCarousel() {
  const items = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-white/5 bg-slate-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal animation="fade-up" className="text-center mb-8">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Empresas que confían</p>
        </Reveal>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none" />

          <div className="flex logo-carousel-track gap-16 sm:gap-24 items-center">
            {items.map((logo, i) => (
              <div
                key={`${logo.id}-${i}`}
                className="group flex items-center gap-3 flex-shrink-0 opacity-40 hover:opacity-80 transition-all duration-500 hover:scale-110"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${logo.color} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-sm">{logo.initial}</span>
                </div>
                <span className="text-slate-400 text-sm font-medium whitespace-nowrap group-hover:text-white transition-colors">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
