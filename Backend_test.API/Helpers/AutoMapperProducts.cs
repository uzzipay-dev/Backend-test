using System.Linq;
using AutoMapper;
using Backend_test.Domain.Models;
using Backend_test.API.DTOs;

namespace Backend_test.API.Helpers
{
    public class AutoMapperProducts : Profile
    {
         public AutoMapperProducts()
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
        }
    }
}