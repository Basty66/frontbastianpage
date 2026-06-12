import { Zap, Gem, Shield, Rocket, BarChart, Layers } from 'lucide-react';
import Reveal from './Reveal';

const services = [
  {
    icon: Rocket,
    title: 'Velocidad Extrema',
    desc: 'Plataformas con React + Vite. Tu página carga en milisegundos, mejorando ventas y posicionamiento en Google.',
    color: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    border: 'border-cyan-500/20',
    glow: 'rgba(34,211,238,0.15)',
    iconColor: 'text-cyan-400',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Gem,
    title: 'Costo Fijo $0/mes',
    desc: 'Serverless Edge. Olvídate de hostings mensuales. Solo pagas tu dominio .cl anual (~$10.000). Sin sorpresas.',
    color: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    border: 'border-emerald-500/20',
    glow: 'rgba(16,185,129,0.15)',
    iconColor: 'text-emerald-400',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    desc: 'SSL de por vida, cifrado extremo a extremo, pasarelas Mercado Pago/Webpay. Tus clientes compran tranquilos.',
    color: 'from-purple-500/20 via-purple-500/5 to-transparent',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.15)',
    iconColor: 'text-purple-400',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: BarChart,
    title: 'SEO que vende',
    desc: 'Optimización completa: meta tags, Open Graph, schema.org, sitemap XML. Aparece en Google desde el día 1.',
    color: 'from-blue-500/20 via-blue-500/5 to-transparent',
    border: 'border-blue-500/20',
    glow: 'rgba(59,130,246,0.15)',
    iconColor: 'text-blue-400',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Layers,
    title: 'Panel Administrativo',
    desc: 'Gestiona stock, precios, productos y contenido sin saber programar. Ideal para e-commerces y webs corporativas.',
    color: 'from-amber-500/20 via-amber-500/5 to-transparent',
    border: 'border-amber-500/20',
    glow: 'rgba(245,158,11,0.15)',
    iconColor: 'text-amber-400',
    size: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: Zap,
    title: 'Escalabilidad Ilimitada',
    desc: 'Arquitectura serverless que escala automáticamente. Desde 100 hasta 100.000 visitas sin cambiar de plan ni pagar más.',
    color: 'from-rose-500/20 via-rose-500/5 to-transparent',
    border: 'border-rose-500/20',
    glow: 'rgba(244,63,94,0.15)',
    iconColor: 'text-rose-400',
    size: 'md:col-span-1 md:row-span-1',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 bg-slate-900/20 overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-white">Ingeniería Web orientada al </span>
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">Retorno de Inversión</span>
          </h2>
          <p className="text-slate-300">
            Desarrollo soluciones pensadas para reducir tus costos fijos y multiplicar el alcance de tu empresa.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[1fr]">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={i} animation="fade-up" delay={i * 100}>
                <div
                  className={`group relative overflow-hidden bg-gradient-to-br ${s.color} border ${s.border} p-6 sm:p-8 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl h-full flex flex-col ${s.size}`}
                  style={{ boxShadow: `0 0 0px ${s.glow}`, transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${s.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0px ${s.glow}`; }}
                >
                  <span className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${s.iconColor.replace('text', 'bg').replace('-400', '-500/10')}`} />
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.06] group-hover:scale-110 transition-all duration-500 ${s.iconColor}`}>
                      <Icon className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-500" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 group-hover:bg-clip-text transition-all duration-500">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed flex-1">{s.desc}</p>
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
