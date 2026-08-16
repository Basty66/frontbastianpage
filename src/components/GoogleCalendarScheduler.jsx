import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const GOOGLE_AUTH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-calendar-auth`
const GOOGLE_CALENDAR_FN = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-calendar`

export default function GoogleCalendarScheduler({ clientName, clientEmail, onBooked }) {
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [booking, setBooking] = useState(false)
  const [booked, setBooked] = useState(false)
  const [connected, setConnected] = useState(false)
  const [weekOffset, setWeekOffset] = useState(0)

  const fetchSlots = async (weekOff) => {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const now = new Date()
      const dateFrom = new Date(now)
      dateFrom.setDate(dateFrom.getDate() + weekOff * 7 + 1)
      dateFrom.setHours(0, 0, 0, 0)

      const dateTo = new Date(dateFrom)
      dateTo.setDate(dateTo.getDate() + 7)

      const res = await fetch(GOOGLE_CALENDAR_FN, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get-slots',
          dateFrom: dateFrom.toISOString(),
          dateTo: dateTo.toISOString(),
        }),
      })

      const data = await res.json()
      if (data.slots) {
        setSlots(data.slots)
        setConnected(true)
      }
    } catch (err) {
      console.error('Error fetching slots:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSlots(weekOffset)
  }, [weekOffset])

  const handleBook = async () => {
    if (!selectedSlot) return
    setBooking(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const res = await fetch(GOOGLE_CALENDAR_FN, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create-event',
          summary: `Reunión BS DigitalTech — ${clientName}`,
          description: `Reunión agendada desde la web.\nCliente: ${clientName}\nEmail: ${clientEmail}`,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
          attendeeEmail: clientEmail,
        }),
      })

      const data = await res.json()
      if (data.event) {
        setBooked(true)
        onBooked?.(data.event)
      }
    } catch (err) {
      console.error('Error booking:', err)
    } finally {
      setBooking(false)
    }
  }

  const formatSlot = (start) => {
    const d = new Date(start)
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    return `${days[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const handleConnect = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      alert('Debes iniciar sesión primero')
      return
    }
    window.open(`${GOOGLE_AUTH_URL}?state=${session.user.id}`, '_blank')
  }

  if (booked) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
        <div className="text-3xl mb-3">✅</div>
        <h4 className="text-white font-semibold text-lg mb-2">Reunión agendada</h4>
        <p className="text-[#A1A1AA] text-sm">
          {formatSlot(selectedSlot.start)} — Se envió un correo de confirmación con el enlace de Google Meet.
        </p>
      </div>
    )
  }

  if (!connected) {
    return (
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 text-center">
        <div className="text-3xl mb-3">📅</div>
        <h4 className="text-white font-semibold text-lg mb-2">Conecta tu Google Calendar</h4>
        <p className="text-[#A1A1AA] text-sm mb-4">
          Autoriza el acceso para verificar disponibilidad y agendar reuniones.
        </p>
        <button
          onClick={handleConnect}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
        >
          Conectar Google Calendar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-semibold">Selecciona un horario</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setWeekOffset(Math.max(0, weekOffset - 1))}
            disabled={weekOffset === 0}
            className="text-[#A1A1AA] hover:text-white disabled:opacity-30 p-1"
          >
            ←
          </button>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="text-[#A1A1AA] hover:text-white p-1"
          >
            →
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-[#A1A1AA]">Cargando disponibilidad...</div>
      ) : slots.length === 0 ? (
        <div className="text-center py-8 text-[#A1A1AA]">No hay horarios disponibles esta semana.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
          {slots.map((slot, i) => (
            <button
              key={i}
              onClick={() => setSelectedSlot(slot)}
              className={`p-2.5 rounded-lg text-xs font-medium transition-all ${
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
          disabled={booking}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {booking ? 'Agendando...' : `Agendar ${formatSlot(selectedSlot.start)}`}
        </button>
      )}
    </div>
  )
}
