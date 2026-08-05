import { useState, useEffect } from 'react';
import { Star, Quote, Send } from 'lucide-react';
import Reveal from './Reveal';
import { supabase } from '../lib/supabaseClient';

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

const Testimonios = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', empresa: '', texto: '', estrellas: 5 });
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');
  const [testimoniosDb, setTestimoniosDb] = useState([]);

  const cargarTestimonios = async () => {
    if (!supabase) return;
    const { data, error } = await supabase.from('testimonios').select('*').order('created_at', { ascending: false }).limit(9);
    if (!error && data) setTestimoniosDb(data);
  };

  useEffect(() => { cargarTestimonios(); }, []);

  const aprobados = testimoniosDb.filter((t) => t.aprobado);
  const todos = aprobados.length > 0 ? aprobados : iniciales;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.nombre.trim() || !formData.texto.trim()) {
      setError('Nombre y testimonio son obligatorios.');
      return;
    }
    setEnviando(true);
    try {
      if (supabase) {
        const { error: dbError } = await supabase.from('testimonios').insert({
          nombre: formData.nombre.trim(),
          empresa: formData.empresa.trim() || null,
          texto: formData.texto.trim(),
          estrellas: formData.estrellas,
        });
        if (dbError) {
          console.warn('Supabase no disponible, guardando localmente:', dbError.message);
        }
      }
      const local = JSON.parse(localStorage.getItem('bd-testimonios') || '[]');
      local.push({
        nombre: formData.nombre.trim(),
        empresa: formData.empresa.trim() || '',
        texto: formData.texto.trim(),
        estrellas: formData.estrellas,
        fecha: new Date().toISOString(),
      });
      localStorage.setItem('bd-testimonios', JSON.stringify(local));
      setEnviado(true);
      setFormData({ nombre: '', empresa: '', texto: '', estrellas: 5 });
      cargarTestimonios();
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
    <section id="testimonios" className="relative py-16 sm:py-20 px-4 sm:px-6 border-y border-white/5 overflow-hidden" style={{ background: '#09090B' }}>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 tracking-tight">
            Lo que dicen{' '}
            <span className="text-gradient-blue">mis clientes</span>
          </h2>
          <p className="text-[#A1A1AA]">
            Clientes reales, resultados concretos. Esto es lo que opinan quienes ya trabajaron conmigo.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {todos.map((t, i) => (
            <Reveal key={i} animation="fade-up" delay={i * 120}>
              <div className="group relative bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8 rounded-2xl backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5 h-full flex flex-col">
                <div className="absolute top-3 right-3 text-white/[0.03]">
                  <Quote className="w-16 h-16" />
                </div>
                <div className="relative flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${starColor(j + 1, t.estrellas)}`} />
                  ))}
                </div>
                <p className="relative text-sm text-[#A1A1AA] leading-relaxed flex-1 italic">&ldquo;{t.texto}&rdquo;</p>
                <div className="relative mt-5 pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/[0.06] flex items-center justify-center text-white/60 font-bold text-sm flex-shrink-0">
                      {t.nombre.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm leading-tight">{t.nombre}</p>
                      <p className="text-[#A1A1AA] text-xs">{t.empresa}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal animation="fade-up" className="max-w-lg mx-auto">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="group w-full p-5 rounded-2xl border-2 border-dashed border-white/[0.06] hover:border-white/10 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-500 text-center"
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
                  placeholder="Ej: Juan Pérez"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1 font-medium">Empresa</label>
                <input
                  type="text"
                  placeholder="Ej: Mi Empresa SpA"
                  value={formData.empresa}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs text-[#A1A1AA] block mb-1 font-medium">Calificación</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, estrellas: star })}
                      className="transition-all duration-200 hover:scale-110"
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
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-white text-sm placeholder:text-[#A1A1AA]/40 focus:outline-none focus:border-white/20 transition-all resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-white/60 bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl">{error}</p>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                {enviando ? 'Enviando...' : 'Enviar reseña'}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonios;
