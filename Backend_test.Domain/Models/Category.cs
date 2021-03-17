using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend_test.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Required field")]
        public string Name { get; set; }

        public int ProductId { get; set; }

        public List<Product> Products { get; }
    }
}