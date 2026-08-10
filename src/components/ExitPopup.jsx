import { useState, useEffect, useCallback } from 'react';
import { X, Mail, Send, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';
import useScrollLock from '../hooks/useScrollLock';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useScrollLock(show && !dismissed);

  const handleExit = useCallback((e) => {
    if (dismissed || show || sent) return;
    if (e.clientY <= 0) setShow(true);
  }, [dismissed, show, sent]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleExit);
    return () => document.removeEventListener('mouseleave', handleExit);
  }, [handleExit]);

  if (!show || dismissed) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    const link = document.createElement('a');
    link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `¡Hola! Soy ${email.split('@')[0] || 'un cliente'}. Me interesa recibir un presupuesto personalizado de BS DigitalTech. Mi correo es ${email}`
    )}`;
    link.target = '_blank';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 exit-popup-overlay" onClick={() => setDismissed(true)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md bg-gradient-to-b from-[#18181B] to-[#09090B] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 exit-popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all hover:rotate-90"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/[0.06] border border-blue-500/15 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-blue-400/60" />
          </div>
          <h3 className="text-xl font-heading font-bold text-gradient-chrome mb-2">¿Ya te vas?</h3>
          <p className="text-[#A1A1AA] text-sm">
            Déjame tu correo y te envío un <span className="text-white font-medium">presupuesto personalizado</span> sin compromiso.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
              <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white font-semibold">¡Gracias!</p>
            <p className="text-sm text-[#A1A1AA] mt-1">Te redirigiré a WhatsApp para coordinar los detalles.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-[#A1A1AA] block mb-1.5 font-medium">Tu correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  required
                  placeholder="tu@email.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 transition-all"
                  autoFocus
                />
              </div>
            </div>
            <button
              type="submit"
              className="relative overflow-hidden group w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Recibir presupuesto gratis</span>
            </button>
          </form>
        )}

        <button
          onClick={() => setDismissed(true)}
          className="block mx-auto text-xs text-[#A1A1AA]/60 hover:text-[#A1A1AA] transition-colors mt-4"
        >
          No, gracias
        </button>
      </div>
    </div>
  );
}
