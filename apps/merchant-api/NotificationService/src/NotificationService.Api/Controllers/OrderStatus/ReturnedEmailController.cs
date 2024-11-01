using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/returned")]
    public class ReturnedEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ReturnedEmail returnedEmail)
        {
            EmailTemplateService<OrderStatusWithTimeEmail> service = new StatusWithTImeTemplateService("order-returned");
            var emailService = new EmailService<OrderStatusWithTimeEmail>(service);
            await emailService.Send(returnedEmail.Contact.ContactEmail, "Order status", returnedEmail);
            return Ok();
        }
    }
}