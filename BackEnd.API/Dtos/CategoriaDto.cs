using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.API.Dtos
{
    public class CategoriaDto
    {
        public int CategoriaId { get; set; }
        
        [Required(ErrorMessage = "Campo {0} é obrigatório")]
        public string Nome { get; set; }
        public List<ProdutoDto> Produtos { get; set; }
    }
}