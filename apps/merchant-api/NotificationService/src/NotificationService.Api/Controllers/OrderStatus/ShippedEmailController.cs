using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/shipped")]
    public class ShippedEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ShippedEmail shippedEmail)
        {
            EmailTemplateService<OrderStatusWithTimeEmail> service = new StatusWithTImeTemplateService("order-shipped");
            var emailService = new EmailService<OrderStatusWithTimeEmail>(service);
            await emailService.Send(shippedEmail.Contact.ContactEmail, "Order status", shippedEmail);
            return Ok();
        }
    }
}