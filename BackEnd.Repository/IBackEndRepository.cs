using System.Threading.Tasks;
using BackEnd.Domain;

namespace BackEnd.Repository
{
    public interface IBackEndRepository
    {
        void Add <T> (T entity) where T : class;
        void Update <T> (T entity) where T : class;
        void Remove <T> (T entity) where T : class;
        
        Task <bool> SaveChangesAsync();

        //Produto
        Task <Produto[]> GetAllProdutoAsyncByName(string nome);
        Task <Produto[]> GetAllProdutoAsync();
        Task <Produto> GetProdutoAsyncById(int ProdutoId);

        //Categoria
        Task <Categoria[]> GetAllCategoriaAsyncByName(string nome);
        Task <Categoria[]> GetAllCategoriaAsync();
        Task <Categoria> GetCategoriaAsyncById(int CategoriaId);


        
        
    }
}