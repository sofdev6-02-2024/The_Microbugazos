using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
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