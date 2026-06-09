import { Star } from 'lucide-react';
import Reveal from './Reveal';

const testimonios = [
  {
    nombre: 'María González',
    empresa: 'Distribuidora MG SpA',
    texto: 'Pasamos de pagar hosting a $0. La página cargaba lento y ahora vuela. Las ventas online subieron un 40% en dos meses.',
    estrellas: 5,
  },
  {
    nombre: 'Carlos Muñoz',
    empresa: 'Ferretería El Constructor',
    texto: 'Me hicieron un e-commerce completo con panel para gestionar stock yo mismo. Súper intuitivo y el soporte fue rápido y claro.',
    estrellas: 5,
  },
  {
    nombre: 'Paola Soto',
    empresa: 'Clínica Dental DS',
    texto: 'Necesitaba una web profesional para mi clínica. Quedó preciosa, mis pacientes me dicen que se ve de primer nivel.',
    estrellas: 5,
  },
];

const Testimonios = () => {
  return (
    <section id="testimonios" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 bg-slate-900/20 overflow-hidden">
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            Lo que dicen{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">
              mis clientes
            </span>
          </h2>
          <p className="text-slate-300">
            Clientes reales, resultados concretos. Esto es lo que opinan quienes ya trabajaron conmigo.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonios.map((t, i) => (
            <Reveal key={i} animation="fade-up" delay={i * 120}>
              <div className="group relative bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/10 h-full flex flex-col">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.02] to-transparent pointer-events-none" />
                <div className="relative flex gap-0.5 mb-4">
                  {Array.from({ length: t.estrellas }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="relative text-sm text-slate-300 leading-relaxed flex-1">&ldquo;{t.texto}&rdquo;</p>
                <div className="relative mt-5 pt-4 border-t border-white/5">
                  <p className="text-white font-medium text-sm">{t.nombre}</p>
                  <p className="text-brand-cyan text-xs">{t.empresa}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonios;
