namespace BackEnd.Domain
{
    public class ProdutoCategoria
    {
        public int ProdutoId { get; set; }
        public Produto Produto {get; set; }
        public int CategoriaId { get; set; }
        public Categoria Categoria { get; set; }
    }
}