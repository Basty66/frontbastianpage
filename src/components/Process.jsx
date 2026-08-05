import { MessageSquare, Palette, Code2, Rocket } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Reunión Inicial',
    desc: 'Nos conocemos, entiendo tu negocio, tus objetivos y lo que necesitas. Sin compromiso.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Diseño y Propuesta',
    desc: 'Creo el diseño de tu página y una cotización detallada. Revisas, ajustamos y aprobamos.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Desarrollo',
    desc: 'Construyo tu plataforma con las mejores tecnologías. Te mantengo informado del avance.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Lanzamiento',
    desc: 'Revisamos juntos, ajustamos los últimos detalles y publicamos tu página en producción.',
  },
];

const Process = () => {
  return (
    <section id="proceso" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            <span className="text-white">¿Cómo </span>
            <span className="text-gradient-blue">trabajamos?</span>
          </h2>
          <p className="text-[#A1A1AA]">
            Un proceso simple y transparente. Sin sorpresas, sin letra chica.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 100}>
                <div
                  className="group relative overflow-hidden bg-white/[0.02] border border-white/[0.06] p-6 rounded-2xl backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-white/10 hover:shadow-xl h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 group-hover:scale-110 transition-[transform,background,border-color] duration-500 text-white/60 group-hover:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-3xl font-heading font-black text-white/[0.06] group-hover:text-blue-500/20 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-white font-heading font-semibold text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed flex-1">{step.desc}</p>
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
