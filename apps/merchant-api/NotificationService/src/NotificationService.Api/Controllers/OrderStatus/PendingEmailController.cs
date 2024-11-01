using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/pending")]
    public class PendingEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] PendingEmail pendingEmail)
        {
            EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-pending");
            var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
            await emailService.Send(pendingEmail.Contact.ContactEmail, "Order status", pendingEmail);
            return Ok();
        }
    }
}