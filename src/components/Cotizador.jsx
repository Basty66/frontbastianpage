import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { jsPDF } from 'jspdf';
import { Settings, CreditCard, Search, Globe, FileDown, Eraser, AlertTriangle, Check, Star, PenTool, Eye } from 'lucide-react';
import Reveal from './Reveal';
import useAnimatedNumber from '../hooks/useAnimatedNumber';
import { supabase } from '../lib/supabaseClient';
import { WHATSAPP_NUMBER } from '../lib/constants';
import bastianSigImg from '/firma-bastian.png';

const steps = [
  { label: 'Plan', desc: 'Elige tu plan' },
  { label: 'Tipo de Web', desc: 'Elige el proyecto' },
  { label: 'Extras', desc: 'Complementos' },
  { label: 'Contacto', desc: 'Recibe tu cotización' },
];

const infoProyecto = {
  landing: { label: 'Landing Page', dias: 30 },
  corporativa: { label: 'Web Corporativa', dias: 40 },
  ecommerce: { label: 'E-commerce', dias: 50 },
};

const tiposProyecto = [
  { id: 'landing', label: 'Landing Page', desc: 'Página única de alto impacto', precio: 150000, color: 'purple' },
  { id: 'corporativa', label: 'Web Corporativa', desc: 'Sitio profesional multi-sección', precio: 300000, color: 'blue' },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Tienda online con carrito y pagos', precio: 550000, color: 'amber' },
];

const colorMap = {
  purple: { from: 'from-purple-600', to: 'to-violet-500', glow: 'rgba(168,85,247,0.35)', border: 'border-purple-500/60', text: 'text-purple-400', dot: 'bg-purple-400', toggle: 'bg-purple-500' },
  blue: { from: 'from-blue-600', to: 'to-blue-500', glow: 'rgba(59,130,246,0.35)', border: 'border-blue-500/60', text: 'text-blue-400', dot: 'bg-blue-400', toggle: 'bg-blue-500' },
  amber: { from: 'from-amber-500', to: 'to-orange-500', glow: 'rgba(245,158,11,0.35)', border: 'border-amber-500/60', text: 'text-amber-400', dot: 'bg-amber-400', toggle: 'bg-amber-500' },
  indigo: { from: 'from-indigo-600', to: 'to-indigo-500', glow: 'rgba(99,102,241,0.35)', border: 'border-indigo-500/60', text: 'text-indigo-400', dot: 'bg-indigo-400', toggle: 'bg-indigo-500' },
  emerald: { from: 'from-emerald-600', to: 'to-emerald-500', glow: 'rgba(16,185,129,0.35)', border: 'border-emerald-500/60', text: 'text-emerald-400', dot: 'bg-emerald-400', toggle: 'bg-emerald-500' },
  sky: { from: 'from-sky-600', to: 'to-sky-500', glow: 'rgba(14,165,233,0.35)', border: 'border-sky-500/60', text: 'text-sky-400', dot: 'bg-sky-400', toggle: 'bg-sky-500' },
  violet: { from: 'from-violet-600', to: 'to-violet-500', glow: 'rgba(139,92,246,0.35)', border: 'border-violet-500/60', text: 'text-violet-400', dot: 'bg-violet-400', toggle: 'bg-violet-500' },
  cyan: { from: 'from-cyan-600', to: 'to-cyan-500', glow: 'rgba(34,211,238,0.35)', border: 'border-cyan-500/60', text: 'text-cyan-400', dot: 'bg-cyan-400', toggle: 'bg-cyan-500' },
};

const adicionales = [
  { id: 'admin', icon: Settings, label: 'Panel Administrativo', desc: 'Gestor de stock y precios', precio: 120000, color: 'indigo' },
  { id: 'pagos', icon: CreditCard, label: 'Pasarela de Pago', desc: 'Mercado Pago / Webpay', precio: 80000, color: 'emerald' },
  { id: 'seo', icon: Search, label: 'SEO Profesional', desc: 'Optimización para Google', precio: 60000, color: 'sky' },
  { id: 'idioma', icon: Globe, label: 'Multi-idioma', desc: 'Traducción a varios idiomas', precio: 90000, color: 'violet' },
  { id: 'soporte', icon: Settings, label: 'Soporte Mensual', desc: '10 hrs/mes de mantención y soporte', precio: 50000, color: 'emerald' },
  { id: 'mantenimiento', icon: Settings, label: 'Mantenimiento Anual', desc: 'Actualizaciones, backups y monitoreo 12 meses', precio: 180000, color: 'sky' },
];

const codigosPais = [
  { code: '+56', label: '+56', pais: 'Chile' },
  { code: '+54', label: '+54', pais: 'Argentina' },
  { code: '+51', label: '+51', pais: 'Perú' },
  { code: '+57', label: '+57', pais: 'Colombia' },
  { code: '+591', label: '+591', pais: 'Bolivia' },
  { code: '+598', label: '+598', pais: 'Uruguay' },
  { code: '+55', label: '+55', pais: 'Brasil' },
  { code: '+52', label: '+52', pais: 'México' },
  { code: '+34', label: '+34', pais: 'España' },
  { code: '+1', label: '+1', pais: 'EE.UU./Canadá' },
  { code: '+44', label: '+44', pais: 'Reino Unido' },
  { code: '+33', label: '+33', pais: 'Francia' },
  { code: '+49', label: '+49', pais: 'Alemania' },
];

const monedas = [
  { id: 'CLP', label: '$ CLP', simbolo: '$', tasa: 1 },
  { id: 'USD', label: 'US$ USD', simbolo: 'US$', tasa: 0.0011 },
  { id: 'UF', label: 'UF', simbolo: 'UF', tasa: 0.000028 },
];

const planes = [
  { id: 'basico', label: 'Básico', desc: 'Landing Page profesional', precio: 150000, total: 150000, tipoId: 'landing', extras: [], incluye: ['Landing Page', 'Hosting $0', 'SEO base', 'Formulario Contacto', 'WhatsApp'], color: 'emerald', popular: false, dias: 30 },
  { id: 'estandar', label: 'Estándar', desc: 'Web Corporativa con panel', precio: 380000, total: 380000, tipoId: 'corporativa', extras: ['admin', 'seo'], incluye: ['Web Corporativa', 'Panel Admin', 'SEO Profesional', 'Hosting $0', 'Formulario Contacto'], color: 'blue', popular: true, dias: 45 },
  { id: 'premium', label: 'Premium', desc: 'E-commerce completo', precio: 750000, total: 750000, tipoId: 'ecommerce', extras: ['admin', 'pagos', 'seo', 'idioma'], incluye: ['E-commerce completo', 'Panel Admin', 'Pasarela de Pago', 'SEO Profesional', 'Multi-idioma', 'Hosting $0'], color: 'purple', popular: false, dias: 60 },
  { id: 'custom', label: 'A Medida', desc: 'Tú eliges cada componente', precio: null, total: 0, tipoId: null, extras: [], incluye: ['Selección libre de tipo y extras', 'Precio según elección'], color: 'cyan', popular: false, dias: null },
];


const SignaturePad = memo(({ canvasRef, onDraw, onClear }) => {
  const isDrawing = useRef(false);
  const drawRef = useRef(null);
  const containerRef = useRef(null);

  const getCtx = (canvas) => canvas?.getContext('2d', { willReadFrequently: true });

  const getPos = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }, []);

  const startDrawing = useCallback((e) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCtx(canvas);
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [canvasRef, getPos]);

  const draw = useCallback((e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCtx(canvas);
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#22d3ee';
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }, [canvasRef, getPos]);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handler = (e) => drawRef.current(e);
    canvas.addEventListener('mousemove', handler);
    canvas.addEventListener('touchmove', handler, { passive: false });
    return () => {
      canvas.removeEventListener('mousemove', handler);
      canvas.removeEventListener('touchmove', handler);
    };
  }, [canvasRef]);

  const stopDrawing = useCallback(() => {
    isDrawing.current = false;
    if (onDraw) onDraw();
  }, [onDraw]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = getCtx(canvas);
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (onClear) onClear();
  }, [canvasRef, onClear]);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const pixelRatio = window.devicePixelRatio || 1;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight || 160;
      const dpiWidth = Math.round(containerWidth * pixelRatio);
      const dpiHeight = Math.round(containerHeight * pixelRatio);
      if (canvas.width !== dpiWidth || canvas.height !== dpiHeight) {
        const currentData = canvas.toDataURL();
        canvas.width = dpiWidth;
        canvas.height = dpiHeight;
        const ctx = getCtx(canvas);
        if (ctx) {
          const img = new Image();
          img.onload = () => ctx.drawImage(img, 0, 0);
          img.src = currentData;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    };
    resize();
    const observer = new ResizeObserver(resize);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', resize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="signature-pad-container relative bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-white/10 rounded-xl overflow-hidden group hover:border-brand-cyan/30 transition-all duration-300"
        style={{ touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="w-full h-[160px] cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute inset-0 pointer-events-none rounded-xl border border-transparent group-hover:border-brand-cyan/10 transition-all duration-500" />
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={clear}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all backdrop-blur-sm border border-white/5 hover:border-white/20"
            title="Limpiar firma"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.07] group-hover:opacity-[0.03] transition-opacity duration-500">
          <PenTool className="w-12 h-12 text-white" />
        </div>
      </div>
      <p className="text-[11px] text-slate-500 text-center">Firma aquí arrastrando el mouse o tu dedo</p>
    </div>
  );
});

SignaturePad.displayName = 'SignaturePad';

const Cotizador = () => {
  const [tipoWeb, setTipoWeb] = useState(0);
  const [extras, setExtras] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '', empresa: '' });
  const [formErrors, setFormErrors] = useState({ nombre: '', email: '', telefono: '' });
  const [codigoPais, setCodigoPais] = useState('+56');
  const [moneda, setMoneda] = useState('CLP');
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSignatures, setShowSignatures] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const planTimeoutRef = useRef(null);

  const clientSigRef = useRef(null);
  const pdfDocRef = useRef(null);
  const mountedRef = useRef(false);
  const bastianImgRef = useRef(null);
  const previewModalRef = useRef(null);
  const signatureModalRef = useRef(null);
  const pdfModalRef = useRef(null);
  const [clientSigned, setClientSigned] = useState(false);

  const validateField = (field, value) => {
    if (field === 'nombre') {
      if (!value.trim()) return 'El nombre es obligatorio';
      if (value.trim().length < 3) return 'Debe tener al menos 3 caracteres';
      if (!/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s'-]+$/.test(value.trim())) return 'Solo se permiten letras, espacios y guiones';
      return '';
    }
    if (field === 'email') {
      if (!value.trim()) return 'El email es obligatorio';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Formato de email inválido';
      return '';
    }
    if (field === 'telefono') {
      if (!value.trim()) return 'El teléfono es obligatorio';
      const digits = value.replace(/\D/g, '');
      if (digits.length < 8 || digits.length > 15) return 'Debe tener entre 8 y 15 dígitos';
      return '';
    }
    return '';
  };

  const handleFormChange = (field, value) => {
    setError(null);
    if (field === 'telefono') value = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [field]: value }));
    const err = validateField(field, value);
    setFormErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleFormBlur = (field) => {
    const err = validateField(field, formData[field]);
    setFormErrors(prev => ({ ...prev, [field]: err }));
  };

  const isFormValid = () => {
    const errors = {};
    let valid = true;
    ['nombre', 'email', 'telefono'].forEach((field) => {
      const err = validateField(field, formData[field]);
      errors[field] = err;
      if (err) valid = false;
    });
    setFormErrors(errors);
    return valid;
  };

  const handleClientDraw = useCallback(() => setClientSigned(true), []);
  const handleClientClear = useCallback(() => setClientSigned(false), []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (planTimeoutRef.current) clearTimeout(planTimeoutRef.current);
    };
  }, []);

  const anyModalOpen = showPreview || showSignatures || showPdfPreview;

  useEffect(() => {
    if (anyModalOpen) {
      const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarW}px`;
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.paddingRight = '';
      };
    }
  }, [anyModalOpen]);

  useEffect(() => {
    const scrollToTop = (ref) => {
      if (ref?.current) {
        ref.current.scrollTop = 0;
        requestAnimationFrame(() => {
          if (ref.current) ref.current.scrollTop = 0;
        });
      }
    };
    if (showPreview) setTimeout(() => scrollToTop(previewModalRef), 50);
    if (showSignatures) setTimeout(() => scrollToTop(signatureModalRef), 50);
    if (showPdfPreview) setTimeout(() => scrollToTop(pdfModalRef), 50);
  }, [showPreview, showSignatures, showPdfPreview]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => { bastianImgRef.current = img; };
    img.onerror = () => { console.warn('No se pudo cargar firma-bastian.png'); };
    img.src = bastianSigImg;
  }, []);

  const isCanvasEmpty = (ref) => {
    try {
      const canvas = ref.current;
      if (!canvas) return true;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return true;
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      for (let i = 3; i < data.length; i += 4) {
        if (data[i] !== 0) return false;
      }
    } catch {
      return true;
    }
    return true;
  };

  const planActual = selectedPlan ? planes.find(p => p.id === selectedPlan) : null;
  const proyectoActual = tiposProyecto.find((t) => t.precio === tipoWeb);

  const sumExtras = (ids) => ids.reduce((acc, id) => {
    const item = adicionales.find((a) => a.id === id);
    return acc + (item?.precio || 0);
  }, 0);

  const total = planActual && selectedPlan !== 'custom'
    ? planActual.total + sumExtras(extras) - sumExtras(planActual.extras)
    : tipoWeb + sumExtras(extras);

  const animatedTotal = useAnimatedNumber(total, 600);

  const handleExtraChange = (id) => {
    setError(null);
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid()) {
      setError('Corrige los errores en el formulario antes de continuar.');
      return;
    }

    if (isCanvasEmpty(clientSigRef)) {
      setError('Debes firmar la conformidad antes de enviar.');
      setShowSignatures(true);
      return;
    }

    setLoading(true);

    try {
      const doc = buildPDFDoc();
      pdfDocRef.current = doc;
      const dataUri = doc.output('datauristring');
      setPdfPreviewUrl(dataUri);
      setShowPdfPreview(true);
    } catch (err) {
      console.error('Error al generar PDF:', err);
      setError('Ocurrió un error al generar el PDF. Revisa la consola para más detalles.');
    } finally {
      setLoading(false);
    }
  };

  const enviarCotizacion = async () => {
    setLoading(true);
    try {
      if (!mountedRef.current) return;
      const doc = pdfDocRef.current;
      if (!doc) {
        setError('No se encontró el documento PDF. Vuelve a generar la cotización.');
        return;
      }

      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const slugNombre = (formData.nombre || 'pendiente').trim().replace(/\s+/g, '_') || 'pendiente';
      const slugEmpresa = formData.empresa ? `_${formData.empresa.trim().replace(/\s+/g, '_')}` : '';
      const pdfName = `Propuesta_BastianDev${slugEmpresa}_${slugNombre}.pdf`;
      const tipoId = getTipoId();

      try {
        if (supabase) {
          const { error: insertError } = await supabase.from('cotizaciones').insert({
            nombre: formData.nombre,
            email: formData.email,
            telefono: `${codigoPais} ${formData.telefono}`,
            mensaje: (formData.mensaje || '') + (formData.empresa ? ` | Empresa: ${formData.empresa}` : '') + (selectedPlan ? ` | Plan: ${selectedPlan}` : ''),
            tipo_web: tipoId,
            extras: extras,
            total_estimado: total,
          });
          if (insertError) console.error('Error al guardar cotización:', insertError);
        }
      } catch (dbErr) {
        console.error('Error al guardar cotización:', dbErr);
      }

      try {
        const emailRes = await fetch('https://tjurqmgkapyfofyvllqj.supabase.co/functions/v1/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'INSERT',
            table: 'cotizaciones',
            record: {
              nombre: formData.nombre,
              email: formData.email,
              telefono: `${codigoPais} ${formData.telefono}`,
              empresa: formData.empresa || null,
              mensaje: formData.mensaje || '',
              tipo_web: tipoId,
              extras: extras,
              total_estimado: total,
              plan: selectedPlan || null,
            },
            pdfBase64,
            pdfName,
          }),
        });
        if (!emailRes.ok) {
          console.error('Error al enviar correo:', emailRes.status, await emailRes.text());
        }
      } catch (emailErr) {
        console.error('Error al enviar correo:', emailErr);
      }

      doc.save(pdfName);
      if (!mountedRef.current) return;
      setShowPdfPreview(false);
      setPdfPreviewUrl(null);
      setEnviado(true);
    } catch (err) {
      console.error('Error:', err);
      if (mountedRef.current) {
        setError('Ocurrió un error al procesar tu solicitud. Intenta de nuevo.');
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;
      if (showPdfPreview) { setError(null); setShowPdfPreview(false); setPdfPreviewUrl(null); }
      else if (showSignatures) setShowSignatures(false);
      else if (showPreview) setShowPreview(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showPreview, showSignatures, showPdfPreview]);

  const formatCurrency = (val) => {
    const m = monedas.find(x => x.id === moneda) || monedas[0];
    const convertido = val * m.tasa;
    if (moneda === 'UF') {
      return `${m.simbolo} ${convertido.toFixed(2)}`;
    }
    if (moneda === 'USD') {
      return `${m.simbolo} ${convertido.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return `${m.simbolo}${Math.round(convertido).toLocaleString('es-CL')}`;
  };

  const formatDate = (d) => {
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const getTipoId = () => {
    if (planActual && selectedPlan !== 'custom') return planActual.tipoId;
    if (!proyectoActual) return 'landing';
    return proyectoActual.id;
  };

  const getTipoLabel = () => {
    if (planActual && selectedPlan !== 'custom') return `Plan ${planActual.label}`;
    const id = getTipoId();
    return id === 'landing' ? 'Landing Page' : id === 'corporativa' ? 'Web Corporativa' : 'E-commerce';
  };

  const getDias = () => {
    if (planActual && selectedPlan !== 'custom') return planActual.dias;
    const proyecto = infoProyecto[getTipoId()];
    if (!proyecto) return 30;
    return proyecto.dias + extras.length * 7;
  };

  const buildPDFDoc = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const mg = 18;
    const cw = pw - mg * 2;

    // PALETA: blanco y negro, con un acento cian mínimo
    const black = [0, 0, 0];
    const dark = [40, 40, 40];
    const gray = [120, 120, 120];
    const light = [235, 235, 235];
    const cyan = [6, 182, 212];

    let y = 18;
    let pageNum = 1;

    // =============== HELPERS ===============
    function text(txt, x, yy, size, weight = 'normal', color = black, align = 'left') {
      doc.setFont('helvetica', weight);
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      if (align === 'right') doc.text(txt, x, yy, { align: 'right' });
      else doc.text(txt, x, yy);
    }

    function hr(yp, color = black) {
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(0.4);
      doc.line(mg, yp, pw - mg, yp);
    }

    function section(title, needed) {
      if (y + needed > ph - 20) { doc.addPage(); pageNum++; y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(title, mg, y);
      doc.setDrawColor(...cyan);
      doc.setLineWidth(0.6);
      doc.line(mg, y + 2.5, mg + 50, y + 2.5);
      y += 10;
    }

    function ensureSpace(needed) {
      if (y + needed > ph - 20) { doc.addPage(); pageNum++; y = 20; }
    }

    function addPage() {
      doc.addPage();
      pageNum++;
      y = 20;
    }

    function addFooter() {
      text(`Bastian.dev  |  ${propuestaNum}  |  ${formatDate(hoy)}  |  Pagina ${pageNum}`,
        mg, ph - 8, 7, 'normal', gray);
    }

    const propuestaNum = `PRO-${String(Date.now()).slice(-6)}`;
    const hoy = new Date();
    const venc = new Date(hoy);
    venc.setDate(venc.getDate() + 15);

    // =============== HEADER ===============
    text('Bastian.dev', mg, y, 22, 'bold', black);
    text('Soluciones Web Profesionales', mg, y + 8, 9, 'normal', dark);
    text('Serverless  |  Hosting $0', mg, y + 13, 8, 'normal', gray);

    text(propuestaNum, pw - mg, y, 14, 'bold', black, 'right');
    text('PROPUESTA', pw - mg, y + 6, 7, 'normal', gray, 'right');
    text(`Emitida: ${formatDate(hoy)}`, pw - mg, y + 11, 8, 'normal', dark, 'right');
    text(`Valida hasta: ${formatDate(venc)}`, pw - mg, y + 16, 8, 'normal', dark, 'right');

    y += 26;
    hr(y);
    y += 10;

    // =============== CLIENTE ===============
    section('Datos del Cliente', 35);
    const cH = formData.empresa ? 30 : 22;
    ensureSpace(cH);
    const cY = y;
    doc.setDrawColor(...light);
    doc.setLineWidth(0.4);
    doc.rect(mg, cY, cw, cH);
    text('Nombre completo', mg + 4, cY + 7, 8, 'normal', gray);
    text(formData.nombre || '---', mg + 4, cY + 14, 10, 'bold', black);
    text('Email', mg + cw / 2 + 4, cY + 7, 8, 'normal', gray);
    text(formData.email || '---', mg + cw / 2 + 4, cY + 14, 9, 'normal', black);
    if (formData.empresa) {
      text('Telefono', mg + 4, cY + 22, 8, 'normal', gray);
      text(`${codigoPais} ${formData.telefono || '---'}`, mg + 4, cY + 28, 9, 'normal', black);
      text('Empresa', mg + cw / 2 + 4, cY + 22, 8, 'normal', gray);
      text(formData.empresa, mg + cw / 2 + 4, cY + 28, 9, 'normal', black);
    } else {
      text('Telefono', mg + 4, cY + 22, 8, 'normal', gray);
      text(`${codigoPais} ${formData.telefono || '---'}`, mg + 4, cY + 22, 9, 'normal', black);
    }
    y = cY + cH + 8;

    // =============== PROVEEDOR ===============
    section('Proveedor', 22);
    ensureSpace(18);
    const pY = y;
    doc.setDrawColor(...light);
    doc.rect(mg, pY, cw, 16);
    text('Cristian Bastian Cerda', mg + 4, pY + 7, 10, 'bold', black);
    text('Analista Programador', mg + 4, pY + 13, 8, 'normal', gray);
    text('cristianbastian.dev@gmail.com  |  +56 9 2812 2947', mg + 4 + cw / 2, pY + 7, 8, 'normal', dark);
    text('Santiago, Chile  |  RUT: 19.876.543-2', mg + 4 + cw / 2, pY + 13, 8, 'normal', gray);
    y = pY + 24;

    // =============== SERVICIO ===============
    section('Servicio Cotizado', 22);
    ensureSpace(18);
    const sY = y;
    doc.setDrawColor(...light);
    doc.rect(mg, sY, cw, 14);
    text(getTipoLabel(), mg + 4, sY + 7, 11, 'bold', black);
    text(`${getDias()} dias habiles`, mg + 4, sY + 12, 8, 'normal', gray);
    text('Plazo de entrega', mg + cw / 2 + 4, sY + 5, 7, 'normal', gray);
    text('Pago 50% / 50%', mg + cw / 2 + 4, sY + 12, 9, 'bold', black);
    y = sY + 22;

    // =============== PRESUPUESTO ===============
    section('Resumen del Presupuesto', 50);
    ensureSpace(45);

    const tH = 9;
    const tx = mg;
    const tConcep = 70;
    const tDesc = cw - tConcep - 40;

    // Cabecera tabla
    doc.setFillColor(0, 0, 0);
    doc.rect(tx, y, cw, tH, 'F');
    text('Concepto', tx + 3, y + 6, 9, 'bold', [255, 255, 255]);
    text('Descripcion', tx + tConcep + 3, y + 6, 9, 'bold', [255, 255, 255]);
    text('Valor', pw - mg - 3, y + 6, 9, 'bold', [255, 255, 255], 'right');
    y += tH;

    let hasRows = false;
    let rowH = 9;

    function drawRow(c1, c2, c3, bold = false) {
      doc.setDrawColor(...light);
      doc.setLineWidth(0.3);
      doc.rect(tx, y, cw, rowH);
      text(c1, tx + 3, y + 6, 9, bold ? 'bold' : 'normal', dark);
      text(c2, tx + tConcep + 3, y + 6, 8, 'normal', gray);
      text(c3, pw - mg - 3, y + 6, 9, bold ? 'bold' : 'normal', black, 'right');
      y += rowH;
    }

    if (planActual && selectedPlan !== 'custom') {
      drawRow(`Plan ${planActual.label}`, planActual.desc, formatCurrency(planActual.total), true);
      hasRows = true;
    } else if (proyectoActual) {
      drawRow(proyectoActual.label, proyectoActual.desc, formatCurrency(proyectoActual.precio), true);
      hasRows = true;

      extras.forEach((id) => {
        const item = adicionales.find((a) => a.id === id);
        if (!item) return;
        ensureSpace(rowH);
        drawRow(`+ ${item.label}`, item.desc, `+ ${formatCurrency(item.precio)}`, false);
      });
    }

    if (hasRows) {
      ensureSpace(13);
      // Total row highlighted
      doc.setFillColor(240, 240, 240);
      doc.rect(tx, y, cw, 12, 'F');
      doc.setDrawColor(...black);
      doc.setLineWidth(0.4);
      doc.rect(tx, y, cw, 12);
      text('INVERSION TOTAL', tx + 3, y + 8, 11, 'bold', black);
      text(`${formatCurrency(total)} CLP`, pw - mg - 3, y + 8, 12, 'bold', black, 'right');
      y += 18;
    }

    // =============== ALCANCE ===============
    section('Alcance del Servicio', 60);
    ensureSpace(55);
    const incY = y;
    const includes = [
      ['Desarrollo web responsivo', 'React, Vite, Tailwind. Adaptable a todo dispositivo.'],
      ['Hosting serverless $0/mes', 'Infraestructura en Vercel Edge. Sin costo de por vida.'],
      ['Optimizacion SEO', 'Meta tags, Open Graph, sitemap.xml, Schema.org.'],
      ['Garantia y soporte', '30 dias de garantia + 15 dias de soporte tecnico.'],
      ['Seguridad SSL', 'Certificado HTTPS sin costo adicional.'],
    ];
    const incH = includes.length * 9 + 6;
    doc.setDrawColor(...light);
    doc.rect(mg, incY, cw, incH);
    includes.forEach(([t, d], i) => {
      text('OK', mg + 4, incY + 7 + i * 9, 8, 'bold', [16, 185, 129]);
      text(t, mg + 14, incY + 7 + i * 9, 9, 'bold', black);
      text(d, mg + 14, incY + 11 + i * 9, 7, 'normal', gray);
    });
    y = incY + incH + 8;

    // =============== EXCLUSIONES ===============
    section('Exclusiones', 30);
    ensureSpace(28);
    const exc = [
      'Costo anual del dominio .cl. El cliente lo gestiona con NIC Chile.',
      'Redaccion de contenido editorial ni traduccion profesional.',
      'Cambios estructurales posteriores a la aprobacion del diseno.',
    ];
    const excH = exc.length * 7 + 4;
    doc.setDrawColor(...light);
    doc.rect(mg, y, cw, excH);
    exc.forEach((t, i) => {
      text('-', mg + 4, y + 5 + i * 7, 9, 'bold', [220, 38, 38]);
      text(t, mg + 10, y + 5 + i * 7, 8, 'normal', dark);
    });
    y += excH + 8;

    // =============== CONDICIONES DE PAGO ===============
    section('Condiciones de Pago', 45);
    ensureSpace(40);
    const anticipo = Math.round(total * 0.5);
    const saldo = total - anticipo;
    const pH = 38;
    doc.setDrawColor(...black);
    doc.setLineWidth(0.5);
    doc.rect(mg, y, cw, pH);
    text('Esquema de pago 50% / 50%', mg + 4, y + 8, 10, 'bold', black);
    text(`1.  Anticipo: ${formatCurrency(anticipo)} CLP`, mg + 4, y + 18, 9, 'normal', dark);
    text('Para iniciar el desarrollo del proyecto.', mg + 12, y + 23, 8, 'normal', gray);
    text(`2.  Saldo: ${formatCurrency(saldo)} CLP`, mg + 4, y + 28, 9, 'normal', dark);
    text('Contra entrega y conformidad final.', mg + 12, y + 33, 8, 'normal', gray);
    text(`Plazo total: ${getDias()} dias habiles desde el anticipo.`, pw - mg - 4, y + pH - 4, 8, 'bold', dark, 'right');
    y += pH + 8;

    // =============== PROXIMOS PASOS ===============
    section('Proximos Pasos', 45);
    ensureSpace(40);
    const nH = 36;
    doc.setDrawColor(...light);
    doc.rect(mg, y, cw, nH);
    const steps = [
      'Me comunicare contigo en maximo 24 horas habiles.',
      'Agendamos una reunion para definir requerimientos detallados.',
      'Definimos alcance final, diseno preliminar y resolvemos dudas.',
      'Coordinamos el pago del anticipo e iniciamos el desarrollo.',
    ];
    steps.forEach((t, i) => {
      text(`${i + 1}.`, mg + 4, y + 7 + i * 7, 9, 'bold', [6, 182, 212]);
      text(t, mg + 12, y + 7 + i * 7, 9, 'normal', dark);
    });
    y += nH + 8;

    // =============== FIRMAS ===============
    ensureSpace(55);
    y += 4;
    hr(y);
    y += 8;
    section('Firmas de Conformidad', 55);

    text('Ambas partes aceptan los terminos, alcance y condiciones descritos en esta propuesta.',
      mg, y, 8, 'normal', gray);
    y += 10;

    const sigW = (cw - 8) / 2;
    const sigH = 38;
    const sigY = y;

    // Cliente
    doc.setDrawColor(...light);
    doc.setLineWidth(0.4);
    doc.rect(mg, sigY, sigW, sigH);
    text('CLIENTE', mg + 4, sigY + 8, 10, 'bold', black);
    text(formData.nombre || '[Nombre del cliente]', mg + 4, sigY + 14, 9, 'normal', dark);
    if (clientSigRef?.current) {
      try {
        const sigData = clientSigRef.current.toDataURL('image/png');
        doc.addImage(sigData, 'PNG', mg + 4, sigY + 16, sigW - 8, 12);
      } catch {}
    }
    doc.setDrawColor(...gray);
    doc.setLineWidth(0.3);
    doc.line(mg + 4, sigY + sigH - 6, mg + sigW - 4, sigY + sigH - 6);
    text('Firma', mg + 4, sigY + sigH - 2, 7, 'normal', gray);
    text(`Fecha: __ / __ / ${hoy.getFullYear()}`, mg + 4, sigY + sigH + 2, 7, 'normal', gray);

    // Proveedor
    const px2 = mg + sigW + 8;
    doc.setDrawColor(...light);
    doc.rect(px2, sigY, sigW, sigH);
    text('PROVEEDOR', px2 + 4, sigY + 8, 10, 'bold', black);
    text('Cristian Bastian Cerda', px2 + 4, sigY + 14, 9, 'normal', dark);
    text('Analista Programador', px2 + 4, sigY + 19, 7, 'normal', gray);
    if (bastianImgRef.current) {
      doc.addImage(bastianImgRef.current, 'PNG', px2 + 4, sigY + 20, sigW - 8, 11);
    }
    doc.setDrawColor(...gray);
    doc.line(px2 + 4, sigY + sigH - 6, px2 + sigW - 4, sigY + sigH - 6);
    text('Firma', px2 + 4, sigY + sigH - 2, 7, 'normal', gray);
    text(`Fecha: __ / __ / ${hoy.getFullYear()}`, px2 + 4, sigY + sigH + 2, 7, 'normal', gray);

    y = sigY + sigH + 8;

    addFooter();
    return doc;
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const doc = buildPDFDoc();
      const nombreArchivo = `Propuesta_BastianDev_${formData.nombre?.replace(/\s+/g, '_') || 'pendiente'}_${formatDate(new Date()).replace(/\//g, '-')}.pdf`;
      doc.save(nombreArchivo);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section id="cotizador" className="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <Reveal animation="fade-up" className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white mb-3 tracking-tight">
          Simulador de{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">
            Presupuesto
          </span>
        </h2>
        <p className="text-slate-300 text-lg max-w-xl mx-auto">
          Selecciona lo que necesitas y obtén tu cotización en tiempo real.
        </p>
        <div className="flex items-center justify-center gap-1 mt-4">
          {monedas.map((m) => (
            <button
              key={m.id}
              onClick={() => setMoneda(m.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-300 ${
                moneda === m.id
                  ? 'border-brand-cyan/50 bg-brand-cyan/10 text-cyan-200'
                  : 'border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="flex items-center justify-center gap-1 sm:gap-4 mb-10 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
        {steps.map((s, i) => {
          const stepNum = i + 1;
          const canClick = stepNum < 4 || (total > 0 || selectedPlan);
          return (
          <React.Fragment key={i}>
            <button
              onClick={() => canClick && setStep(stepNum)}
              className={`flex items-center gap-1.5 sm:gap-3 px-2 sm:px-5 py-2 sm:py-2.5 rounded-xl border transition-all duration-500 ease-out flex-shrink-0 min-w-0 ${
                step >= stepNum
                  ? 'border-brand-cyan/50 bg-brand-cyan/10 text-white shadow-lg shadow-brand-cyan/5'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
              } ${!canClick ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-500 flex-shrink-0 ${
                step >= stepNum ? 'bg-brand-cyan/20 text-cyan-200 shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'bg-white/10 text-white/60'
              }`}>
                {step > stepNum ? (
                  <svg className="w-3 sm:w-3.5 h-3 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </span>
              <span className="hidden sm:inline text-[10px] sm:text-xs font-semibold leading-tight truncate">{s.label}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`h-px w-3 sm:w-12 transition-all duration-500 flex-shrink-0 ${step > stepNum ? 'bg-brand-cyan/50' : 'bg-white/10'}`} />
            )}
          </React.Fragment>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12 items-start">
        <div className={`lg:col-span-3 bg-white/[0.02] border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-lg space-y-5 sm:space-y-8 transition-all duration-700 ease-out ${
          step <= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-30 pointer-events-none scale-[0.96] blur-[1px]'
        }`}>
          {step === 1 && (
            <Reveal animation="fade-up">
              <div className="space-y-3">
                <label className="text-white font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold">1</span>
                  Elige tu plan
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {planes.map((plan) => {
                    const c = colorMap[plan.color];
                    const selected = selectedPlan === plan.id;
                    return (
                      <div
                        key={plan.id}
                        className={`group relative overflow-hidden p-4 rounded-xl border cursor-pointer transition-all duration-500 ease-out ${
                          selected
                            ? `${c.border} text-white`
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:bg-white/[0.04]'
                        }`}
                        style={{ boxShadow: selected ? `0 0 24px ${c.glow}` : undefined }}
                        onClick={() => {
                          setError(null);
                          if (plan.id === 'custom') {
                            setSelectedPlan('custom');
                            setTipoWeb(0);
                            setExtras([]);
                          } else {
                            setSelectedPlan(plan.id);
                            setTipoWeb(tiposProyecto.find(t => t.id === plan.tipoId)?.precio || 0);
                            setExtras(plan.extras);
                            if (planTimeoutRef.current) clearTimeout(planTimeoutRef.current);
                            planTimeoutRef.current = setTimeout(() => setStep(3), 400);
                          }
                        }}
                      >
                        {plan.popular && (
                          <div className="absolute top-0 left-0 z-10 flex items-center gap-1 text-[9px] font-bold text-amber-400 bg-gradient-to-r from-amber-500/20 to-transparent border-b border-r border-amber-500/20 px-2.5 py-1 rounded-br-xl">
                            <Star className="w-2.5 h-2.5" />
                            MÁS ELEGIDO
                          </div>
                        )}
                        <span className={`absolute inset-0 rounded-xl ${c.from} ${c.to} -translate-x-full transition-transform duration-500 ease-out ${selected ? 'translate-x-0' : 'group-hover:translate-x-0'}`} />
                        <span className="relative z-10 flex flex-col h-full">
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                              selected ? 'border-white' : 'border-white/20 group-hover:border-white/40'
                            }`}>
                              {selected && <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />}
                            </div>
                            {plan.precio ? (
                              <span className="font-bold font-heading text-lg transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.4)] inline-block">{formatCurrency(plan.precio)}</span>
                            ) : (
                              <span className="text-xs font-medium text-white/70">Precio variable</span>
                            )}
                          </div>
                          <p className="font-medium text-sm">{plan.label}</p>
                          {plan.desc && <p className="text-xs text-white/60 mb-2">{plan.desc}</p>}
                          <div className="mt-auto space-y-0.5">
                            {plan.incluye.map((inc, j) => (
                              <div key={j} className="flex items-center gap-1.5 text-[10px] text-white/70">
                                <Check className="w-2.5 h-2.5 flex-shrink-0" />
                                {inc}
                              </div>
                            ))}
                          </div>
                        </span>
                      </div>
                    );
                  })}
                </div>

                {selectedPlan === 'custom' && (
                  <div className="mt-6 space-y-5 animate-modal-content">
                    <div className="border-t border-white/10 pt-6">
                      <label className="text-white font-heading font-semibold text-base flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">+</span>
                        Arma tu plan
                      </label>

                      <div className="grid gap-2 mb-4">
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Tipo de Web</p>
                        {tiposProyecto.map((item) => {
                          const sel = tipoWeb === item.precio;
                          return (
                            <div
                              key={item.id}
                              onClick={() => setTipoWeb(item.precio)}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-300 ${
                                sel
                                  ? 'border-cyan-500/50 bg-cyan-500/10 text-white'
                                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${sel ? 'border-cyan-400' : 'border-white/20'}`}>
                                  {sel && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                                </div>
                                <span className="text-sm">{item.label}</span>
                                <span className="text-[10px] text-slate-500">{item.desc}</span>
                              </div>
                              <span className="text-sm font-semibold">{formatCurrency(item.precio)}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <p className="col-span-2 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Extras</p>
                        {adicionales.map((item) => {
                          const active = extras.includes(item.id);
                          return (
                            <div
                              key={item.id}
                              onClick={() => handleExtraChange(item.id)}
                              className={`flex items-center justify-between px-3 py-2 rounded-lg border cursor-pointer transition-all duration-300 ${
                                active
                                  ? 'border-cyan-500/50 bg-cyan-500/10 text-white'
                                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${active ? 'border-cyan-400 bg-cyan-400' : 'border-white/20'}`}>
                                  {active && (
                                    <svg className="w-2.5 h-2.5 text-[#030712]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-xs">{item.label}</span>
                              </div>
                              <span className="text-xs font-medium text-cyan-400">+{formatCurrency(item.precio)}</span>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setStep(4)}
                        disabled={tipoWeb === 0}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {tipoWeb === 0 ? 'Selecciona un tipo de web' : `Continuar — ${formatCurrency(total)} ${moneda === 'CLP' ? 'CLP' : ''}`}
                      </button>
                    </div>
                  </div>
                )}
            </div>
          </Reveal>
          )}

          {step === 2 && (
            <Reveal animation="fade-up">
              <div className="space-y-3">
                <label className="text-white font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold">2</span>
                  Tipo de plataforma
                </label>
                <div className="grid sm:grid-cols-1 gap-3">
                  {tiposProyecto.map((item) => {
                    const c = colorMap[item.color];
                    const selected = tipoWeb === item.precio;
                    return (
                      <label
                        key={item.id}
                        className={`group relative overflow-hidden p-5 rounded-xl border flex justify-between items-center cursor-pointer transition-all duration-500 ease-out ${
                          selected
                            ? `${c.border} text-white`
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:bg-white/[0.04]'
                        }`}
                        style={{ boxShadow: selected ? `0 0 24px ${c.glow}` : undefined }}
                        onClick={() => { setTipoWeb(item.precio); setTimeout(() => setStep(3), 400); }}
                      >
                        <span className={`absolute inset-0 rounded-xl ${c.from} ${c.to} -translate-x-full transition-transform duration-500 ease-out ${selected ? 'translate-x-0' : 'group-hover:translate-x-0'}`} />
                        <span className="relative z-10 flex items-center gap-3 w-full">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                              selected ? 'border-white' : 'border-white/20 group-hover:border-white/40'
                            }`}
                            style={{ boxShadow: selected ? `0 0 10px ${c.glow}` : undefined }}
                          >
                            {selected && <div className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm sm:text-base">{item.label}</p>
                            <p className="text-xs text-slate-400">{item.desc}</p>
                          </div>
                          <span className={`font-bold font-heading text-lg ${selected ? 'text-white' : 'text-brand-cyan'}`}>
                            {formatCurrency(item.precio)}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-1">
                    <span className="text-lg">&larr;</span> Anterior
                  </button>
                  <button onClick={() => setStep(3)} className="text-sm text-brand-cyan hover:text-cyan-300 transition-colors font-medium flex items-center gap-1">
                    Siguiente paso <span className="text-lg">&rarr;</span>
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {step === 3 && (
            <Reveal animation="fade-up">
              <div className="space-y-3">
                <label className="text-white font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold">3</span>
                  Complementos
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {adicionales.map((item) => {
                    const Icon = item.icon;
                    const c = colorMap[item.color];
                    const active = extras.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleExtraChange(item.id)}
                        className={`group relative overflow-hidden p-4 rounded-xl border flex flex-col cursor-pointer transition-all duration-500 ease-out ${
                          active
                            ? `${c.border} text-white`
                            : 'border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/30 hover:bg-white/[0.04]'
                        }`}
                        style={{ boxShadow: active ? `0 0 24px ${c.glow}` : undefined }}
                      >
                        <span className={`absolute inset-0 rounded-xl ${c.from} ${c.to} -translate-x-full transition-transform duration-500 ease-out ${active ? 'translate-x-0' : 'group-hover:translate-x-0'}`} />
                        <span className="relative z-10">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-500 ${
                                active ? 'border-white bg-white' : 'border-white/20 group-hover:border-white/40'
                              }`}>
                                {active && (
                                  <svg className="w-3 h-3 text-[#030712]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <Icon className="w-4 h-4 flex-shrink-0 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] text-white" />
                              <div>
                                <p className="text-sm font-medium">{item.label}</p>
                                <p className="text-xs text-white/60">{item.desc}</p>
                              </div>
                            </div>
                            <span className="font-bold font-heading text-sm whitespace-nowrap">+{formatCurrency(item.precio)}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 pointer-events-none">
                            <div className={`h-5 w-9 rounded-full transition-all duration-500 ${active ? c.toggle : 'bg-white/10'}`}>
                              <div className={`h-4 w-4 rounded-full bg-white transition-all duration-500 mt-0.5 ${active ? 'ml-4' : 'ml-0.5'}`} />
                            </div>
                            <span className="text-xs text-white/60">{active ? 'Agregado' : 'Agregar'}</span>
                          </div>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between pt-2">
                  <button onClick={() => setStep(1)} className="text-sm text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-1">
                    <span className="text-lg">&larr;</span> Anterior
                  </button>
                  <button onClick={() => setStep(4)} className="text-sm text-brand-cyan hover:text-cyan-300 transition-colors font-medium flex items-center gap-1">
                    Siguiente paso <span className="text-lg">&rarr;</span>
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <Reveal animation="scale-in">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-medium bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Listo para enviar
                </div>
              </Reveal>
              <Reveal animation="fade-up" delay={100}>
                <p className="text-slate-300 text-lg">Revisa tu inversión estimada y completa tus datos.</p>
              </Reveal>
              <Reveal animation="fade-up" delay={200}>
                <button onClick={() => setStep(selectedPlan === 'custom' ? 1 : 3)} className="text-sm text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-1 justify-center">
                  <span className="text-lg">&larr;</span> {selectedPlan === 'custom' ? 'Volver a servicios' : 'Volver a complementos'}
                </button>
              </Reveal>
            </div>
          )}

          <div className={`p-6 rounded-2xl border backdrop-blur-sm flex justify-between items-center transition-all duration-700 ease-out ${
            total > 0
              ? 'bg-gradient-to-r from-brand-cyan/10 via-brand-cyan/5 to-transparent border-brand-cyan/30 shadow-[0_0_30px_rgba(34,211,238,0.1)]'
              : 'bg-white/[0.03] border-white/10'
          }`}>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Inversión Estimada</div>
              <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Costo de servidor: $0 de por vida
              </div>
            </div>
            <div className={`text-3xl sm:text-4xl font-extrabold font-heading tracking-tight transition-all duration-700 ${
              total > 0 ? 'text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]' : 'text-slate-400'
            }`}>
              {formatCurrency(animatedTotal)}{' '}
              <span className="text-xs font-normal text-slate-400">{moneda === 'CLP' ? 'CLP' : ''}</span>
            </div>
          </div>
        </div>

        <Reveal animation="fade-right" delay={200} className={`lg:col-span-2 bg-white/[0.02] border border-white/10 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-lg lg:sticky lg:top-28 transition-all duration-700 ease-out ${
          step === 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-30 pointer-events-none scale-[0.96] blur-[1px]'
        }`}>
          <h3 className="text-2xl font-heading font-bold mb-2">
            <span className="text-white">¿Trabajamos </span>
            <span className="bg-gradient-to-r from-cyan-300 via-brand-cyan to-blue-400 bg-clip-text text-transparent">juntos?</span>
          </h3>
          <p className="text-slate-300 text-sm mb-6">Recibe esta cotización en tu correo y agendemos una reunión sin costo.</p>

          {enviado ? (
            <div className="space-y-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-2xl text-center backdrop-blur-sm">
                <div className="relative mx-auto mb-5 w-16 h-16">
                  <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="3" strokeLinecap="round" className="animate-float" style={{ strokeDasharray: 176, strokeDashoffset: 0 }} />
                    <circle cx="32" cy="32" r="28" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeDasharray="176" strokeDashoffset="176" className="opacity-30" />
                    <path d="M22 33l7 7 13-14" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30" />
                    <path d="M22 33l7 7 13-14" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset="0" style={{ animation: 'draw-check 0.8s ease-out 0.3s forwards' }} />
                  </svg>
                </div>
                <h4 className="font-heading font-semibold text-xl text-white mb-2">¡Cotización enviada!</h4>
                <p className="text-sm text-slate-400 leading-relaxed">Gracias por tu interés. El PDF se ha descargado automáticamente y enseguida me pondré en contacto contigo por WhatsApp.</p>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `¡Hola Bastian! Soy ${formData.nombre}. Tengo una consulta sobre mi cotización.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group w-full text-white font-bold py-3.5 rounded-xl transition-all duration-500 ease-out border border-emerald-500/30 bg-emerald-500/5 hover:border-transparent hover:shadow-xl hover:shadow-emerald-500/25 hover:-translate-y-0.5 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="relative z-10">¿Consultas? Escríbeme</span>
              </a>

              <a
                href="https://calendly.com/cristianbastian/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="relative overflow-hidden group w-full text-white font-bold py-3.5 rounded-xl transition-all duration-500 ease-out border border-brand-cyan/30 bg-brand-cyan/5 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-brand-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <svg className="w-4 h-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="relative z-10">Agendar reunión gratis</span>
              </a>

              <button
                type="button"
                onClick={generatePDF}
                disabled={generating}
                className="relative overflow-hidden group w-full text-white font-bold py-3.5 rounded-xl transition-all duration-500 ease-out border border-brand-cyan/30 bg-brand-cyan/5 hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-brand-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <FileDown className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{generating ? 'Generando...' : 'Descargar Propuesta en PDF'}</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Reveal animation="fade-up" delay={0}>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">Nombre completo</label>
                  <input
                    required
                    type="text"
                    placeholder="Ej: Juan Pérez"
                    value={formData.nombre}
                    onChange={(e) => handleFormChange('nombre', e.target.value)}
                    onBlur={() => handleFormBlur('nombre')}
                    className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.nombre
                        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                        : formData.nombre
                          ? 'border-brand-cyan/50 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                          : 'border-white/10 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                    }`}
                  />
                  {formErrors.nombre && <p className="text-[10px] text-red-400 mt-1">{formErrors.nombre}</p>}
                </div>
              </Reveal>
              <Reveal animation="fade-up" delay={40}>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">Empresa (Opcional)</label>
                  <input
                    type="text"
                    placeholder="Ej: Mi Empresa SpA"
                    value={formData.empresa}
                    onChange={(e) => { setError(null); setFormData({ ...formData, empresa: e.target.value }); }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/20 transition-all duration-300"
                  />
                </div>
              </Reveal>
              <Reveal animation="fade-up" delay={80}>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">Correo electrónico</label>
                  <input
                    required
                    type="email"
                    placeholder="juan@empresa.cl"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    onBlur={() => handleFormBlur('email')}
                    className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.email
                        ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                        : formData.email
                          ? 'border-brand-cyan/50 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                          : 'border-white/10 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                    }`}
                  />
                  {formErrors.email && <p className="text-[10px] text-red-400 mt-1">{formErrors.email}</p>}
                </div>
              </Reveal>
              <Reveal animation="fade-up" delay={120}>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">Teléfono</label>
                  <div className="flex gap-2">
                    <select
                      value={codigoPais}
                      onChange={(e) => setCodigoPais(e.target.value)}
                      className="bg-black/40 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/20 transition-all duration-300 appearance-none cursor-pointer flex-shrink-0"
                      style={{ minWidth: '80px' }}
                    >
                      {codigosPais.map((c) => (
                        <option key={c.code} value={c.code} className="bg-[#030712]">{c.label} {c.pais}</option>
                      ))}
                    </select>
                    <div className="flex-1">
                      <input
                        required
                        type="tel"
                        placeholder="9 1234 5678"
                        value={formData.telefono}
                        onChange={(e) => handleFormChange('telefono', e.target.value)}
                        onBlur={() => handleFormBlur('telefono')}
                        className={`w-full bg-black/40 border rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          formErrors.telefono
                            ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                            : formData.telefono
                              ? 'border-brand-cyan/50 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                              : 'border-white/10 focus:border-brand-cyan/80 focus:ring-brand-cyan/20'
                        }`}
                      />
                      {formErrors.telefono && <p className="text-[10px] text-red-400 mt-1">{formErrors.telefono}</p>}
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal animation="fade-up" delay={160}>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">Detalles (Opcional)</label>
                  <textarea
                    rows="2"
                    placeholder="Cuéntame sobre tu proyecto..."
                    value={formData.mensaje}
                    onChange={(e) => { setError(null); setFormData({ ...formData, mensaje: e.target.value }); }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/20 focus:shadow-[0_0_12px_rgba(34,211,238,0.08)] transition-all duration-300 resize-none"
                  />
                </div>
              </Reveal>

              {error && (
                <Reveal animation="fade-up">
                  <div className="flex items-start gap-2 text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                </Reveal>
              )}

              {/* Vista previa de la cotización */}
              <Reveal animation="fade-up" delay={260}>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-brand-cyan/30 transition-all duration-300 group"
                >
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Vista previa de tu cotización
                  </span>
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6" />
                  </svg>
                </button>
              </Reveal>

              <Reveal animation="fade-up" delay={270}>
                <button
                  type="button"
                  onClick={() => setShowSignatures(true)}
                  className="w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 group"
                  style={{
                    borderColor: clientSigned
                      ? 'rgba(52,211,153,0.3)' : 'rgba(255,255,255,0.1)',
                    backgroundColor: clientSigned
                      ? 'rgba(52,211,153,0.05)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                      clientSigned
                        ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-slate-400'
                    }`}>
                      {clientSigned ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                      {clientSigned
                        ? 'Firma completada' : 'Firmar conformidad'}
                    </span>
                  </span>
                  <svg className="w-4 h-4 text-slate-500 group-hover:text-brand-cyan transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6" />
                  </svg>
                </button>
              </Reveal>

              <Reveal animation="scale-in" delay={380}>
                <button
                  type="submit"
                  disabled={total === 0 || loading}
                  className="relative overflow-hidden group w-full text-white font-bold py-4 rounded-xl transition-all duration-500 ease-out border border-brand-cyan/30 bg-brand-cyan/5 shadow-lg shadow-brand-cyan/10 animate-neon hover:animate-none hover:border-transparent hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 text-sm uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-transparent disabled:hover:border-white/10"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-brand-cyan -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                  <span className="relative z-10">{loading ? 'Generando...' : 'Revisar y Enviar'}</span>
                </button>
              </Reveal>
            </form>
          )}
        </Reveal>
      </div>

      {/* Modal Vista Previa */}
      {showPreview && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de cotización"
            className="relative w-full max-w-lg sm:max-w-xl bg-gradient-to-b from-[#0a0e1a] to-[#030712] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl shadow-black/50 max-h-[92vh] overflow-y-auto animate-modal-content"
            ref={previewModalRef}
            style={{ animationDelay: '0.05s' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-blue-500/10 border border-brand-cyan/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-brand-cyan" />
              </div>
              <h4 className="text-lg font-heading font-bold text-white">
                Vista previa de cotización
              </h4>
              <p className="text-xs text-slate-500 mt-1">Revisa el detalle antes de enviar</p>
            </div>

            <div className="space-y-0">
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Servicios contratados</span>
                </div>
                {planActual && selectedPlan !== 'custom' && (
                  <div className="flex justify-between items-center bg-brand-cyan/5 border border-brand-cyan/10 rounded-lg px-3 py-2.5">
                    <div>
                      <span className="text-sm font-medium text-white">{planActual.label}</span>
                      <p className="text-[10px] text-slate-500">{planActual.desc}</p>
                    </div>
                    <span className="text-sm font-bold text-brand-cyan">{formatCurrency(planActual.total)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center px-1">
                  <span className="text-sm text-slate-300">{getTipoLabel()}</span>
                  <span className="text-sm font-semibold text-white">{formatCurrency(tipoWeb)}</span>
                </div>
                {extras.length > 0 && (
                  <div className="border-t border-white/5 pt-2">
                    {extras.map((id) => {
                      const item = adicionales.find((a) => a.id === id);
                      return item ? (
                        <div key={id} className="flex justify-between items-center py-1">
                          <div className="flex items-center gap-2">
                            <span className="text-brand-cyan text-xs">+</span>
                            <span className="text-sm text-slate-400">{item.label}</span>
                          </div>
                          <span className="text-xs text-slate-300">{formatCurrency(item.precio)}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-brand-cyan/10 via-brand-cyan/5 to-transparent border border-brand-cyan/20 rounded-xl px-5 py-4 flex justify-between items-center mb-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Inversión total</span>
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    Hosting $0 de por vida
                  </p>
                </div>
                <span className="text-2xl font-extrabold font-heading text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]">
                  {formatCurrency(total)}{' '}
                  <span className="text-xs font-normal text-slate-400">{moneda === 'CLP' ? 'CLP' : ''}</span>
                </span>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Incluye</span>
                </div>
                {[
                  { label: 'Hosting serverless', detail: '$0 de por vida', icon: '✓' },
                  { label: 'Desarrollo responsive', detail: 'React + Vite + Tailwind', icon: '✓' },
                  { label: 'Optimización SEO base', detail: 'Lighthouse 100%', icon: '✓' },
                  { label: 'Garantía post-entrega', detail: '30 días', icon: '✓' },
                  { label: 'Soporte técnico', detail: '15 días', icon: '✓' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 text-[10px]">{item.icon}</span>
                      <span className="text-slate-300">{item.label}</span>
                    </div>
                    <span className="text-slate-500">{item.detail}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-slate-500 block mb-1">Tiempo estimado</span>
                  <span className="text-white font-bold text-sm">{getDias()} días hábiles</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <span className="text-slate-500 block mb-1">Forma de pago</span>
                  <span className="text-white font-bold text-sm">50% / 50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      , document.body)}

      {/* Modal Firmas */}
      {createPortal(
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ease-out ${
          showSignatures ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setShowSignatures(false)}
      >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Firmar conformidad"
            ref={signatureModalRef}
            className="relative w-full max-w-lg bg-gradient-to-b from-[#0a0e1a] to-[#030712] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl shadow-black/50 max-h-[95vh] overflow-y-auto animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignatures(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-blue-500/10 border border-brand-cyan/20 flex items-center justify-center">
                <PenTool className="w-7 h-7 text-brand-cyan" />
              </div>
              <h4 className="text-xl sm:text-2xl font-heading font-bold text-white mb-1">
                Firma Digital
              </h4>
              <p className="text-sm text-slate-400 max-w-xs mx-auto">
                Dibuja tu firma en el recuadro para aprobar la cotización
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-sm text-slate-300 block mb-2 font-medium flex items-center justify-between">
                  <span>Tu firma</span>
                  {clientSigned && (
                    <span className="text-emerald-400 text-xs flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                      <Check className="w-3 h-3" />
                      Completada
                    </span>
                  )}
                </label>
                <SignaturePad canvasRef={clientSigRef} onDraw={handleClientDraw} onClear={handleClientClear} />
              </div>

              {clientSigned && (
                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 flex items-start gap-3 animate-modal-content">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-emerald-300">Firma registrada</p>
                    <p className="text-xs text-slate-400 mt-0.5">Tu firma digital será incluida en el PDF de la propuesta.</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    const canvas = clientSigRef.current;
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
                      handleClientClear();
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/[0.03] transition-all text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Eraser className="w-4 h-4" />
                  Limpiar y volver a firmar
                </button>
                <button
                  onClick={() => {
                    if (isCanvasEmpty(clientSigRef)) {
                      setError('Debes dibujar tu firma antes de confirmar.');
                      return;
                    }
                    setError(null);
                    setShowSignatures(false);
                  }}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-500 text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-brand-cyan/25 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Confirmar firma
                </button>
              </div>
            </div>
          </div>
        </div>
      , document.body)}

      {/* Modal PDF Preview */}
      {createPortal(
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
          showPdfPreview && pdfPreviewUrl ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => { setError(null); setShowPdfPreview(false); setPdfPreviewUrl(null); }}
      >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa del PDF"
            ref={pdfModalRef}
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#0a0e1a] to-[#030712] border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/50 max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => { setError(null); setShowPdfPreview(false); setPdfPreviewUrl(null); }}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h4 className="text-lg font-heading font-bold text-white mb-4 flex items-center gap-2">
              <FileDown className="w-5 h-5 text-brand-cyan" />
              Vista previa de tu cotización
            </h4>

            <div className="flex-1 bg-white rounded-xl overflow-hidden mb-4 min-h-0" style={{ height: '65vh' }}>
              <iframe src={pdfPreviewUrl} className="w-full h-full" title="PDF Preview" />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl mb-4">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex gap-3 justify-end flex-wrap">
              <button
                onClick={() => { setError(null); setShowPdfPreview(false); setPdfPreviewUrl(null); }}
                className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/30 transition-all text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (pdfDocRef.current) {
                    const nombreArchivo = `Propuesta_BastianDev_${formData.nombre?.replace(/\s+/g, '_') || 'pendiente'}_${formatDate(new Date()).replace(/\//g, '-')}.pdf`;
                    pdfDocRef.current.save(nombreArchivo);
                  }
                }}
                className="px-5 py-2.5 rounded-xl border border-brand-cyan/30 bg-brand-cyan/5 text-white hover:bg-brand-cyan/10 transition-all text-sm flex items-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Descargar PDF
              </button>
              <button
                onClick={enviarCotizacion}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-brand-cyan text-white font-bold transition-all text-sm hover:shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar Cotización'}
              </button>
          </div>
        </div>
      </div>
      , document.body)}
    </section>
  );
};

export default Cotizador;
