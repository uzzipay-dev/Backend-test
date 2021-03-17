using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using Backend_test.Repository;
using Backend_test.Domain.Models;
using Backend_test.API.DTOs;
using System;

namespace Backend_test.API.Controllers
{
    [Route("product/")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IBackend_TestRepository _repo;
        private readonly IMapper _mapper;
        
        public ProductController(IBackend_TestRepository repo, IMapper mapper) 
        { 
            this._repo = repo;
            this._mapper = mapper;
        }

        //Create
        [HttpPost("registration_product")]
        public async Task<IActionResult> RegistrationProduct(ProductDTO model)
        {
            try
            {  
                var product = this._mapper.Map<Product>(model);
                
                this._repo.Add(product);
                
                if (await this._repo.SaveChangesAsync())
                {
                    return Created($"/get_product/{product.Id}", product);
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Product registration failed");
            }
                
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Product registration failed");
            }
        }

        //Read       
        [HttpGet("get_all")]
        public async Task<IActionResult> GetAllProducts()
        {
            try
            {
                var products = await this._repo.GetAllProducts();
                        
                //contractor.Contract = new List<Contract>();
                //contractor.Contract.AddRange(contract);

                return Ok(products);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "The system failed");
            }
        }

        [HttpGet("get_product/{id}")]
        public async Task<IActionResult> GetProduct_Id(int id)
        {
            try
            {
                var product = await this._repo.GetProduct_Id(id);
                
                if (product == null) return this.StatusCode(StatusCodes.Status404NotFound, "Product not found");

                return Ok(product);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "The system failed");
            }
        }
        
        //Update
        [HttpPut("update/{id}")]
        public async Task<ActionResult> Update(int id, ProductDTO model)
        {
            try
            {
                var product = await this._repo.GetProduct_Id(id);

                if (product == null) return this.StatusCode(StatusCodes.Status404NotFound, "Product not found");

                model.Id = product.Id;
                this._mapper.Map(model, product);
                this._repo.Update(product);

                if (await this._repo.SaveChangesAsync())
                {
                    return Created($"/get_product/{product.Id}", product);
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Product update failed");
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Product update failed");
            }
        }

        //delete
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var product = await this._repo.GetProduct_Id(id);
                
                if (product == null) return this.StatusCode(StatusCodes.Status404NotFound, "Product not found");

                this._repo.Delete(product);

                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK, "Product successfully deleted");
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Product deletion failed");
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Product deletion failed");
            }
        }       
    }
}