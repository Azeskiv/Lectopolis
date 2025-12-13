# Test de la API de Groq
$apiKey = "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"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Probando Groq API..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$headers = @{
    "Authorization" = "Bearer $apiKey"
    "Content-Type" = "application/json"
}

# Probar con el modelo grande
$body1 = @{
    model = "llama-3.3-70b-versatile"
    messages = @(
        @{
            role = "user"
            content = "Di solo 'hola'"
        }
    )
    temperature = 0.7
} | ConvertTo-Json -Depth 10

Write-Host "`nProbando modelo: llama-3.3-70b-versatile" -ForegroundColor Yellow

try {
    $response1 = Invoke-RestMethod -Uri "https://api.groq.com/openai/v1/chat/completions" -Method Post -Headers $headers -Body $body1
    Write-Host "✅ Modelo llama-3.3-70b-versatile FUNCIONA" -ForegroundColor Green
    Write-Host "Respuesta: $($response1.choices[0].message.content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Error con llama-3.3-70b-versatile:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    
    # Probar con el modelo pequeño original
    Write-Host "`nProbando modelo alternativo: llama-3.2-3b-preview" -ForegroundColor Yellow
    
    $body2 = @{
        model = "llama-3.2-3b-preview"
        messages = @(
            @{
                role = "user"
                content = "Di solo 'hola'"
            }
        )
        temperature = 0.7
    } | ConvertTo-Json -Depth 10
    
    try {
        $response2 = Invoke-RestMethod -Uri "https://api.groq.com/openai/v1/chat/completions" -Method Post -Headers $headers -Body $body2
        Write-Host "✅ Modelo llama-3.2-3b-preview FUNCIONA" -ForegroundColor Green
        Write-Host "Respuesta: $($response2.choices[0].message.content)" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error con llama-3.2-3b-preview:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
