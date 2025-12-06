using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest("Este usuario ya existe.");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "El usuario ha sido registrado correctamente" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(User user)
        {
            var existing = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);

            if (existing == null)
                return Unauthorized("Login incorrecto.");

            return Ok(new
            {
                message = "Iniciando sesión...",
                userId = existing.Id,
                username = existing.Username
            });
        }
    }
}