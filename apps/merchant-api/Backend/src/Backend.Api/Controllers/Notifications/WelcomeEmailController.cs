using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications
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