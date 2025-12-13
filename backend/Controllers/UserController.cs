using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Users.AnyAsync(u => u.Username == request.Username))
                return BadRequest("Este usuario ya existe.");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new User
            {
                Username = request.Username,
                Password = passwordHash
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado correctamente" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return Unauthorized("Credenciales incorrectas.");

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Inicio de sesión exitoso",
                token = token,
                userId = user.Id,
                username = user.Username,
                preferredLanguages = user.PreferredLanguages,
                profilePicture = user.ProfilePicture,
                bio = user.Bio
            });
        }

        [HttpGet("{userId}/languages")]
        [Authorize]
        public async Task<IActionResult> GetLanguages(int userId)
        {
            var requestingUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            if (requestingUserId != userId)
                return Forbid();

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("Usuario no encontrado");

            return Ok(new { preferredLanguages = user.PreferredLanguages });
        }

        [HttpPut("{userId}/languages")]
        [Authorize]
        public async Task<IActionResult> UpdateLanguages(int userId, [FromBody] LanguageUpdateRequest request)
        {
            var requestingUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            if (requestingUserId != userId)
                return Forbid();

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("Usuario no encontrado");

            user.PreferredLanguages = request.PreferredLanguages;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Preferencias actualizadas", preferredLanguages = user.PreferredLanguages });
        }

        [HttpGet("{userId}/profile")]
        public async Task<IActionResult> GetUserProfile(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("Usuario no encontrado");

            var ratings = await _context.Ratings
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();

            return Ok(new
            {
                userId = user.Id,
                username = user.Username,
                profilePicture = user.ProfilePicture,
                bio = user.Bio,
                ratingsCount = ratings.Count,
                ratings = ratings.Select(r => new
                {
                    id = r.Id,
                    bookId = r.BookId,
                    score = r.Score,
                    comment = r.Comment,
                    createdAt = r.CreatedAt
                })
            });
        }

        [HttpPut("{userId}/profile")]
        [Authorize]
        public async Task<IActionResult> UpdateUserProfile(int userId, [FromBody] ProfileUpdateRequest request)
        {
            var requestingUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            if (requestingUserId != userId)
                return Forbid();

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound("Usuario no encontrado");

            user.ProfilePicture = request.ProfilePicture;
            user.Bio = request.Bio;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Perfil actualizado", profilePicture = user.ProfilePicture, bio = user.Bio });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("Jwt");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expirationMinutes = int.Parse(jwtSettings["ExpirationMinutes"]!);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey!));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LanguageUpdateRequest
    {
        public string PreferredLanguages { get; set; } = string.Empty;
    }

    public class ProfileUpdateRequest
    {
        public string? ProfilePicture { get; set; }
        public string? Bio { get; set; }
    }
}