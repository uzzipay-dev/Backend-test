using System.Linq;
using AutoMapper;
using BackEnd.API.Dtos;
using BackEnd.Domain;

namespace BackEnd.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Produto, ProdutoDto>()
                .ForMember(dest => dest.Categorias, opt =>{
                    opt.MapFrom(src => src.ProdutosCategorias.Select(x => x.Categoria).ToList());
                }).ReverseMap();
                
            CreateMap<Categoria, CategoriaDto>()
                .ForMember(dest => dest.Produtos, opt => {
                    opt.MapFrom(src => src.ProdutosCategorias.Select(x => x.Produto).ToList());
                }).ReverseMap();
        }
    }
}