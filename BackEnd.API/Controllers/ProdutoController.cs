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
    public class ProdutoController : ControllerBase
    {
        private readonly IBackEndRepository _repo;
        private readonly IMapper _mapper;
        public ProdutoController(IBackEndRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> Get()
        {
            try
            {
                var produtos = await _repo.GetAllProdutoAsync();

                var results = _mapper.Map<IEnumerable<ProdutoDto>>(produtos);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao se comunicar com o banco de dados");
            }
        }

        [HttpGet("getById/{ProdutoId}")]
        public async Task<IActionResult> Get(int ProdutoId)
        {
            try
            {
                var produto = await _repo.GetProdutoAsyncById(ProdutoId);

                var results = _mapper.Map<ProdutoDto>(produto);

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
                var results = await _repo.GetAllProdutoAsyncByName(nome);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao se comunicar com o banco de dados");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Post(ProdutoDto model)
        {
            try
            {
                var produto = _mapper.Map<Produto>(model);

                _repo.Add(produto);

                if (await _repo.SaveChangesAsync())
                    return Created($"/produto/{produto.ProdutoId}", _mapper.Map<ProdutoDto>(produto));
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao registrar produto");
            }
            return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao registrar produto");
        }

        [HttpPut("update/{ProdutoId}")]
        public async Task<IActionResult> Put(int ProdutoId, ProdutoDto model)
        {
            try
            {
                var produto = await _repo.GetProdutoAsyncById(ProdutoId);
                if (produto == null) return StatusCode(StatusCodes.Status404NotFound, "Produto não encontrado");

                _mapper.Map(model, produto);

                _repo.Update(produto);
                if (await _repo.SaveChangesAsync())
                    return Created($"/api/produto/getbyid/{produto.ProdutoId}", _mapper.Map<ProdutoDto>(produto));
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao editar produto");
            }
            return BadRequest();
        }

        [HttpDelete("delete/{ProdutoId}")]
        public async Task<IActionResult> Delete(int ProdutoId)
        {
            try
            {
                var produto = await _repo.GetProdutoAsyncById(ProdutoId);
                if (produto == null) return StatusCode(StatusCodes.Status404NotFound, "Produto não encontrado");

                _repo.Remove(produto);

                if (await _repo.SaveChangesAsync())
                    return StatusCode(StatusCodes.Status200OK, "Produto deletado com sucesso");
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Falha ao deletar produto");
            }
            return BadRequest();
        }

    }
} 