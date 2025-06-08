// Controllers/ProductController.cs
using Microsoft.AspNetCore.Mvc;
using BackendProj.Repositories;
using BackendProj.DTOs;
using BackendProj.Extensions;
using BackendProj.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendProj.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repo;

        public ProductController(IProductRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
        {
            var products = await _repo.GetAllAsync();
            return Ok(products.Select(p => p.AsDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDto>> GetById(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(product.AsDto());
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductDto input)
        {
            var entity = new Product
            {
                Name = input.Name,
                Price = input.Price,
                Description = input.Description
            };
            var created = await _repo.AddAsync(entity);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.AsDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateProductDto input)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return NotFound();
            existing.Name = input.Name;
            existing.Price = input.Price;
            existing.Description = input.Description;
            await _repo.UpdateAsync(existing);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return NotFound();
            await _repo.DeleteAsync(id);
            return NoContent();
        }
    }
}
