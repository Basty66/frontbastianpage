const casos = [
  {
    cliente: 'Piscina Oasis',
    rubro: 'Servicios del hogar',
    problema: 'No tenían presencia digital y perdían clientes frente a la competencia.',
    solucion: 'Landing page profesional con catálogo de servicios, formulario de contacto y ubicación en mapa.',
    resultado: '+180% más consultas en el primer mes',
    url: 'https://piscinaoasis.vercel.app',
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-500/20',
    accentColor: 'text-cyan-400',
  },
  {
    cliente: 'DASHU FOR MEN',
    rubro: 'Barbería y cuidado personal',
    problema: 'Dependían completamente de Instagram para recibir reservas y no tenían web.',
    solucion: 'E-commerce con sistema de reservas, catálogo de productos y pasarela de pago.',
    resultado: '+220% en ventas online',
    url: 'https://dashuformen.vercel.app',
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/20',
    accentColor: 'text-amber-400',
  },
  {
    cliente: 'ViaKids',
    rubro: 'Transporte escolar',
    problema: 'Necesitaban una web que transmitiera confianza a los padres.',
    solucion: 'Landing mobile-first con rutas, precios, formulario de contacto y diseño seguro.',
    resultado: '+95% confianza de padres',
    url: 'https://via-kids-completo.vercel.app',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/20',
    accentColor: 'text-green-400',
  },
]

export default function CasosExito() {
  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Casos de éxito</p>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-[#A1A1AA] text-sm max-w-lg mx-auto">
            Proyectos reales que transformaron negocios chilenos.
          </p>
        </div>

        <div className="grid gap-6">
          {casos.map((caso, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl border ${caso.borderColor} bg-gradient-to-br ${caso.color} to-[#09090B] p-6 sm:p-8 group hover:scale-[1.01] transition-transform duration-300`}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-white font-heading font-bold text-lg">{caso.cliente}</h3>
                    <span className="text-[10px] font-medium text-[#A1A1AA] bg-white/[0.05] px-2 py-0.5 rounded-full">{caso.rubro}</span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-1">Problema</p>
                      <p className="text-[#A1A1AA]">{caso.problema}</p>
                    </div>
                    <div>
                      <p className="text-[#52525B] text-xs font-semibold uppercase tracking-wider mb-1">Solución</p>
                      <p className="text-[#A1A1AA]">{caso.solucion}</p>
                    </div>
                  </div>
                </div>

                {/* Resultado */}
                <div className="sm:w-48 flex flex-col items-center justify-center text-center sm:border-l sm:border-white/[0.06] sm:pl-6">
                  <p className={`text-2xl sm:text-3xl font-heading font-bold ${caso.accentColor} mb-1`}>
                    {caso.resultado.split(' ')[0]}
                  </p>
                  <p className="text-[#A1A1AA] text-xs">{caso.resultado.split(' ').slice(1).join(' ')}</p>
                  <a
                    href={caso.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 text-xs text-[#52525B] hover:text-white transition-colors underline underline-offset-2"
                  >
                    Ver proyecto →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
