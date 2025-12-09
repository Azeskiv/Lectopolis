using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RatingsController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/ratings - Crear valoración
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateRating([FromBody] RatingRequest request)
        {
            // Obtener userId del token JWT
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            // Verificar si ya valoró este libro
            var existingRating = await _context.Ratings
                .FirstOrDefaultAsync(r => r.BookId == request.BookId && r.UserId == userId);

            if (existingRating != null)
                return BadRequest("Ya has valorado este libro.");

            var rating = new Rating
            {
                BookId = request.BookId,
                UserId = userId, // Extraído del token, no del request
                Score = request.Score,
                Comment = request.Comment,
                CreatedAt = DateTime.UtcNow
            };

            _context.Ratings.Add(rating);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Valoración creada correctamente", rating });
        }

        // GET: api/ratings/{bookId} - Obtener valoraciones de un libro (público)
        [HttpGet("{bookId}")]
        public async Task<IActionResult> GetRatings(string bookId)
        {
            var ratings = await _context.Ratings
                .Where(r => r.BookId == bookId)
                .Include(r => r.User)
                .Select(r => new
                {
                    r.Id,
                    r.UserId,
                    r.Score,
                    r.Comment,
                    r.CreatedAt,
                    usuario = r.User.Username
                })
                .ToListAsync();

            var average = ratings.Any() 
                ? Math.Round(ratings.Average(r => r.Score), 1) 
                : 0.0;

            return Ok(new
            {
                bookId,
                promedio = average,
                total = ratings.Count,
                valoraciones = ratings
            });
        }

        // PUT: api/ratings/{id} - Actualizar valoración (solo el dueño)
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateRating(int id, [FromBody] UpdateRatingRequest request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
                return NotFound("Valoración no encontrada.");

            // Verificar que el usuario sea el dueño de la valoración
            if (rating.UserId != userId)
                return Forbid("No tienes permiso para editar esta valoración.");

            rating.Score = request.Score;
            rating.Comment = request.Comment;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Valoración actualizada correctamente", rating });
        }

        // DELETE: api/ratings/{id} - Eliminar valoración (solo el dueño)
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteRating(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var rating = await _context.Ratings.FindAsync(id);
            if (rating == null)
                return NotFound("Valoración no encontrada.");

            // Verificar que el usuario sea el dueño de la valoración
            if (rating.UserId != userId)
                return Forbid("No tienes permiso para eliminar esta valoración.");

            _context.Ratings.Remove(rating);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Valoración eliminada correctamente" });
        }
    }

    // DTOs
    public class RatingRequest
    {
        public string BookId { get; set; } = string.Empty;
        // UserId ya no viene del request, se extrae del token
        public int Score { get; set; }
        public string? Comment { get; set; }
    }

    public class UpdateRatingRequest
    {
        public int Score { get; set; }
        public string? Comment { get; set; }
    }
}