import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const OWNER_ID = 'owner-bsdigitaltech'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID')!
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const url = new URL(req.url)
    const code = url.searchParams.get('code')

    if (!code) {
      const redirectUri = `${supabaseUrl}/functions/v1/google-calendar-auth`
      const scopes = [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ].join(' ')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
        `client_id=${googleClientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scopes)}&` +
        `access_type=offline&` +
        `prompt=consent`

      return new Response(JSON.stringify({ url: authUrl }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: `${supabaseUrl}/functions/v1/google-calendar-auth`,
        grant_type: 'authorization_code',
      }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error) {
      return new Response(JSON.stringify({ error: tokenData.error }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Store tokens with fixed owner ID (no Supabase Auth needed)
    const { error: upsertError } = await supabase
      .schema('app_private')
      .from('user_google_tokens')
      .upsert({
        user_id: OWNER_ID,
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
        scope: tokenData.scope,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })

    if (upsertError) {
      console.error('Upsert error:', upsertError)
    }

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head><title>BS DigitalTech — Calendar Conectado</title></head>
      <body style="margin:0;padding:0;background:#09090B;font-family:system-ui,-apple-system,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh">
        <div style="text-align:center;padding:40px">
          <div style="width:64px;height:64px;background:rgba(16,185,129,0.15);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h1 style="color:#FAFAFA;font-size:24px;font-weight:700;margin:0 0 8px">Google Calendar conectado</h1>
          <p style="color:#A1A1AA;font-size:14px;margin:0 0 24px">Los clientes ahora pueden agendar reuniones directo en tu calendar.</p>
          <p style="color:#52525B;font-size:12px">Puedes cerrar esta ventana.</p>
          <script>setTimeout(() => window.close(), 3000)<\/script>
        </div>
      </body>
      </html>
    `, {
      headers: { ...corsHeaders, 'Content-Type': 'text/html' },
    })
  } catch (err) {
    console.error('Auth error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
