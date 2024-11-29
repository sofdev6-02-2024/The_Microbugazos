using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/new-user")]
    public class NewUserEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] NewUserEmail newUserEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "merchant.new_user", newUserEmail);
            return Ok();
        }
    }
}