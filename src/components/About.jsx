import { Code2, Briefcase, Cpu, Users, GraduationCap, Server } from 'lucide-react';
import Reveal from './Reveal';

const knowledge = [
  { icon: Code2, title: 'Diseño Moderno', desc: 'Sitios web atractivos y fáciles de usar que convierten visitantes en clientes' },
  { icon: Server, title: 'Tecnología Confiable', desc: 'Plataformas estables, rápidas y seguras que no fallan cuando más importa' },
  { icon: Cpu, title: 'Infraestructura Incluida', desc: 'Hosting, dominio y mantenimiento incluidos. Sin costos ocultos.' },
  { icon: GraduationCap, title: 'Compromiso', desc: 'Nos aseguramos de que quedes conforme. Soporte incluido después de la entrega.' },
];

const trajectory = [
  { icon: Briefcase, title: 'Experiencia', desc: 'Hemos ayudado a negocios chilenos a profesionalizar su presencia digital y vender más' },
  { icon: Users, title: 'Enfoque al Cliente', desc: 'Cada proyecto es una solución personalizada que reduce costos y aumenta ventas' },
];

const About = () => {
  return (
    <section id="sobre-mi" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            <span className="text-white">Sobre </span>
            <span className="text-gradient-blue">Nosotros</span>
          </h2>
          <p className="text-[#A1A1AA]">
            Somos un equipo comprometido con transformar ideas en soluciones digitales reales para PYMEs chilenas.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <Reveal animation="fade-left" className="lg:col-span-2">
            <div className="group relative bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 rounded-2xl backdrop-blur-sm md:backdrop-blur-lg transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />

              <div className="relative mx-auto max-w-[220px] sm:max-w-[260px] aspect-square rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] flex items-center justify-center overflow-hidden">
                  <img src="/images/portrait.png" alt="Cristian Bastian Cerda - Analista Programador" loading="lazy" width="520" height="520" className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>

              <div className="relative text-center mt-6">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <h3 className="relative z-10 text-xl font-heading font-semibold text-white">
                  Cristian Bastian Cerda
                </h3>
                <p className="relative z-10 text-white/60 text-sm font-medium mt-1">Fundador & Director</p>
                <p className="relative z-10 text-white/30 text-xs mt-2">BS DigitalTech</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <Reveal animation="fade-right">
              <div className="group relative bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 rounded-2xl backdrop-blur-sm md:backdrop-blur-lg transition-[border-color,box-shadow] duration-500 hover:border-white/10 hover:shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                <h3 className="relative text-xl sm:text-2xl font-heading font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-blue-500/30 rounded-full inline-block" />
                  Nuestra{' '}
                  <span className="text-gradient-chrome">Misión</span>
                </h3>
                <div className="relative space-y-4 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  <p>
                    Somos BS DigitalTech, una agencia digital especializada en crear páginas web que generan resultados.
                    Nos enfocamos en lo que importa: que tu negocio se vea profesional y consiga más clientes.
                  </p>
                  <p>
                    Cada proyecto que desarrollamos está pensado para resolver problemas reales de las PYMEs chilenas:
                    reducir costos, ahorrar tiempo y multiplicar su alcance digital.
                    Trabajamos codo a codo con cada cliente para entender sus necesidades y entregar soluciones que funcionen.
                  </p>
                  <p>
                    No somos una fábrica de templates. Cada página es única, diseñada específicamente para tu negocio
                    y tus clientes.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <Reveal animation="fade-up" delay={80}>
                <div className="group relative bg-white/[0.02] border border-white/[0.06] p-5 sm:p-6 rounded-2xl backdrop-blur-sm md:backdrop-blur-lg h-full transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-[background,border-color] duration-500">
                      <Code2 className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-all duration-500" />
                    </div>
                    <h4 className="text-sm font-heading font-semibold text-gradient-chrome">Conocimientos Clave</h4>
                  </div>
                  <ul className="relative space-y-2.5">
                    {knowledge.map((k, i) => {
                      const Icon = k.icon;
                      return (
                        <li key={i} className="group/item flex items-start gap-2.5 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.03] hover:translate-x-1">
                          <Icon className="w-4 h-4 text-blue-400/40 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:text-blue-400/70" />
                          <div>
                            <p className="text-white text-xs font-medium">{k.title}</p>
                            <p className="text-[#A1A1AA] text-xs">{k.desc}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>

              <Reveal animation="fade-up" delay={120}>
                <div className="group relative bg-white/[0.02] border border-white/[0.06] p-5 sm:p-6 rounded-2xl backdrop-blur-sm md:backdrop-blur-lg h-full transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-white/10 hover:shadow-xl">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none" />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-[background,border-color] duration-500">
                      <Briefcase className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-all duration-500" />
                    </div>
                    <h4 className="text-sm font-heading font-semibold text-gradient-chrome">Trayectoria</h4>
                  </div>
                  <ul className="relative space-y-2.5">
                    {trajectory.map((t, i) => {
                      const Icon = t.icon;
                      return (
                        <li key={i} className="group/item flex items-start gap-2.5 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.03] hover:translate-x-1">
                          <Icon className="w-4 h-4 text-blue-400/40 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:text-blue-400/70" />
                          <div>
                            <p className="text-white text-xs font-medium">{t.title}</p>
                            <p className="text-[#A1A1AA] text-xs">{t.desc}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;