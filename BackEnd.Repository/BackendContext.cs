using BackEnd.Domain;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repository
{
    public class BackendContext : DbContext
    {
        public BackendContext(DbContextOptions<BackendContext> options) : base(options){}

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<ProdutoCategoria> ProdutosCategorias { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<ProdutoCategoria>()
                .HasKey(PC => new {PC.ProdutoId, PC.CategoriaId});
        }
    }
}