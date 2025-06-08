// Controllers/TestController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackendProj.Data;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly AppDbContext _context;
    public TestController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("check")]
    public async Task<IActionResult> CheckDb()
    {
        // Örnek: Migrations ile oluşan herhangi bir tabloyu sorgula
        var count = await _context.Database.CanConnectAsync();
        return Ok(new { CanConnect = count });
    }
}
