using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurar índice compuesto para evitar que un usuario valore el mismo libro dos veces
            modelBuilder.Entity<Rating>()
                .HasIndex(r => new { r.BookId, r.UserId })
                .IsUnique();
        }
    }
}