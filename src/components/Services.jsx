import { Zap, Gem, Shield, Rocket, BarChart, Layers } from 'lucide-react';
import Reveal from './Reveal';

const services = [
  {
    icon: Rocket,
    title: 'Velocidad que Vende',
    desc: 'Tu página carga en segundos, no en minutos. Los clientes no esperan y Google te premia por ello.',
    color: 'from-white/[0.02] to-white/[0.005]',
    border: 'border-white/[0.06]',
    glow: 'rgba(37,99,235,0.06)',
    size: '',
  },
  {
    icon: Gem,
    title: 'Sin Costos Fijos',
    desc: 'Olvídate de pagar hosting mensual. Solo pagas tu dominio una vez al año. Sin sorpresas.',
    color: 'from-white/[0.02] to-white/[0.005]',
    border: 'border-white/[0.06]',
    glow: 'rgba(37,99,235,0.06)',
    size: '',
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    desc: 'Tus datos y los de tus clientes están protegidos. Certificados de seguridad y pasarelas de pago seguras.',
    color: 'from-white/[0.02] to-white/[0.005]',
    border: 'border-white/[0.06]',
    glow: 'rgba(37,99,235,0.06)',
    size: '',
  },
  {
    icon: BarChart,
    title: 'Aparece en Google',
    desc: 'Tu página está optimizada para que los clientes te encuentren cuando buscan lo que vendes.',
    color: 'from-white/[0.02] to-white/[0.005]',
    border: 'border-white/[0.06]',
    glow: 'rgba(37,99,235,0.06)',
    size: '',
  },
  {
    icon: Layers,
    title: 'Tú Mismo Actualizas',
    desc: 'Panel fácil para que cambies textos, precios y productos sin depender de nadie.',
    color: 'from-white/[0.02] to-white/[0.005]',
    border: 'border-white/[0.06]',
    glow: 'rgba(37,99,235,0.06)',
    size: '',
  },
  {
    icon: Zap,
    title: 'Crece Sin Límites',
    desc: 'Desde 100 hasta 100.000 visitas, tu página funciona igual. Sin cambiar de plan ni pagar más.',
    color: 'from-white/[0.02] to-white/[0.005]',
    border: 'border-white/[0.06]',
    glow: 'rgba(37,99,235,0.06)',
    size: '',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-white">Todo lo que tu negocio necesita para </span>
            <span className="text-gradient-blue">vender más</span>
          </h2>
          <p className="text-[#A1A1AA]">
            Desarrollo soluciones pensadas para reducir tus costos fijos y multiplicar el alcance de tu empresa.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 auto-rows-[1fr]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 60}>
                <div
                  className={`group relative overflow-hidden bg-gradient-to-br ${s.color} border ${s.border} p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm md:backdrop-blur-lg transition-[transform,box-shadow,border-color] duration-400 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl hover:border-blue-500/20 h-full flex flex-col ${s.size}`}
                  style={{ boxShadow: `0 0 0px ${s.glow}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${s.glow}, 0 0 30px rgba(37,99,235,0.08)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0px ${s.glow}`; }}
                >
                  <span className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/5" />
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 group-hover:scale-110 transition-[transform,background,border-color] duration-400 text-white/60 group-hover:text-blue-400">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-500" />
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-heading font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 group-hover:bg-clip-text transition-all duration-500">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal animation="fade-up" delay={300} className="mt-10 sm:mt-14">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              <span className="text-gradient-blue">$0/mes</span> vs Hosting Tradicional
            </h3>
            <p className="text-[#A1A1AA] text-sm">Sin pagos mensuales, sin mantenimiento, sin preocupaciones.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="relative group bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-sm md:backdrop-blur-lg transition-[transform,box-shadow] duration-400 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-lg">Nuestra Solución</p>
                  <p className="text-white text-sm font-semibold">$0 CLP / mes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Velocidad', value: 'Carga instantánea' },
                  { label: 'Seguridad', value: 'Incluida de por vida' },
                  { label: 'Mantenimiento', value: 'Nosotros nos encargamos' },
                  { label: 'Capacidad', value: 'Sin límites' },
                  { label: 'Ancho de banda', value: 'Sin límites' },
                  { label: 'Respaldos', value: 'Automáticos diarios' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-blue-400/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-[#A1A1AA]">{item.label}:</span>
                    <span className="text-white font-medium text-right flex-shrink-0 ml-auto">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group bg-white/[0.01] border border-white/[0.04] rounded-2xl p-6 sm:p-8 backdrop-blur-sm md:backdrop-blur-lg transition-[transform,box-shadow] duration-400 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-lg">Hosting Tradicional</p>
                  <p className="text-white/40 text-sm font-semibold">$5.990 – $49.990 / mes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Velocidad', value: 'Lenta, depende del servidor' },
                  { label: 'Seguridad', value: 'Pagas extra o la configuras' },
                  { label: 'Mantenimiento', value: 'Tú lo haces' },
                  { label: 'Capacidad', value: 'Limitada al plan' },
                  { label: 'Ancho de banda', value: 'Con límites' },
                  { label: 'Respaldos', value: 'Manuales o pagas extra' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-white/20 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-[#A1A1AA]/60 flex-1">{item.label}:</span>
                    <span className="text-white/30 font-medium text-right flex-shrink-0 max-w-[55%] sm:max-w-none">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-[#A1A1AA]/40 mt-6">* Solo pagas tu dominio .cl anual (aprox. $10.000 CLP). Sin sorpresas.</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
