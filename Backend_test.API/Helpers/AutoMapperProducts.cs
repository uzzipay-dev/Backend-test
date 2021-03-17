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
            CreateMap<Product, ProductDTO>().ForMember(dest => dest.Categories, opt =>{
                opt.MapFrom(src => src.ProductCategory.Select(x => x.Category).ToList());
            }).ReverseMap();

            CreateMap<Category, CategoryDTO>().ForMember(dest => dest.Products, opt =>{
                opt.MapFrom(src => src.ProductCategory.Select(x => x.Product).ToList());
            }).ReverseMap();
        }
    }
}