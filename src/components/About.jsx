import { Code2, Briefcase, Cpu, Users, GraduationCap, Server } from 'lucide-react';
import Reveal from './Reveal';

const knowledge = [
  { icon: Code2, title: 'Frontend', desc: 'React, Tailwind CSS, JavaScript, HTML5, CSS3, Vite' },
  { icon: Server, title: 'Backend & Arquitectura', desc: 'Node.js, APIs RESTful, Serverless, Cloud Functions' },
  { icon: Cpu, title: 'Infraestructura', desc: 'Arquitecturas serverless, Git, CI/CD, despliegue automatizado' },
  { icon: GraduationCap, title: 'Formación Continua', desc: 'Analista Programador, certificaciones en tecnologías web modernas' },
];

const trajectory = [
  { icon: Briefcase, title: 'Experiencia', desc: 'Desarrollo de plataformas web para PYMEs chilenas con enfoque en rendimiento y escalabilidad' },
  { icon: Users, title: 'Enfoque al Cliente', desc: 'Soluciones a medida que reducen costos operativos y multiplican el alcance digital' },
];

const About = () => {
  return (
    <section id="sobre-mi" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 bg-slate-900/20 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-delayed pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            Sobre{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">
              Mí
            </span>
          </h2>
          <p className="text-slate-300">
            Detrás del código hay una persona comprometida con transformar ideas en soluciones digitales reales.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <Reveal animation="fade-left" className="lg:col-span-2">
            <div className="group relative bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/10 hover:-translate-y-1">
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-cyan/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.02] to-transparent pointer-events-none" />

              <div className="relative mx-auto max-w-[260px] aspect-square rounded-xl overflow-hidden">
                <div className="absolute -inset-6 bg-brand-cyan/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-float pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-800 to-[#030712] border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-cyan/15 via-transparent to-transparent" />
                  <div className="absolute -inset-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:animate-[shine_0.8s_ease-in-out] pointer-events-none" />
                  <img src="/images/portrait.png" alt="Cristian Bastian Cerda - Analista Programador" className="relative w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              </div>

              <div className="relative text-center mt-6">
                <svg viewBox="0 2 40 26" fill="none" className="absolute inset-0 w-full h-full text-brand-cyan/[0.04] group-hover:text-brand-cyan/[0.08] transition-all duration-700 pointer-events-none scale-[2] origin-center">
                  <path d="M20 6C12 6 7 12 7 19v4a3 3 0 003 3h20a3 3 0 003-3v-4c0-7-5-13-13-13z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M11 9L7 3l7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M29 9l4-6-7 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="15" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="25" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="15" cy="18" r="1.5" fill="currentColor" />
                  <circle cx="25" cy="18" r="1.5" fill="currentColor" />
                  <path d="M18.5 23l1.5 2 1.5-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/50 to-transparent group-hover:via-brand-cyan transition-all duration-500" />
                <h3 className="relative z-10 text-xl font-heading font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-200 group-hover:bg-clip-text transition-all duration-500">
                  Cristian Bastian Cerda
                </h3>
                <p className="relative z-10 text-brand-cyan text-sm font-medium mt-1">Analista Programador</p>
                <p className="relative z-10 text-slate-400 text-xs mt-2">Full-Stack · Arq. Serverless</p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3 space-y-6 sm:space-y-8">
            <Reveal animation="fade-right">
              <div className="group relative bg-white/[0.02] border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-lg transition-all duration-500 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.02] to-transparent pointer-events-none" />
                <h3 className="relative text-xl sm:text-2xl font-heading font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 bg-brand-cyan rounded-full inline-block group-hover:shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-shadow duration-500" />
                  Mi{' '}
                  <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">
                    Trayectoria
                  </span>
                </h3>
                <div className="relative space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <p>
                    Soy Analista Programador independiente especializado en desarrollo web moderno.
                    Mi enfoque combina principios full-stack con arquitecturas serverless para ofrecer
                    plataformas rápidas, seguras y sin costos fijos de infraestructura.
                  </p>
                  <p>
                    Cada proyecto que desarrollo está pensado para resolver problemas reales de las PYMEs chilenas:
                    reducir costos operativos, automatizar procesos y multiplicar su alcance digital.
                    Trabajo codo a codo con cada cliente para traducir sus necesidades en soluciones técnicas efectivas.
                  </p>
                  <p>
                    Creo firmemente en el aprendizaje continuo y en aplicar las mejores prácticas de la industria
                    para entregar productos que no solo se vean bien, sino que realmente funcionen y generen resultados.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <Reveal animation="fade-up" delay={100}>
                <div className="group relative bg-white/[0.02] border border-white/10 p-5 sm:p-6 rounded-2xl backdrop-blur-lg h-full transition-all duration-500 hover:-translate-y-1 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.02] to-transparent pointer-events-none" />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-all duration-500">
                      <Code2 className="w-5 h-5 text-brand-cyan group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-500" />
                    </div>
                    <h4 className="text-sm font-heading font-semibold text-white">Conocimientos <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">Clave</span></h4>
                  </div>
                  <ul className="relative space-y-2.5">
                    {knowledge.map((k, i) => {
                      const Icon = k.icon;
                      return (
                        <li key={i} className="group/item flex items-start gap-2.5 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.03] hover:translate-x-1">
                          <Icon className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                          <div>
                            <p className="text-white text-xs font-medium">{k.title}</p>
                            <p className="text-slate-400 text-xs">{k.desc}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>

              <Reveal animation="fade-up" delay={200}>
                <div className="group relative bg-white/[0.02] border border-white/10 p-5 sm:p-6 rounded-2xl backdrop-blur-lg h-full transition-all duration-500 hover:-translate-y-1 hover:border-brand-cyan/30 hover:shadow-xl hover:shadow-brand-cyan/10">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-cyan/[0.02] to-transparent pointer-events-none" />
                  <div className="relative flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-brand-cyan/10 group-hover:border-brand-cyan/30 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] transition-all duration-500">
                      <Briefcase className="w-5 h-5 text-brand-cyan group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] transition-all duration-500" />
                    </div>
                    <h4 className="text-sm font-heading font-semibold"><span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">Trayectoria</span></h4>
                  </div>
                  <ul className="relative space-y-2.5">
                    {trajectory.map((t, i) => {
                      const Icon = t.icon;
                      return (
                        <li key={i} className="group/item flex items-start gap-2.5 p-2 -mx-2 rounded-lg transition-all duration-300 hover:bg-white/[0.03] hover:translate-x-1">
                          <Icon className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]" />
                          <div>
                            <p className="text-white text-xs font-medium">{t.title}</p>
                            <p className="text-slate-400 text-xs">{t.desc}</p>
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