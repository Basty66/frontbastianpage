import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('bd-cookies-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem('bd-cookies-consent', 'accepted');
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem('bd-cookies-consent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4">
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/30 p-4 sm:p-5 animate-modal-content">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <div className="hidden sm:flex w-9 h-9 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-4 h-4 text-brand-cyan" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-slate-200 font-medium mb-1">Uso de cookies</p>
            <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed">
              Este sitio utiliza cookies para mejorar tu experiencia.{' '}
              <Link to="/cookies" className="text-brand-cyan hover:text-cyan-300 underline underline-offset-2">
                Más info
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={reject}
              className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-brand-cyan rounded-lg hover:shadow-lg hover:shadow-brand-cyan/20 transition-shadow"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
