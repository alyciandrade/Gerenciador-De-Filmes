using CineListAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CineListAPI.Context
{
    public class FilmeDbContext : DbContext
    {
        public FilmeDbContext(DbContextOptions options):base(options)
        {
        }

        public DbSet<Filme> Filmes { get; set; }
    }
}
