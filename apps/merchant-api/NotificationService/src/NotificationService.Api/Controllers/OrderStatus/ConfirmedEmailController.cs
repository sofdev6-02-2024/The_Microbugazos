using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/confirmed")]
    public class ConfirmedEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ConfirmedEmail confirmedEmail)
        {
            EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-confirmed");
            var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
            await emailService.Send(confirmedEmail.Contact.ContactEmail, "Order status", confirmedEmail);
            return Ok();
        }
    }
}