import { useState } from 'react'
import { WHATSAPP_NUMBER } from '../lib/constants'

const actions = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: 'bg-[#25D366] hover:bg-[#20BD5A]',
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('¡Hola! Me interesa cotizar un proyecto web con BS DigitalTech.')}`,
  },
  {
    id: 'calendar',
    label: 'Agendar',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    color: 'bg-[#2563EB] hover:bg-[#1D4ED8]',
    href: 'https://calendar.app.google/pvpooPqXKQAGCvJg7',
  },
  {
    id: 'cotizar',
    label: 'Cotizar',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    color: 'bg-[#A1A1AA] hover:bg-[#71717A]',
    href: '#cotizador',
  },
]

export default function FloatingActions() {
  const [open, setOpen] = useState(false)

  const handleClick = (action, e) => {
    if (action.id === 'cotizar') {
      e.preventDefault()
      document.querySelector('#cotizador')?.scrollIntoView({ behavior: 'smooth' })
    }
    setOpen(false)
  }

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 z-50 flex flex-col items-end gap-2">
      {/* Options */}
      {open && (
        <div className="flex flex-col gap-2 animate-fade-in">
          {actions.map((action, i) => (
            <a
              key={action.id}
              href={action.href}
              target={action.id !== 'cotizar' ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => handleClick(action, e)}
              className={`flex items-center gap-2.5 ${action.color} text-white pl-4 pr-3 py-2.5 rounded-full shadow-lg shadow-black/30 transition-all duration-200 hover:scale-105`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {action.icon}
              <span className="text-xs font-semibold whitespace-nowrap">{action.label}</span>
            </a>
          ))}
        </div>
      )}

      {/* Main button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-600/30 flex items-center justify-center transition-all duration-300 ${open ? 'rotate-45 scale-95' : 'hover:scale-105'}`}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        )}
      </button>
    </div>
  )
}
