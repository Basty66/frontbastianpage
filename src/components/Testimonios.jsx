import { useState, useEffect } from 'react';
import { Star, Quote, Send } from 'lucide-react';
import Reveal from './Reveal';
import { supabase } from '../lib/supabaseClient';

const SEED_KEY = 'bd-testimonios-seeded';
const LOCAL_KEY = 'bd-testimonios';

const iniciales = [
  {
    nombre: 'María González',
    empresa: 'Distribuidora MG SpA',
    texto: 'Pasamos de pagar hosting a $0. La página cargaba lento y ahora vuela. Las ventas online subieron un 40% en dos meses.',
    estrellas: 5,
  },
  {
    nombre: 'Carlos Muñoz',
    empresa: 'Ferretería El Constructor',
    texto: 'Me hicieron un e-commerce completo con panel para gestionar stock yo mismo. Súper intuitivo y el soporte fue rápido y claro.',
    estrellas: 5,
  },
  {
    nombre: 'Paola Soto',
    empresa: 'Clínica Dental DS',
    texto: 'Necesitaba una web profesional para mi clínica. Quedó preciosa, mis pacientes me dicen que se ve de primer nivel.',
    estrellas: 5,
  },
];

const readLocal = () => {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch { return []; }
};
const writeLocal = (arr) => localStorage.setItem(LOCAL_KEY, JSON.stringify(arr));

const Testimonios = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', empresa: '', texto: '', estrellas: 5 });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      let local = readLocal();

      if (local.length === 0 && !localStorage.getItem(SEED_KEY)) {
        writeLocal(iniciales);
        localStorage.setItem(SEED_KEY, '1');
        local = iniciales;
      }

      if (mounted) setTodos(local);

      if (supabase) {
        try {
          const { data, error: dbErr } = await supabase
            .from('testimonios')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(20);
          if (!dbErr && data && data.length > 0) {
            const aprobados = data.filter((t) => t.aprobado && t.texto);
            if (aprobados.length > 0) {
              const existentes = new Set(local.map((l) => l.texto));
              const nuevos = aprobados.filter((a) => !existentes.has(a.texto));
              if (nuevos.length > 0) {
                const merged = [...nuevos, ...local];
                writeLocal(merged);
                if (mounted) setTodos(merged);
              }
            }
          }
        } catch { /* si Supabase falla se usa lo guardado en localStorage */ }
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.nombre.trim() || !formData.texto.trim()) {
      setError('Nombre y testimonio son obligatorios.');
      return;
    }
    setEnviando(true);
    try {
      const nuevo = {
        nombre: formData.nombre.trim(),
        empresa: formData.empresa.trim() || '',
        texto: formData.texto.trim(),
        estrellas: formData.estrellas,
        fecha: new Date().toISOString(),
      };

      if (supabase) {
        try {
          await supabase.from('testimonios').insert({
            nombre: nuevo.nombre,
            empresa: nuevo.empresa || null,
            texto: nuevo.texto,
            estrellas: nuevo.estrellas,
          });
        } catch { /* el testimonio igual se guarda en local más abajo */ }
      }

      const actual = readLocal();
      actual.unshift(nuevo);
      writeLocal(actual);
      setTodos([...actual]);
      setEnviado(true);
      setFormData({ nombre: '', empresa: '', texto: '', estrellas: 5 });
    } catch (err) {
      console.error('Error al guardar testimonio:', err);
    } finally {
      setEnviando(false);
    }
  };

  const starColor = (star, current) =>
    star <= current
      ? 'fill-blue-400/70 text-blue-400/70'
      : 'fill-white/10 text-white/10';

  return (
    <section id="testimonios" className="relative py-12 sm:py-16 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-blue-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-2 tracking-tight">
            Lo que dicen{' '}
            <span className="text-gradient-blue">mis clientes</span>
          </h2>
          <p className="text-[#A1A1AA] text-sm">
            Clientes reales, resultados concretos.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {todos.length === 0 ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={`skel-${i}`} className="bg-white/[0.02] border border-white/[0.06] p-5 rounded-xl h-44 animate-pulse" />
            ))
          ) : (
            todos.slice(0, 3).map((t, i) => (
              <Reveal key={`${t.nombre}-${i}`} animation="fade-up" delay={Math.min(i, 2) * 100}>
                <div className="group relative bg-white/[0.02] border border-white/[0.06] p-4 rounded-xl backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5 h-full flex flex-col">
                  <div className="absolute top-2 right-2 text-blue-500/[0.04]">
                    <Quote className="w-10 h-10" />
                  </div>
                  <div className="relative flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${starColor(j + 1, t.estrellas)}`} />
                    ))}
                  </div>
                  <p className="relative text-xs text-[#A1A1AA] leading-relaxed flex-1 italic line-clamp-4">&ldquo;{t.texto}&rdquo;</p>
                  <div className="relative mt-3 pt-2.5 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 font-bold text-xs flex-shrink-0">
                        {t.nombre.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-xs leading-tight">{t.nombre}</p>
                        <p className="text-[#A1A1AA] text-xs">{t.empresa}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))
          )}
        </div>

        <Reveal animation="fade-up" className="max-w-lg mx-auto">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="group w-full p-5 rounded-2xl border-2 border-dashed border-white/[0.06] hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] t-smooth duration-500 text-center"
            >
              <Star className="w-6 h-6 mx-auto mb-2 text-blue-400/30 group-hover:text-blue-400/60 transition-colors duration-500" />
              <p className="text-sm text-[#A1A1AA] group-hover:text-white transition-colors font-medium">
                ¿Ya trabajaste con nosotros? <span className="text-white/80">Deja tu reseña</span>
              </p>
            </button>
          ) : enviado ? (
            <div className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <svg className="w-12 h-12 mx-auto mb-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-white font-semibold">¡Gracias por tu reseña!</p>
              <p className="text-sm text-[#A1A1AA] mt-1">Tu opinión ayuda a otros a decidir.</p>
              <button
                onClick={() => { setEnviado(false); setShowForm(false); }}
                className="mt-4 text-sm text-white/60 hover:text-white transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8 space-y-4">
              <h4 className="text-white font-heading font-semibold text-base flex items-center gap-2">
                <Star className="w-4 h-4 text-blue-400/60" />
                Deja tu reseña
              </h4>

              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1 font-medium">Tu nombre *</label>
                <input
                  required
                  type="text"
                  placeholder="Ej: Juan Perez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 t-smooth"
                />
              </div>

              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1 font-medium">Empresa</label>
                <input
                  type="text"
                  placeholder="Ej: Mi Empresa SpA"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 t-smooth"
                />
              </div>

              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1 font-medium">Calificacion</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, estrellas: star })}
                      className="t-smooth duration-200 hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${starColor(star, formData.estrellas)}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1 font-medium">Tu testimonio *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Cuenta tu experiencia trabajando conmigo..."
                  value={formData.texto}
                  onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 t-smooth resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-white/60 bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl">{error}</p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm t-smooth hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {enviando ? 'Enviando...' : 'Enviar resena'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonios;
