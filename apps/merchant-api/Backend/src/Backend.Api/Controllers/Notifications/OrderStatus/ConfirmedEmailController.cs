using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications.OrderStatus
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