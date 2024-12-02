using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/promotions")]
    public class PromotionEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] PromotionEmail promotionEmail)
        {
            await producer.Publish(promotionEmail);
            return Ok();
        }
    }
}