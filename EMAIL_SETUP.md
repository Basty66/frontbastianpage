--------------------------------------------------------------
  NOTIFICACIONES POR EMAIL — Guía de configuración
--------------------------------------------------------------

1. CREAR CUENTA EN RESEND (gratis)
   → https://resend.com
   → Regístrate con: cristianbastian.dev@gmail.com
   → Ve a API Keys → crea una key
   → La key empieza como: re_xxxxxxxxxxxx

2. AGREGAR SECRETO EN SUPABASE
   → https://supabase.com/dashboard/project/tjurqmgkapyfofyvllqj
   → Edge Functions → Secrets → Añadir:
     Name: RESEND_API_KEY
     Value: tu_key_de_resend

3. CREAR LA EDGE FUNCTION
   → Edge Functions → "Create a new function"
   → Nombre: send-email
   → Pega el contenido de:
     supabase/functions/send-email/index.ts
   → Deploy

4. CONFIGURAR WEBHOOK (disparador automático)
   → Database → Webhooks → Create Webhook
   → Name: notificar-cotizacion
   → Table: cotizaciones
   → Events: Insert
   → Type: HTTP Request
   → Edge Function: send-email
   → Create

5. PROBAR
   → Abre http://localhost:5174
   → Llena el cotizador y envía
   → Te llegará un correo a cristianbastian.dev@gmail.com

--------------------------------------------------------------
