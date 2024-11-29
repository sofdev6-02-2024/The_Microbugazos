using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order/pending")]
    public class PendingEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] PendingEmail pendingEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "order_status.pending", pendingEmail);
            return Ok();
        }
    }
}