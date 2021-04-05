using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using BackEnd.API.Dtos;
using BackEnd.Domain;
using BackEnd.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
    private readonly IBackEndRepository _repo;
        private readonly IMapper _mapper;
        public CategoriaController(IBackEndRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var categorias = await _repo.GetAllCategoriaAsync();

                var results = _mapper.Map<IEnumerable<CategoriaDto>>(categorias);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao se comunicar com o banco de dados");
            }
        }

        [HttpGet("getById/{CategoriaId}")]
        public async Task<IActionResult> Get(int CategoriaId)
        {
            try
            {
                var categoria = await _repo.GetCategoriaAsyncById(CategoriaId);

                var results = _mapper.Map<CategoriaDto>(categoria);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao se comunicar com o banco de dados");
            }
        }

        [HttpGet("getByName/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                var results = await _repo.GetAllCategoriaAsyncByName(nome);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao se comunicar com o banco de dados");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post(CategoriaDto model)
        {
            try
            {
                var categoria = _mapper.Map<Categoria>(model);

                _repo.Add(categoria);

                if (await _repo.SaveChangesAsync())
                    return Created($"/produto/{model.CategoriaId}", _mapper.Map<CategoriaDto>(categoria));
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao registrar categoria");
            }
            return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao registrar categoria");
        }

        [HttpPut("update/{CategoriaId}")]
        public async Task<IActionResult> Put(int CategoriaId, CategoriaDto model)
        {
            try
            {
                var categoria = await _repo.GetCategoriaAsyncById(CategoriaId);
                if (categoria == null) return StatusCode(StatusCodes.Status404NotFound, "Categoria não encontrada");

                _mapper.Map(model, categoria);

                _repo.Update(categoria);
                if (await _repo.SaveChangesAsync())
                    return Created($"/api/produto/update/{categoria.CategoriaId}", _mapper.Map<CategoriaDto>(categoria));
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao editar categoria");
            }
            return BadRequest();
        }

        [HttpDelete("delete/{CategoriaId}")]
        public async Task<IActionResult> Delete(int CategoriaId)
        {
            try
            {
                var categoria = await _repo.GetCategoriaAsyncById(CategoriaId);
                if (categoria == null) return StatusCode(StatusCodes.Status404NotFound, "Categoria não encontrada");

                _repo.Remove(categoria);

                if (await _repo.SaveChangesAsync())
                    return StatusCode(StatusCodes.Status200OK, "Categoria deletada com sucesso");
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao deletar categoria");
            }
            return BadRequest();
        }

    
    }
}