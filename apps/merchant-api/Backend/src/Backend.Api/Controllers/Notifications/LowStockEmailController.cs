using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications
{
    [ApiController]
    [Route("api/notification/low-stock")]
    public class LowStockEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] LowStockEmail lowStockEmail)
        {
            await producer.Publish(lowStockEmail);
            return Ok();
        }
    }
}