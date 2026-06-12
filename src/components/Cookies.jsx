import { Link } from 'react-router-dom';
import Reveal from './Reveal';

export default function Cookies() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal animation="fade-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-brand-cyan hover:text-cyan-300 transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">Política de Cookies</h1>
          <p className="text-slate-400 text-sm mb-8">Última actualización: 12 de junio de 2026</p>
        </Reveal>

        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <Reveal animation="fade-up" delay={50}>
            <p>
              En <strong className="text-white">Bastian.dev</strong> utilizamos cookies para mejorar tu experiencia de navegación y entender cómo interactúas con nuestro sitio.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={100}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">1. ¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Nos permiten recordar tus preferencias y mejorar tu experiencia.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={150}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">2. Cookies que utilizamos</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-white">Cookies esenciales:</strong> Necesarias para el funcionamiento del sitio, como recordar tu sesión y preferencia de color de acento.
              </li>
              <li>
                <strong className="text-white">Cookies de rendimiento:</strong> Nos ayudan a entender cómo usas el sitio (páginas visitadas, tiempo de navegación). No almacenamos información personal.
              </li>
              <li>
                <strong className="text-white">Cookies de funcionalidad:</strong> Recuerdan tus preferencias, como el color de acento seleccionado.
              </li>
            </ul>
          </Reveal>

          <Reveal animation="fade-up" delay={200}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">3. Cookies de terceros</h2>
            <p>
              Este sitio puede utilizar servicios de terceros (como Vercel Analytics) que pueden establecer sus propias cookies. No tenemos control sobre estas cookies.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={250}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">4. Cómo controlar las cookies</h2>
            <p>
              Puedes gestionar las cookies desde la configuración de tu navegador. Puedes bloquearlas o eliminarlas en cualquier momento. Ten en cuenta que algunas funciones del sitio podrían no funcionar correctamente sin cookies.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={300}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">5. Más información</h2>
            <p>
              Si tienes preguntas sobre el uso de cookies, puedes contactarme por{' '}
              <a href="https://wa.me/56928122947" target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:text-cyan-300 transition-colors">
                WhatsApp
              </a>.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
