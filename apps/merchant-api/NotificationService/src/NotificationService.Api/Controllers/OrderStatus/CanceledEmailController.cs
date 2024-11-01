using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/canceled")]
    public class CanceledEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] CanceledEmail canceledEmail)
        {
            EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-canceled");
            var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
            await emailService.Send(canceledEmail.Contact.ContactEmail, "Order status", canceledEmail);
            return Ok();
        }
    }
}