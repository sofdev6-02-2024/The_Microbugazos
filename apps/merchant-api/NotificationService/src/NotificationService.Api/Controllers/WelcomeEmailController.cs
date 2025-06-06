using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/[controller]")]
    public class WelcomeEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] WelcomeEmail welcomeEmail)
        {
            await producer.Publish(welcomeEmail);
            return Ok();
        }
    }
}