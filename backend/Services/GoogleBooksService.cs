using System.Text.Json;

namespace backend.Services
{
    public class GoogleBooksService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private const string API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

        public GoogleBooksService(IHttpClientFactory httpClientFactory) 
            => _httpClientFactory = httpClientFactory;

        public async Task<BookDetails> GetBookDetails(string bookId)
        {
            try
            {
                var response = await _httpClientFactory.CreateClient().GetAsync($"{API_BASE_URL}/{bookId}");
                if (!response.IsSuccessStatusCode) return BookDetails.Unknown();

                var volumeInfo = JsonDocument.Parse(await response.Content.ReadAsStringAsync())
                    .RootElement.GetProperty("volumeInfo");

                return new BookDetails
                {
                    Title = volumeInfo.TryGetProperty("title", out var t) ? t.GetString() ?? "Unknown" : "Unknown",
                    Author = volumeInfo.TryGetProperty("authors", out var a) 
                        ? string.Join(", ", a.EnumerateArray().Select(x => x.GetString())) 
                        : "Unknown",
                    Genre = volumeInfo.TryGetProperty("categories", out var c) && c.GetArrayLength() > 0 
                        ? c[0].GetString() ?? "Unknown" 
                        : "Unknown"
                };
            }
            catch { return BookDetails.Unknown(); }
        }

        public async Task<BookSearchResult?> SearchBook(string title, string author)
        {
            try
            {
                var query = $"{title} {author}".Replace(" ", "+");
                var response = await _httpClientFactory.CreateClient().GetAsync($"{API_BASE_URL}?q={query}&maxResults=1");
                if (!response.IsSuccessStatusCode) return null;

                var data = JsonDocument.Parse(await response.Content.ReadAsStringAsync());
                if (!data.RootElement.TryGetProperty("items", out var items) || items.GetArrayLength() == 0) 
                    return null;

                var item = items[0];
                var vol = item.GetProperty("volumeInfo");

                return new BookSearchResult
                {
                    Id = item.GetProperty("id").GetString()!,
                    Titulo = vol.TryGetProperty("title", out var t) ? t.GetString()! : title,
                    Autor = vol.TryGetProperty("authors", out var a) 
                        ? string.Join(", ", a.EnumerateArray().Select(x => x.GetString())) 
                        : author,
                    Portada = vol.TryGetProperty("imageLinks", out var img) && img.TryGetProperty("thumbnail", out var thumb) 
                        ? thumb.GetString() 
                        : null
                };
            }
            catch { return null; }
        }
    }

    public class BookDetails
    {
        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;

        public static BookDetails Unknown() => new() { Title = "Unknown", Author = "Unknown", Genre = "Unknown" };
    }

    public class BookSearchResult
    {
        public string Id { get; set; } = string.Empty;
        public string Titulo { get; set; } = string.Empty;
        public string Autor { get; set; } = string.Empty;
        public string? Portada { get; set; }
    }
}
