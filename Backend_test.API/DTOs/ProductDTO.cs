using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend_test.API.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Required field")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Required field")]
        public double Value { get; set; }

        public List<CategoryDTO> Categories { get; set; }

        public List<int> CategoriesId { get; set; }
    }
}