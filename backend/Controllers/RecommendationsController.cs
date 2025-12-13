using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecommendationsController : ControllerBase
    {
        private readonly RecommendationService _recommendationService;

        public RecommendationsController(RecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
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

            var result = await _recommendationService.GenerateRecommendations(userId);
            
            return Ok(new 
            { 
                message = result.Message,
                recommendations = result.Recommendations 
            });
        }

    }
}
