import { useState, useEffect, useCallback } from 'react';
import { X, Mail, Send, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../lib/constants';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-blue-500/20 border border-brand-cyan/20 flex items-center justify-center animate-float">
            <Sparkles className="w-7 h-7 text-brand-cyan" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-2">¿Ya te vas?</h3>
          <p className="text-slate-300 text-sm">
            Déjame tu correo y te envío un <span className="text-brand-cyan font-medium">presupuesto personalizado</span> sin compromiso.
          </p>
        </div>

        {sent ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white font-semibold">¡Gracias!</p>
            <p className="text-sm text-slate-400 mt-1">Te redirigiré a WhatsApp para coordinar los detalles.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Tu correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="tu@email.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/20 transition-all"
                  autoFocus
                />
              </div>
            </div>
            <button
              type="submit"
              className="relative overflow-hidden group w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-brand-cyan text-white font-bold text-sm transition-all hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Send className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Recibir presupuesto gratis</span>
            </button>
          </form>
        )}

        <button
          onClick={() => setDismissed(true)}
          className="block mx-auto text-xs text-slate-500 hover:text-slate-300 transition-colors mt-4"
        >
          No, gracias
        </button>
      </div>
    </div>
  );
}
