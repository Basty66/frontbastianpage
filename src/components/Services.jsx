import { Zap, Gem, Shield } from 'lucide-react';
import Reveal from './Reveal';

const services = [
  {
    icon: Zap,
    title: 'Velocidad Extrema',
    desc: 'Plataformas desarrolladas con React + Vite. Tu página cargará en milisegundos, mejorando las ventas y el posicionamiento en Google (SEO).',
  },
  {
    icon: Gem,
    title: 'Costo Fijo $0 CLP',
    desc: 'Implementamos arquitectura sin servidor (Serverless). Olvídate de pagar hostings mensuales abusivos; solo pagas tu dominio anual .cl.',
  },
  {
    icon: Shield,
    title: 'Seguridad Integrada',
    desc: 'Certificados SSL de por vida, conexiones cifradas y pasarelas de pago blindadas como Mercado Pago para la total tranquilidad de tus clientes.',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 bg-slate-900/20">
      <div className="max-w-7xl mx-auto">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-white">Ingeniería Web orientada al </span>
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">Retorno de Inversión</span>
          </h2>
          <p className="text-slate-300">
            Desarrollo soluciones pensadas para reducir tus costos fijos y multiplicar el alcance de tu empresa.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 150}>
                <div className="group bg-white/[0.02] border border-white/10 p-8 rounded-2xl backdrop-blur-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.01] hover:border-brand-cyan/30 hover:shadow-lg hover:shadow-brand-cyan/10">
                  <div className="w-14 h-14 mb-6 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 transition-all duration-300">
                    <Icon className="w-7 h-7 text-brand-cyan group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal animation="fade-up" delay={500} className="mt-10 sm:mt-14">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-2">
              <span className="text-emerald-400">$0/mes</span> vs Hosting Tradicional
            </h3>
            <p className="text-slate-400 text-sm">Infraestructura serverless de última generación sin costos mensuales.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="relative group bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-lg transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-lg">Serverless Edge</p>
                  <p className="text-emerald-400 text-sm font-semibold">$0 CLP / mes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Velocidad global', value: 'Edge CDN — ~50ms', icon: 'Zap' },
                  { label: 'SSL / HTTPS', value: 'Incluido de por vida', icon: 'Shield' },
                  { label: 'Mantenimiento', value: 'Automático (nosotros)', icon: 'Settings' },
                  { label: 'Escalabilidad', value: 'Ilimitada (serverless)', icon: 'BarChart' },
                  { label: 'Ancho de banda', value: 'Sin límite', icon: 'Wifi' },
                  { label: 'Backups', value: 'Automáticos diarios', icon: 'Cloud' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-slate-300 flex-1">{item.label}:</span>
                    <span className="text-white font-medium text-right flex-shrink-0 max-w-[55%] sm:max-w-none">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative group bg-gradient-to-br from-red-500/5 to-red-500/[0.02] border border-red-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-lg transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-lg">Hosting Tradicional</p>
                  <p className="text-red-400/70 text-sm font-semibold">$5.990 – $49.990 / mes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Velocidad global', value: 'Servidor único — ~300ms+' },
                  { label: 'SSL / HTTPS', value: 'Pagas extra o manual' },
                  { label: 'Mantenimiento', value: 'Tú lo gestionas' },
                  { label: 'Escalabilidad', value: 'Limitada al plan' },
                  { label: 'Ancho de banda', value: 'Caps mensuales' },
                  { label: 'Backups', value: 'Manuales o pagas' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-red-400/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-400 flex-1">{item.label}:</span>
                    <span className="text-slate-500 font-medium text-right flex-shrink-0 max-w-[55%] sm:max-w-none">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-6">* Solo pagas tu dominio .cl anual (aprox. $10.000 CLP). Sin sorpresas.</p>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
