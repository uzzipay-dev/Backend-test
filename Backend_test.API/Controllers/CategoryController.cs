using System.Threading.Tasks;
using AutoMapper;
using Backend_test.API.DTOs;
using Backend_test.Domain.Models;
using Backend_test.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend_test.API.Controllers
{
    [Route("category/")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IBackend_TestRepository _repo;
        private readonly IMapper _mapper;
        
        public CategoryController(IBackend_TestRepository repo, IMapper mapper) 
        { 
            this._repo = repo;
            this._mapper = mapper;
        }

        //Create
        [HttpPost("registration_category")]
        public async Task<IActionResult> RegistrationCategory(CategoryDTO model)
        {
            try
            {  
                var category = this._mapper.Map<Category>(model);
                this._repo.Add(category);
                
                if (await this._repo.SaveChangesAsync())
                {
                    return Created($"/get_category/{category.Id}", category);
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Category registration failed");
            }
                
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Category registration failed");
            }
        }

        //Read       
        [HttpGet("get_all")]
        public async Task<IActionResult> GetAllCategories()
        {
            try
            {
                var categories = await this._repo.GetAllCategories();
                        
                //contractor.Contract = new List<Contract>();
                //contractor.Contract.AddRange(contract);

                return Ok(categories);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "The system failed");
            }
        }

        [HttpGet("get_category/{id}")]
        public async Task<IActionResult> GetCategory_Id(int id)
        {
            try
            {
                var category = await this._repo.GetCategory_Id(id);
                
                if (category == null) return this.StatusCode(StatusCodes.Status404NotFound, "Category not found");

                return Ok(category);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "The system failed");
            }
        }
        
        //Update
        [HttpPut("update/{id}")]
        public async Task<ActionResult> Update(int id, CategoryDTO model)
        {
            try
            {
                var category = await this._repo.GetCategory_Id(id);

                if (category == null) return this.StatusCode(StatusCodes.Status404NotFound, "Category not found");

                model.Id = category.Id;
                this._mapper.Map(model, category);
                this._repo.Update(category);

                if (await this._repo.SaveChangesAsync())
                {
                    return Created($"/get_product/{category.Id}", category);
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Category update failed");
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Category update failed");
            }
        }

        //delete
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var category = await this._repo.GetCategory_Id(id);
                
                if (category == null) return this.StatusCode(StatusCodes.Status404NotFound, "Category not found");

                this._repo.Delete(category);

                if (await _repo.SaveChangesAsync())
                {
                    return this.StatusCode(StatusCodes.Status200OK, "Category successfully deleted");
                }

                return this.StatusCode(StatusCodes.Status500InternalServerError, "Category deletion failed");
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Category deletion failed");
            }
        }
        

    }
}