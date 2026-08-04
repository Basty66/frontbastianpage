import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import Reveal from './Reveal';
import { WHATSAPP_FULL } from '../lib/constants';

const preguntas = [
  {
    q: '¿Cuánto cuesta mantener mi página después de creada?',
    r: '$0 CLP. La infraestructura serverless no tiene costo mensual. Solo pagas tu dominio .cl anual (~$10.000 CLP). Sin sorpresas, sin renovaciones de hosting.',
  },
  {
    q: '¿Puedo actualizar el contenido yo mismo?',
    r: 'Depende del proyecto. En webs corporativas y e-commerces incluyo un panel administrativo para que puedas modificar textos, precios, stock y productos sin saber programar. En landing pages, las actualizaciones las gestiono yo.',
  },
  {
    q: '¿Cuánto tiempo toma desarrollar mi página?',
    r: 'Una landing page está lista en 30 días hábiles, una web corporativa en 40 y un e-commerce en 50. El plazo corre una vez recibido el anticipo del 50% y los materiales (textos, logos, imágenes).',
  },
  {
    q: '¿Qué pasa si no me gusta el diseño?',
    r: 'Incluyo una ronda de revisión y ajustes post-entrega. Si hay cambios estructurales grandes después de aprobar el diseño, se cotizan aparte. Mi objetivo es que quedes conforme con el resultado.',
  },
  {
    q: '¿Ofrecen hosting gratis de por vida realmente?',
    r: 'Sí. Usamos Vercel Edge Network, una plataforma serverless con CDN global. Tu página se despliega en servidores de última generación sin costo recurrente. Ni siquiera tienes que preocuparte por mantenimiento de servidores.',
  },
  {
    q: '¿Cómo funcionan los pagos?',
    r: '50% de anticipo para iniciar el desarrollo y 50% contra entrega y conformidad. Acepto transferencia bancaria. Una vez recibido el saldo, te entrego todo el código fuente y el acceso al panel si aplica.',
  },
  {
    q: '¿Ofrecen soporte técnico?',
    r: 'Sí, 15 días de soporte técnico por correo electrónico desde la entrega. También ofrezco planes de soporte mensual (10 hrs/mes) y mantenimiento anual con actualizaciones, backups y monitoreo.',
  },
  {
    q: '¿Necesito tener un dominio?',
    r: 'No es necesario tenerlo antes. Podemos comprarlo durante el desarrollo. Te recomiendo un .cl para negocios locales (aprox. $10.000 CLP/año en NIC Chile). Si ya tienes uno, lo vinculamos sin problema.',
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (i) => setOpenId(openId === i ? null : i);

  return (
    <section id="faq" className="py-16 sm:py-20 px-4 sm:px-6 border-t border-white/5 bg-slate-900/10">
      <div className="max-w-3xl mx-auto">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            <span className="text-white">Preguntas </span>
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-slate-300">
            Resuelve tus dudas antes de dar el paso. Si no encuentras lo que buscas, escríbenos directo.
          </p>
        </Reveal>

        <div className="space-y-2">
          {preguntas.map((item, i) => {
            const isOpen = openId === i;
            return (
              <Reveal key={i} animation="fade-up" delay={40}>
                <div className={`group rounded-2xl border transition-[border-color,background,box-shadow] duration-400 ${
                  isOpen
                    ? 'border-brand-cyan/30 bg-brand-cyan/[0.03] shadow-lg shadow-brand-cyan/5'
                    : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                }`}>
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left"
                  >
                    <HelpCircle className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                      isOpen ? 'text-brand-cyan' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                    <span className={`flex-1 text-sm font-medium transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-slate-300 group-hover:text-white'
                    }`}>
                      {item.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-brand-cyan' : 'text-slate-500 group-hover:text-slate-300'
                    }`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${
                    isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="px-5 pb-4 text-sm text-slate-400 leading-relaxed pl-12">
                      {item.r}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal animation="fade-up" delay={120} className="text-center mt-10">
          <p className="text-slate-400 text-sm mb-4">¿Tienes otra pregunta?</p>
          <a
            href={WHATSAPP_FULL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-brand-cyan hover:text-cyan-300 transition-colors font-medium group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Escríbenos a WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
