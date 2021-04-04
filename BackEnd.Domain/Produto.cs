using System.Collections.Generic;

namespace BackEnd.Domain
{
    public class Produto
    {
        public int ProdutoId { get; set; }
        public string Nome { get; set; }
        public double Preco { get; set; }
        public List<ProdutoCategoria> ProdutosCategorias { get; set; }
    }
}