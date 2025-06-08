using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using BackendProj.Models;
using System.Collections.Generic;

namespace BackendProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            // TODO: Implement get cart
            return Ok(new Cart());
        }

        [HttpPost("items")]
        public async Task<IActionResult> AddToCart([FromBody] CartItem item)
        {
            // TODO: Implement add to cart
            return Ok(new { Message = "Item added to cart" });
        }

        [HttpPut("items/{id}")]
        public async Task<IActionResult> UpdateCartItem(int id, [FromBody] CartItem item)
        {
            // TODO: Implement update cart item
            return NoContent();
        }

        [HttpDelete("items/{id}")]
        public async Task<IActionResult> RemoveFromCart(int id)
        {
            // TODO: Implement remove from cart
            return NoContent();
        }

        [HttpPost("clear")]
        public async Task<IActionResult> ClearCart()
        {
            // TODO: Implement clear cart
            return NoContent();
        }
    }
} 