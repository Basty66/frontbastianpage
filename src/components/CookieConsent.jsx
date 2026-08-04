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
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-2 sm:p-4">
      <div className="max-w-3xl mx-auto bg-[#18181B]/95 backdrop-blur-xl border border-white/[0.06] rounded-xl sm:rounded-2xl shadow-2xl shadow-black/30 p-3 sm:p-5 animate-modal-content">
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
          <div className="hidden sm:flex w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.06] items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie className="w-4 h-4 text-white/60" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-white font-medium mb-0.5 sm:mb-1">Uso de cookies</p>
            <p className="text-[10px] sm:text-xs text-[#A1A1AA] leading-relaxed">
              Este sitio utiliza cookies para mejorar tu experiencia.{' '}
              <Link to="/cookies" className="text-white/60 hover:text-white underline underline-offset-2">
                Más info
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={reject}
              className="flex-1 sm:flex-none px-3 py-2 sm:py-1.5 text-[10px] sm:text-xs font-medium text-[#A1A1AA] hover:text-white bg-white/[0.03] hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              Rechazar
            </button>
            <button
              onClick={accept}
              className="flex-1 sm:flex-none px-4 py-2 sm:py-1.5 text-[10px] sm:text-xs font-medium text-black bg-white rounded-lg hover:bg-slate-100 transition-colors"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
