using System.Linq;
using System.Threading.Tasks;
using BackEnd.Domain;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repository
{
    public class BackEndRepository : IBackEndRepository
    {
        private readonly BackendContext _context;
        public BackEndRepository(BackendContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        //Gerais
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Remove<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        //Produto
        public async Task<Produto[]> GetAllProdutoAsync()
        {
            var query = _context.Produtos
                    .Include(PC => PC.ProdutosCategorias)
                    .ThenInclude(C => C.Categoria);
                       
            return await query.ToArrayAsync();
        }
        public async Task<Produto[]> GetAllProdutoAsyncByName(string nome)
        {
            var query = _context.Produtos
                    .Include(PC => PC.ProdutosCategorias)
                    .ThenInclude(C => C.Categoria)
                    .Where(P => P.Nome.ToLower().Contains(nome.ToLower()));
                
            return await query.ToArrayAsync();
        }
        public async Task<Produto> GetProdutoAsyncById(int ProdutoId)
        {
           var query = _context.Produtos
                    .Include(PC => PC.ProdutosCategorias)
                    .ThenInclude(C => C.Categoria)
                    .Where(P => P.ProdutoId == ProdutoId);

            return await query.FirstOrDefaultAsync();
        }

        //Categoria
        public async Task<Categoria[]> GetAllCategoriaAsync()
        {
            var query = _context.Categorias
                    .Include(PC => PC.ProdutosCategorias)
                    .ThenInclude(P => P.Produto);
          
            return await query.ToArrayAsync();
        }
        public async Task<Categoria[]> GetAllCategoriaAsyncByName(string nome)
        {
            var query = _context.Categorias
                    .Include(PC => PC.ProdutosCategorias)
                    .ThenInclude(P => P.Produto)
                    .Where(C => C.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();

        }
        public async Task<Categoria> GetCategoriaAsyncById(int CategoriaId)
        {
            var query = _context.Categorias
                    .Include(PC => PC.ProdutosCategorias)
                    .ThenInclude(P => P.Produto)
                    .Where(C => C.CategoriaId == CategoriaId);

             return await query.FirstOrDefaultAsync();
        }
    }
}