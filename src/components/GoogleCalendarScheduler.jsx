import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const GOOGLE_CALENDAR_FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-calendar`

export default function GoogleCalendarScheduler({ clientName, clientEmail, onBooked }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState(false)
  const [calendarConnected, setCalendarConnected] = useState(true)
  const [weekOffset, setWeekOffset] = useState(0)
  const [error, setError] = useState(null)

  const fetchSlots = async (weekOff) => {
    setLoading(true)
    setError(null)
    try {
      const now = new Date()
      const dateFrom = new Date(now)
      dateFrom.setDate(dateFrom.getDate() + weekOff * 7 + 1)
      dateFrom.setHours(0, 0, 0, 0)

      const dateTo = new Date(dateFrom)
      dateTo.setDate(dateTo.getDate() + 7)

      const res = await fetch(GOOGLE_CALENDAR_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'get-slots',
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
        }),
      })

      const data = await res.json()
      if (data.error) {
        setCalendarConnected(false)
        setError('Calendario no conectado aún.')
      } else {
        setSlots(data.slots || [])
        setCalendarConnected(true)
      }
    } catch (err) {
      console.error('Error fetching slots:', err)
      setError('Error al cargar horarios.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots(weekOffset)
  }, [weekOffset])

  const handleBook = async () => {
    if (!selectedSlot || !clientName || !clientEmail) return
    setBooking(true)
    setError(null)

    try {
      const res = await fetch(GOOGLE_CALENDAR_FN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-event',
          summary: `Reunión BS DigitalTech — ${clientName}`,
          description: `Reunión agendada desde la web.\n\nCliente: ${clientName}\nEmail: ${clientEmail}\n\nBS DigitalTech — Soluciones Web Profesionales`,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          attendeeEmail: clientEmail,
        }),
      })

      const data = await res.json()
      if (data.event && data.event.htmlLink) {
        setBooked(true)
        onBooked?.(data.event)
      } else {
        setError('Error al agendar. Intenta de nuevo.')
      }
    } catch (err) {
      console.error('Error booking:', err)
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setBooking(false)
    }
  }

  const formatSlot = (start) => {
    const d = new Date(start)
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  if (booked) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-5 text-center">
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-white font-semibold mb-1">Reunión agendada</h4>
        <p className="text-[#A1A1AA] text-xs">
          {formatSlot(selectedSlot.start)} — Recibirás un correo con el enlace de Google Meet.
        </p>
      </div>
    )
  }

  if (!calendarConnected) {
    return (
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </div>
        <h4 className="text-white font-semibold mb-1 text-sm">Agendar reunión</h4>
        <p className="text-[#A1A1AA] text-xs mb-3">
          Próximamente podrás agendar directo desde aquí.
        </p>
        <a
          href="https://calendar.app.google/pvpooPqXKQAGCvJg7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Abrir calendario
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-white text-sm font-semibold">Agendar reunión</h4>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
            disabled={weekOffset === 0}
            className="text-[#A1A1AA] hover:text-white disabled:opacity-30 p-1 text-xs"
          >
            ‹
          </button>
          <span className="text-[#A1A1AA] text-xs">
            {weekOffset === 0 ? 'Esta semana' : `+${weekOffset} sem`}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="text-[#A1A1AA] hover:text-white p-1 text-xs"
          >
            ›
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4 text-[#A1A1AA] text-xs">Cargando disponibilidad...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-400 text-xs">{error}</div>
      ) : slots.length === 0 ? (
        <div className="text-center py-4 text-[#A1A1AA] text-xs">Sin horarios disponibles esta semana.</div>
      ) : (
        <div className="grid grid-cols-3 gap-1.5 max-h-40 overflow-y-auto pr-1">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlot(slot)}
              className={`p-2 rounded-lg text-[10px] sm:text-xs font-medium transition-all ${
                selectedSlot === slot
                  ? 'bg-blue-600 text-white border border-blue-500'
                  : 'bg-white/[0.03] text-[#A1A1AA] border border-white/[0.06] hover:border-blue-500/30 hover:text-white'
              }`}
            >
              {formatSlot(slot.start)}
            </button>
          ))}
        </div>
      )}

      {selectedSlot && (
        <button
          onClick={handleBook}
          disabled={booking || !clientName || !clientEmail}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
        >
          {booking ? 'Agendando...' : `Agendar ${formatSlot(selectedSlot.start)}`}
        </button>
      )}

      {!clientName || !clientEmail ? (
        <p className="text-[10px] text-amber-400/70 text-center">Completa nombre y email en el paso anterior para agendar.</p>
      ) : null}
    </div>
  )
}
