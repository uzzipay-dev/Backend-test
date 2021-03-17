using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend_test.Domain.Models;

namespace Backend_test.Repository
{
    public class Backend_TestRepository : IBackend_TestRepository
    {
        private readonly Backend_TestContext _context;
        
        public Backend_TestRepository(Backend_TestContext context)
        {
            this._context = context;
            this._context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        public void Add<T>(T entity) where T : class
        {
            this._context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            this._context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this._context.Remove(entity);
        }
        
        public async Task<bool> SaveChangesAsync()
        {
            return (await this._context.SaveChangesAsync()) > 0;
        }
    
        public async Task<Product> GetProduct_Id(int id)
        {
            var query = this._context.Product.AsNoTracking().Where(p => p.Id == id);
            
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Product> GetProductAll_Id(int id)
        {
            var query = this._context.Product.AsNoTracking().Where(p => p.Id == id)
                        .Include(pc => pc.ProductCategory).ThenInclude(c => c.Category);
            
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Product[]> GetAllProducts()
        {
            var query = this._context.Product.AsNoTracking().Include(pc => pc.ProductCategory).ThenInclude(c => c.Category);

            return await query.ToArrayAsync();
        }

        public async Task<Category> GetCategory_Id(int id)
        {
            var query = this._context.Category.AsNoTracking().Where(c => c.Id == id);
            return await query.FirstOrDefaultAsync();
        }
        
        public async Task<Category> GetCategoryAll_Id(int id)
        {
            var query = this._context.Category.AsNoTracking().Where(c => c.Id == id)
                        .Include(pc => pc.ProductCategory).ThenInclude(p => p.Product);
            
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Category[]> GetAllCategories()
        {
            var query = this._context.Category.AsNoTracking().Include(pc => pc.ProductCategory).ThenInclude(p => p.Product);

            return await query.ToArrayAsync();
        }
    }
}