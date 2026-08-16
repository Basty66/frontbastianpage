"""
Script para actualizar precios de BS DigitalTech
Ejecutar: python apply_changes.py
"""

import re
import shutil
from pathlib import Path

# Rutas de archivos
COTIZADOR_PATH = Path("src/components/Cotizador.jsx")
HERO_PATH = Path("src/components/Hero.jsx")

def backup_file(file_path):
    """Crear backup del archivo"""
    backup_path = file_path.with_suffix(file_path.suffix + ".bak")
    shutil.copy2(file_path, backup_path)
    print(f"Backup creado: {backup_path}")

def update_tipos_proyecto(content):
    """Actualizar tiposProyecto"""
    old = '''const tiposProyecto = [
  { id: 'landing', label: 'Landing Page', desc: 'Página única de alto impacto', precio: 150000, color: 'purple' },
  { id: 'corporativa', label: 'Web Corporativa', desc: 'Sitio profesional multi-sección', precio: 300000, color: 'blue' },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Tienda online con carrito y pagos', precio: 550000, color: 'amber' },
];'''
    
    new = '''const tiposProyecto = [
  { id: 'landing', label: 'Landing Page', desc: 'Página única de alto impacto', precio: 150000, color: 'purple' },
  { id: 'corporativa', label: 'Web Corporativa', desc: 'Sitio profesional multi-sección', precio: 450000, color: 'blue' },
  { id: 'ecommerce', label: 'E-commerce', desc: 'Tienda online con carrito y pagos', precio: 750000, color: 'amber' },
];'''
    
    return content.replace(old, new)

def update_extras_per_type(content):
    """Actualizar extrasPerType"""
    old = '''const extrasPerType = {
  landing: ['seo', 'soporte', 'mantenimiento'],
  corporativa: ['admin', 'seo', 'soporte', 'mantenimiento'],
  ecommerce: ['admin', 'pagos', 'seo', 'idioma', 'soporte', 'mantenimiento'],
};'''
    
    new = '''const extrasPerType = {
  landing: ['agenda', 'cotizador', 'pagos', 'seo', 'whatsapp', 'soporte', 'mantenimiento'],
  corporativa: ['admin', 'agenda', 'cotizador', 'pagos', 'seo', 'whatsapp', 'crm', 'soporte', 'mantenimiento'],
  ecommerce: ['admin', 'pagos', 'seo', 'idioma', 'whatsapp', 'crm', 'soporte', 'mantenimiento'],
};'''
    
    return content.replace(old, new)

def update_adicionales(content):
    """Actualizar adicionales"""
    old = '''const adicionales = [
  { id: 'admin', icon: Settings, label: 'Panel Administrativo', desc: 'Gestor de stock y precios', precio: 120000, color: 'indigo' },
  { id: 'pagos', icon: CreditCard, label: 'Pasarela de Pago', desc: 'Mercado Pago / Webpay', precio: 80000, color: 'emerald' },
  { id: 'seo', icon: Search, label: 'SEO Profesional', desc: 'Optimización para Google', precio: 60000, color: 'sky' },
  { id: 'idioma', icon: Globe, label: 'Multi-idioma', desc: 'Traducción a varios idiomas', precio: 90000, color: 'violet' },
  { id: 'soporte', icon: Settings, label: 'Soporte Mensual', desc: '10 hrs/mes de mantención y soporte', precio: 50000, color: 'emerald' },
  { id: 'mantenimiento', icon: Settings, label: 'Mantenimiento Anual', desc: 'Actualizaciones, backups y monitoreo 12 meses', precio: 180000, color: 'sky' },
];'''
    
    new = '''const adicionales = [
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
];'''
    
    return content.replace(old, new)

def update_planes(content):
    """Actualizar planes"""
    old = '''const planes = [
  { id: 'basico', label: 'Básico', desc: 'Landing Page profesional', precio: 150000, total: 150000, tipoId: 'landing', extras: [], incluye: ['Landing Page', 'Hosting $0', 'SEO base', 'Formulario Contacto', 'WhatsApp'], color: 'emerald', popular: false, dias: 30 },
  { id: 'estandar', label: 'Estándar', desc: 'Web Corporativa con panel', precio: 380000, total: 380000, tipoId: 'corporativa', extras: ['admin', 'seo'], incluye: ['Web Corporativa', 'Panel Admin', 'SEO Profesional', 'Hosting $0', 'Formulario Contacto'], color: 'blue', popular: true, dias: 45 },
  { id: 'premium', label: 'Premium', desc: 'E-commerce completo', precio: 550000, total: 550000, tipoId: 'ecommerce', extras: ['admin', 'pagos', 'seo', 'idioma'], incluye: ['E-commerce completo', 'Panel Admin', 'Pasarela de Pago', 'SEO Profesional', 'Multi-idioma', 'Hosting $0'], color: 'purple', popular: false, dias: 60 },
  { id: 'custom', label: 'A Medida', desc: 'Tú eliges cada componente', precio: null, total: 0, tipoId: null, extras: [], incluye: ['Selección libre de tipo y extras', 'Precio según elección'], color: 'cyan', popular: false, dias: null },
];'''
    
    new = '''const planes = [
  { id: 'basico', label: 'Básico', desc: 'Landing Page profesional', precio: 150000, total: 150000, tipoId: 'landing', extras: [], incluye: ['Landing Page', 'Hosting $0', 'SEO base', 'Formulario Contacto', 'WhatsApp'], color: 'emerald', popular: false, dias: 30 },
  { id: 'estandar', label: 'Estándar', desc: 'Landing + Cotizador + Agenda', precio: 350000, total: 350000, tipoId: 'landing', extras: ['seo', 'soporte'], incluye: ['Landing Page Premium', 'Cotizador Automático', 'Agenda Online', 'SEO Profesional', 'Hosting $0', 'WhatsApp'], color: 'blue', popular: true, dias: 35 },
  { id: 'premium', label: 'Premium', desc: 'Web Corporativa completa', precio: 650000, total: 650000, tipoId: 'corporativa', extras: ['admin', 'pagos', 'seo', 'soporte'], incluye: ['Web Corporativa', 'Panel Admin', 'Mercado Pago', 'SEO Profesional', 'Hosting $0', 'Soporte 1 mes'], color: 'purple', popular: false, dias: 45 },
  { id: 'custom', label: 'A Medida', desc: 'Tú eliges cada componente', precio: null, total: 0, tipoId: null, extras: [], incluye: ['Selección libre de tipo y extras', 'Precio según elección'], color: 'cyan', popular: false, dias: null },
];'''
    
    return content.replace(old, new)

def update_hero_counters(content):
    """Actualizar counters en Hero"""
    old = '''<CounterBlock target={20} suffix="+" label="Proyectos" />
          <div className="w-px h-6 sm:h-8 bg-blue-500/20" />
          <CounterBlock target={15} suffix="+" label="Clientes" />
          <div className="w-px h-6 sm:h-8 bg-blue-500/20" />
          <CounterBlock target={100} suffix="%" label="Disponibilidad" />'''
    
    new = '''<CounterBlock target={25} suffix="+" label="Proyectos" />
          <div className="w-px h-6 sm:h-8 bg-blue-500/20" />
          <CounterBlock target={20} suffix="+" label="Clientes" />
          <div className="w-px h-6 sm:h-8 bg-blue-500/20" />
          <CounterBlock target={100} suffix="%" label="Satisfacción" />'''
    
    return content.replace(old, new)

def main():
    print("=" * 50)
    print("ACTUALIZANDO PRECIOS DE BS DIGITALTECH")
    print("=" * 50)
    print()
    
    # Verificar que existen los archivos
    if not COTIZADOR_PATH.exists():
        print(f"ERROR: No se encontro {COTIZADOR_PATH}")
        return
    
    if not HERO_PATH.exists():
        print(f"ERROR: No se encontro {HERO_PATH}")
        return
    
    # Crear backups
    print("1. Creando backups...")
    backup_file(COTIZADOR_PATH)
    backup_file(HERO_PATH)
    print()
    
    # Actualizar Cotizador.jsx
    print("2. Actualizando Cotizador.jsx...")
    content = COTIZADOR_PATH.read_text(encoding='utf-8')
    
    content = update_tipos_proyecto(content)
    print("   - tiposProyecto actualizado")
    
    content = update_extras_per_type(content)
    print("   - extrasPerType actualizado")
    
    content = update_adicionales(content)
    print("   - adicionales actualizado")
    
    content = update_planes(content)
    print("   - planes actualizado")
    
    COTIZADOR_PATH.write_text(content, encoding='utf-8')
    print("   ✓ Cotizador.jsx guardado")
    print()
    
    # Actualizar Hero.jsx
    print("3. Actualizando Hero.jsx...")
    content = HERO_PATH.read_text(encoding='utf-8')
    
    content = update_hero_counters(content)
    print("   - counters actualizado")
    
    HERO_PATH.write_text(content, encoding='utf-8')
    print("   ✓ Hero.jsx guardado")
    print()
    
    print("=" * 50)
    print("TODO LISTO!")
    print("=" * 50)
    print()
    print("Ahora ejecuta:")
    print('  git add .')
    print('  git commit -m "feat: actualiza precios y agrega nuevos servicios"')
    print('  git push origin main')
    print()
    print("Vercel se desplegara automaticamente.")

if __name__ == "__main__":
    main()
