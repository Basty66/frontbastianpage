import { ExternalLink, ArrowRight, TrendingUp, Target, CheckCircle2 } from 'lucide-react'
import Reveal from './Reveal'

const casos = [
  {
    cliente: 'Piscina Oasis',
    rubro: 'Servicios del hogar',
    problema: 'No tenían presencia digital y perdían clientes frente a la competencia.',
    solucion: 'Landing page profesional con catálogo de servicios, formulario de contacto y ubicación en mapa.',
    resultado: '+180%',
    resultadoLabel: 'más consultas en el primer mes',
    url: 'https://piscinaoasis.vercel.app',
    icono: Target,
  },
  {
    cliente: 'DASHU FOR MEN',
    rubro: 'Barbería y cuidado personal',
    problema: 'Dependían completamente de Instagram para recibir reservas y no tenían web.',
    solucion: 'E-commerce con sistema de reservas, catálogo de productos y pasarela de pago.',
    resultado: '+220%',
    resultadoLabel: 'en ventas online',
    url: 'https://dashuformen.vercel.app',
    icono: TrendingUp,
  },
  {
    cliente: 'ViaKids',
    rubro: 'Transporte escolar',
    problema: 'Necesitaban una web que transmitiera confianza a los padres.',
    solucion: 'Landing mobile-first con rutas, precios, formulario de contacto y diseño seguro.',
    resultado: '+95%',
    resultadoLabel: 'confianza de padres',
    url: 'https://via-kids-completo.vercel.app',
    icono: CheckCircle2,
  },
]

export default function CasosExito() {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal animation="fade-up" className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-blue-400/70 font-semibold tracking-wider text-xs uppercase px-3 py-1 bg-blue-500/[0.06] rounded-full border border-blue-500/15 backdrop-blur-sm mb-4">
            Casos de éxito
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-3">
            <span className="text-gradient-blue-chrome">Resultados que hablan</span>{' '}
            <span className="text-[#A1A1AA]">por sí solos</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm sm:text-base max-w-lg mx-auto">
            Proyectos reales que transformaron negocios chilenos.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6">
          {casos.map((caso, i) => {
            const Icono = caso.icono
            return (
              <Reveal key={i} animation="fade-up" delay={i * 120}>
                <div className="group relative">
                  {/* Glow halo on hover - same as buttons */}
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/15 group-hover:via-blue-400/8 group-hover:to-blue-500/15 transition-all duration-500 ease-out blur-sm group-hover:blur-md" />

                  {/* Card - matches button hover: -translate-y + shadow + t-smooth */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8 group-hover:border-blue-500/25 group-hover:bg-white/[0.04] group-hover:shadow-xl group-hover:shadow-blue-600/20 group-hover:-translate-y-0.5 t-smooth duration-500 ease-out">
                    {/* Top glow intensifies on hover */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/[0.04] rounded-full blur-3xl pointer-events-none group-hover:bg-blue-500/[0.1] group-hover:scale-110 transition-all duration-700 ease-out" />
                    <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-400/[0.03] rounded-full blur-2xl pointer-events-none group-hover:bg-blue-400/[0.06] transition-all duration-700 ease-out" />

                    <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:gap-8">
                      {/* Left: Info */}
                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 group-hover:border-blue-500/30 group-hover:shadow-md group-hover:shadow-blue-500/10 t-smooth duration-500 ease-out">
                              <Icono className="w-4 h-4 text-blue-400 group-hover:text-blue-300 t-smooth duration-500" />
                            </div>
                            <h3 className="text-white font-heading font-bold text-lg sm:text-xl group-hover:text-blue-50 t-smooth duration-500">{caso.cliente}</h3>
                          </div>
                          <span className="text-[10px] font-medium text-[#71717A] bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06] group-hover:border-white/[0.1] group-hover:text-[#A1A1AA] t-smooth duration-500">
                            {caso.rubro}
                          </span>
                        </div>

                        {/* Problem / Solution */}
                        <div className="space-y-3">
                          <div className="flex gap-3">
                            <div className="w-1 rounded-full bg-red-500/30 shrink-0 mt-1 group-hover:bg-red-500/40 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.2)] t-smooth duration-500" />
                            <div>
                              <p className="text-[#52525B] text-[10px] font-semibold uppercase tracking-wider mb-0.5 group-hover:text-[#71717A] t-smooth duration-500">Problema</p>
                              <p className="text-[#A1A1AA] text-sm leading-relaxed group-hover:text-[#D4D4D8] t-smooth duration-500">{caso.problema}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <div className="w-1 rounded-full bg-blue-500/40 shrink-0 mt-1 group-hover:bg-blue-500/50 group-hover:shadow-[0_0_8px_rgba(37,99,235,0.25)] t-smooth duration-500" />
                            <div>
                              <p className="text-[#52525B] text-[10px] font-semibold uppercase tracking-wider mb-0.5 group-hover:text-[#71717A] t-smooth duration-500">Solución</p>
                              <p className="text-[#A1A1AA] text-sm leading-relaxed group-hover:text-[#D4D4D8] t-smooth duration-500">{caso.solucion}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Result + CTA */}
                      <div className="lg:w-52 shrink-0 flex flex-col items-center justify-center text-center lg:border-l lg:border-white/[0.06] lg:group-hover:border-blue-500/15 lg:pl-8 pt-4 lg:pt-0 t-smooth duration-500">
                        <div className="relative mb-3">
                          {/* Glow behind number - pulses on hover */}
                          <div className="absolute inset-0 bg-blue-500/15 blur-xl rounded-full scale-150 group-hover:bg-blue-500/25 group-hover:scale-[1.8] group-hover:blur-2xl t-smooth duration-700 ease-out" />
                          <span className="relative text-4xl sm:text-5xl lg:text-5xl font-heading font-bold text-gradient-blue-chrome">
                            {caso.resultado}
                          </span>
                        </div>
                        <p className="text-[#A1A1AA] text-xs sm:text-sm mb-4 group-hover:text-[#D4D4D8] t-smooth duration-500">{caso.resultadoLabel}</p>

                        {/* CTA link - matches button pattern with arrow animation */}
                        <a
                          href={caso.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-medium text-[#52525B] hover:text-blue-400 t-smooth duration-300 group/link"
                        >
                          <span className="underline underline-offset-2 decoration-white/10 group-hover/link:decoration-blue-400/40">Ver proyecto</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 t-smooth duration-300" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
