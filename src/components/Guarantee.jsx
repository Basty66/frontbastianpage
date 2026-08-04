import { ShieldCheck, Headphones, RefreshCw } from 'lucide-react';
import Reveal from './Reveal';

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Garantía de Satisfacción',
    desc: 'Si no estás conforme con el resultado, hacemos los ajustes necesarios sin costo adicional.',
    color: 'text-[#F97316]',
    bg: 'bg-[#F97316]/10',
    border: 'border-[#F97316]/20',
  },
  {
    icon: Headphones,
    title: 'Soporte Post-Entrega',
    desc: '15 días de soporte técnico incluidos después del lanzamiento. Estamos para ayudarte.',
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
    border: 'border-[#06B6D4]/20',
  },
  {
    icon: RefreshCw,
    title: 'Hosting $0 de por vida',
    desc: 'Sin costos recurrentes. Tu página vive en infraestructura serverless sin pagar mensualidades.',
    color: 'text-[#06B6D4]',
    bg: 'bg-[#06B6D4]/10',
    border: 'border-[#06B6D4]/20',
  },
];

const Guarantee = () => {
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-[#F97316] text-sm font-semibold bg-[#F97316]/10 border border-[#F97316]/20 px-4 py-2 rounded-full mb-4">
            <ShieldCheck className="w-4 h-4" />
            Compromiso de calidad
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            Tu inversión está{' '}
            <span className="bg-gradient-to-r from-[#F97316] to-[#FB923C] bg-clip-text text-transparent">
              protegida
            </span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 100}>
                <div className={`group relative ${g.bg} border ${g.border} p-5 sm:p-6 rounded-2xl backdrop-blur-sm text-center transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lg h-full`}>
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${g.bg} border ${g.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className={`w-6 h-6 ${g.color}`} />
                  </div>
                  <h3 className="text-white font-heading font-semibold text-sm mb-2">{g.title}</h3>
                  <p className="text-slate-300 text-xs leading-relaxed">{g.desc}</p>
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
