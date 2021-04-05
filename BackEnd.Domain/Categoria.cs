using System.Collections.Generic;

namespace BackEnd.Domain
{
    public class Categoria
    {
        public int CategoriaId { get; set; }
        public string Nome { get; set; }
        public List<ProdutoCategoria> ProdutosCategorias { get; set; }
    }
}