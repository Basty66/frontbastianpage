import { Rocket, Gem, Shield, Zap } from 'lucide-react';
import Reveal from './Reveal';

const benefits = [
  { icon: Rocket, text: 'Carga en segundos', color: 'text-blue-400' },
  { icon: Gem, text: 'Sin costos fijos', color: 'text-amber-400' },
  { icon: Shield, text: 'Seguridad total', color: 'text-emerald-400' },
  { icon: Zap, text: 'SEO optimizado', color: 'text-violet-400' },
];

const ServicesCompact = () => {
  return (
    <section className="py-10 sm:py-12 px-4 sm:px-6" style={{ background: '#09090B' }}>
      <div className="max-w-4xl mx-auto">
        <Reveal animation="fade-up">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.text} className="flex items-center gap-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xl px-3 py-2.5 hover:border-white/10 transition-all duration-300">
                  <Icon className={`w-4 h-4 ${b.color} flex-shrink-0`} />
                  <span className="text-xs text-[#A1A1AA] font-medium">{b.text}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ServicesCompact;
