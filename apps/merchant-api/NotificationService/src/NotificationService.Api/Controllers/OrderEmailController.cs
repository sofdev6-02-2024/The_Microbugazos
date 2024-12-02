using MassTransit;
using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/notification/order")]
    public class OrderEmailController(IBus producer) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] OrderEmail order)
        {
            await producer.Publish(order);
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