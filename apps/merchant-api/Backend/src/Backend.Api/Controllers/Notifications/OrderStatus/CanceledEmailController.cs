using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications.OrderStatus
{
    [ApiController]
    [Route("api/notification/order/canceled")]
    public class CanceledEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] CanceledEmail canceledEmail)
        {
            await producer.Publish(canceledEmail);
            return Ok();
        }
    }
}