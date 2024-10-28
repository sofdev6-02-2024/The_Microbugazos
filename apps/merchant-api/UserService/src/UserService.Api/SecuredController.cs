using Microsoft.AspNetCore.Mvc;
namespace UserService.Api;

[Route("api/[controller]")]
[ApiController]
public class SecuredController : ControllerBase
{

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            new
            {
                products = new List<string>(){
                "secured-user1",
                "secured-user2",
                "secured-user3"
              }
            }
        );
    }
}