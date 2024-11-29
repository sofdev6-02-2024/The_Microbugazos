using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/low-stock")]
    public class LowStockEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] LowStockEmail lowStockEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "administrative.low_stock", lowStockEmail);
            return Ok();
        }
    }
}