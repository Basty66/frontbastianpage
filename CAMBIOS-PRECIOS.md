# CAMBIOS PARA BS DIGITALTECH

## Cambios en src/components/Cotizador.jsx

### Cambio 1: Lineas 24-27 (tiposProyecto)
Reemplazar TODO el bloque `const tiposProyecto = [...];` con:

```javascript
const tiposProyecto = [
  { id: 'landing', label: 'Landing Page', desc: 'Página única de alto impacto', precio: 150000, color: 'purple' },
  { id: 'corporativa', label: 'Web Corporativa', desc: 'Sitio profesional multi-sección', precio: 450000, color: 'blue' },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Tienda online con carrito y pagos', precio: 750000, color: 'amber' },
];
```

### Cambio 2: Lineas 41-45 (extrasPerType)
Reemplazar TODO el bloque `const extrasPerType = {...};` con:

```javascript
const extrasPerType = {
  landing: ['agenda', 'cotizador', 'pagos', 'seo', 'whatsapp', 'soporte', 'mantenimiento'],
  corporativa: ['admin', 'agenda', 'cotizador', 'pagos', 'seo', 'whatsapp', 'crm', 'soporte', 'mantenimiento'],
  ecommerce: ['admin', 'pagos', 'seo', 'idioma', 'whatsapp', 'crm', 'soporte', 'mantenimiento'],
};
```

### Cambio 3: Lineas 47-54 (adicionales)
Reemplazar TODO el bloque `const adicionales = [...];` con:

```javascript
const adicionales = [
  { id: 'admin', icon: Settings, label: 'Panel Administrativo', desc: 'Gestor de stock y precios', precio: 120000, color: 'indigo' },
  { id: 'pagos', icon: CreditCard, label: 'Mercado Pago', desc: 'Link de pago integrado', precio: 60000, color: 'emerald' },
  { id: 'agenda', icon: Settings, label: 'Agenda Online', desc: 'Reservas automáticas 24/7', precio: 80000, color: 'blue' },
  { id: 'cotizador', icon: Settings, label: 'Cotizador Automático', desc: 'Calculadora de precios online', precio: 120000, color: 'purple' },
  { id: 'seo', icon: Search, label: 'SEO Profesional', desc: 'Optimización para Google', precio: 60000, color: 'sky' },
  { id: 'whatsapp', icon: Settings, label: 'WhatsApp Business', desc: 'Respuestas automáticas + catálogo', precio: 100000, color: 'emerald' },
  { id: 'crm', icon: Settings, label: 'CRM Básico', desc: 'Seguimiento de clientes', precio: 150000, color: 'indigo' },
  { id: 'idioma', icon: Globe, label: 'Multi-idioma', desc: 'Traducción a varios idiomas', precio: 90000, color: 'violet' },
  { id: 'soporte', icon: Settings, label: 'Soporte Mensual', desc: '10 hrs/mes de mantención y soporte', precio: 50000, color: 'emerald' },
  { id: 'mantenimiento', icon: Settings, label: 'Mantenimiento Anual', desc: 'Actualizaciones, backups y monitoreo 12 meses', precio: 180000, color: 'sky' },
];
```

### Cambio 4: Lineas 78-83 (planes)
Reemplazar TODO el bloque `const planes = [...];` con:

```javascript
const planes = [
  { id: 'basico', label: 'Básico', desc: 'Landing Page profesional', precio: 150000, total: 150000, tipoId: 'landing', extras: [], incluye: ['Landing Page', 'Hosting $0', 'SEO base', 'Formulario Contacto', 'WhatsApp'], color: 'emerald', popular: false, dias: 30 },
  { id: 'estandar', label: 'Estándar', desc: 'Landing + Cotizador + Agenda', precio: 350000, total: 350000, tipoId: 'landing', extras: ['seo', 'soporte'], incluye: ['Landing Page Premium', 'Cotizador Automático', 'Agenda Online', 'SEO Profesional', 'Hosting $0', 'WhatsApp'], color: 'blue', popular: true, dias: 35 },
  { id: 'premium', label: 'Premium', desc: 'Web Corporativa completa', precio: 650000, total: 650000, tipoId: 'corporativa', extras: ['admin', 'pagos', 'seo', 'soporte'], incluye: ['Web Corporativa', 'Panel Admin', 'Mercado Pago', 'SEO Profesional', 'Hosting $0', 'Soporte 1 mes'], color: 'purple', popular: false, dias: 45 },
  { id: 'custom', label: 'A Medida', desc: 'Tú eliges cada componente', precio: null, total: 0, tipoId: null, extras: [], incluye: ['Selección libre de tipo y extras', 'Precio según elección'], color: 'cyan', popular: false, dias: null },
];
```

---

## Cambios en src/components/Hero.jsx

### Cambio 5: Lineas 182-186 (counters)
Reemplazar:

```javascript
<CounterBlock target={20} suffix="+" label="Proyectos" />
<div className="w-px h-6 sm:h-8 bg-blue-500/20" />
<CounterBlock target={15} suffix="+" label="Clientes" />
<div className="w-px h-6 sm:h-8 bg-blue-500/20" />
<CounterBlock target={100} suffix="%" label="Disponibilidad" />
```

Con:

```javascript
<CounterBlock target={25} suffix="+" label="Proyectos" />
<div className="w-px h-6 sm:h-8 bg-blue-500/20" />
<CounterBlock target={20} suffix="+" label="Clientes" />
<div className="w-px h-6 sm:h-8 bg-blue-500/20" />
<CounterBlock target={100} suffix="%" label="Satisfacción" />
```

---

## Despues de hacer los cambios:

```bash
git add .
git commit -m "feat: actualiza precios y agrega nuevos servicios (agenda, cotizador, WhatsApp Business, CRM)"
git push origin main
```

Vercel se despliega automaticamente.
