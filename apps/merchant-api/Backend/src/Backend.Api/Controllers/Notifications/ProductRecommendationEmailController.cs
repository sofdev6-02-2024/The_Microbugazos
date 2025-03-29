using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications
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