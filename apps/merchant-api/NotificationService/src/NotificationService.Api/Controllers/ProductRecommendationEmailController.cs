using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/recommendations")]
    public class ProductRecommendationEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ProductRecommendationEmail productRecommendationEmail)
        {
            await producer.Publish(productRecommendationEmail);
            return Ok();
        }
    }
}