using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace backend.Services
{
    public class RecommendationService
    {
        private readonly AppDbContext _context;
        private readonly GoogleBooksService _googleBooks;
        private readonly GroqAIService _groqAI;

        public RecommendationService(AppDbContext context, GoogleBooksService googleBooks, GroqAIService groqAI)
        {
            _context = context;
            _googleBooks = googleBooks;
            _groqAI = groqAI;
        }

        public async Task<RecommendationResponse> GenerateRecommendations(int userId)
        {
            var allRatings = await _context.Ratings.Where(r => r.UserId == userId).ToListAsync();

            if (!allRatings.Any())
                return new RecommendationResponse { Message = "No tienes valoraciones. ¡Empieza a valorar libros!" };

            var positiveRatings = allRatings.Where(r => r.Score >= 3).OrderByDescending(r => r.Score).ToList();

            if (!positiveRatings.Any())
                return new RecommendationResponse { Message = "No tienes valoraciones positivas (3+ estrellas)." };

            var ratingsAnalysis = await BuildRatingsAnalysis(positiveRatings);
            var recommendations = await GetAIRecommendations(ratingsAnalysis);

            return new RecommendationResponse { Recommendations = recommendations };
        }

        private async Task<string> BuildRatingsAnalysis(List<Rating> positiveRatings)
        {
            var analysis = new StringBuilder("Libros que le gustaron al usuario:\n\n");

            foreach (var rating in positiveRatings)
            {
                var book = await _googleBooks.GetBookDetails(rating.BookId);
                analysis.AppendLine($"📚 {book.Title} - {book.Author} ({book.Genre})");
                analysis.AppendLine($"   ⭐ {rating.Score}/5");
                if (!string.IsNullOrEmpty(rating.Comment))
                    analysis.AppendLine($"   💬 {rating.Comment}");
                analysis.AppendLine();
            }

            return analysis.ToString();
        }

        private async Task<List<RecommendationResult>> GetAIRecommendations(string ratingsAnalysis)
        {
            var aiRecs = await _groqAI.GetRecommendations(ratingsAnalysis);
            var results = new List<RecommendationResult>();
            
            foreach (var rec in aiRecs)
            {
                var book = await _googleBooks.SearchBook(rec.Titulo, rec.Autor);
                if (book != null)
                {
                    results.Add(new RecommendationResult
                    {
                        Id = book.Id,
                        Titulo = book.Titulo,
                        Autor = book.Autor,
                        Portada = book.Portada,
                        Razon = rec.Razon
                    });
                }
            }
            
            return results;
        }
    }

    // DTOs
    public class RecommendationResponse
    {
        public string? Message { get; set; }
        public List<RecommendationResult> Recommendations { get; set; } = new();
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
