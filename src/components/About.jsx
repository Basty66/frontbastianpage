import { Code2, Cpu, GraduationCap, Server, Zap, Shield, Target } from 'lucide-react';
import Reveal from './Reveal';

const skills = [
  { icon: Code2, label: 'React & Vite' },
  { icon: Server, label: 'Tailwind CSS' },
  { icon: Cpu, label: 'Node.js' },
  { icon: Zap, label: 'Supabase' },
  { icon: Shield, label: 'Vercel Edge' },
  { icon: GraduationCap, label: 'SEO & Schema' },
];

const stats = [
  { value: '20+', label: 'Proyectos' },
  { value: '15+', label: 'Clientes' },
  { value: '100%', label: 'Disponible' },
];

const About = () => {
  return (
    <section id="sobre-mi" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            <span className="text-white">Sobre </span>
            <span className="text-gradient-blue">nosotros</span>
          </h2>
          <p className="text-[#A1A1AA]">
            Somos un equipo comprometido con transformar ideas en soluciones digitales reales para PYMEs chilenas.
          </p>
        </Reveal>

        {/* Row 1: Photo + Mission */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-stretch mb-6 sm:mb-8">
          {/* Photo Card */}
          <Reveal animation="fade-left" className="lg:col-span-2">
            <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden backdrop-blur-sm h-full transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent pointer-events-none" />
              <div className="relative p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-white/[0.06] group-hover:border-blue-500/20 transition-colors duration-500 mb-5">
                  <img src="/images/portrait.png" alt="Cristian Bastian Cerda" loading="lazy" width="520" height="520" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white">Cristian Bastian Cerda</h3>
                <p className="text-blue-400/70 text-sm font-medium mt-1">Fundador & Director</p>
                <p className="text-[#A1A1AA] text-xs mt-1">BS DigitalTech</p>
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mt-4" />
                <div className="flex gap-4 mt-4">
                  {stats.map((s, i) => (
                    <div key={i} className="text-center">
                      <span className="block text-lg font-bold text-white">{s.value}</span>
                      <span className="text-[10px] text-[#A1A1AA]">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mission */}
          <Reveal animation="fade-right" className="lg:col-span-3">
            <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm h-full transition-[border-color,box-shadow] duration-500 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.02] via-transparent to-transparent pointer-events-none" />
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
                    Nuestra <span className="text-gradient-chrome">misión</span>
                  </h3>
                </div>
                <div className="space-y-4 text-[#A1A1AA] text-sm sm:text-base leading-relaxed">
                  <p>
                    Somos <span className="text-white font-medium">BS DigitalTech</span>, una agencia digital especializada en crear páginas web que generan resultados.
                    Nos enfocamos en lo que importa: que tu negocio se vea profesional y consiga más clientes.
                  </p>
                  <p>
                    Cada proyecto que desarrollamos está pensado para resolver problemas reales de las PYMEs chilenas:
                    <span className="text-white font-medium"> reducir costos, ahorrar tiempo y multiplicar su alcance digital</span>.
                  </p>
                  <p>
                    No somos una fábrica de templates. <span className="text-white font-medium">Cada página es única</span>, diseñada específicamente para tu negocio y tus clientes.
                  </p>
                </div>
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent my-6" />
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500/60" />
                    <span className="text-xs text-[#A1A1AA]">Hosting $0/mes incluido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500/60" />
                    <span className="text-xs text-[#A1A1AA]">30 días de garantía</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500/60" />
                    <span className="text-xs text-[#A1A1AA]">Soporte post-entrega</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Row 2: Skills */}
        <Reveal animation="fade-up" delay={100}>
          <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm transition-[border-color,box-shadow] duration-500 hover:border-blue-500/20 hover:shadow-xl hover:shadow-blue-500/5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] via-transparent to-blue-500/[0.02] pointer-events-none" />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-white">
                  Stack <span className="text-gradient-chrome">tecnológico</span>
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {skills.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} className="group/skill flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-blue-600/[0.06] hover:border-blue-500/15 transition-all duration-300">
                      <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover/skill:bg-blue-600/10 group-hover/skill:border-blue-500/20 transition-all duration-300">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A1A1AA] group-hover/skill:text-blue-400 transition-colors duration-300" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-[#A1A1AA] group-hover/skill:text-white transition-colors duration-300 truncate">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default About;
