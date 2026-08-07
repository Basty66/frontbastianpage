import { ClipboardCheck, MessageSquare, Layers, Rocket } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  {
    icon: MessageSquare,
    title: 'Reunión',
    desc: 'Nos reunimos por videollamada para entender tu negocio, tus objetivos y qué necesitas.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.08]',
    border: 'border-blue-500/15',
  },
  {
    icon: ClipboardCheck,
    title: 'Requisitos',
    desc: 'Me envías logos, imágenes, textos y cualquier material que tengas. Si no tienes, te ayudo a crearlo.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/[0.08]',
    border: 'border-amber-500/15',
  },
  {
    icon: Layers,
    title: 'Desarrollo',
    desc: 'Construyo tu proyecto con revisiones incluidas. Vas viendo el avance en tiempo real.',
    color: 'text-violet-400',
    bg: 'bg-violet-500/[0.08]',
    border: 'border-violet-500/15',
  },
  {
    icon: Rocket,
    title: 'Entrega',
    desc: 'Tu web lista, desplegada y funcionando. Te enseño a usarla y quedo disponible para soporte.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/[0.08]',
    border: 'border-emerald-500/15',
  },
];

const ProcessAfterQuote = () => {
  return (
    <section className="py-14 sm:py-18 px-4 sm:px-6 border-y border-white/5" style={{ background: '#09090B' }}>
      <div className="max-w-5xl mx-auto">
        <Reveal animation="fade-up" className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 tracking-tight">
            ¿Qué pasa <span className="text-gradient-blue">después de cotizar?</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base">
            Cuatro pasos simples para tener tu web funcionando.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} animation="fade-up" delay={i * 100}>
                <div className="relative group bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 sm:p-5 text-center hover:border-white/10 transition-all duration-500 h-full">
                  <div className="text-[10px] text-white/20 font-bold font-heading absolute top-2 right-3">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.color}`} />
                  </div>
                  <h3 className="text-white font-heading font-semibold text-sm sm:text-base mb-1.5">{step.title}</h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal animation="fade-up" delay={400}>
          <p className="text-center text-[10px] text-white/25 mt-6 font-medium uppercase tracking-wider">
            Tiempo promedio: 1 a 2 semanas dependiendo del proyecto
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default ProcessAfterQuote;
