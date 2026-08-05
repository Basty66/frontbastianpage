import { ShieldCheck, Headphones, RefreshCw } from 'lucide-react';
import Reveal from './Reveal';

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Garantía de Satisfacción',
    desc: 'Si no estás conforme con el resultado, hacemos los ajustes necesarios sin costo adicional.',
    color: 'text-blue-400/60',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.06]',
  },
  {
    icon: Headphones,
    title: 'Soporte Incluido',
    desc: '15 días de soporte después del lanzamiento. Cualquier duda o ajuste, nos escribes.',
    color: 'text-blue-400/60',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.06]',
  },
  {
    icon: RefreshCw,
    title: 'Sin Pagos Mensuales',
    desc: 'Sin costos recurrentes. Solo pagas tu dominio una vez al año. Hosting incluido.',
    color: 'text-blue-400/60',
    bg: 'bg-white/[0.03]',
    border: 'border-white/[0.06]',
  },
];

const Guarantee = () => {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-blue-400/60 text-sm font-semibold bg-blue-500/[0.06] border border-blue-500/15 px-4 py-2 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4" />
            Compromiso de calidad
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Tu inversión está{' '}
            <span className="text-gradient-blue">protegida</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 100}>
                <div className={`group relative ${g.bg} border ${g.border} p-5 sm:p-6 rounded-2xl backdrop-blur-sm text-center transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lg h-full`}>
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${g.bg} border ${g.border} flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/25 group-hover:scale-110 transition-[transform,background,border-color] duration-500`}>
                    <Icon className={`w-6 h-6 ${g.color}`} />
                  </div>
                  <h3 className="text-white font-heading font-semibold text-sm mb-2">{g.title}</h3>
                  <p className="text-[#A1A1AA] text-xs leading-relaxed">{g.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
