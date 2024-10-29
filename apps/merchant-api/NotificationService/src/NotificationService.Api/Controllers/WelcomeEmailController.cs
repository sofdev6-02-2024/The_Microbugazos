using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WelcomeEmailController : ControllerBase
    {
        [HttpPost("send")]
        public async Task<ActionResult> Send([FromBody] WelcomeEmail welcomeEmail) {
            return Ok();
        }
    }
}