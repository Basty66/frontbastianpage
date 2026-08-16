import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !supabase) return
    setLoading(true)

    try {
      // Store lead in Supabase
      const { data, error } = await supabase.from('leads').insert({
        email,
        source: 'lead-magnet',
        magnet: '5-errores-web',
      }).select()

      if (error) throw error

      // Send the guide via email
      if (data && data[0]) {
        const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
        const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
        await fetch(`${SUPABASE_URL}/functions/v1/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            type: 'INSERT',
            record: data[0],
          }),
        })
      }
    } catch (err) {
      console.error('Error:', err)
    }

    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-16 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 via-[#09090B] to-[#09090B] p-8 sm:p-12">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Guía gratis</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3">
              5 errores que tu web NO puede tener
            </h2>
            <p className="text-[#A1A1AA] text-sm sm:text-base mb-8 max-w-lg">
              Descubre los errores más comunes que hacen perder clientes a las pymes chilenas y cómo evitarlos. 
              Incluye checklist descargable.
            </p>

            {submitted ? (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold mb-1">¡Revisa tu correo!</h4>
                <p className="text-[#A1A1AA] text-xs">
                  Te enviamos la guía a <strong className="text-white">{email}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#52525B] focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap text-sm"
                >
                  {loading ? 'Enviando...' : 'Descargar gratis'}
                </button>
              </form>
            )}

            <p className="text-[10px] text-[#52525B] mt-4">
              Sin spam. Solo contenido útil para hacer crecer tu negocio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
