using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/new-user")]
    public class NewUserEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] NewUserEmail newUserEmail)
        {
            return Ok();
        }
    }
}