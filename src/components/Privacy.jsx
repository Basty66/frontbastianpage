import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { WHATSAPP_LINK } from '../lib/constants';

export default function Privacy() {
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
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">Política de Privacidad</h1>
          <p className="text-slate-400 text-sm mb-8">Última actualización: 12 de junio de 2026</p>
        </Reveal>

        <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
          <Reveal animation="fade-up" delay={50}>
            <p>
              En <strong className="text-white">Bastian.dev</strong>, valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web o utilizas nuestros servicios.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={100}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">1. Datos que recopilamos</h2>
            <p>Podemos recopilar la siguiente información:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Nombre y apellido</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (si lo proporcionas)</li>
              <li>Información del proyecto o consulta que nos envías</li>
              <li>Datos de navegación como páginas visitadas y tiempo de permanencia</li>
            </ul>
          </Reveal>

          <Reveal animation="fade-up" delay={150}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">2. Cómo usamos tus datos</h2>
            <p>Utilizamos tu información para:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Responder a tus consultas y cotizaciones</li>
              <li>Proveer los servicios contratados</li>
              <li>Mejorar nuestro sitio web y experiencia de usuario</li>
              <li>Enviar comunicaciones relacionadas con tu proyecto</li>
            </ul>
          </Reveal>

          <Reveal animation="fade-up" delay={200}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">3. Almacenamiento y seguridad</h2>
            <p>
              Tus datos se almacenan de forma segura en servidores de <strong className="text-white">Supabase</strong> y <strong className="text-white">Vercel</strong>, ambos con estándares de seguridad industry-standard. Implementamos medidas técnicas para proteger tu información contra acceso no autorizado.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={250}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">4. Compartición de datos</h2>
            <p>
              No compartimos tus datos personales con terceros, excepto cuando sea necesario para cumplir con la ley o proveer el servicio (como plataformas de hosting).
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={300}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">5. Tus derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Acceder a tus datos personales</li>
              <li>Solicitar la corrección de datos inexactos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </Reveal>

          <Reveal animation="fade-up" delay={350}>
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-white mt-8 mb-3">6. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política, puedes contactarme a través de{' '}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:text-cyan-300 transition-colors">
                WhatsApp
              </a>{' '}
              o mi correo electrónico.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
