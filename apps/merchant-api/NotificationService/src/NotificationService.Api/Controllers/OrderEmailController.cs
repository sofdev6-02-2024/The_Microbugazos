using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] OrderEmail order) {
            EmailTemplateService<OrderEmail> service = new InvoiceEmailTemplateService();
            var emailService = new EmailService<OrderEmail>(service);
            await emailService.Send(order.Contact.ContactEmail, "Invoice", order);
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