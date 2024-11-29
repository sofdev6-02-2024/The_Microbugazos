using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order/confirmed")]
    public class ConfirmedEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ConfirmedEmail confirmedEmail)
        {
            await producer.Publish(confirmedEmail);
            return Ok();
        }
    }
}