import { ClipboardCheck, MessageSquare, Layers, Rocket, FileText, Percent, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Reveal from './Reveal';

const steps = [
  {
    icon: MessageSquare,
    num: '01',
    title: 'Reunión inicial',
    desc: 'Nos reunimos por videollamada (Google Meet, Zoom o WhatsApp) para conocer tu negocio, tus objetivos y qué necesitas. Sin compromiso.',
    details: [
      'Entendemos tu rubro y tu público objetivo',
      'Revisamos sitios de la competencia',
      'Definimos juntos qué páginas necesitas',
      'Resolvemos todas tus dudas técnicas',
    ],
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.08]',
    border: 'border-blue-500/15',
  },
  {
    icon: ClipboardCheck,
    num: '02',
    title: 'Requisitos',
    desc: 'Me envías los materiales que tengas: logos, imágenes, textos, colores, referencias. Si no tienes nada, te ayudo a crearlo.',
    details: [
      'Logos en alta resolución (PNG, SVG)',
      'Fotos de tus productos o servicios',
      'Textos descriptivos (o te ayudo a escribirlos)',
      'Colores y estilo que te guste',
    ],
    color: 'text-blue-300',
    bg: 'bg-blue-400/[0.08]',
    border: 'border-blue-400/15',
  },
  {
    icon: Layers,
    num: '03',
    title: 'Desarrollo',
    desc: 'Construyo tu proyecto con revisiones incluidas. Vas viendo el avance en tiempo real y pidiendo ajustes.',
    details: [
      'Te muestro avances por videollamada',
      'Revisiones ilimitadas durante el desarrollo',
      'Optimización de velocidad incluida',
      'Responsive para celular, tablet y desktop',
    ],
    color: 'text-blue-400',
    bg: 'bg-blue-500/[0.08]',
    border: 'border-blue-500/15',
  },
  {
    icon: Rocket,
    num: '04',
    title: 'Entrega',
    desc: 'Tu web lista, desplegada y funcionando. Te enseño a usarla y quedo disponible para soporte.',
    details: [
      'Despliegue en Vercel (hosting $0)',
      'Dominio configurado y funcionando',
      'Te enseño a hacer cambios básicos',
      'Soporte gratuito por 30 días',
    ],
    color: 'text-blue-300',
    bg: 'bg-blue-400/[0.08]',
    border: 'border-blue-400/15',
  },
];

const benefits = [
  { icon: Percent, title: '50% de descuento', desc: 'El primer proyecto tiene 50% de descuento. Ejemplo: si tu web cuesta $200.000, solo pagas $100.000. Sin costos ocultos.' },
  { icon: FileText, title: 'PDF con tu propuesta', desc: 'Al cotizar, recibes al instante un PDF profesional con los detalles de tu proyecto: alcance, tecnologías, plazos y precio.' },
  { icon: CheckCircle2, title: 'Hosting $0 para siempre', desc: 'Tu web se hospeda en Vercel sin costo mensual. Solo pagas tu dominio una vez al año (~$10.000 CLP).' },
  { icon: CheckCircle2, title: 'Velocidad garantizada', desc: 'Tu web carga en menos de 2 segundos. Google te premia con mejor posicionamiento y tus clientes no se van por lentitud.' },
];

const Proceso = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen" style={{ background: '#09090B' }}>
      {/* Hero */}
      <section className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal animation="fade-up">
            <span className="inline-block text-blue-400/70 font-semibold tracking-wider text-xs uppercase px-3 py-1 bg-blue-500/[0.06] rounded-full border border-blue-500/15 mb-4">
              Cómo funciona
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
              <span className="text-white">¿Qué pasa </span>
              <span className="text-gradient-blue">después de cotizar?</span>
            </h1>
            <p className="text-[#A1A1AA] text-sm sm:text-base max-w-xl mx-auto">
              Cuatro pasos simples para tener tu web funcionando. Sin complicaciones, sin letras pequeñas.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Reveal key={step.num} animation="fade-up" delay={i * 100}>
                  <div className="relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-white/10 t-smooth duration-500">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.color}`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-white/20 font-bold font-heading">{step.num}</span>
                          <h3 className="text-white font-heading font-semibold text-sm sm:text-base">{step.title}</h3>
                        </div>
                        <p className="text-xs text-[#A1A1AA] leading-relaxed mb-3">{step.desc}</p>
                        <ul className="space-y-1.5">
                          {step.details.map((d) => (
                            <li key={d} className="flex items-start gap-2 text-xs text-[#A1A1AA]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400/50 flex-shrink-0 mt-0.5" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute left-8 sm:left-10 -bottom-4 w-px h-4 bg-white/10" />
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <Reveal animation="fade-up" className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-3 tracking-tight">
              <span className="text-white">¿Por qué </span>
              <span className="text-gradient-blue">elegirnos?</span>
            </h2>
            <p className="text-[#A1A1AA] text-sm">Beneficios reales, sin promesas vacías.</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <Reveal key={b.title} animation="fade-up">
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 sm:p-5 hover:border-white/10 t-smooth duration-300 h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-blue-400/60" />
                      <h3 className="text-white font-heading font-semibold text-sm">{b.title}</h3>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed">{b.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-t border-white/5">
        <Reveal animation="fade-up">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl sm:text-2xl font-heading font-bold mb-3 tracking-tight text-white">¿Listo para empezar?</h2>
            <p className="text-[#A1A1AA] text-sm mb-6">Cotiza ahora y recibe tu propuesta al instante.</p>
            <button
              onClick={() => { navigate('/'); setTimeout(() => document.getElementById('cotizador')?.scrollIntoView({ behavior: 'smooth' }), 200); }}
              className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl t-smooth duration-500 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/25 text-sm inline-flex items-center gap-2"
            >
              Cotizar mi proyecto
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
      </section>
    </main>
  );
};

export default Proceso;
