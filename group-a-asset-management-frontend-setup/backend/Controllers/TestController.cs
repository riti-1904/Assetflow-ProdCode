using Microsoft.AspNetCore.Mvc;
using AssetFlow.Auth.Data;
using AssetFlow.Auth.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly UserDbContext _context;

    public TestController(UserDbContext context)
    {
        _context = context;
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await _context.Users.ToListAsync();
            return Ok(new { success = true, count = users.Count, data = users });
        }
        catch (Exception ex)
        {
            return BadRequest(new { success = false, message = ex.Message });
        }
    }
}
