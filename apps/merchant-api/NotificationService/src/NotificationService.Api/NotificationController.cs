using Microsoft.AspNetCore.Mvc;

namespace NotificationService.Api;

[Route("api/notifications")]
[ApiController]
public class NotificationController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(
            new
            {
                products = new List<string>(){
                "notification1",
                "notification2",
                "notification3"
              }
            }
        );
    }
}