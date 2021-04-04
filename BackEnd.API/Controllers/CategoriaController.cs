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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            return BadRequest();
        }

        [HttpPut("update/{ProdutoId}")]
        public async Task<IActionResult> Put(int CategoriaId, CategoriaDto model)
        {
            try
            {
                var categoria = await _repo.GetCategoriaAsyncById(CategoriaId);
                if (categoria == null) return NotFound();

                _mapper.Map(model, categoria);

                _repo.Update(categoria);
                if (await _repo.SaveChangesAsync())
                    return Created($"/api/produto/update/{categoria.CategoriaId}", _mapper.Map<CategoriaDto>(categoria));
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            return BadRequest();
        }

        [HttpDelete("delete/{ProdutoId}")]
        public async Task<IActionResult> Delete(int CategoriaId)
        {
            try
            {
                var categoria = await _repo.GetCategoriaAsyncById(CategoriaId);
                if (categoria == null) return NotFound();

                _repo.Remove(categoria);

                if (await _repo.SaveChangesAsync())
                    return Ok();
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            return BadRequest();
        }

    
    }
}