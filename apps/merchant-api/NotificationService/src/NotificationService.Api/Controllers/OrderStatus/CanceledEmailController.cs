using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order/canceled")]
    public class CanceledEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] CanceledEmail canceledEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "order_status.canceled", canceledEmail);
            return Ok();
        }
    }
}