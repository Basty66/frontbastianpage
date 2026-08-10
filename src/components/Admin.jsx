import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Shield, Check, Trash2, Lock, ArrowLeft, Star, RefreshCw,
  LogIn, AlertTriangle, X, Eye, EyeOff, UserCheck,
  Plus, Edit3, GripVertical, Save, FolderKanban, FileText,
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

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`mb-4 px-4 py-3 rounded-xl border text-sm flex items-center gap-2 animate-modal-content ${toast.cls}`}>
      {toast.type === 'success' ? <Check className="w-4 h-4" />
        : toast.type === 'error' ? <AlertTriangle className="w-4 h-4" />
        : <LogIn className="w-4 h-4" />}
      <span className="flex-1">{toast.msg}</span>
      <button onClick={onClose} className="opacity-60 hover:opacity-100 transition-opacity">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function TabsSection({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 border-b border-white/5 mb-6 overflow-x-auto scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap t-smooth duration-300 border-b-2 -mb-px ${
            active === tab.id
              ? 'border-blue-500 text-blue-500'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
          }`}
        >
          <tab.icon className="w-3.5 h-3.5" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── Testimonios ───────────────────────────────────────────
function AdminTestimonios({ supabase, showToast }) {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  // Sin cliente de Supabase no hay nada que esperar
  const [loading, setLoading] = useState(!!supabase);
  const [actionLoading, setActionLoading] = useState(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const cargar = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from('testimonios').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data && mountedRef.current) {
        setPending(data.filter((t) => !t.aprobado));
        setApproved(data.filter((t) => t.aprobado));
      }
    } catch (err) {
      console.error('Error al cargar testimonios:', err);
      showToast('error', 'Error al cargar testimonios');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [supabase, showToast]);

  /* Microtarea: difiere la carga inicial fuera del commit del efecto,
     evitando el render en cascada por el setState de cargar(). */
  useEffect(() => { Promise.resolve().then(cargar); }, [cargar]);

  /* Recarga manual: muestra el spinner mientras refresca */
  const recargar = useCallback(async () => { setLoading(true); await cargar(); }, [cargar]);

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      if (!supabase) return;
      const { error } = await supabase.from('testimonios').update({ aprobado: true }).eq('id', id);
      if (error) throw error;
      showToast('success', 'Testimonio aprobado');
      await recargar();
    } catch (err) {
      console.error('Error al aprobar:', err);
      showToast('error', 'Error al aprobar');
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
      await recargar();
    } catch (err) {
      console.error('Error al eliminar:', err);
      showToast('error', 'Error al eliminar');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
        <p className="text-sm">Cargando testimonios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h2 className="text-lg font-heading font-semibold text-amber-400">Pendientes</h2>
          <span className="text-xs text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/5">{pending.length}</span>
        </div>
        {pending.length === 0 ? (
          <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
            <UserCheck className="w-10 h-10 mx-auto mb-3 text-emerald-400/50" />
            <p className="text-slate-500 text-sm">No hay testimonios pendientes.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((t, i) => (
              <div key={t.id} className="group bg-gradient-to-r from-amber-500/[0.02] to-transparent border border-amber-500/15 rounded-xl p-4 flex items-start gap-4 t-smooth duration-300 hover:bg-amber-500/[0.04] hover:border-amber-500/30"
                style={{ animation: `modal-content-in 0.3s ease-out ${0.05 + i * 0.04}s both` }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium text-sm">{t.nombre}</span>
                    {t.empresa && <span className="text-slate-500 text-xs">— {t.empresa}</span>}
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < t.estrellas ? 'fill-amber-400 text-amber-400' : 'fill-white/10 text-white/10'}`} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">&ldquo;{t.texto}&rdquo;</p>
                </div>
                <div className="flex gap-2 flex-shrink-0 pt-1">
                  <button onClick={() => handleApprove(t.id)} disabled={actionLoading === t.id}
                    className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 t-smooth duration-300 disabled:opacity-40"
                    title="Aprobar">
                    {actionLoading === t.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(t.id)} disabled={actionLoading === t.id}
                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 t-smooth duration-300 disabled:opacity-40"
                    title="Eliminar">
                    {actionLoading === t.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <h2 className="text-lg font-heading font-semibold text-emerald-400">Aprobados</h2>
          <span className="text-xs text-slate-500 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/5">{approved.length}</span>
        </div>
        {approved.length === 0 ? (
          <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
            <Star className="w-10 h-10 mx-auto mb-3 text-slate-600" />
            <p className="text-slate-500 text-sm">No hay testimonios aprobados.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {approved.map((t, i) => (
              <div key={t.id} className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-start gap-4 t-smooth duration-300 hover:bg-white/[0.03] opacity-70 hover:opacity-100"
                style={{ animation: `modal-content-in 0.3s ease-out ${0.05 + i * 0.03}s both` }}>
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
                <button onClick={() => handleDelete(t.id)} disabled={actionLoading === t.id}
                  className="p-2 rounded-lg bg-red-500/5 border border-red-500/20 text-red-400/60 hover:bg-red-500/15 hover:border-red-500/40 hover:text-red-400 t-smooth duration-300 disabled:opacity-40 flex-shrink-0 pt-1"
                  title="Eliminar">
                  {actionLoading === t.id ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// ─── Proyectos ─────────────────────────────────────────────
const emptyProyecto = { titulo: '', descripcion: '', url: '', repo: '', tags: '', screenshot: '', orden: 0, visible: true };

function AdminProyectos({ supabase, showToast }) {
  const [items, setItems] = useState([]);
  // Sin cliente de Supabase no hay nada que esperar
  const [loading, setLoading] = useState(!!supabase);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProyecto);
  const [saving, setSaving] = useState(false);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const cargar = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from('proyectos').select('*').order('orden', { ascending: true });
      if (error) throw error;
      if (mountedRef.current) setItems(data || []);
    } catch (err) {
      console.error('Error al cargar proyectos:', err);
      showToast('error', 'Error al cargar proyectos');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [supabase, showToast]);

  /* Microtarea: difiere la carga inicial fuera del commit del efecto,
     evitando el render en cascada por el setState de cargar(). */
  useEffect(() => { Promise.resolve().then(cargar); }, [cargar]);

  /* Recarga manual: muestra el spinner mientras refresca */
  const recargar = useCallback(async () => { setLoading(true); await cargar(); }, [cargar]);

  const openNew = () => { setEditing('new'); setForm(emptyProyecto); };
  const openEdit = (item) => { setEditing(item.id); setForm({ ...item, tags: (item.tags || []).join(', ') }); };
  const cancelEdit = () => { setEditing(null); setForm(emptyProyecto); };

  const handleSave = async () => {
    if (!form.titulo.trim()) { showToast('error', 'El título es obligatorio'); return; }
    setSaving(true);
    try {
      if (!supabase) return;
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        orden: Number(form.orden) || 0,
      };
      if (editing === 'new') {
        const { error } = await supabase.from('proyectos').insert(payload);
        if (error) throw error;
        showToast('success', 'Proyecto creado');
      } else {
        const { error } = await supabase.from('proyectos').update(payload).eq('id', editing);
        if (error) throw error;
        showToast('success', 'Proyecto actualizado');
      }
      cancelEdit();
      await recargar();
    } catch (err) {
      console.error('Error al guardar:', err);
      showToast('error', 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este proyecto permanentemente?')) return;
    try {
      if (!supabase) return;
      const { error } = await supabase.from('proyectos').delete().eq('id', id);
      if (error) throw error;
      showToast('success', 'Proyecto eliminado');
      await recargar();
    } catch (err) {
      console.error('Error al eliminar:', err);
      showToast('error', 'Error al eliminar');
    }
  };

  const toggleVisible = async (item) => {
    try {
      if (!supabase) return;
      const { error } = await supabase.from('proyectos').update({ visible: !item.visible }).eq('id', item.id);
      if (error) throw error;
      await recargar();
    } catch (err) {
      console.error('Error al cambiar visibilidad:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
        <p className="text-sm">Cargando proyectos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-slate-400">{items.length} proyecto(s)</p>
        <button onClick={openNew} className="flex items-center gap-1.5 text-xs font-medium text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-xl hover:bg-blue-500/20 t-smooth duration-300">
          <Plus className="w-3.5 h-3.5" /> Nuevo proyecto
        </button>
      </div>

      {/* Form */}
      {editing && (
        <div className="mb-6 bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4 animate-modal-content">
          <h3 className="text-sm font-heading font-semibold text-white">{editing === 'new' ? 'Nuevo proyecto' : 'Editar proyecto'}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Título *</label>
              <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">URL</label>
              <input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Repo (GitHub)</label>
              <input value={form.repo} onChange={(e) => setForm({ ...form, repo: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Screenshot (ruta o URL)</label>
              <input value={form.screenshot} onChange={(e) => setForm({ ...form, screenshot: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Tags (separados por coma)</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Orden</label>
              <input type="number" value={form.orden} onChange={(e) => setForm({ ...form, orden: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Descripción</label>
            <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} rows={3}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="visible" checked={form.visible} onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              className="rounded border-white/20 bg-black/40 text-blue-500 focus:ring-blue-500/20" />
            <label htmlFor="visible" className="text-xs text-slate-400">Visible en el sitio</label>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-xl hover:bg-blue-500/30 t-smooth duration-300 disabled:opacity-40">
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {editing === 'new' ? 'Crear' : 'Guardar'}
            </button>
            <button onClick={cancelEdit} className="text-xs text-slate-400 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/[0.03] t-smooth duration-300">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
          <FolderKanban className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <p className="text-slate-500 text-sm">No hay proyectos aún.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={item.id} className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-start gap-3 t-smooth duration-300 hover:bg-white/[0.03]"
              style={{ animation: `modal-content-in 0.3s ease-out ${0.05 + i * 0.03}s both` }}>
              <GripVertical className="w-4 h-4 text-slate-600 mt-1.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${item.visible ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  <span className="text-white font-medium text-sm">{item.titulo}</span>
                  <span className="text-slate-500 text-xs">#{item.orden}</span>
                </div>
                {item.descripcion && <p className="text-slate-400 text-xs leading-relaxed truncate">{item.descripcion}</p>}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs text-blue-500 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-1.5 flex-shrink-0 pt-1">
                <button onClick={() => toggleVisible(item)}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 t-smooth duration-300"
                  title={item.visible ? 'Ocultar' : 'Mostrar'}>
                  <EyeOff className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => openEdit(item)}
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 t-smooth duration-300"
                  title="Editar">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 t-smooth duration-300"
                  title="Eliminar">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Posts ──────────────────────────────────────────────────
const emptyPost = { titulo: '', slug: '', contenido: '', extracto: '', tags: '', published: false };

function AdminPosts({ supabase, showToast }) {
  const [items, setItems] = useState([]);
  // Sin cliente de Supabase no hay nada que esperar
  const [loading, setLoading] = useState(!!supabase);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const cargar = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (mountedRef.current) setItems(data || []);
    } catch (err) {
      console.error('Error al cargar posts:', err);
      showToast('error', 'Error al cargar posts');
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [supabase, showToast]);

  /* Microtarea: difiere la carga inicial fuera del commit del efecto,
     evitando el render en cascada por el setState de cargar(). */
  useEffect(() => { Promise.resolve().then(cargar); }, [cargar]);

  /* Recarga manual: muestra el spinner mientras refresca */
  const recargar = useCallback(async () => { setLoading(true); await cargar(); }, [cargar]);

  const openNew = () => { setEditing('new'); setForm(emptyPost); };
  const openEdit = (item) => { setEditing(item.id); setForm({ ...item, tags: (item.tags || []).join(', ') }); };
  const cancelEdit = () => { setEditing(null); setForm(emptyPost); };

  const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleTituloChange = (val) => {
    setForm((prev) => prev.slug && !prev._manualSlug ? { ...prev, titulo: val, slug: slugify(val) } : { ...prev, titulo: val });
  };

  const handleSave = async () => {
    if (!form.titulo.trim() || !form.slug.trim()) { showToast('error', 'Título y slug son obligatorios'); return; }
    setSaving(true);
    try {
      if (!supabase) return;
      const payload = {
        ...form,
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        contenido: form.contenido || '',
      };
      delete payload._manualSlug;
      if (editing === 'new') {
        const { error } = await supabase.from('posts').insert(payload);
        if (error) throw error;
        showToast('success', 'Post creado');
      } else {
        const { error } = await supabase.from('posts').update(payload).eq('id', editing);
        if (error) throw error;
        showToast('success', 'Post actualizado');
      }
      cancelEdit();
      await recargar();
    } catch (err) {
      console.error('Error al guardar post:', err);
      showToast('error', 'Error al guardar post');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este post permanentemente?')) return;
    try {
      if (!supabase) return;
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) throw error;
      showToast('success', 'Post eliminado');
      await recargar();
    } catch (err) {
      console.error('Error al eliminar:', err);
      showToast('error', 'Error al eliminar');
    }
  };

  const togglePublished = async (item) => {
    try {
      if (!supabase) return;
      const { error } = await supabase.from('posts').update({ published: !item.published }).eq('id', item.id);
      if (error) throw error;
      await recargar();
    } catch (err) {
      console.error('Error al cambiar estado:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-500 gap-3">
        <RefreshCw className="w-6 h-6 animate-spin text-blue-500" />
        <p className="text-sm">Cargando posts...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-slate-400">{items.length} post(s)</p>
        <button onClick={openNew} className="flex items-center gap-1.5 text-xs font-medium text-blue-500 bg-blue-500/10 border border-blue-500/20 px-3 py-2 rounded-xl hover:bg-blue-500/20 t-smooth duration-300">
          <Plus className="w-3.5 h-3.5" /> Nuevo post
        </button>
      </div>

      {editing && (
        <div className="mb-6 bg-white/[0.02] border border-white/10 rounded-2xl p-5 space-y-4 animate-modal-content">
          <h3 className="text-sm font-heading font-semibold text-white">{editing === 'new' ? 'Nuevo post' : 'Editar post'}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Título *</label>
              <input value={form.titulo} onChange={(e) => handleTituloChange(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Slug *</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value, _manualSlug: true })}
                className="w-full bg-black/40 font-mono border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Extracto</label>
              <input value={form.extracto} onChange={(e) => setForm({ ...form, extracto: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Tags (separados por coma)</label>
              <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1">Contenido (HTML básico permitido)</label>
            <textarea value={form.contenido} onChange={(e) => setForm({ ...form, contenido: e.target.value })} rows={8}
              className="w-full bg-black/40 font-mono border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors resize-y" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="published" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="rounded border-white/20 bg-black/40 text-blue-500 focus:ring-blue-500/20" />
            <label htmlFor="published" className="text-xs text-slate-400">Publicado</label>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 text-xs font-medium text-white bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-xl hover:bg-blue-500/30 t-smooth duration-300 disabled:opacity-40">
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {editing === 'new' ? 'Crear' : 'Guardar'}
            </button>
            <button onClick={cancelEdit} className="text-xs text-slate-400 px-4 py-2 rounded-xl border border-white/10 hover:bg-white/[0.03] t-smooth duration-300">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl">
          <FileText className="w-10 h-10 mx-auto mb-3 text-slate-600" />
          <p className="text-slate-500 text-sm">No hay posts aún.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={item.id} className="bg-white/[0.01] border border-white/5 rounded-xl p-4 flex items-start gap-3 t-smooth duration-300 hover:bg-white/[0.03]"
              style={{ animation: `modal-content-in 0.3s ease-out ${0.05 + i * 0.03}s both` }}>
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${item.published ? 'bg-emerald-400' : 'bg-amber-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-medium text-sm">{item.titulo}</span>
                  <span className="text-slate-500 text-xs font-mono">/{item.slug}</span>
                </div>
                <p className="text-slate-500 text-xs">{item.extracto || 'Sin extracto'}</p>
              </div>
              <div className="flex gap-1.5 flex-shrink-0 pt-1">
                <button onClick={() => togglePublished(item)}
                  className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 t-smooth duration-300"
                  title={item.published ? 'Archivar' : 'Publicar'}>
                  {item.published ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => openEdit(item)}
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-500/10 t-smooth duration-300"
                  title="Editar">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 t-smooth duration-300"
                  title="Eliminar">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin ────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [pwError, setPwError] = useState('');
  const [toast, setToast] = useState(null);
  const [showPw, setShowPw] = useState(false);
  const [loginAnim, setLoginAnim] = useState(false);
  const [activeTab, setActiveTab] = useState('testimonios');

  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoginAnim(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => () => clearTimeout(toastTimeoutRef.current), []);

  // Estable: los paneles hijos la reciben como dependencia de sus efectos
  const showToast = useCallback((type, msg) => {
    setToast(toastStyle(type, msg));
    clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 3000);
  }, []);

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

  const tabs = [
    { id: 'testimonios', label: 'Testimonios', icon: Star },
    { id: 'proyectos', label: 'Proyectos', icon: FolderKanban },
    { id: 'posts', label: 'Blog', icon: FileText },
  ];

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden" style={{ background: '#09090B' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-32 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl t-smooth duration-1000 ${loginAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <div className={`absolute -bottom-32 -left-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl t-smooth duration-1000 delay-300 ${loginAnim ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
        </div>
        <form onSubmit={handleLogin} className={`relative w-full max-w-sm bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-black/30 t-smooth duration-700 ease-out ${loginAnim ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 border border-blue-500/20 flex items-center justify-center animate-float">
              <Shield className="w-7 h-7 text-blue-500" />
            </div>
            <h2 className="text-xl font-heading font-bold text-white">Panel Administrativo</h2>
            <p className="text-slate-400 text-xs mt-1">Acceso restringido</p>
          </div>
          <div className="space-y-1 mb-4">
            <label className="text-xs text-slate-400 block font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type={showPw ? 'text' : 'password'} placeholder="Ingresa la contraseña"
                value={password} onChange={(e) => { setPassword(e.target.value); setPwError(''); }}
                className={`w-full bg-black/40 border rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 t-smooth duration-300 ${pwError ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500/80 focus:ring-blue-500/20'}`}
                autoFocus />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {pwError && <p className="text-red-400 text-xs flex items-center gap-1 mt-1.5 animate-modal-content"><AlertTriangle className="w-3 h-3" /> {pwError}</p>}
          </div>
          <button type="submit" className="relative overflow-hidden group w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-sm t-smooth duration-500 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-0.5 flex items-center justify-center gap-2">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <LogIn className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Ingresar</span>
          </button>
          <Link to="/" className="block text-center text-xs text-slate-500 hover:text-blue-500 transition-colors mt-5 group">
            <span className="group-hover:mr-1 t-smooth">&larr;</span> Volver al inicio
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#09090B' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 animate-modal-content">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-white">Admin</h1>
              <p className="text-xs text-slate-400">Panel de administración</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xs text-slate-500 hover:text-blue-500 transition-colors flex items-center gap-1 bg-white/[0.02] border border-white/5 px-3 py-2 rounded-xl hover:bg-white/[0.05]">
              <ArrowLeft className="w-3 h-3" /> Volver
            </Link>
          </div>
        </div>

        <Toast toast={toast} onClose={() => setToast(null)} />

        <TabsSection tabs={tabs} active={activeTab} onChange={setActiveTab} />

        {activeTab === 'testimonios' && <AdminTestimonios supabase={supabase} showToast={showToast} />}
        {activeTab === 'proyectos' && <AdminProyectos supabase={supabase} showToast={showToast} />}
        {activeTab === 'posts' && <AdminPosts supabase={supabase} showToast={showToast} />}
      </div>
    </div>
  );
}
