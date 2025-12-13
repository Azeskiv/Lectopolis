# Verificar límites y estado de API key de Groq
$apiKey = "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"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verificando API Key de Groq" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

# Probar con una petición simple
$body = @{
    model = "llama-3.3-70b-versatile"
    messages = @(
        @{
            role = "user"
            content = "Test"
        }
    )
    max_tokens = 10
} | ConvertTo-Json -Depth 10

try {
    Write-Host "`n🔍 Probando API key..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri "https://api.groq.com/openai/v1/chat/completions" -Method Post -Headers $headers -Body $body -UseBasicParsing
    
    Write-Host "✅ API Key VÁLIDA y FUNCIONANDO" -ForegroundColor Green
    
    # Mostrar headers de rate limit si existen
    Write-Host "`n📊 Información de límites:" -ForegroundColor Cyan
    
    if ($response.Headers['x-ratelimit-limit-requests']) {
        Write-Host "   Límite de requests: $($response.Headers['x-ratelimit-limit-requests'])" -ForegroundColor White
    }
    if ($response.Headers['x-ratelimit-remaining-requests']) {
        Write-Host "   Requests restantes: $($response.Headers['x-ratelimit-remaining-requests'])" -ForegroundColor White
    }
    if ($response.Headers['x-ratelimit-limit-tokens']) {
        Write-Host "   Límite de tokens: $($response.Headers['x-ratelimit-limit-tokens'])" -ForegroundColor White
    }
    if ($response.Headers['x-ratelimit-remaining-tokens']) {
        Write-Host "   Tokens restantes: $($response.Headers['x-ratelimit-remaining-tokens'])" -ForegroundColor White
    }
    if ($response.Headers['x-ratelimit-reset-requests']) {
        Write-Host "   Reset de requests: $($response.Headers['x-ratelimit-reset-requests'])" -ForegroundColor White
    }
    if ($response.Headers['x-ratelimit-reset-tokens']) {
        Write-Host "   Reset de tokens: $($response.Headers['x-ratelimit-reset-tokens'])" -ForegroundColor White
    }
    
    Write-Host "`n💡 Nota: Si no aparecen límites arriba, Groq no los expone en headers" -ForegroundColor Yellow
    
} catch {
    Write-Host "❌ ERROR con la API key:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "`nCódigo de error: $statusCode" -ForegroundColor Red
        
        switch ($statusCode) {
            401 { Write-Host "   → API key inválida o revocada" -ForegroundColor Yellow }
            429 { Write-Host "   → Límite de rate excedido (demasiadas peticiones)" -ForegroundColor Yellow }
            403 { Write-Host "   → Acceso prohibido (cuenta suspendida?)" -ForegroundColor Yellow }
            default { Write-Host "   → Error desconocido" -ForegroundColor Yellow }
        }
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "🔗 Dashboard: https://console.groq.com/keys" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
