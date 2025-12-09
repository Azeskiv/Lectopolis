using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private const string GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

        public RecommendationsController(AppDbContext context, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _context = context;
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        // GET: api/recommendations/{userId}
        [HttpGet("{userId}")]
        [Authorize]
        public async Task<IActionResult> GetRecommendations(int userId)
        {
            // Verificar que el usuario autenticado sea el mismo que solicita recomendaciones
            var requestingUserId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value!);
            if (requestingUserId != userId)
                return Forbid();

            // Obtener valoraciones del usuario con información del libro
            var userRatings = await _context.Ratings
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.Score)
                .Take(10) // Últimas 10 valoraciones más altas
                .ToListAsync();

            if (!userRatings.Any())
                return Ok(new { 
                    message = "No tienes suficientes valoraciones para generar recomendaciones. ¡Empieza a valorar libros!",
                    recommendations = new List<object>()
                });

            // Construir prompt para Groq
            var ratingsText = new StringBuilder();
            foreach (var rating in userRatings)
            {
                // Obtener info del libro desde Google Books
                var bookInfo = await GetBookInfo(rating.BookId);
                ratingsText.AppendLine($"- {bookInfo.Title} por {bookInfo.Author}: {rating.Score}/5 estrellas");
                if (!string.IsNullOrEmpty(rating.Comment))
                    ratingsText.AppendLine($"  Comentario: {rating.Comment}");
            }

            // Llamar a Groq para obtener recomendaciones
            var recommendations = await GetAIRecommendations(ratingsText.ToString());

            return Ok(new { recommendations });
        }

        private async Task<BookInfo> GetBookInfo(string bookId)
        {
            var client = _httpClientFactory.CreateClient();
            try
            {
                var response = await client.GetAsync($"https://www.googleapis.com/books/v1/volumes/{bookId}");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var data = JsonDocument.Parse(json);
                    var volumeInfo = data.RootElement.GetProperty("volumeInfo");
                    
                    return new BookInfo
                    {
                        Title = volumeInfo.TryGetProperty("title", out var title) ? title.GetString() ?? "Sin título" : "Sin título",
                        Author = volumeInfo.TryGetProperty("authors", out var authors) 
                            ? string.Join(", ", authors.EnumerateArray().Select(a => a.GetString()))
                            : "Autor desconocido"
                    };
                }
            }
            catch { }
            
            return new BookInfo { Title = "Libro desconocido", Author = "Autor desconocido" };
        }

        private async Task<List<RecommendationResult>> GetAIRecommendations(string userRatingsText)
        {
            var groqApiKey = _configuration["Groq:ApiKey"] ?? "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";
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {groqApiKey}");

            // Generar un seed único basado en la hora actual para variedad
            var randomSeed = DateTime.UtcNow.Ticks % 1000;

            var systemPrompt = @"Eres un experto bibliotecario y crítico literario. Tu tarea es recomendar 5 libros DIFERENTES basándote en el historial de lectura del usuario.

IMPORTANTE: Responde ÚNICAMENTE con un JSON válido con este formato exacto:
{
  ""recommendations"": [
    {
      ""titulo"": ""Nombre exacto del libro"",
      ""autor"": ""Nombre del autor"",
      ""razon"": ""Breve explicación de 1-2 líneas del por qué se recomienda""
    }
  ]
}

Reglas:
- Exactamente 5 libros DIFERENTES cada vez
- Libros reales que existen
- Varía entre géneros: ficción, no ficción, clásicos, contemporáneos
- NO repitas las mismas recomendaciones siempre
- Explora diferentes estilos literarios relacionados con sus gustos
- Explicaciones personalizadas basadas en sus valoraciones
- Solo JSON, sin texto adicional";

            var userPrompt = $@"Basándote en estas valoraciones del usuario:

{userRatingsText}

Recomienda 5 libros VARIADOS que le puedan gustar. Busca diversidad en géneros y épocas. Número aleatorio para variedad: {randomSeed}
Responde SOLO con el JSON.";

            var requestBody = new
            {
                model = "llama-3.2-3b-preview",
                messages = new[]
                {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = userPrompt }
                },
                temperature = 0.9, // Aumentar temperatura para más variedad
                max_tokens = 1000,
                top_p = 0.95 // Añadir top_p para mayor diversidad
            };

            try
            {
                var response = await client.PostAsJsonAsync(GROQ_API_URL, requestBody);
                
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"Error Groq API: {errorContent}");
                    return GetFallbackRecommendations();
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var groqResponse = JsonDocument.Parse(jsonResponse);
                
                var content = groqResponse.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                // Parsear respuesta JSON de la IA
                var aiRecommendations = JsonSerializer.Deserialize<AIResponse>(content);
                
                if (aiRecommendations?.Recommendations != null && aiRecommendations.Recommendations.Any())
                {
                    // Buscar cada libro en Google Books para obtener ID y portada
                    var results = new List<RecommendationResult>();
                    foreach (var rec in aiRecommendations.Recommendations)
                    {
                        var bookDetails = await SearchBookInGoogleBooks(rec.Titulo, rec.Autor);
                        if (bookDetails != null)
                        {
                            results.Add(new RecommendationResult
                            {
                                Id = bookDetails.Id,
                                Titulo = bookDetails.Titulo,
                                Autor = bookDetails.Autor,
                                Portada = bookDetails.Portada,
                                Razon = rec.Razon
                            });
                        }
                    }
                    return results;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al llamar a Groq: {ex.Message}");
            }

            return GetFallbackRecommendations();
        }

        private async Task<BookSearchResult?> SearchBookInGoogleBooks(string titulo, string autor)
        {
            var client = _httpClientFactory.CreateClient();
            var query = $"{titulo} {autor}".Replace(" ", "+");
            
            try
            {
                var response = await client.GetAsync($"https://www.googleapis.com/books/v1/volumes?q={query}&maxResults=1");
                if (response.IsSuccessStatusCode)
                {
                    var json = await response.Content.ReadAsStringAsync();
                    var data = JsonDocument.Parse(json);
                    
                    if (data.RootElement.TryGetProperty("items", out var items) && items.GetArrayLength() > 0)
                    {
                        var item = items[0];
                        var volumeInfo = item.GetProperty("volumeInfo");
                        
                        return new BookSearchResult
                        {
                            Id = item.GetProperty("id").GetString()!,
                            Titulo = volumeInfo.TryGetProperty("title", out var t) ? t.GetString()! : titulo,
                            Autor = volumeInfo.TryGetProperty("authors", out var a) 
                                ? string.Join(", ", a.EnumerateArray().Select(x => x.GetString()))
                                : autor,
                            Portada = volumeInfo.TryGetProperty("imageLinks", out var img)
                                ? img.TryGetProperty("thumbnail", out var thumb) ? thumb.GetString() : null
                                : null
                        };
                    }
                }
            }
            catch { }
            
            return null;
        }

        private List<RecommendationResult> GetFallbackRecommendations()
        {
            // Recomendaciones de respaldo en caso de error
            return new List<RecommendationResult>
            {
                new RecommendationResult
                {
                    Id = "default1",
                    Titulo = "Cien años de soledad",
                    Autor = "Gabriel García Márquez",
                    Razon = "Clásico universal que todo amante de la literatura debería leer"
                },
                new RecommendationResult
                {
                    Id = "default2",
                    Titulo = "1984",
                    Autor = "George Orwell",
                    Razon = "Distopía atemporal que sigue siendo relevante hoy en día"
                }
            };
        }
    }

    // DTOs
    public class BookInfo
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
    }

    public class AIResponse
    {
        public List<AIRecommendation> Recommendations { get; set; } = new();
    }

    public class AIRecommendation
    {
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string Razon { get; set; } = string.Empty;
    }

    public class BookSearchResult
    {
        public string Id { get; set; } = string.Empty;
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string? Portada { get; set; }
    }

    public class RecommendationResult
    {
        public string Id { get; set; } = string.Empty;
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string? Portada { get; set; }
        public string Razon { get; set; } = string.Empty;
    }
}
