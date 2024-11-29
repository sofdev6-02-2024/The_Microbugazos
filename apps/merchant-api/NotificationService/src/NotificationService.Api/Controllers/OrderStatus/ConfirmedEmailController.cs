using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order/confirmed")]
    public class ConfirmedEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] ConfirmedEmail confirmedEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "order_status.canceled", confirmedEmail);
            return Ok();
        }
    }
}