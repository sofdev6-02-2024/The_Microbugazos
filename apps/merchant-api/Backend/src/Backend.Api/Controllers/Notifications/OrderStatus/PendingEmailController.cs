using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications.OrderStatus
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