using Microsoft.AspNetCore.Mvc;

namespace UserService.Api;


[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            new
            {
                products = new List<string>(){
                "user1",
                "user2",
                "user3"
              }
            }
        );
    }
}