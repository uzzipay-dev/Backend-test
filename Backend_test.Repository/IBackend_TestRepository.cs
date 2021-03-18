using System.Threading.Tasks;
using Backend_test.Domain.Models;

namespace Backend_test.Repository
{
    public interface IBackend_TestRepository
    {
        void Add<T>(T entity) where T : class;
        
        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        Task<Product> GetProduct_Id(int id);

        Task<Product> GetProductAll_Id(int id);

        Task<Product[]> GetAllProducts();

        Task<Category> GetCategory_Id(int id);
        
        Task<Category> GetCategoryAll_Id(int id);
        
        Task<Category[]> GetAllCategories();

    }
}