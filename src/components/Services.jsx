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
          <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-lg overflow-x-auto">
            <h3 className="text-lg font-heading font-semibold text-white mb-5 text-center">
              <span className="text-emerald-400">$0/mes</span> vs Hosting Tradicional
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-slate-400 font-medium py-3 pr-4">Concepto</th>
                  <th className="text-center text-emerald-400 font-semibold py-3 px-4 bg-emerald-500/5 rounded-t-xl">Serverless (Nosotros)</th>
                  <th className="text-center text-red-400/70 font-medium py-3 pl-4">Hosting Tradicional</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Costo mensual', '$0 CLP', 'Desde $5.990 – $49.990 CLP'],
                  ['Velocidad global', 'Edge CDN — 50ms', 'Servidor único — 300ms+'],
                  ['SSL / HTTPS', 'Incluido de por vida', 'Pagas extra o manual'],
                  ['Mantenimiento', 'Automático (nosotros)', 'Tú lo gestionas'],
                  ['Escalabilidad', 'Ilimitada (serverless)', 'Limitada al plan'],
                  ['Ancho de banda', 'Sin límite', 'Caps mensuales'],
                  ['Backups', 'Automáticos diarios', 'Manuales o pagas'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="text-slate-300 py-3 pr-4 font-medium">{row[0]}</td>
                    <td className="text-center text-emerald-300 py-3 px-4 bg-emerald-500/5">{row[1]}</td>
                    <td className="text-center text-slate-400 py-3 pl-4">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
