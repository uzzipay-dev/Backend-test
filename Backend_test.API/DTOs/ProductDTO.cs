using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend_test.API.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Required field")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Required field")]
        public double Valor { get; set; }

        public List<int> CategoryId { get; set; }
    }
}