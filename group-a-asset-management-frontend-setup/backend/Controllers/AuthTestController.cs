using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize]
[ApiController]
[Route("api/auth-test")]
public class AuthTestController : ControllerBase
{
    [HttpGet]
    public IActionResult TestLogin()
    {
        return Ok("SSO Login Successful — User Authenticated!");
    }
}
