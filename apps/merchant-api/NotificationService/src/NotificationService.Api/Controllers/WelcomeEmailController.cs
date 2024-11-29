using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/[controller]")]
    public class WelcomeEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] WelcomeEmail welcomeEmail)
        {
            producer.PublishToDirectExchange("email.notifications", "merchant.welcome_email", welcomeEmail);
            return Ok();
        }
    }
}