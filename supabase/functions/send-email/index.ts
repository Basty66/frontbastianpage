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

    const { nombre, email, telefono, tipo_web, extras, total_estimado, mensaje, empresa } = record

    const extraLabels: Record<string, string> = {
      admin: 'Panel Administrativo',
      pagos: 'Pasarela de Pago',
      seo: 'SEO Profesional',
      idioma: 'Multi-idioma',
      soporte: 'Soporte Mensual',
      mantenimiento: 'Mantenimiento Anual',
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

    const siteUrl = 'https://frontbastianpage.vercel.app'

    // ===== EMAIL 1: Notificacion al dueño =====
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#09090B;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#111113;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)">
      <tr>
        <td style="background:linear-gradient(135deg,#09090B 0%,#1a1a2e 100%);padding:36px 40px;text-align:center;border-bottom:2px solid #2563EB">
          <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;color:#2563EB">BS DigitalTech</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#A1A1AA">Soluciones Web Profesionales</p>
        </td>
      </tr>
      <tr><td style="padding:36px 40px 12px">
        <h2 style="margin:0 0 6px;font-size:22px;color:#FAFAFA;font-weight:700">Nueva cotizacion recibida</h2>
        <p style="margin:0;font-size:14px;color:#A1A1AA">${nombre} ha solicitado un presupuesto${empresa ? ` para <strong style="color:#FAFAFA">${empresa}</strong>` : ''}</p>
      </td></tr>
      <tr><td style="padding:12px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px">
          <tr><td style="font-size:11px;font-weight:700;color:#2563EB;letter-spacing:1px;padding-bottom:10px;text-transform:uppercase">Datos del Cliente</td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Nombre:</span> <strong style="color:#FAFAFA">${nombre}</strong></td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Email:</span> ${email}</td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Telefono:</span> ${telefono}</td></tr>
          ${mensaje ? `<tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Mensaje:</span> ${mensaje}</td></tr>` : ''}
        </table>
      </td></tr>
      <tr><td style="padding:16px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.15);border-radius:12px;padding:20px">
          <tr><td style="font-size:11px;font-weight:700;color:#2563EB;letter-spacing:1px;padding-bottom:10px;text-transform:uppercase">Resumen del Presupuesto</td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Tipo:</span> <strong style="color:#FAFAFA">${tipoLabel}</strong></td></tr>
          ${extrasArr.length ? `<tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Extras:</span> ${extrasArr.join(', ')}</td></tr>` : ''}
          <tr><td style="padding-top:10px;font-size:20px;font-weight:700;color:#2563EB">Total: ${totalFormatted}</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;text-align:center">
        <p style="margin:0;font-size:13px;color:#A1A1AA">Se adjunta la propuesta completa con alcance, tiempos, condiciones de pago y firmas.</p>
      </td></tr>
      <tr>
        <td style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.06);padding:20px 40px;text-align:center">
          <p style="margin:0;font-size:12px;color:#2563EB;font-weight:600">BS DigitalTech</p>
          <p style="margin:4px 0 0;font-size:11px;color:#71717A">Notificacion automatica</p>
        </td>
      </tr>
    </table>
  </td></tr></table>
</body>
</html>`

    const ownerPayload: Record<string, unknown> = {
      from: 'BS DigitalTech <onboarding@resend.dev>',
      to: ['cristianbastian.dev@gmail.com'],
      subject: `Nueva cotizacion — ${nombre} — ${tipoLabel}`,
      html: ownerHtml,
    }

    if (pdfBase64) {
      ownerPayload.attachments = [{
        filename: pdfName || 'Propuesta_BSDigitalTech.pdf',
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
      console.error('Resend owner email error:', res.status, errorText)
    } else {
      console.log('Resend owner email success:', await res.json())
    }

    // ===== EMAIL 2: Confirmacion al cliente =====
    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#09090B;font-family:system-ui,-apple-system,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#111113;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)">
      <tr>
        <td style="background:linear-gradient(135deg,#09090B 0%,#1a1a2e 100%);padding:36px 40px;text-align:center;border-bottom:2px solid #2563EB">
          <h1 style="margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;color:#2563EB">BS DigitalTech</h1>
          <p style="margin:6px 0 0;font-size:13px;color:#A1A1AA">Soluciones Web Profesionales</p>
        </td>
      </tr>
      <tr><td style="padding:36px 40px 12px">
        <h2 style="margin:0 0 6px;font-size:22px;color:#FAFAFA;font-weight:700">Hola ${nombre.split(' ')[0]},</h2>
        <p style="margin:0;font-size:14px;color:#A1A1AA;line-height:1.6">Hemos recibido tu solicitud de cotizacion. Adjunto encontraras la propuesta detallada con todos los alcances, tiempos y condiciones.</p>
      </td></tr>
      <tr><td style="padding:16px 40px">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:rgba(37,99,235,0.06);border:1px solid rgba(37,99,235,0.15);border-radius:12px;padding:20px">
          <tr><td style="font-size:11px;font-weight:700;color:#2563EB;letter-spacing:1px;padding-bottom:10px;text-transform:uppercase">Resumen</td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Tipo de proyecto:</span> <strong style="color:#FAFAFA">${tipoLabel}</strong></td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Inversion total:</span> <strong style="color:#2563EB;font-size:16px">${totalFormatted}</strong></td></tr>
          <tr><td style="font-size:13px;color:#D4D4D8;padding:3px 0"><span style="color:#A1A1AA">Forma de pago:</span> 50% anticipo / 50% contra entrega</td></tr>
        </table>
      </td></tr>
      <tr><td style="padding:20px 40px">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="font-size:13px;color:#A1A1AA;line-height:1.6;padding:0 0 8px">Proximos pasos:</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#D4D4D8;padding:4px 0">1. Revisa la propuesta adjunta</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#D4D4D8;padding:4px 0">2. Si tienes dudas, responde a este email</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#D4D4D8;padding:4px 0">3. Confirmas y coordinamos el inicio</td>
          </tr>
        </table>
      </td></tr>
      <tr><td style="padding:24px 40px 32px;text-align:center">
        <a href="${siteUrl}" style="display:inline-block;background:#2563EB;color:#ffffff;font-size:14px;font-weight:600;padding:12px 32px;border-radius:10px;text-decoration:none">Ver nuestra web</a>
      </td></tr>
      <tr>
        <td style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.06);padding:20px 40px;text-align:center">
          <p style="margin:0;font-size:12px;color:#2563EB;font-weight:600">BS DigitalTech</p>
          <p style="margin:4px 0 0;font-size:11px;color:#71717A">Soluciones Web Profesionales · Chile</p>
        </td>
      </tr>
    </table>
  </td></tr></table>
</body>
</html>`

    if (email) {
      const clientPayload: Record<string, unknown> = {
        from: 'BS DigitalTech <onboarding@resend.dev>',
        to: [email],
        subject: `Tu cotizacion BS DigitalTech — ${tipoLabel}`,
        html: clientHtml,
      }

      if (pdfBase64) {
        clientPayload.attachments = [{
          filename: pdfName || 'Propuesta_BSDigitalTech.pdf',
          content: pdfBase64,
        }]
      }

      const clientRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientPayload),
      })

      if (!clientRes.ok) {
        console.error('Resend client email error:', clientRes.status, await clientRes.text())
      } else {
        console.log('Resend client email success:', await clientRes.json())
      }
    }

    return new Response('ok', { status: 200, headers: corsHeaders })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(err.message, { status: 500, headers: corsHeaders })
  }
})
