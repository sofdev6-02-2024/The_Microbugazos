using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications
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