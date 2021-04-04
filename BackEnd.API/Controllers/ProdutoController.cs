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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
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
                    return Created($"/produto/{model.ProdutoId}", _mapper.Map<ProdutoDto>(produto));
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            return BadRequest();
        }

        [HttpPut("update/{ProdutoId}")]
        public async Task<IActionResult> Put(int ProdutoId, ProdutoDto model)
        {
            try
            {
                var produto = await _repo.GetProdutoAsyncById(ProdutoId);
                if (produto == null) return NotFound();

                _mapper.Map(model, produto);

                _repo.Update(produto);
                if (await _repo.SaveChangesAsync())
                    return Created($"/api/produto/update/{produto.ProdutoId}", _mapper.Map<ProdutoDto>(produto));
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou");
            }
            return BadRequest();
        }

        [HttpDelete("delete/{ProdutoId}")]
        public async Task<IActionResult> Delete(int ProdutoId)
        {
            try
            {
                var produto = await _repo.GetProdutoAsyncById(ProdutoId);
                if (produto == null) return NotFound();

                _repo.Remove(produto);

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