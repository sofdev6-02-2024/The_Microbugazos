using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order")]
    public class OrderEmailController(IMessageProducer producer) : ControllerBase
    {
        [HttpPost]
        public ActionResult Send([FromBody] OrderEmail order)
        {
            producer.PublishToDirectExchange("email.notifications", "order.new_order", order);
            return Ok();
        }

        [HttpPost("discount")]
        public async Task<ActionResult> DiscountSend([FromBody] OrderWithDiscountEmail order)
        {
            EmailTemplateService<OrderWithDiscountEmail> service = new InvoiceWithDiscountEmailTemplateService();
            var emailService = new EmailService<OrderWithDiscountEmail>(service);
            await emailService.Send(order.Contact.ContactEmail, "Invoice", order);
            return Ok();
        }
    }
}