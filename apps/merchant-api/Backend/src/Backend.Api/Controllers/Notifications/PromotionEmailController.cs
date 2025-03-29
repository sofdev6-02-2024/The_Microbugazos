using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications
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