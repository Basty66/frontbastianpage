import { jsPDF } from 'jspdf';

// Paleta Dark Premium Tech: azul eléctrico + chrome
const BLACK = [9, 9, 11];
const DARK = [30, 30, 35];
const GRAY = [120, 120, 125];
const LIGHT = [235, 237, 240];
const BLUE = [37, 99, 235];
const BLUE_LIGHT = [239, 243, 255];
const BLUE_SOFT = [59, 130, 246];
const WHITE = [255, 255, 255];

const INCLUYE = [
  ['Desarrollo web responsivo', 'React, Vite, Tailwind. Adaptable a todo dispositivo.'],
  ['Hosting serverless $0/mes', 'Infraestructura en Vercel Edge. Sin costo de por vida.'],
  ['Optimizacion SEO', 'Meta tags, Open Graph, sitemap.xml, Schema.org.'],
  ['Garantia y soporte', '30 dias de garantia + 15 dias de soporte tecnico.'],
  ['Seguridad SSL', 'Certificado HTTPS sin costo adicional.'],
];

const EXCLUSIONES = [
  'Costo anual del dominio .cl. El cliente lo gestiona con NIC Chile.',
  'Redaccion de contenido editorial ni traduccion profesional.',
  'Cambios estructurales posteriores a la aprobacion del diseno.',
];

const PASOS = [
  'Me comunicare contigo en maximo 24 horas habiles.',
  'Agendamos una reunion para definir requerimientos detallados.',
  'Definimos alcance final, diseno preliminar y resolvemos dudas.',
  'Coordinamos el pago del anticipo e iniciamos el desarrollo.',
];

/**
 * Construye el PDF de la propuesta comercial.
 *
 * Recibe todo lo que necesita de forma explícita: no depende del estado
 * del componente ni de refs, así que se puede probar y cargar aparte.
 *
 * @returns {jsPDF} documento listo para `.save()` o `.output()`
 */
export function buildCotizacionPDF({
  formData,
  codigoPais,
  carnetImage,
  planActual,
  selectedPlan,
  proyectoActual,
  extrasDetalle = [],
  total,
  dias,
  tipoLabel,
  formatCurrency,
  formatDate,
  moneda = 'CLP',
  clientSignatureDataUrl,
  providerSignatureImg,
}) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();
  const mg = 18;
  const cw = pw - mg * 2;

  let y = 18;
  let pageNum = 1;

  const propuestaNum = `PRO-${String(Date.now()).slice(-6)}`;
  const hoy = new Date();
  const venc = new Date(hoy);
  venc.setDate(venc.getDate() + 15);

  // =============== HELPERS ===============
  function text(txt, x, yy, size, weight = 'normal', color = BLACK, align = 'left') {
    doc.setFont('helvetica', weight);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    if (align === 'right') doc.text(txt, x, yy, { align: 'right' });
    else doc.text(txt, x, yy);
  }

  function hr(yp, color = LIGHT) {
    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.3);
    doc.line(mg, yp, pw - mg, yp);
  }

  function ensureSpace(needed) {
    if (y + needed > ph - 20) { doc.addPage(); pageNum++; y = 20; }
  }

  function section(title, needed) {
    ensureSpace(needed);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(BLUE[0], BLUE[1], BLUE[2]);
    doc.text(title.toUpperCase(), mg, y);
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.5);
    doc.line(mg, y + 2, mg + 45, y + 2);
    y += 8;
  }

  function addFooter() {
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.2);
    doc.line(mg, ph - 14, pw - mg, ph - 14);
    text('BS DigitalTech', mg, ph - 9, 7, 'bold', BLUE);
    text(`${propuestaNum}  |  ${formatDate(hoy)}  |  Pagina ${pageNum}`, pw - mg, ph - 9, 7, 'normal', GRAY, 'right');
  }

  function drawOwl(x, yOwl, size) {
    const s = size / 20;
    doc.setFillColor(...BLUE);
    doc.circle(x + 10 * s, yOwl + 12 * s, 8 * s, 'F');
    doc.setFillColor(255, 255, 255);
    doc.circle(x + 6.5 * s, yOwl + 10 * s, 3 * s, 'F');
    doc.circle(x + 13.5 * s, yOwl + 10 * s, 3 * s, 'F');
    doc.setFillColor(...BLUE);
    doc.circle(x + 6.5 * s, yOwl + 10 * s, 1.5 * s, 'F');
    doc.circle(x + 13.5 * s, yOwl + 10 * s, 1.5 * s, 'F');
    doc.setFillColor(...BLUE_SOFT);
    doc.triangle(x + 9 * s, yOwl + 13 * s, x + 11 * s, yOwl + 13 * s, x + 10 * s, yOwl + 15 * s, 'F');
    doc.setFillColor(...BLUE);
    doc.triangle(x + 2 * s, yOwl + 6 * s, x + 7 * s, yOwl + 8 * s, x + 4 * s, yOwl + 2 * s, 'F');
    doc.triangle(x + 18 * s, yOwl + 6 * s, x + 13 * s, yOwl + 8 * s, x + 16 * s, yOwl + 2 * s, 'F');
  }

  // =============== HEADER ===============
  drawOwl(mg, y - 6, 18);
  text('BS DigitalTech', mg + 24, y + 2, 22, 'bold', BLUE);
  text('Soluciones Web Profesionales', mg + 24, y + 9, 9, 'normal', DARK);
  text('Serverless  |  Hosting $0', mg + 24, y + 14, 8, 'normal', GRAY);

  text(propuestaNum, pw - mg, y, 14, 'bold', BLUE, 'right');
  text('PROPUESTA', pw - mg, y + 6, 7, 'normal', GRAY, 'right');
  text(`Emitida: ${formatDate(hoy)}`, pw - mg, y + 11, 8, 'normal', DARK, 'right');
  text(`Valida hasta: ${formatDate(venc)}`, pw - mg, y + 16, 8, 'normal', DARK, 'right');

  y += 24;
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.8);
  doc.line(mg, y, pw - mg, y);
  y += 8;

  // =============== CLIENTE ===============
  section('Datos del Cliente', 35);
  const cH = formData.empresa ? 30 : 22;
  ensureSpace(cH);
  const cY = y;
  doc.setDrawColor(...LIGHT);
  doc.setLineWidth(0.3);
  doc.rect(mg, cY, cw, cH);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(mg, cY, cw, 0.8, 'F');
  text('Nombre completo', mg + 4, cY + 7, 8, 'normal', GRAY);
  text(formData.nombre || '---', mg + 4, cY + 14, 10, 'bold', BLACK);
  text('Email', mg + cw / 2 + 4, cY + 7, 8, 'normal', GRAY);
  text(formData.email || '---', mg + cw / 2 + 4, cY + 14, 9, 'normal', BLACK);
  if (formData.empresa) {
    text('Telefono', mg + 4, cY + 22, 8, 'normal', GRAY);
    text(`${codigoPais} ${formData.telefono || '---'}`, mg + 4, cY + 28, 9, 'normal', BLACK);
    text('Empresa', mg + cw / 2 + 4, cY + 22, 8, 'normal', GRAY);
    text(formData.empresa, mg + cw / 2 + 4, cY + 28, 9, 'normal', BLACK);
  } else {
    text('Telefono', mg + 4, cY + 22, 8, 'normal', GRAY);
    text(`${codigoPais} ${formData.telefono || '---'}`, mg + 4, cY + 22, 9, 'normal', BLACK);
  }
  y = cY + cH + 8;

  // =============== PROVEEDOR ===============
  section('Proveedor', 22);
  ensureSpace(18);
  const pY = y;
  doc.setDrawColor(...LIGHT);
  doc.rect(mg, pY, cw, 16);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(mg, pY, cw, 0.8, 'F');
  text('Cristian Bastian Cerda', mg + 4, pY + 7, 10, 'bold', BLUE);
  text('Analista Programador', mg + 4, pY + 13, 8, 'normal', GRAY);
  text('cristianbastian.dev@gmail.com  |  +56 9 2812 2947', mg + 4 + cw / 2, pY + 7, 8, 'normal', DARK);
  text('Santiago, Chile  |  RUT: 19.876.543-2', mg + 4 + cw / 2, pY + 13, 8, 'normal', GRAY);
  y = pY + 24;

  // =============== SERVICIO ===============
  section('Servicio Cotizado', 22);
  ensureSpace(18);
  const sY = y;
  doc.setDrawColor(...LIGHT);
  doc.rect(mg, sY, cw, 14);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(mg, sY, cw, 0.8, 'F');
  text(tipoLabel, mg + 4, sY + 7, 11, 'bold', BLUE);
  text(`${dias} dias habiles`, mg + 4, sY + 12, 8, 'normal', GRAY);
  text('Plazo de entrega', mg + cw / 2 + 4, sY + 5, 7, 'normal', GRAY);
  text('Pago 50% / 50%', mg + cw / 2 + 4, sY + 12, 9, 'bold', BLACK);
  y = sY + 22;

  // =============== PRESUPUESTO ===============
  section('Resumen del Presupuesto', 50);
  ensureSpace(45);

  const tH = 9;
  const tx = mg;
  const tConcep = 70;
  const rowH = 9;

  doc.setFillColor(BLUE[0], BLUE[1], BLUE[2]);
  doc.rect(tx, y, cw, tH, 'F');
  text('Concepto', tx + 3, y + 6, 9, 'bold', WHITE);
  text('Descripcion', tx + tConcep + 3, y + 6, 9, 'bold', WHITE);
  text('Valor', pw - mg - 3, y + 6, 9, 'bold', WHITE, 'right');
  y += tH;

  let hasRows = false;

  function drawRow(c1, c2, c3, bold = false) {
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.2);
    doc.rect(tx, y, cw, rowH);
    text(c1, tx + 3, y + 6, 9, bold ? 'bold' : 'normal', bold ? BLUE : DARK);
    text(c2, tx + tConcep + 3, y + 6, 8, 'normal', GRAY);
    text(c3, pw - mg - 3, y + 6, 9, bold ? 'bold' : 'normal', bold ? BLUE : BLACK, 'right');
    y += rowH;
  }

  if (planActual && selectedPlan !== 'custom') {
    drawRow(`Plan ${planActual.label}`, planActual.desc, formatCurrency(planActual.total), true);
    hasRows = true;
  } else if (proyectoActual) {
    drawRow(proyectoActual.label, proyectoActual.desc, formatCurrency(proyectoActual.precio), true);
    hasRows = true;

    extrasDetalle.forEach((item) => {
      ensureSpace(rowH);
      drawRow(`+ ${item.label}`, item.desc, `+ ${formatCurrency(item.precio)}`, false);
    });
  }

  if (hasRows) {
    ensureSpace(13);
    doc.setFillColor(BLUE_LIGHT[0], BLUE_LIGHT[1], BLUE_LIGHT[2]);
    doc.rect(tx, y, cw, 12, 'F');
    doc.setDrawColor(...BLUE);
    doc.setLineWidth(0.4);
    doc.rect(tx, y, cw, 12);
    text('INVERSION TOTAL', tx + 3, y + 8, 11, 'bold', BLUE);
    text(`${formatCurrency(total)} ${moneda}`, pw - mg - 3, y + 8, 12, 'bold', BLUE, 'right');
    y += 18;
  }

  // =============== ALCANCE ===============
  section('Alcance del Servicio', 60);
  ensureSpace(55);
  const incY = y;
  const incH = INCLUYE.length * 9 + 6;
  doc.setDrawColor(...LIGHT);
  doc.rect(mg, incY, cw, incH);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(mg, incY, cw, 0.8, 'F');
  INCLUYE.forEach(([t, d], i) => {
    doc.setFillColor(...BLUE);
    doc.circle(mg + 6, incY + 5.5 + i * 9, 1.5, 'F');
    text(t, mg + 14, incY + 7 + i * 9, 9, 'bold', BLACK);
    text(d, mg + 14, incY + 11 + i * 9, 7, 'normal', GRAY);
  });
  y = incY + incH + 8;

  // =============== EXCLUSIONES ===============
  section('Exclusiones', 30);
  ensureSpace(28);
  const excH = EXCLUSIONES.length * 7 + 4;
  doc.setDrawColor(...LIGHT);
  doc.rect(mg, y, cw, excH);
  EXCLUSIONES.forEach((t, i) => {
    text('-', mg + 4, y + 5 + i * 7, 9, 'bold', [220, 38, 38]);
    text(t, mg + 10, y + 5 + i * 7, 8, 'normal', DARK);
  });
  y += excH + 8;

  // =============== CONDICIONES DE PAGO ===============
  section('Condiciones de Pago', 45);
  ensureSpace(40);
  const anticipo = Math.round(total * 0.5);
  const saldo = total - anticipo;
  const pH = 38;
  doc.setDrawColor(...BLUE);
  doc.setLineWidth(0.5);
  doc.rect(mg, y, cw, pH);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(mg, y, cw, 0.8, 'F');
  text('Esquema de pago 50% / 50%', mg + 4, y + 8, 10, 'bold', BLUE);
  text(`1.  Anticipo: ${formatCurrency(anticipo)} ${moneda}`, mg + 4, y + 18, 9, 'normal', DARK);
  text('Para iniciar el desarrollo del proyecto.', mg + 12, y + 23, 8, 'normal', GRAY);
  text(`2.  Saldo: ${formatCurrency(saldo)} ${moneda}`, mg + 4, y + 28, 9, 'normal', DARK);
  text('Contra entrega y conformidad final.', mg + 12, y + 33, 8, 'normal', GRAY);
  text(`Plazo total: ${dias} dias habiles desde el anticipo.`, pw - mg - 4, y + pH - 4, 8, 'bold', BLUE, 'right');
  y += pH + 8;

  // =============== PROXIMOS PASOS ===============
  section('Proximos Pasos', 45);
  ensureSpace(40);
  const nH = 36;
  doc.setDrawColor(...LIGHT);
  doc.rect(mg, y, cw, nH);
  PASOS.forEach((t, i) => {
    doc.setFillColor(...BLUE);
    doc.circle(mg + 6, y + 5.5 + i * 7, 2.5, 'F');
    text(`${i + 1}`, mg + 4.8, y + 6.7 + i * 7, 6, 'bold', WHITE);
    text(t, mg + 14, y + 7 + i * 7, 9, 'normal', DARK);
  });
  y += nH + 8;

  // =============== FIRMAS ===============
  ensureSpace(55);
  y += 4;
  hr(y);
  y += 8;
  section('Firmas de Conformidad', 55);

  text('Ambas partes aceptan los terminos, alcance y condiciones descritos en esta propuesta.',
    mg, y, 8, 'normal', GRAY);
  y += 10;

  const sigW = (cw - 8) / 2;
  const sigH = 38;
  const sigY = y;

  // Cliente
  doc.setDrawColor(...LIGHT);
  doc.setLineWidth(0.3);
  doc.rect(mg, sigY, sigW, sigH);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(mg, sigY, sigW, 0.8, 'F');
  text('CLIENTE', mg + 4, sigY + 8, 10, 'bold', BLUE);
  text(formData.nombre || '[Nombre del cliente]', mg + 4, sigY + 14, 9, 'normal', DARK);
  if (clientSignatureDataUrl) {
    try {
      doc.addImage(clientSignatureDataUrl, 'PNG', mg + 4, sigY + 16, sigW - 8, 12);
    } catch (e) {
      console.warn('No se pudo incluir la firma del cliente:', e);
    }
  }
  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.3);
  doc.line(mg + 4, sigY + sigH - 6, mg + sigW - 4, sigY + sigH - 6);
  text('Firma', mg + 4, sigY + sigH - 2, 7, 'normal', GRAY);
  text(`Fecha: ${formatDate(hoy)}`, mg + 4, sigY + sigH + 2, 7, 'normal', GRAY);

  // Proveedor
  const px2 = mg + sigW + 8;
  doc.setDrawColor(...LIGHT);
  doc.rect(px2, sigY, sigW, sigH);
  doc.setFillColor(...BLUE_LIGHT);
  doc.rect(px2, sigY, sigW, 0.8, 'F');
  text('PROVEEDOR', px2 + 4, sigY + 8, 10, 'bold', BLUE);
  text('Cristian Bastian Cerda', px2 + 4, sigY + 14, 9, 'normal', DARK);
  text('Analista Programador', px2 + 4, sigY + 19, 7, 'normal', GRAY);
  if (providerSignatureImg) {
    doc.addImage(providerSignatureImg, 'PNG', px2 + 4, sigY + 20, sigW - 8, 11);
  }
  doc.setDrawColor(...GRAY);
  doc.line(px2 + 4, sigY + sigH - 6, px2 + sigW - 4, sigY + sigH - 6);
  text('Firma', px2 + 4, sigY + sigH - 2, 7, 'normal', GRAY);
  text(`Fecha: ${formatDate(hoy)}`, px2 + 4, sigY + sigH + 2, 7, 'normal', GRAY);

  y = sigY + sigH + 8;

  if (carnetImage) {
    ensureSpace(70);
    section('Identidad del Cliente', 65);
    doc.setDrawColor(...LIGHT);
    doc.setLineWidth(0.3);
    doc.rect(mg, y, cw, 55);
    doc.setFillColor(...BLUE_LIGHT);
    doc.rect(mg, y, cw, 0.8, 'F');
    text('Documento de identidad adjuntado por el cliente', mg + 4, y + 7, 8, 'normal', GRAY);
    try {
      const imgProps = doc.getImageProperties(carnetImage);
      const maxW = cw - 8;
      const maxH = 40;
      const ratio = Math.min(maxW / imgProps.width, maxH / imgProps.height);
      const w = imgProps.width * ratio;
      const h = imgProps.height * ratio;
      const x = mg + 4 + (maxW - w) / 2;
      doc.addImage(carnetImage, 'JPEG', x, y + 10, w, h);
    } catch { /* si la imagen del carnet falla, el PDF sigue sin ella */ }
    y += 63;
  }

  addFooter();
  return doc;
}
