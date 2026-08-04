import { MessageSquare, Palette, Code2, Rocket } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Reunión Inicial',
    desc: 'Nos conocemos, entiendo tu negocio, tus objetivos y lo que necesitas. Sin compromiso.',
    color: 'from-cyan-500/20 to-cyan-500/5',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
    glow: 'rgba(34,211,238,0.15)',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Diseño y Propuesta',
    desc: 'Creo el diseño de tu página y una cotización detallada. Revisas, ajustamos y aprobamos.',
    color: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Desarrollo',
    desc: 'Construyo tu plataforma con las mejores tecnologías. Te mantengo informado del avance.',
    color: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
    glow: 'rgba(168,85,247,0.15)',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Lanzamiento',
    desc: 'Revisamos juntos, ajustamos los últimos detalles y publicamos tu página en producción.',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    glow: 'rgba(16,185,129,0.15)',
  },
];

const Process = () => {
  return (
    <section id="proceso" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 bg-slate-900/20 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            <span className="text-white">¿Cómo </span>
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">
              trabajamos?
            </span>
          </h2>
          <p className="text-slate-300">
            Un proceso simple y transparente. Sin sorpresas, sin letra chica.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 100}>
                <div
                  className={`group relative overflow-hidden bg-gradient-to-br ${step.color} border ${step.border} p-6 rounded-2xl backdrop-blur-sm transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-xl h-full flex flex-col`}
                  style={{ boxShadow: `0 0 0px ${step.glow}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${step.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0px ${step.glow}`; }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${step.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-heading font-black text-white/[0.06] group-hover:text-white/[0.12] transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-white font-heading font-semibold text-base mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 group-hover:bg-clip-text transition-all duration-500">
                    {step.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed flex-1">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
