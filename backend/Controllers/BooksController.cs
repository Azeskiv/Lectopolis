using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly AppDbContext _context;

        private static readonly Dictionary<string, string> LanguageCodeMap = new()
        {
            { "spa", "es" }, { "eng", "en" }, { "fra", "fr" }, { "fre", "fr" },
            { "deu", "de" }, { "ger", "de" }, { "ita", "it" }, { "por", "pt" },
            { "nld", "nl" }, { "dut", "nl" }, { "pol", "pl" }, { "rus", "ru" },
            { "swe", "sv" }, { "nor", "no" }, { "dan", "da" }, { "fin", "fi" },
            { "ell", "el" }, { "gre", "el" }, { "ces", "cs" }, { "cze", "cs" },
            { "ron", "ro" }, { "rum", "ro" }
        };

        public BooksController(IHttpClientFactory httpClientFactory, AppDbContext context)
        {
            _httpClient = httpClientFactory.CreateClient();
            _context = context;
        }

        private string NormalizeLanguageCode(string code)
        {
            if (string.IsNullOrEmpty(code)) return "unknown";
            var lower = code.ToLower();
            if (lower.Length == 2) return lower;
            if (lower.Length == 3 && LanguageCodeMap.TryGetValue(lower, out var mapped)) return mapped;
            if (lower.Contains('-')) return lower.Split('-')[0];
            return lower;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] string? languages = null)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Debes proporcionar un término de búsqueda.");

            var selectedLanguages = string.IsNullOrWhiteSpace(languages) 
                ? new[] { "es" } 
                : languages.Split(',').Select(l => l.Trim().ToLower()).ToArray();

            var books = new List<object>();
            var seenBooks = new HashSet<string>();

            foreach (var lang in selectedLanguages)
            {
                var url = $"https://www.googleapis.com/books/v1/volumes?q={Uri.EscapeDataString(query)}&langRestrict={lang}&maxResults=20";
                var response = await _httpClient.GetAsync(url);
                if (!response.IsSuccessStatusCode) continue;

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var googleBooksData = JsonSerializer.Deserialize<JsonElement>(jsonResponse);

                if (!googleBooksData.TryGetProperty("items", out var items)) continue;

                foreach (var item in items.EnumerateArray())
                {
                    var id = item.GetProperty("id").GetString() ?? "";
                    var volumeInfo = item.GetProperty("volumeInfo");

                    var title = volumeInfo.TryGetProperty("title", out var titleProp) 
                        ? titleProp.GetString() : "Sin título";

                    var authors = volumeInfo.TryGetProperty("authors", out var authorsProp)
                        ? string.Join(", ", authorsProp.EnumerateArray().Select(a => a.GetString()))
                        : "Autor desconocido";

                    var firstAuthor = authors.Split(',')[0].Trim();
                    var bookKey = $"{title?.ToLower()}|{firstAuthor.ToLower()}";
                    
                    if (seenBooks.Contains(bookKey))
                        continue;
                    
                    seenBooks.Add(bookKey);

                    var description = volumeInfo.TryGetProperty("description", out var descProp)
                        ? descProp.GetString() : "Sin descripción disponible";

                    var thumbnail = volumeInfo.TryGetProperty("imageLinks", out var imageLinks) &&
                                    imageLinks.TryGetProperty("thumbnail", out var thumbProp)
                        ? thumbProp.GetString() : null;

                    var rawLanguage = volumeInfo.TryGetProperty("language", out var langProp) 
                        ? langProp.GetString() ?? lang 
                        : lang;

                    var bookLanguage = NormalizeLanguageCode(rawLanguage);

                    var ratings = await _context.Ratings
                        .Where(r => r.BookId == id)
                        .ToListAsync();

                    var averageRating = ratings.Any() 
                        ? Math.Round(ratings.Average(r => r.Score), 1) 
                        : 0.0;

                    var totalRatings = ratings.Count;

                    books.Add(new
                    {
                        id = id,
                        titulo = title,
                        autores = authors,
                        sinopsis = description,
                        portada = thumbnail,
                        idioma = bookLanguage,
                        valoracion = new                                    
                        {
                            promedio = averageRating,
                            total = totalRatings
                        }
                    });
                }
            }
            return Ok(new { books });
        }
    }
}