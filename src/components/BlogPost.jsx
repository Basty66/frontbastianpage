import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Reveal from './Reveal';
import { Calendar, ArrowLeft, RefreshCw } from 'lucide-react';

function sanitizeHTML(html) {
  if (!html) return '';
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<script[^>]*\/>/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*"[^"]*"/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*'[^']*'/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*\S+/gi, '');
  sanitized = sanitized.replace(/javascript\s*:/gi, '');
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<link[^>]*>/gi, '');
  sanitized = sanitized.replace(/<meta[^>]*>/gi, '');
  return sanitized;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchPost = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        if (!supabase) { setNotFound(true); setLoading(false); return; }
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        if (error) throw error;
        if (mounted && data) {
          setPost(data);
        } else if (mounted) {
          setNotFound(true);
        }
      } catch (err) {
        console.error('Error al cargar post:', err);
        if (mounted) setNotFound(true);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchPost();
    return () => { mounted = false; };
  }, [slug]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return dateStr; }
  };

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <RefreshCw className="w-6 h-6 animate-spin text-white/60" />
          <p className="text-sm">Cargando artículo...</p>
        </div>
      </section>
    );
  }

  if (notFound || !post) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6">
        <Reveal animation="fade-up" className="text-center max-w-lg">
          <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto mb-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold font-heading text-white/60">404</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">Artículo no encontrado</h2>
          <p className="text-slate-300 mb-8">El artículo que buscas no existe o fue eliminado.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-cyan-300 transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" /> Volver al blog
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <article className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal animation="fade-up">
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white/60 transition-colors mb-8 group">
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Volver al blog
          </Link>
        </Reveal>

        <Reveal animation="fade-up" delay={50}>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(post.created_at)}</span>
            {post.tags && post.tags.length > 0 && (
              <>
                <span className="text-slate-600">·</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="text-white/60 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </>
            )}
          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={80}>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-6 tracking-tight text-white">
            {post.titulo}
          </h1>
        </Reveal>

        <Reveal animation="fade-up" delay={120}>
          <div
            className="prose prose-invert prose-sm sm:prose-base max-w-none text-slate-300 leading-relaxed prose-headings:text-white prose-headings:font-heading prose-headings:font-semibold prose-a:text-white/60 prose-a:no-underline hover:prose-a:underline prose-code:text-white/60 prose-code:bg-white/[0.03] prose-code:border prose-code:border-white/10 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-code:font-mono prose-strong:text-white prose-li:text-slate-300"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.contenido) }}
          />
        </Reveal>

        <Reveal animation="fade-up" delay={150}>
          <div className="mt-12 pt-8 border-t border-white/5">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white/60 transition-colors group">
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Volver al blog
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
