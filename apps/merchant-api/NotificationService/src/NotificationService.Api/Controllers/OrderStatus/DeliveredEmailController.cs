using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/delivered")]
    public class DeliveredEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] DeliveredEmail deliveredEmail)
        {
            EmailTemplateService<OrderStatusWithTimeEmail> service = new StatusWithTImeTemplateService("order-delivered");
            var emailService = new EmailService<OrderStatusWithTimeEmail>(service);
            await emailService.Send(deliveredEmail.Contact.ContactEmail, "Order status", deliveredEmail);
            return Ok();
        }
    }
}