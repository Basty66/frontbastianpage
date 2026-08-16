# Script para actualizar precios de BS DigitalTech
# Ejecutar: .\apply-changes.ps1

Write-Host "Actualizando precios de BS DigitalTech..." -ForegroundColor Cyan

# Backup de archivos originales
Copy-Item "src\components\Cotizador.jsx" "src\components\Cotizador.jsx.bak" -Force
Copy-Item "src\components\Hero.jsx" "src\components\Hero.jsx.bak" -Force

Write-Host "Backups creados correctamente" -ForegroundColor Green
Write-Host ""
Write-Host "Ahora abre tu editor de codigo y cambia:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. src/components/Cotizador.jsx - Lineas 24-27 (tiposProyecto)" -ForegroundColor White
Write-Host "2. src/components/Cotizador.jsx - Lineas 41-45 (extrasPerType)" -ForegroundColor White
Write-Host "3. src/components/Cotizador.jsx - Lineas 47-54 (adicionales)" -ForegroundColor White
Write-Host "4. src/components/Cotizador.jsx - Lineas 78-83 (planes)" -ForegroundColor White
Write-Host "5. src/components/Hero.jsx - Lineas 182-186 (counters)" -ForegroundColor White
Write-Host ""
Write-Host "Despues ejecuta:" -ForegroundColor Yellow
Write-Host 'git add .; git commit -m "feat: actualiza precios y servicios"; git push origin main' -ForegroundColor Green
