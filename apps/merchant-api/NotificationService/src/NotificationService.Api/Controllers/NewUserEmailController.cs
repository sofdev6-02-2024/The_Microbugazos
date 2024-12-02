using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/new-user")]
    public class NewUserEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] NewUserEmail newUserEmail)
        {
            await producer.Publish(newUserEmail);
            return Ok();
        }
    }
}