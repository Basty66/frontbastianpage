import { Zap, Gem, Shield, Rocket, BarChart, Layers } from 'lucide-react';
import Reveal from './Reveal';

const services = [
  {
    icon: Rocket,
    title: 'Velocidad Extrema',
    desc: 'Plataformas con React + Vite. Tu página carga en milisegundos, mejorando ventas y posicionamiento en Google.',
    color: 'from-white/[0.03] via-transparent to-transparent',
    border: 'border-white/[0.06]',
    glow: 'rgba(255,255,255,0.03)',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Gem,
    title: 'Costo Fijo $0/mes',
    desc: 'Serverless Edge. Olvídate de hostings mensuales. Solo pagas tu dominio .cl anual (~$10.000). Sin sorpresas.',
    color: 'from-white/[0.03] via-transparent to-transparent',
    border: 'border-white/[0.06]',
    glow: 'rgba(255,255,255,0.03)',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    desc: 'SSL de por vida, cifrado extremo a extremo, pasarelas Mercado Pago/Webpay. Tus clientes compran tranquilos.',
    color: 'from-white/[0.03] via-transparent to-transparent',
    border: 'border-white/[0.06]',
    glow: 'rgba(255,255,255,0.03)',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: BarChart,
    title: 'SEO que vende',
    desc: 'Optimización completa: meta tags, Open Graph, schema.org, sitemap XML. Aparece en Google desde el día 1.',
    color: 'from-white/[0.03] via-transparent to-transparent',
    border: 'border-white/[0.06]',
    glow: 'rgba(255,255,255,0.03)',
    size: 'md:col-span-1 md:row-span-1',
  },
  {
    icon: Layers,
    title: 'Panel Administrativo',
    desc: 'Gestiona stock, precios, productos y contenido sin saber programar. Ideal para e-commerces y webs corporativas.',
    color: 'from-white/[0.03] via-transparent to-transparent',
    border: 'border-white/[0.06]',
    glow: 'rgba(255,255,255,0.03)',
    size: 'md:col-span-2 md:row-span-1',
  },
  {
    icon: Zap,
    title: 'Escalabilidad Ilimitada',
    desc: 'Arquitectura serverless que escala automáticamente. Desde 100 hasta 100.000 visitas sin cambiar de plan ni pagar más.',
    color: 'from-white/[0.03] via-transparent to-transparent',
    border: 'border-white/[0.06]',
    glow: 'rgba(255,255,255,0.03)',
    size: 'md:col-span-1 md:row-span-1',
  },
];

const Services = () => {
  return (
    <section id="servicios" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
            <span className="text-white">Ingeniería Web orientada al </span>
            <span className="text-white">Retorno de Inversión</span>
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
                  className={`group relative overflow-hidden bg-gradient-to-br ${s.color} border ${s.border} p-4 sm:p-6 md:p-8 rounded-2xl backdrop-blur-sm md:backdrop-blur-lg transition-[transform,box-shadow] duration-400 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl h-full flex flex-col ${s.size}`}
                  style={{ boxShadow: `0 0 0px ${s.glow}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 20px 60px ${s.glow}`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 0 0px ${s.glow}`; }}
                >
                  <span className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/5" />
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-10 md:w-12 sm:h-10 md:h-12 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.06] group-hover:scale-110 transition-[transform,background] duration-400 text-white/60 group-hover:text-white">
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
              <span className="text-white">$0/mes</span> vs Hosting Tradicional
            </h3>
            <p className="text-[#A1A1AA] text-sm">Infraestructura serverless de última generación sin costos mensuales.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="relative group bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 sm:p-8 backdrop-blur-sm md:backdrop-blur-lg transition-[transform,box-shadow] duration-400 hover:shadow-xl hover:-translate-y-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-heading font-bold text-lg">Serverless Edge</p>
                  <p className="text-white text-sm font-semibold">$0 CLP / mes</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { label: 'Velocidad global', value: 'Edge CDN — ~50ms' },
                  { label: 'SSL / HTTPS', value: 'Incluido de por vida' },
                  { label: 'Mantenimiento', value: 'Automático (nosotros)' },
                  { label: 'Escalabilidad', value: 'Ilimitada (serverless)' },
                  { label: 'Ancho de banda', value: 'Sin límite' },
                  { label: 'Backups', value: 'Automáticos diarios' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
                  { label: 'Velocidad global', value: 'Servidor único — ~300ms+' },
                  { label: 'SSL / HTTPS', value: 'Pagas extra o manual' },
                  { label: 'Mantenimiento', value: 'Tú lo gestionas' },
                  { label: 'Escalabilidad', value: 'Limitada al plan' },
                  { label: 'Ancho de banda', value: 'Caps mensuales' },
                  { label: 'Backups', value: 'Manuales o pagas' },
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
