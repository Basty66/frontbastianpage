import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, record, pdfBase64, pdfName } = await req.json()

    if (type !== 'INSERT') {
      return new Response('ok', { status: 200, headers: corsHeaders })
    }

    const { nombre, email, telefono, tipo_web, extras, total_estimado, mensaje } = record

    const extraLabels: Record<string, string> = {
      admin: 'Panel Administrativo',
      pagos: 'Pasarela de Pago',
      seo: 'SEO Profesional',
      idioma: 'Multi-idioma',
    }

    const extrasArr: string[] = Array.isArray(extras)
      ? extras.map((e: string) => extraLabels[e] || e)
      : []

    const tipoLabel =
      tipo_web === 'landing' ? 'Landing Page'
      : tipo_web === 'corporativa' ? 'Web Corporativa'
      : tipo_web === 'ecommerce' ? 'E-commerce'
      : tipo_web

    const totalFormatted = `$${(total_estimado || 0).toLocaleString('es-CL')} CLP`

    // ===== EMAIL 1: Notificación al dueño =====
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08)">
      <tr>
        <td style="background:linear-gradient(135deg,#0b1329,#1c2541);padding:32px 40px;text-align:center">
          <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;color:#00b4d8">Bastian.dev</h1>
          <p style="margin:4px 0 0;font-size:13px;color:#94a3b8">Soluciones Web · Serverless</p>
        </td>
      </tr>
      <tr><td style="padding:32px 40px 8px">
        <h2 style="margin:0 0 4px;font-size:20px;color:#0f172a">Nueva cotización recibida 🚀</h2>
        <p style="margin:0;font-size:14px;color:#64748b">${nombre} ha solicitado un presupuesto</p>
      </td></tr>
      <tr><td style="padding:8px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;padding:16px 20px">
          <tr><td style="font-size:12px;font-weight:600;color:#0f172a;padding-bottom:8px">DATOS DEL CLIENTE</td></tr>
          <tr><td style="font-size:13px;color:#334155;padding:2px 0"><strong>Nombre:</strong> ${nombre}</td></tr>
          <tr><td style="font-size:13px;color:#334155;padding:2px 0"><strong>Email:</strong> ${email}</td></tr>
          <tr><td style="font-size:13px;color:#334155;padding:2px 0"><strong>Teléfono:</strong> ${telefono}</td></tr>
          ${mensaje ? `<tr><td style="font-size:13px;color:#334155;padding:2px 0"><strong>Mensaje:</strong> ${mensaje}</td></tr>` : ''}
        </table>
      </td></tr>
      <tr><td style="padding:16px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;padding:16px 20px">
          <tr><td style="font-size:12px;font-weight:600;color:#0f172a;padding-bottom:8px">RESUMEN DEL PRESUPUESTO</td></tr>
          <tr><td style="font-size:13px;color:#334155;padding:2px 0"><strong>Tipo:</strong> ${tipoLabel}</td></tr>
          ${extrasArr.length ? `<tr><td style="font-size:13px;color:#334155;padding:2px 0"><strong>Extras:</strong> ${extrasArr.join(', ')}</td></tr>` : ''}
          <tr><td style="padding-top:8px;font-size:18px;font-weight:700;color:#00b4d8">Total: ${totalFormatted}</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;text-align:center">
        <p style="margin:0 0 12px;font-size:13px;color:#64748b">Se adjunta la propuesta completa con alcance, tiempos, condiciones de pago y firmas.</p>
      </td></tr>
      <tr>
        <td style="background:#f1f5f9;padding:20px 40px;text-align:center">
          <p style="margin:0;font-size:12px;color:#94a3b8">Bastian.dev — Analista Programador</p>
          <p style="margin:4px 0 0;font-size:11px;color:#cbd5e1">Notificación automática · Cristian Bastian Cerda</p>
        </td>
      </tr>
    </table>
  </td></tr></table>
</body>
</html>`

    const ownerPayload: Record<string, unknown> = {
      from: 'Cotizaciones <onboarding@resend.dev>',
      to: ['cristianbastian.dev@gmail.com'],
      subject: `Nueva cotización — ${nombre} — ${tipoLabel}`,
      html: ownerHtml,
    }

    if (pdfBase64) {
      ownerPayload.attachments = [{
        filename: pdfName || 'Propuesta_BastianDev.pdf',
        content: pdfBase64,
      }]
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ownerPayload),
    })

    if (!res.ok) {
      const errorText = await res.text()
      console.error('Resend error:', res.status, errorText)
      return new Response(`Resend error (${res.status}): ${errorText}`, { status: 502, headers: corsHeaders })
    }

    const resendData = await res.json()
    console.log('Resend success:', JSON.stringify(resendData))
    return new Response('ok', { status: 200, headers: corsHeaders })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(err.message, { status: 500, headers: corsHeaders })
  }
})
