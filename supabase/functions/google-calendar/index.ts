import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID')!
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET')!

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { action, ...params } = await req.json()

    // For public actions (get-slots, create-event), use the first connected token
    // For admin actions (connect, check-status), require auth
    const ADMIN_ACTIONS = ['connect', 'check-status']

    let userId: string | null = null
    let accessToken: string | null = null

    if (ADMIN_ACTIONS.includes(action)) {
      const authHeader = req.headers.get('Authorization')
      if (!authHeader) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      const token = authHeader.replace('Bearer ', '')
      const { data: { user }, error: authError } = await supabase.auth.getUser(token)
      if (authError || !user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      userId = user.id
    }

    // Get stored tokens (for public actions, get the first connected token)
    const { data: tokens, error: tokenError } = await supabase
      .schema('app_private')
      .from('user_google_tokens')
      .select('*')
      .eq('user_id', userId || '*')
      .limit(1)
      .single()

    // For public actions, if no specific user, get any connected token
    let tokenRow = tokens
    if (!tokenRow && !ADMIN_ACTIONS.includes(action)) {
      const { data: anyToken } = await supabase
        .schema('app_private')
        .from('user_google_tokens')
        .select('*')
        .limit(1)
        .single()
      tokenRow = anyToken
    }

    if (tokenRow) {
      // Refresh token if expired
      accessToken = tokenRow.access_token
      if (new Date(tokenRow.expires_at) < new Date(Date.now() + 5 * 60 * 1000)) {
        const refreshRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: tokenRow.refresh_token,
            client_id: googleClientId,
            client_secret: googleClientSecret,
          }),
        })

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json()
          accessToken = refreshData.access_token

          await supabase
            .schema('app_private')
            .from('user_google_tokens')
            .update({
              access_token: accessToken,
              expires_at: new Date(Date.now() + refreshData.expires_in * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', tokenRow.user_id)
        }
      }
    }

    // ===== CHECK STATUS =====
    if (action === 'check-status') {
      const connected = !!tokenRow
      return new Response(JSON.stringify({ connected }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // ===== GET SLOTS (public) =====
    if (action === 'get-slots') {
      if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Google Calendar not connected', slots: [] }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { dateFrom, dateTo } = params

      const freeBusyRes = await fetch(
        `https://www.googleapis.com/calendar/v3/freeBusy`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timeMin: dateFrom,
            timeMax: dateTo,
            timeZone: 'America/Santiago',
            items: [{ id: 'primary' }],
          }),
        }
      )

      const freeBusyData = await freeBusyRes.json()
      const busySlots = freeBusyData.calendars?.primary?.busy || []

      const slots = []
      const start = new Date(dateFrom)
      const end = new Date(dateTo)

      for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const day = d.getDay()
        if (day === 0 || day === 6) continue

        for (let hour = 9; hour < 18; hour++) {
          for (let min = 0; min < 60; min += 30) {
            const slotStart = new Date(d)
            slotStart.setHours(hour, min, 0, 0)
            const slotEnd = new Date(slotStart)
            slotEnd.setMinutes(slotEnd.getMinutes() + 30)

            const isBusy = busySlots.some((busy: any) => {
              const busyStart = new Date(busy.start)
              const busyEnd = new Date(busy.end)
              return slotStart < busyEnd && slotEnd > busyStart
            })

            if (!isBusy && slotStart > new Date()) {
              slots.push({
                start: slotStart.toISOString(),
                end: slotEnd.toISOString(),
              })
            }
          }
        }
      }

      return new Response(JSON.stringify({ slots }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // ===== CREATE EVENT (public) =====
    if (action === 'create-event') {
      if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Google Calendar not connected' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { summary, description, startTime, endTime, attendeeEmail } = params

      const eventRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            summary,
            description,
            start: { dateTime: startTime, timeZone: 'America/Santiago' },
            end: { dateTime: endTime, timeZone: 'America/Santiago' },
            conferenceData: {
              createRequest: { requestId: `bsdt-${Date.now()}` },
            },
            attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
          }),
        }
      )

      const event = await eventRes.json()

      return new Response(JSON.stringify({ event }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Function error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
