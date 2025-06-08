using Microsoft.AspNetCore.Mvc;
using BackendProj.Models;
using BackendProj.DTOs;
using System.Threading.Tasks;

namespace BackendProj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            // TODO: Implement registration logic
            return Ok(new { Message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            // TODO: Implement login logic
            return Ok(new { Token = "sample_token" });
        }
    }
} 