using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Rating
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string BookId { get; set; } = string.Empty; 

        [Required]
        public int UserId { get; set; } 

        [ForeignKey("UserId")]
        public User User { get; set; } = null!;

        [Required]
        [Range(1, 5)]
        public int Score { get; set; } 

        public string? Comment { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}