import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import Reveal from './Reveal';
import { Calendar, ArrowRight, FileText } from 'lucide-react';

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      try {
        if (!supabase) { setLoading(false); return; }
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (error) throw error;
        if (mounted) setPosts(data || []);
      } catch (err) {
        console.error('Error al cargar posts:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchPosts();
    return () => { mounted = true; };
  }, []);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Reveal animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
            <span className="text-white">Blog </span>
            <span className="text-white">Técnico</span>
          </h1>
          <p className="text-slate-300">
            Artículos sobre desarrollo web, consejos para PYMEs chilenas y novedades tecnológicas.
          </p>
        </Reveal>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white/[0.01] border border-white/5 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <Reveal animation="fade-up" className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-4 text-slate-500">
              <FileText className="w-12 h-12 text-slate-600" />
              <p className="text-lg font-heading font-semibold text-slate-400">No hay artículos aún</p>
              <p className="text-sm">Pronto compartiré contenido sobre desarrollo web para PYMEs.</p>
            </div>
          </Reveal>
        ) : (
          <div className="space-y-6">
            {posts.map((post, i) => (
              <Reveal key={post.id} animation="fade-up" delay={i * 60}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group block bg-white/[0.01] border border-white/5 rounded-2xl p-6 sm:p-8 transition-[border-color,background,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.03] hover:shadow-xl hover:shadow-white/[0.03]"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
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
                  <h2 className="text-lg sm:text-xl font-heading font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 group-hover:bg-clip-text transition-all duration-500">
                    {post.titulo}
                  </h2>
                  {post.extracto && (
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{post.extracto}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-white/60 group-hover:gap-2 transition-all duration-300">
                    Leer más <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
