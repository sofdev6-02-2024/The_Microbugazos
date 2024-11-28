using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/recommendations")]
    public class ProductRecommendationEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] ProductRecommendationEmail productRecommendationEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "marketing.recommendation", productRecommendationEmail);
            return Ok();
        }
    }
}