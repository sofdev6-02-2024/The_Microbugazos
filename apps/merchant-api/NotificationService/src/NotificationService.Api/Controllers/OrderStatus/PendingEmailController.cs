using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order/pending")]
    public class PendingEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] PendingEmail pendingEmail)
        {
            await producer.Publish(pendingEmail);
            return Ok();
        }
    }
}