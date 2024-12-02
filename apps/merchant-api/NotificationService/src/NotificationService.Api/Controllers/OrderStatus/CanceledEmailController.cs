using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
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