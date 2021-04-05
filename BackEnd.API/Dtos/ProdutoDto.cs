using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.API.Dtos
{
    public class ProdutoDto
    {
        public int ProdutoId { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Campo {0} é obrigatório")]
        public double Preco { get; set; }
        public List<CategoriaDto> Categorias { get; set; }
    }

} 