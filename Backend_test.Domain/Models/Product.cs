using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Backend_test.Domain.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Required field")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Required field")]
        public double Value { get; set; }

        public List<ProductCategory> ProductCategory { get; set; }
    }
}