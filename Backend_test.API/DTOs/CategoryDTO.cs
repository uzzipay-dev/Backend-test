using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend_test.API.DTOs
{
    public class CategoryDTO
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Required field")]
        public string Name { get; set; }

        public List<int> Products { get; set; }
    }
}