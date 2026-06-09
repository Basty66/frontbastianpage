import React, { useState, useRef, useCallback, useEffect, memo } from 'react';
import { jsPDF } from 'jspdf';
import { Settings, CreditCard, Search, Globe, FileDown, Eraser, AlertTriangle } from 'lucide-react';
import Reveal from './Reveal';
import useAnimatedNumber from '../hooks/useAnimatedNumber';
import { supabase } from '../lib/supabaseClient';
import bastianSigImg from '/firma-bastian.png';

const steps = [
  { label: 'Tipo de Web', desc: 'Elige el proyecto' },
  { label: 'Extras', desc: 'Complementos' },
  { label: 'Contacto', desc: 'Recibe tu cotización' },
];

const diasPorTipo = { landing: 7, corporativa: 14, ecommerce: 21 };

const infoProyecto = {
  landing: { label: 'Landing Page', dias: 7 },
  corporativa: { label: 'Web Corporativa', dias: 14 },
  ecommerce: { label: 'E-commerce', dias: 21 },
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
};

const adicionales = [
  { id: 'admin', icon: Settings, label: 'Panel Administrativo', desc: 'Gestor de stock y precios', precio: 120000, color: 'indigo' },
  { id: 'pagos', icon: CreditCard, label: 'Pasarela de Pago', desc: 'Mercado Pago / Webpay', precio: 80000, color: 'emerald' },
  { id: 'seo', icon: Search, label: 'SEO Profesional', desc: 'Optimización para Google', precio: 60000, color: 'sky' },
  { id: 'idioma', icon: Globe, label: 'Multi-idioma', desc: 'Traducción a varios idiomas', precio: 90000, color: 'violet' },
];

const SignaturePad = memo(({ canvasRef, onDraw, onClear }) => {
  const isDrawing = useRef(false);
  const drawRef = useRef(null);

  const getCtx = (canvas) => canvas?.getContext('2d', { willReadFrequently: true });

  const startDrawing = useCallback((e) => {
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = getCtx(canvas);
    if (!ctx) return;
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [canvasRef]);

  const draw = useCallback((e) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = getCtx(canvas);
    if (!ctx) return;
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#fff';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, [canvasRef]);

  drawRef.current = draw;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handler = (e) => drawRef.current(e);
    canvas.addEventListener('touchmove', handler, { passive: false });
    return () => canvas.removeEventListener('touchmove', handler);
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

  return (
    <div className="space-y-2">
      <div className="relative bg-black/40 border border-white/10 rounded-xl overflow-hidden" style={{ touchAction: 'none' }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={120}
          className="w-full h-[120px] cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button
            type="button"
            onClick={clear}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
            title="Limpiar firma"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <p className="text-[10px] text-slate-500">Firma digitalmente arrastrando el mouse o tu dedo</p>
    </div>
  );
});

SignaturePad.displayName = 'SignaturePad';

const Cotizador = () => {
  const [tipoWeb, setTipoWeb] = useState(0);
  const [extras, setExtras] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSignatures, setShowSignatures] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);

  const clientSigRef = useRef(null);
  const bastianSigRef = useRef(null);
  const pdfDocRef = useRef(null);
  const mountedRef = useRef(false);
  const bastianImgRef = useRef(null);
  const [clientSigned, setClientSigned] = useState(false);

  const handleClientDraw = useCallback(() => setClientSigned(true), []);
  const handleClientClear = useCallback(() => setClientSigned(false), []);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => { bastianImgRef.current = img; };
    img.onerror = () => { console.warn('No se pudo cargar firma-bastian.png'); };
    img.src = bastianSigImg;
  }, []);

  const isCanvasEmpty = (ref) => {
    const canvas = ref.current;
    if (!canvas) return true;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return true;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] !== 0) return false;
    }
    return true;
  };

  const proyectoActual = tiposProyecto.find((t) => t.precio === tipoWeb);

  const total = tipoWeb + extras.reduce((acc, id) => {
    const item = adicionales.find((a) => a.id === id);
    return acc + (item?.precio || 0);
  }, 0);

  const animatedTotal = useAnimatedNumber(total, 600);

  const handleExtraChange = (id) => {
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isCanvasEmpty(clientSigRef)) {
      setError('Debes firmar la conformidad antes de enviar.');
      setShowSignatures(true);
      return;
    }

    setLoading(true);

    try {
      const tipoId = getTipoId();
      const doc = buildPDFDoc(tipoId);
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
      const pdfName = `Propuesta_BastianDev_${formData.nombre.replace(/\s+/g, '_')}.pdf`;
      const tipoId = getTipoId();

      try {
        if (supabase) {
          const { error: insertError } = await supabase.from('cotizaciones').insert({
            nombre: formData.nombre,
            email: formData.email,
            telefono: formData.telefono,
            mensaje: formData.mensaje || '',
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
              telefono: formData.telefono,
              mensaje: formData.mensaje || '',
              tipo_web: tipoId,
              extras: extras,
              total_estimado: total,
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

  const formatCurrency = (val) => `$${val.toLocaleString('es-CL')}`;

  const formatDate = (d) => {
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const anio = d.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const getTipoId = () => {
    if (!proyectoActual) return 'landing';
    return proyectoActual.id;
  };

  const getTipoLabel = () => {
    const id = getTipoId();
    return id === 'landing' ? 'Landing Page' : id === 'corporativa' ? 'Web Corporativa' : 'E-commerce';
  };

  const buildPDFDoc = (tipoId) => {
    const proyecto = infoProyecto[tipoId];
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pw = doc.internal.pageSize.getWidth();
    const ph = doc.internal.pageSize.getHeight();
    const mg = 16;
    const cw = pw - 2 * mg;
    const dark = [0, 0, 0];
    const gray = [50, 50, 50];
    const white = [255, 255, 255];
    const lightBg = [245, 247, 250];
    const accent = [0, 120, 200];

    let yy = mg;

    const helpers = {
      title(text, yp, sz = 9) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(sz);
        doc.setTextColor(...dark);
        doc.text(text, mg, yp);
        doc.setDrawColor(...accent);
        doc.setLineWidth(0.3);
        doc.line(mg, yp + 1, mg + 40, yp + 1);
      },
      txt(text, x, yp, sz, color, align = 'left') {
        doc.setFont('times', 'normal');
        doc.setFontSize(sz);
        doc.setTextColor(...color);
        doc.text(text, x, yp, { align, maxWidth: cw - (x - mg) });
      },
      txtBold(text, x, yp, sz, color, align = 'left') {
        doc.setFont('times', 'bold');
        doc.setFontSize(sz);
        doc.setTextColor(...color);
        doc.text(text, x, yp, { align, maxWidth: cw - (x - mg) });
      },
      bullet(text, x, yp, sz, color, char = '•') {
        doc.setFont('times', 'normal');
        doc.setFontSize(sz);
        doc.setTextColor(...color);
        doc.text(` ${char} ${text}`, x, yp, { maxWidth: cw - (x - mg) - 5 });
      },
    };

    const { title, txt, txtBold, bullet } = helpers;

    // ===== HEADER =====
    doc.setFillColor(...dark);
    doc.rect(mg, yy - 3, 10, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...white);
    doc.text('B', mg + 2, yy + 4);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...dark);
    doc.text('Bastian.dev', mg + 14, yy + 3);
    doc.setFont('times', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(...gray);
    doc.text('Soluciones Web · Serverless · Hosting $0', mg + 14, yy + 8);

    const propuestaNum = `PRO-${String(Date.now()).slice(-6)}`;
    const hoy = new Date();
    const venc = new Date(hoy);
    venc.setDate(venc.getDate() + 15);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.setTextColor(...gray);
    doc.text(`N° ${propuestaNum}`, pw - mg, yy, { align: 'right' });
    doc.setFont('times', 'normal');
    doc.text(`Emisión: ${formatDate(hoy)}  |  Válida: ${formatDate(venc)}`, pw - mg, yy + 4, { align: 'right' });

    yy += 13;
    doc.setDrawColor(...accent);
    doc.setLineWidth(0.4);
    doc.line(mg, yy, pw - mg, yy);
    yy += 5;

    // ===== CLIENTE =====
    doc.setFillColor(...lightBg);
    doc.rect(mg, yy, cw, 16, 'F');
    title('Cliente', yy + 2, 8);
    yy += 6;
    txtBold('Nombre:', mg + 3, yy, 7, dark);
    txt(` ${formData.nombre || '________________'}`, mg + 16, yy, 7, gray);
    txtBold('Email:', mg + 3 + cw / 2, yy, 7, dark);
    txt(` ${formData.email || '________________'}`, mg + 3 + cw / 2 + 10, yy, 7, gray);
    yy += 4.5;
    txtBold('Teléfono:', mg + 3, yy, 7, dark);
    txt(` ${formData.telefono || '________________'}`, mg + 3 + 16, yy, 7, gray);
    yy += 7.5;

    // ===== PRESUPUESTO =====
    title('Resumen del Presupuesto', yy, 8);
    yy += 5;

    if (proyectoActual) {
      doc.setFillColor(...dark);
      doc.rect(mg, yy - 1.5, cw, 5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.setTextColor(...white);
      doc.text('Servicio', mg + 2, yy + 1);
      doc.text('Detalle', mg + 55, yy + 1);
      doc.text('Valor', pw - mg - 2, yy + 1, { align: 'right' });
      yy += 5;

      doc.setFont('times', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...dark);
      doc.text(proyectoActual.label, mg + 2, yy);
      doc.text(proyectoActual.desc, mg + 55, yy);
      doc.text(formatCurrency(proyectoActual.precio), pw - mg - 2, yy, { align: 'right' });
      yy += 4.5;

      extras.forEach((id) => {
        const item = adicionales.find((a) => a.id === id);
        if (!item) return;
        doc.text(item.label, mg + 2, yy);
        doc.text(item.desc, mg + 55, yy);
        doc.text(`+${formatCurrency(item.precio)}`, pw - mg - 2, yy, { align: 'right' });
        yy += 4.5;
      });

      doc.setFillColor(...accent);
      doc.rect(mg, yy - 1, cw, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...white);
      doc.text('TOTAL', mg + 2, yy + 3);
      doc.text(`${formatCurrency(total)} CLP`, pw - mg - 2, yy + 3, { align: 'right' });
      yy += 8;
    }

    // ===== ALCANCE =====
    title('¿Qué incluye?', yy, 8);
    yy += 5;
    [
      'Desarrollo frontend responsivo con React + Vite + Tailwind CSS. Diseño adaptable a todo dispositivo.',
      'Infraestructura serverless en Vercel Edge. Costo de hosting: $0 CLP de por vida.',
      'Optimización SEO base: meta tags, Open Graph, sitemap XML y estructura semántica (Lighthouse 100%).',
      'Una revisión y ajuste post-entrega. Garantía de 30 días sobre el desarrollo entregado.',
      'Soporte técnico por correo electrónico durante los primeros 15 días operativos.',
    ].forEach((item) => {
      bullet(item, mg + 1, yy, 6.5, gray, '✓');
      yy += 4;
    });
    yy += 2;

    // ===== EXCLUSIONES =====
    title('Límites', yy, 8);
    yy += 5;
    [
      'El cliente debe proveer textos definitivos, logotipos vectoriales e imágenes.',
      'No incluye costo anual del dominio .cl (NIC Chile). El cliente lo gestiona.',
      'No incluye redacción de contenido editorial ni traducción profesional.',
      'Cambios estructurales post-aprobación del diseño tendrán costo adicional.',
      'El plazo corre una vez recibido el anticipo del 50% y los materiales completos.',
    ].forEach((item) => {
      bullet(item, mg + 1, yy, 6.5, gray, '✗');
      yy += 4;
    });
    yy += 2;

    // ===== TIEMPOS Y PAGO =====
    title('Tiempos y Pago', yy, 8);
    yy += 5;
    const dias = proyecto?.dias || 7;
    const anticipo = Math.round(total * 0.5);
    const saldo = total - anticipo;

    txtBold('Desarrollo:', mg, yy, 7.5, dark);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...accent);
    doc.text(`${dias} días hábiles`, mg + 28, yy);
    yy += 5.5;

    txtBold('Condiciones:', mg, yy, 7.5, dark);
    yy += 4;
    [
      `Anticipo 50% (${formatCurrency(anticipo)} CLP) para iniciar el desarrollo.`,
      `Saldo 50% (${formatCurrency(saldo)} CLP) contra entrega y conformidad.`,
      'Pago: Transferencia bancaria, Mercado Pago o Webpay.',
    ].forEach((item) => {
      bullet(item, mg + 1, yy, 6.5, gray, '•');
      yy += 4;
    });
    yy += 2;

    // ===== PRÓXIMOS PASOS =====
    title('Próximos Pasos', yy, 8);
    yy += 5;
    [
      'Me contactaré contigo en un plazo máximo de 24 horas hábiles.',
      'Agendaremos una reunión para tomar los requerimientos detallados de tu proyecto.',
      'En la reunión definiremos alcance final, diseño preliminar y resolveremos dudas.',
      'Si todo está conforme, coordinamos el pago del anticipo para iniciar el desarrollo.',
    ].forEach((step) => {
      bullet(step, mg + 1, yy, 6.5, gray, '→');
      yy += 4;
    });
    yy += 3;

    // ===== CONTACTO =====
    doc.setFillColor(...lightBg);
    doc.rect(mg, yy, cw, 11, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...dark);
    doc.text('Contacto', mg + 3, yy + 3);
    doc.setFont('times', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...gray);
    doc.text('Cristian Bastian Cerda · Analista Programador · cristianbastian.dev@gmail.com', mg + 3, yy + 7.5);
    yy += 14;

    // ===== FIRMAS =====
    const remaining = ph - yy - 22;
    if (remaining < 45) {
      doc.addPage();
      yy = mg;
    }

    title('Firmas de Conformidad', yy, 8);
    yy += 5;
    doc.setFont('times', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(...gray);
    doc.text('Las partes declaran su conformidad con todos los términos descritos en la presente propuesta.', mg, yy, { maxWidth: cw });
    yy += 7;

    const sigBoxW = (cw - 4) / 2;
    const sigBoxY = yy;

    const embedSig = (canvasRef, xp, yp, bw) => {
      if (!canvasRef?.current) return;
      const sigData = canvasRef.current.toDataURL('image/png');
      doc.addImage(sigData, 'PNG', xp + 3, yp + 9, bw - 6, 14);
    };

    doc.setDrawColor(160, 170, 180);
    doc.setLineWidth(0.3);
    doc.rect(mg, sigBoxY, sigBoxW, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...dark);
    doc.text('Cliente:', mg + 3, sigBoxY + 4);
    doc.setFont('times', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...gray);
    doc.text(`${formData.nombre || '[Nombre]'}`, mg + 3, sigBoxY + 8);
    embedSig(clientSigRef, mg, sigBoxY, sigBoxW);
    doc.setFont('times', 'italic');
    doc.setFontSize(6);
    doc.setTextColor(...gray);
    doc.text('Firma:', mg + 3, sigBoxY + 25);
    doc.line(mg + 12, sigBoxY + 28, mg + sigBoxW - 3, sigBoxY + 28);

    const bLeft = mg + sigBoxW + 4;
    doc.rect(bLeft, sigBoxY, sigBoxW, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...dark);
    doc.text('Prestador:', bLeft + 3, sigBoxY + 4);
    doc.setFont('times', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(...gray);
    doc.text('Bastian — Analista Programador', bLeft + 3, sigBoxY + 8);
    if (bastianImgRef.current) {
      doc.addImage(bastianImgRef.current, 'PNG', bLeft + 3, sigBoxY + 9, sigBoxW - 6, 14);
    }
    doc.setFont('times', 'italic');
    doc.setFontSize(6);
    doc.setTextColor(...gray);
    doc.text('Firma:', bLeft + 3, sigBoxY + 25);
    doc.line(bLeft + 12, sigBoxY + 28, bLeft + sigBoxW - 3, sigBoxY + 28);

    // ===== FOOTER =====
    yy = sigBoxY + 35;
    doc.setDrawColor(200, 205, 215);
    doc.setLineWidth(0.2);
    doc.line(mg, ph - 13, pw - mg, ph - 13);
    doc.setFont('times', 'italic');
    doc.setFontSize(6);
    doc.setTextColor(140, 140, 140);
    doc.text('Bastian.dev — Cristian Bastian Cerda — cristianbastian.dev@gmail.com', mg, ph - 8.5);
    doc.text(`Propuesta generada el ${formatDate(new Date())} · Válida por 15 días · ${propuestaNum}`, mg, ph - 5);
    doc.text('Pág. 1/1', pw - mg, ph - 5, { align: 'right' });

    return doc;
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const tipoId = getTipoId();
      const doc = buildPDFDoc(tipoId);
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
      </Reveal>

      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setStep(i + 1)}
              className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 rounded-xl border transition-all duration-500 ease-out ${
                step >= i + 1
                  ? 'border-brand-cyan/50 bg-brand-cyan/10 text-white shadow-lg shadow-brand-cyan/5'
                  : 'border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                step >= i + 1 ? 'bg-brand-cyan/20 text-cyan-200 shadow-[0_0_8px_rgba(34,211,238,0.3)]' : 'bg-white/10 text-white/60'
              }`}>
                {step > i + 1 ? (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : i + 1}
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold leading-tight">{s.label}</p>
                <p className="text-[10px] opacity-60">{s.desc}</p>
              </div>
            </button>
            {i < steps.length - 1 && (
              <div className={`h-px w-6 sm:w-12 transition-all duration-500 ${step > i + 1 ? 'bg-brand-cyan/50' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-12 items-start">
        <div className={`lg:col-span-3 bg-white/[0.02] border border-white/10 p-4 sm:p-8 rounded-3xl backdrop-blur-lg space-y-6 sm:space-y-8 transition-all duration-500 ${
          step === 1 || step === 2 ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none scale-[0.98]'
        }`}>
          {step === 1 && (
            <Reveal animation="fade-up">
              <div className="space-y-3">
                <label className="text-white font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold">1</span>
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
                        onClick={() => { setTipoWeb(item.precio); setTimeout(() => setStep(2), 400); }}
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
                            ${item.precio.toLocaleString('es-CL')}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="text-sm text-brand-cyan hover:text-cyan-300 transition-colors font-medium flex items-center gap-1"
                  >
                    Siguiente paso <span className="text-lg">&rarr;</span>
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {step === 2 && (
            <Reveal animation="fade-up">
              <div className="space-y-3">
                <label className="text-white font-heading font-semibold text-lg flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-brand-cyan/20 text-brand-cyan flex items-center justify-center text-xs font-bold">2</span>
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
                            <span className="font-bold font-heading text-sm whitespace-nowrap">+${item.precio.toLocaleString('es-CL')}</span>
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
                  <button onClick={() => setStep(3)} className="text-sm text-brand-cyan hover:text-cyan-300 transition-colors font-medium flex items-center gap-1">
                    Siguiente paso <span className="text-lg">&rarr;</span>
                  </button>
                </div>
              </div>
            </Reveal>
          )}

          {step === 3 && (
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
                <button onClick={() => setStep(2)} className="text-sm text-slate-400 hover:text-white transition-colors font-medium flex items-center gap-1 justify-center">
                  <span className="text-lg">&larr;</span> Volver a complementos
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
              ${animatedTotal.toLocaleString('es-CL')}{' '}
              <span className="text-xs font-normal text-slate-400">CLP</span>
            </div>
          </div>
        </div>

        <Reveal animation="fade-right" delay={200} className={`lg:col-span-2 bg-white/[0.02] border border-white/10 p-4 sm:p-8 rounded-3xl backdrop-blur-lg sticky top-28 transition-all duration-500 ${
          step === 3 ? 'opacity-100 translate-y-0' : 'opacity-40 pointer-events-none scale-[0.98]'
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
                href={`https://wa.me/56928122947?text=${encodeURIComponent(
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
              {['nombre', 'email', 'telefono'].map((field, i) => (
                <Reveal key={field} animation="fade-up" delay={i * 80}>
                  <div>
                    <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">
                      {field === 'nombre' ? 'Nombre completo' : field === 'email' ? 'Correo electrónico' : 'Teléfono'}
                    </label>
                    <input
                      required
                      type={field === 'email' ? 'email' : field === 'telefono' ? 'tel' : 'text'}
                      placeholder={field === 'nombre' ? 'Ej: Juan Pérez' : field === 'email' ? 'juan@empresa.cl' : '+56 9 1234 5678'}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-cyan/80 focus:ring-2 focus:ring-brand-cyan/20 focus:shadow-[0_0_12px_rgba(34,211,238,0.08)] transition-all duration-300"
                    />
                  </div>
                </Reveal>
              ))}
              <Reveal animation="fade-up" delay={240}>
                <div>
                  <label className="text-xs text-slate-300 block mb-1.5 font-medium tracking-wide">Detalles (Opcional)</label>
                  <textarea
                    rows="2"
                    placeholder="Cuéntame sobre tu proyecto..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
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
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de cotización"
            className="relative w-full max-w-md bg-gradient-to-b from-[#0a0e1a] to-[#030712] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto animate-modal-content"
            style={{ animationDelay: '0.05s' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h4 className="text-lg font-heading font-bold text-white mb-5 flex items-center gap-2 opacity-0 animate-modal-content" style={{ animationDelay: '0.12s', animationFillMode: 'forwards' }}>
              <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Vista previa de tu cotización
            </h4>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/5 opacity-0 animate-modal-content-right" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                <span className="text-sm text-slate-300">{getTipoLabel()}</span>
                <span className="text-sm font-semibold text-white">{formatCurrency(tipoWeb)}</span>
              </div>

              {extras.length > 0 && (
                <div className="space-y-1.5 opacity-0 animate-modal-content-right" style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}>
                  {extras.map((id) => {
                    const item = adicionales.find((a) => a.id === id);
                    return item ? (
                      <div key={id} className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">+ {item.label}</span>
                        <span className="text-sm text-slate-300">{formatCurrency(item.precio)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-brand-cyan/30 opacity-0 animate-modal-content-right" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                <span className="text-sm font-bold text-white">Total Inversión</span>
                <span className="text-lg font-extrabold text-brand-cyan drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                  {formatCurrency(total)} CLP
                </span>
              </div>

              <div className="pt-2 border-t border-white/5 opacity-0 animate-modal-content-right" style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}>
                <p className="text-xs text-slate-500 font-medium mb-2">Incluye:</p>
                {[
                  'Hosting serverless — $0 de por vida',
                  'Desarrollo responsive con React + Vite',
                  'Optimización SEO base',
                  '30 días de garantía post-entrega',
                  '15 días de soporte técnico',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-400 py-0.5">
                    <span className="text-emerald-400 mt-0.5">✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 text-xs opacity-0 animate-modal-content-right" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
                <div>
                  <span className="text-slate-500">Tiempo estimado</span>
                  <p className="text-white font-semibold mt-0.5">
                    {proyectoActual ? (infoProyecto[proyectoActual.id]?.dias || 7) : 7} días hábiles
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Pago</span>
                  <p className="text-white font-semibold mt-0.5">50% anticipo + 50% entrega</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Firmas - siempre montado para preservar el canvas */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
          showSignatures ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onClick={() => setShowSignatures(false)}
      >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Firmar conformidad"
            className="relative w-full max-w-md bg-gradient-to-b from-[#0a0e1a] to-[#030712] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSignatures(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h4 className="text-lg font-heading font-bold text-white mb-5 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Firmar conformidad
            </h4>

            <div className="space-y-5">
              <div>
                <label className="text-xs text-slate-300 block mb-1.5 font-medium">
                  Firma del Cliente
                  {clientSigned && <span className="text-emerald-400 ml-1">✓</span>}
                </label>
                <SignaturePad canvasRef={clientSigRef} onDraw={handleClientDraw} onClear={handleClientClear} />
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    if (isCanvasEmpty(clientSigRef)) {
                      setError('La firma del cliente es obligatoria.');
                      return;
                    }
                    setError(null);
                    setShowSignatures(false);
                  }}
                  className="text-sm text-brand-cyan hover:text-cyan-300 transition-colors font-medium"
                >
                  Confirmar firma y cerrar
                </button>
              </div>
            </div>
          </div>
        </div>

      {/* Modal PDF Preview */}
      {showPdfPreview && pdfPreviewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => { setError(null); setShowPdfPreview(false); setPdfPreviewUrl(null); }}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa del PDF"
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
      )}
    </section>
  );
};

export default Cotizador;
