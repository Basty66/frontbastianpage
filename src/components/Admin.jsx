import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Shield, Check, Trash2, Lock, ArrowLeft, Star, RefreshCw,
  LogIn, AlertTriangle, X, Eye, EyeOff, UserCheck, Clock,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ADMIN_PASSWORD = 'admin123';

function toastStyle(type, msg) {
  const colors = {
    success: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    error: 'bg-red-500/15 border-red-500/30 text-red-300',
    info: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
  };
  return { type, msg, cls: colors[type] || colors.info };
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [toast, setToast] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const [loginAnim, setLoginAnim] = useState(false);

  useEffect(() => { setTimeout(() => setLoginAnim(true), 50); }, []);

  const showToast = (type, msg) => {
    setToast(toastStyle(type, msg));
    setTimeout(() => setToast(null), 3000);
  };

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
      showToast('error', 'Error al cargar testimonios');
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
      setTimeout(() => setPwError(''), 2500);
    }
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      if (!supabase) return;
      const { error } = await supabase.from('testimonios').update({ aprobado: true }).eq('id', id);
      if (error) throw error;
      showToast('success', 'Testimonio aprobado correctamente');
      await cargar();
    } catch (err) {
      console.error('Error al aprobar:', err);
      showToast('error', 'Error al aprobar testimonio');
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
      showToast('success', 'Testimonio eliminado');
      await cargar();
    } catch (err) {
      console.error('Error al eliminar:', err);
      showToast('error', 'Error al eliminar testimonio');
    } finally {
      setActionLoading(null);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-tr from-[#030712] via-[#0b1329] to-[#0f172a]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-32 -right-32 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl transition-all duration-1000 ${loginAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl transition-all duration-1000 delay-300 ${loginAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
        </div>

        <form
          onSubmit={handleLogin}
          className={`relative w-full max-w-sm bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/30 transition-all duration-700 ease-out ${
            loginAnim ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-blue-500/20 border border-brand-cyan/20 flex items-center justify-center animate-float">
              <Shield className="w-7 h-7 text-brand-cyan" />
            </div>
            <h2 className="text-xl font-heading font-bold text-white">Panel Administrativo</h2>
            <p className="text-slate-400 text-xs mt-1">Acceso restringido</p>
          </div>

          <div className="space-y-1 mb-4">
            <label className="text-xs text-slate-400 block font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Ingresa la contraseña"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPwError(''); }}
                className={`w-full bg-black/40 border rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  pwError
                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-white/10 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pwError && (
              <p className="text-red-400 text-xs flex items-center gap-1 mt-1.5 animate-modal-content">
                <AlertTriangle className="w-3 h-3" /> {pwError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="relative overflow-hidden group w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-brand-cyan text-white font-bold text-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-brand-cyan to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <LogIn className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Ingresar</span>
          </button>

          <Link
            to="/"
            className="block text-center text-xs text-slate-500 hover:text-brand-cyan transition-colors mt-5 group"
          >
            <span className="group-hover:mr-1 transition-all">&larr;</span> Volver al inicio
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#030712] via-[#0b1329] to-[#0f172a]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-modal-content">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-brand-cyan" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-white">Admin</h1>
              <p className="text-xs text-slate-400">Gestión de testimonios</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={cargar}
              disabled={loading}
              className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50"
              title="Recargar"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-brand-cyan transition-colors flex items-center gap-1 bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl hover:bg-white/[0.05]"
            >
              <ArrowLeft className="w-3 h-3" /> Volver
            </Link>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className={`mb-4 px-4 py-3 rounded-xl border text-sm flex items-center gap-2 animate-modal-content ${toast.cls}`}>
            {toast.type === 'success' ? <Check className="w-4 h-4" />
              : toast.type === 'error' ? <AlertTriangle className="w-4 h-4" />
              : <LogIn className="w-4 h-4" />}
            <span className="flex-1">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="opacity-60 hover:opacity-100 transition-opacity">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-brand-cyan" />
            <p className="text-sm">Cargando testimonios...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Pending */}
            <section className="animate-modal-content" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <h2 className="text-lg font-heading font-semibold text-amber-400">Pendientes</h2>
                  <span className="text-xs text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/5">
                    {pending.length}
                  </span>
                </div>
              </div>

              {pending.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <UserCheck className="w-10 h-10 mx-auto mb-3 text-emerald-400/50" />
                  <p className="text-slate-500 text-sm">No hay testimonios pendientes.</p>
                  <p className="text-slate-600 text-xs mt-1">Los nuevos testimonios aparecerán aquí.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {pending.map((t, i) => (
                    <div
                      key={t.id}
                      className="group bg-gradient-to-r from-amber-500/[0.02] to-transparent border border-amber-500/15 rounded-xl p-4 flex items-start gap-4 transition-all duration-500 hover:bg-amber-500/[0.04] hover:border-amber-500/30"
                      style={{ animation: `modal-content-in 0.4s ease-out ${0.1 + i * 0.06}s both` }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">{t.nombre}</span>
                          {t.empresa && <span className="text-slate-500 text-xs">— {t.empresa}</span>}
                          <Clock className="w-3 h-3 text-slate-600 ml-auto" />
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`w-3 h-3 ${j < t.estrellas ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10'}`} />
                          ))}
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed">&ldquo;{t.texto}&rdquo;</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0 pt-1">
                        <button
                          onClick={() => handleApprove(t.id)}
                          disabled={actionLoading === t.id}
                          className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Aprobar"
                        >
                          {actionLoading === t.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(t.id)}
                          disabled={actionLoading === t.id}
                          className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Eliminar"
                        >
                          {actionLoading === t.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Approved */}
            <section className="animate-modal-content" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h2 className="text-lg font-heading font-semibold text-emerald-400">Aprobados</h2>
                  <span className="text-xs text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/5">
                    {approved.length}
                  </span>
                </div>
              </div>

              {approved.length === 0 ? (
                <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
                  <Star className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                  <p className="text-slate-500 text-sm">No hay testimonios aprobados.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {approved.map((t, i) => (
                    <div
                      key={t.id}
                      className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-start gap-4 transition-all duration-300 hover:bg-white/[0.03] opacity-70 hover:opacity-100"
                      style={{ animation: `modal-content-in 0.3s ease-out ${0.1 + i * 0.04}s both` }}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium text-sm">{t.nombre}</span>
                          {t.empresa && <span className="text-slate-500 text-xs">— {t.empresa}</span>}
                          <Check className="w-3 h-3 text-emerald-500/50 ml-auto" />
                        </div>
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`w-3 h-3 ${j < t.estrellas ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10'}`} />
                          ))}
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">&ldquo;{t.texto}&rdquo;</p>
                      </div>
                      <button
                        onClick={() => handleDelete(t.id)}
                        disabled={actionLoading === t.id}
                        className="p-2 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400/60 hover:bg-red-500/15 hover:border-red-500/40 hover:text-red-400 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 pt-1"
                        title="Eliminar"
                      >
                        {actionLoading === t.id ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
