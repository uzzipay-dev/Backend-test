using Microsoft.EntityFrameworkCore;
using Backend_test.Domain.Models;

namespace Backend_test.Repository
{
    public class Backend_TestContext : DbContext
    {
        public Backend_TestContext(DbContextOptions<Backend_TestContext> options) : base(options){}

        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }

        public DbSet<ProductCategory> ProductCategory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductCategory>().HasKey(PC => new { PC.ProductId, PC.CategoryId});
        }
    }
}