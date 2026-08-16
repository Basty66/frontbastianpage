import { jsPDF } from 'jspdf'

const BLACK = [9, 9, 11]
const BLUE = [37, 99, 235]
const BLUE_LIGHT = [59, 130, 246]
const GRAY = [161, 161, 170]
const DARK_GRAY = [82, 82, 91]
const WHITE = [250, 250, 250]
const RED = [239, 68, 68]
const GREEN = [34, 197, 94]

const errores = [
  {
    titulo: 'Web lenta',
    desc: 'Más de 3 segundos de carga = 53% de usuarios que se van.',
    solucion: 'Optimiza imágenes, usa hosting rápido y minimiza scripts.',
  },
  {
    titulo: 'No es responsive',
    desc: 'El 60% de las búsquedas son desde celular. Si no se ve bien, pierdes clientes.',
    solucion: 'Diseña mobile-first y prueba en múltiples dispositivos.',
  },
  {
    titulo: 'Sin llamado a la acción',
    desc: 'Si no dices qué hacer, no lo hacen. Botones claros = más conversiones.',
    solucion: 'Agrega botones visibles como "Contáctanos", "Cotizar gratis".',
  },
  {
    titulo: 'Diseño desactualizado',
    desc: 'Los usuarios juzgan tu negocio en 0.05 segundos. El diseño importa.',
    solucion: 'Invierte en un diseño profesional que transmita confianza.',
  },
  {
    titulo: 'Sin certificado SSL',
    desc: 'Los navegadores marcan tu web como "no segura". Pierdes confianza.',
    solucion: 'Activa SSL gratis con tu hosting o CDN.',
  },
]

const checklist = [
  'Mi web carga en menos de 3 segundos',
  'Se ve perfecto en celular',
  'Tiene botones claros de contacto/acción',
  'El diseño transmite confianza profesional',
  'Tiene certificado SSL (https://)',
]

export function buildGuidePDF() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const w = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentW = w - margin * 2
  let y = 0

  // === COVER ===
  doc.setFillColor(...BLACK)
  doc.rect(0, 0, w, 297, 'F')

  // Blue accent line
  doc.setFillColor(...BLUE)
  doc.rect(0, 0, w, 4, 'F')

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(32)
  doc.setTextColor(...WHITE)
  doc.text('5 errores que tu', w / 2, 80, { align: 'center' })
  doc.text('web NO puede tener', w / 2, 95, { align: 'center' })

  // Subtitle
  doc.setFontSize(12)
  doc.setTextColor(...GRAY)
  doc.text('Guía práctica para PYMEs chilenas', w / 2, 115, { align: 'center' })

  // Decorative line
  doc.setDrawColor(...BLUE)
  doc.setLineWidth(0.8)
  doc.line(w / 2 - 30, 125, w / 2 + 30, 125)

  // Branding
  doc.setFontSize(10)
  doc.setTextColor(...DARK_GRAY)
  doc.text('BS DigitalTech', w / 2, 260, { align: 'center' })
  doc.text('Soluciones Web Profesionales · Chile', w / 2, 268, { align: 'center' })

  // === ERRORS PAGES ===
  errores.forEach((err, i) => {
    doc.addPage()
    doc.setFillColor(...BLACK)
    doc.rect(0, 0, w, 297, 'F')

    // Top accent
    doc.setFillColor(...BLUE)
    doc.rect(0, 0, w, 3, 'F')

    // Error number
    y = 35
    doc.setFontSize(60)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...BLUE)
    doc.text(`${i + 1}`, margin, y)

    // Error title
    doc.setFontSize(22)
    doc.setTextColor(...WHITE)
    doc.text(err.titulo, margin + 25, y - 5)

    // Divider
    doc.setDrawColor(...BLUE)
    doc.setLineWidth(0.5)
    doc.line(margin, y + 5, margin + contentW, y + 5)

    // Problem
    y = 65
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...RED)
    doc.text('EL PROBLEMA', margin, y)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...GRAY)
    const problemLines = doc.splitTextToSize(err.desc, contentW)
    doc.text(problemLines, margin, y + 10)

    // Solution
    y = y + 10 + problemLines.length * 7 + 15
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...GREEN)
    doc.text('LA SOLUCIÓN', margin, y)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...GRAY)
    const solutionLines = doc.splitTextToSize(err.solucion, contentW)
    doc.text(solutionLines, margin, y + 10)

    // Page number
    doc.setFontSize(8)
    doc.setTextColor(...DARK_GRAY)
    doc.text(`BS DigitalTech · Guía 5 Errores`, margin, 285)
    doc.text(`${i + 2} / 7`, w - margin, 285, { align: 'right' })
  })

  // === CHECKLIST PAGE ===
  doc.addPage()
  doc.setFillColor(...BLACK)
  doc.rect(0, 0, w, 297, 'F')

  doc.setFillColor(...BLUE)
  doc.rect(0, 0, w, 3, 'F')

  y = 40
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  doc.text('Checklist rápido', w / 2, y, { align: 'center' })

  doc.setFontSize(11)
  doc.setTextColor(...GRAY)
  doc.text('Marca cada punto para saber si tu web está lista.', w / 2, y + 12, { align: 'center' })

  y = 80
  checklist.forEach((item, i) => {
    // Checkbox
    doc.setDrawColor(...BLUE)
    doc.setLineWidth(0.6)
    doc.roundedRect(margin, y - 5, 6, 6, 1, 1, 'S')

    // Text
    doc.setFontSize(13)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(...WHITE)
    doc.text(item, margin + 12, y)

    y += 22
  })

  // CTA
  y += 10
  doc.setFillColor(...BLUE)
  doc.roundedRect(w / 2 - 45, y, 90, 14, 3, 3, 'F')
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(...WHITE)
  doc.text('Cotiza tu web gratis', w / 2, y + 9, { align: 'center' })

  // Footer
  doc.setFontSize(8)
  doc.setTextColor(...DARK_GRAY)
  doc.text('BS DigitalTech · Soluciones Web Profesionales · Chile', w / 2, 285, { align: 'center' })

  return doc
}
