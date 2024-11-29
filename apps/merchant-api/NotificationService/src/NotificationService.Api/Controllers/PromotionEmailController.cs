using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/promotions")]
    public class PromotionEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public  ActionResult Send([FromBody] PromotionEmail promotionEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "marketing.promotion", promotionEmail);
            return Ok();
        }
    }
}