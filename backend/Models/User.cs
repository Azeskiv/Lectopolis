using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        // Idiomas preferidos (códigos ISO separados por coma: "es,en,fr")
        public string PreferredLanguages { get; set; } = "es"; // Español por defecto

        // Perfil de usuario
        public string? ProfilePicture { get; set; } // URL o emoji de la foto de perfil
        public string? Bio { get; set; } // Descripción breve del usuario
    }
}