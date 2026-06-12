import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Shield, Check, Trash2, Lock, ArrowLeft, Star, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const cargar = async () => {
    setLoading(true);
    try {
      if (!supabase) return;
      const { data, error } = await supabase.from('testimonios').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        setPending(data.filter((t) => !t.aprobado));
        setApproved(data.filter((t) => t.aprobado));
      }
    } catch (err) {
      console.error('Error al cargar testimonios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authed) cargar(); }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Contraseña incorrecta');
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      if (!supabase) return;
      const { error } = await supabase.from('testimonios').update({ aprobado: true }).eq('id', id);
      if (error) throw error;
      await cargar();
    } catch (err) {
      console.error('Error al aprobar testimonio:', err);
      alert('Error al aprobar testimonio. Revisa la consola.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este testimonio permanentemente?')) return;
    setActionLoading(id);
    try {
      if (!supabase) return;
      const { error } = await supabase.from('testimonios').delete().eq('id', id);
      if (error) throw error;
      await cargar();
    } catch (err) {
      console.error('Error al eliminar testimonio:', err);
      alert('Error al eliminar testimonio. Revisa la consola.');
    } finally {
      setActionLoading(null);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-brand-cyan" />
          </div>
          <h2 className="text-xl font-heading font-bold text-white text-center mb-6">Acceso Admin</h2>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setPwError(''); }}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-cyan/80 transition-all mb-3"
            autoFocus
          />
          {pwError && <p className="text-red-400 text-xs mb-3">{pwError}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-brand-cyan text-white font-bold text-sm transition-all hover:shadow-xl hover:shadow-blue-500/25"
          >
            Ingresar
          </button>
          <Link to="/" className="block text-center text-xs text-slate-400 hover:text-brand-cyan transition-colors mt-4">
            &larr; Volver al inicio
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-brand-cyan" />
          <h1 className="text-2xl font-heading font-bold text-white">Admin — Testimonios</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={cargar}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            title="Recargar"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-brand-cyan transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" /> Volver
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Cargando...</div>
      ) : (
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-heading font-semibold text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Pendientes ({pending.length})
            </h2>
            {pending.length === 0 ? (
              <p className="text-slate-500 text-sm">No hay testimonios pendientes.</p>
            ) : (
              <div className="space-y-3">
                {pending.map((t) => (
                  <div key={t.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{t.nombre}</span>
                        {t.empresa && <span className="text-slate-500 text-xs">{t.empresa}</span>}
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < t.estrellas ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10'}`} />
                        ))}
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{t.texto}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleApprove(t.id)}
                        disabled={actionLoading === t.id}
                        className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all disabled:opacity-50"
                        title="Aprobar"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        disabled={actionLoading === t.id}
                        className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-heading font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Aprobados ({approved.length})
            </h2>
            {approved.length === 0 ? (
              <p className="text-slate-500 text-sm">No hay testimonios aprobados.</p>
            ) : (
              <div className="space-y-3">
                {approved.map((t) => (
                  <div key={t.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-4 opacity-70">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium text-sm">{t.nombre}</span>
                        {t.empresa && <span className="text-slate-500 text-xs">{t.empresa}</span>}
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < t.estrellas ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10'}`} />
                        ))}
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{t.texto}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(t.id)}
                      disabled={actionLoading === t.id}
                      className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all disabled:opacity-50 flex-shrink-0"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
