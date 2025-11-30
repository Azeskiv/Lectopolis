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

        public BooksController(IHttpClientFactory httpClientFactory, AppDbContext context)
        {
            _httpClient = httpClientFactory.CreateClient();
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Debes proporcionar un término de búsqueda.");

            var url = $"https://www.googleapis.com/books/v1/volumes?q={Uri.EscapeDataString(query)}";
            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Error al consultar Google Books API");

            var jsonResponse = await response.Content.ReadAsStringAsync();
            var googleBooksData = JsonSerializer.Deserialize<JsonElement>(jsonResponse);

            if (!googleBooksData.TryGetProperty("items", out var items))
                return Ok(new { books = new List<object>() });

            var books = new List<object>();

            foreach (var item in items.EnumerateArray())
            {
                var id = item.GetProperty("id").GetString() ?? "";
                var volumeInfo = item.GetProperty("volumeInfo");

                // Extraer información del libro
                var title = volumeInfo.TryGetProperty("title", out var titleProp) 
                    ? titleProp.GetString() : "Sin título";

                var authors = volumeInfo.TryGetProperty("authors", out var authorsProp)
                    ? string.Join(", ", authorsProp.EnumerateArray().Select(a => a.GetString()))
                    : "Autor desconocido";

                var description = volumeInfo.TryGetProperty("description", out var descProp)
                    ? descProp.GetString() : "Sin descripción disponible";

                var thumbnail = volumeInfo.TryGetProperty("imageLinks", out var imageLinks) &&
                                imageLinks.TryGetProperty("thumbnail", out var thumbProp)
                    ? thumbProp.GetString() : null;

                // Calcular valoración promedio desde nuestra DB
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
                    valoracion = new
                    {
                        promedio = averageRating,
                        total = totalRatings
                    }
                });
            }

            return Ok(new { books });
        }
    }
}