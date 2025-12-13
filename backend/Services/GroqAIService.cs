using System.Text.Json;

namespace backend.Services
{
    public class GroqAIService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _configuration;
        private const string API_URL = "https://api.groq.com/openai/v1/chat/completions";
        private const string MODEL = "llama-3.3-70b-versatile";

        public GroqAIService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _httpClientFactory = httpClientFactory;
            _configuration = configuration;
        }

        public async Task<List<AIRecommendation>> GetRecommendations(string userRatingsAnalysis)
        {
            var apiKey = _configuration["Groq:ApiKey"];
            if (string.IsNullOrEmpty(apiKey))
                throw new InvalidOperationException("Groq API key not configured");

            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            var requestBody = new
            {
                model = MODEL,
                messages = new[]
                {
                    new { role = "system", content = "Expert in literature. Respond ONLY with JSON: {\"recommendations\": [{\"titulo\": \"\", \"autor\": \"\", \"razon\": \"\"}]}" },
                    new { role = "user", content = $"{userRatingsAnalysis}\n\nRecommend 5 different books. JSON only." }
                },
                temperature = 1.0,
                max_tokens = 1000
            };

            try
            {
                var response = await client.PostAsJsonAsync(API_URL, requestBody);
                if (!response.IsSuccessStatusCode) return new List<AIRecommendation>();

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var content = JsonDocument.Parse(jsonResponse)
                    .RootElement.GetProperty("choices")[0]
                    .GetProperty("message").GetProperty("content").GetString();

                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                return JsonSerializer.Deserialize<AIResponse>(content, options)?.Recommendations ?? new List<AIRecommendation>();
            }
            catch
            {
                return new List<AIRecommendation>();
            }
        }
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
}
