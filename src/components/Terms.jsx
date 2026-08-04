import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { WHATSAPP_LINK } from '../lib/constants';

export default function Terms() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal animation="fade-up">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white transition-colors mb-8">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">Términos y Condiciones</h1>
          <p className="text-slate-400 text-sm mb-8">Última actualización: 12 de junio de 2026</p>
        </Reveal>

        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <Reveal animation="fade-up" delay={50}>
            <p>
              Al acceder y utilizar los servicios de <strong className="text-white">BS DigitalTech</strong>, aceptas los siguientes términos y condiciones. Si no estás de acuerdo, por favor no utilices nuestros servicios.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={100}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">1. Servicios</h2>
            <p>
              BS DigitalTech ofrece servicios de desarrollo web, incluyendo landing pages, sitios corporativos, e-commerce y aplicaciones web. Cada proyecto se cotiza de forma personalizada según los requerimientos del cliente.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={150}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">2. Propiedad intelectual</h2>
            <p>
              El código fuente desarrollado para tu proyecto te pertenece una vez pagado en su totalidad. BS DigitalTech se reserva el derecho de mostrar el proyecto terminado en su portafolio profesional.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={200}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">3. Pagos</h2>
            <p>
              Los precios se expresan en pesos chilenos (CLP) e incluyen IVA. El pago se acuerda entre ambas partes antes del inicio del proyecto. Se requiere un adelanto del 50% para comenzar, a menos que se acuerde lo contrario.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={250}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">4. Plazos de entrega</h2>
            <p>
              Los plazos se definen en la cotización. Cualquier cambio en el alcance del proyecto puede modificar los plazos acordados. El hosting $0 de por vida incluye mantenimiento básico (actualizaciones de seguridad y disponibilidad).
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={300}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">5. Limitación de responsabilidad</h2>
            <p>
              BS DigitalTech no se hace responsable por daños directos o indirectos derivados del uso de los sitios web desarrollados, incluyendo pérdida de datos o interrupción del servicio, salvo negligencia comprobada.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={350}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">6. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en esta página con la fecha de actualización correspondiente.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={400}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">7. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos términos, puedes contactarme por{' '}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                WhatsApp
              </a>.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
