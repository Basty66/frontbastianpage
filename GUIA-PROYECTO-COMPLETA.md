# BS DigitalTech - Guía Completa del Proyecto

## Información del Proyecto

| Dato | Valor |
|------|-------|
| **Nombre** | BS DigitalTech |
| **URL** | https://bsdigitaltech.vercel.app |
| **Repo** | https://github.com/Basty66/frontbastianpage |
| **Stack** | React 19 + Vite 8 + Tailwind CSS + Supabase |
| **Moneda** | CLP (Pesos Chilenos) |

---

## Cambios Realizados (15/08/2026)

### ✅ Precios Actualizados

| Plan | Antes | Ahora | Incluye |
|------|-------|-------|---------|
| **Básico** | $150.000 | $150.000 | Landing Page, Hosting $0, SEO base, Formulario, WhatsApp |
| **Estándar** | $380.000 | **$350.000** | Landing + Cotizador + Agenda + SEO + Hosting |
| **Premium** | $550.000 | **$650.000** | Web Corporativa + Panel Admin + Mercado Pago + SEO + Soporte |
| **A Medida** | Variable | Variable | Selección libre |

### ✅ Servicios Individuales Actualizados

| Servicio | Antes | Ahora |
|----------|-------|-------|
| Landing Page | $150.000 | $150.000 |
| Web Corporativa | $300.000 | **$450.000** |
| E-commerce | $550.000 | **$750.000** |

### ✅ Nuevos Extras Agregados

| Extra | Precio | Descripción |
|-------|--------|-------------|
| Agenda Online | $80.000 | Reservas automáticas 24/7 |
| Cotizador Automático | $120.000 | Calculadora de precios online |
| WhatsApp Business | $100.000 | Respuestas automáticas + catálogo |
| CRM Básico | $150.000 | Seguimiento de clientes |
| Mercado Pago | $60.000 | Link de pago integrado |

### ✅ Extras Existentes (sin cambio)

| Extra | Precio |
|-------|--------|
| Panel Administrativo | $120.000 |
| SEO Profesional | $60.000 |
| Multi-idioma | $90.000 |
| Soporte Mensual | $50.000 |
| Mantenimiento Anual | $180.000 |

### ✅ Contadores Hero Actualizados

| Métrica | Antes | Ahora |
|---------|-------|-------|
| Proyectos | 20+ | **25+** |
| Clientes | 15+ | **20+** |
| Disponibilidad | 100% | **Satisfacción 100%** |

---

## Estructura del Proyecto

```
frontbastianpage/
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Admin.jsx
│   │   ├── CookieConsent.jsx
│   │   ├── Cookies.jsx
│   │   ├── Cotizador.jsx      ← CAMBIOS AQUÍ
│   │   ├── CtaBanner.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ExitPopup.jsx
│   │   ├── Hero.jsx            ← CAMBIOS AQUÍ
│   │   ├── PDFPreview.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Privacy.jsx
│   │   ├── Proceso.jsx
│   │   ├── Reveal.jsx
│   │   ├── Skeletons.jsx
│   │   ├── Terms.jsx
│   │   └── Testimonios.jsx
│   ├── data/
│   │   └── portfolio.js
│   ├── hooks/
│   ├── lib/
│   │   ├── constants.js
│   │   ├── cotizacionPdf.js
│   │   └── supabaseClient.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── supabase/
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## Archivos Clave

### `src/components/Cotizador.jsx`
- Sistema de cotización completo
- 4 planes: Básico, Estándar, Premium, A Medida
- 10 extras disponibles
- Generación de PDF automática
- Firma digital del cliente
- Integración con Supabase

### `src/components/Hero.jsx`
- Sección principal con animaciones
- Contadores de métricas
- Botones de CTA
- Diseño responsive

### `src/lib/constants.js`
- Número de WhatsApp
- URL de Instagram
- URL del sitio

---

## Comandos Útiles

### Desarrollo Local
```bash
cd "C:\Users\crist\Desktop\frontbastianpage-master"
npm install
npm run dev
```

### Build
```bash
npm run build
```

### Deploy (automático con Vercel)
```bash
git add .
git commit -m "feat: descripción del cambio"
git push origin main
```

---

## Integraciones

### Supabase
- **URL**: Configurada en `.env`
- **Tabla**: `cotizaciones`
- **Edge Function**: `send-email`

### Vercel
- **Deploy automático** al hacer push a `main`
- **Hosting**: Serverless (gratis)

### WhatsApp
- **Número**: +56 9 2812 2947
- **Link**: `https://wa.me/56928122947`

### Instagram
- **Usuario**: @bs.digitaltech
- **Link**: `https://www.instagram.com/bs.digitaltech`

---

## SEO y Metadatos

### Título
```
Desarrollo Web para PYMEs en Chile | Hosting $0 · BS DigitalTech
```

### Descripción
```
Desarrollo web profesional para PYMEs chilenas. Landing pages, e-commerce y webs corporativas con hosting serverless $0. Sin costo mensual. Cotiza hoy.
```

### Schema.org (LocalBusiness)
```json
{
  "@type": "LocalBusiness",
  "name": "BS DigitalTech",
  "telephone": "+56928122947",
  "email": "contacto@bsdigitaltech.cl",
  "priceRange": "$150.000 - $750.000 CLP",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santiago",
    "addressRegion": "Región Metropolitana",
    "addressCountry": "CL"
  }
}
```

---

## Funcionalidades Implementadas

### ✅ Completadas
- Landing Page responsive
- Cotizador automático con 4 planes
- Generación de PDF profesional
- Firma digital del cliente
- Integración Supabase (DB + Email)
- Panel de administración
- Botón WhatsApp flotante
- Botón Instagram
- SEO optimizado
- Cookies consent
- Error boundaries
- Lazy loading
- Multi-moneda (CLP, USD, UF)

### 🔧 Para Mejorar
- Agregar más testimonios con fotos
- Implementar blog para SEO
- Agregar analytics (Google Analytics)
- Implementar chat en vivo
- Agregar más proyectos al portfolio

---

## Estilo y Diseño

### Colores
- **Primario**: Blue-600 (#2563EB)
- **Fondo**: #09090B
- **Texto**: White, #A1A1AA
- **Acentos**: Blue-400, Blue-500

### Fuentes
- **Headings**: Outfit (500-800)
- **Body**: Inter (300-600)
- **Code**: JetBrains Mono (400-700)

### Iconos
- Lucide React

---

## Contacto

| Canal | Link |
|-------|------|
| **WhatsApp** | +56 9 2812 2947 |
| **Instagram** | @bs.digitaltech |
| **Email** | contacto@bsdigitaltech.cl |
| **Web** | https://bsdigitaltech.vercel.app |

---

## Próximos Pasos

1. **Instagram**: Implementar plan de contenido (2 semanas listas)
2. **Testimonios**: Agregar fotos y resultados reales
3. **Blog**: Crear artículos para SEO
4. **Analytics**: Integrar Google Analytics
5. **Chat**: Agregar chat en vivo

---

*Última actualización: 15/08/2026*
