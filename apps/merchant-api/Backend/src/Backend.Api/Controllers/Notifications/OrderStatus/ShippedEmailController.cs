using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates.OrdersStatus;
using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications.OrderStatus
{
    [ApiController]
    [Route("api/notification/order/shipped")]
    public class ShippedEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ShippedEmail shippedEmail)
        {
            EmailTemplateService<IOrderStatusWithTimeEmail> service = new StatusWithTImeTemplateService("order-shipped");
            var emailService = new EmailService<IOrderStatusWithTimeEmail>(service);
            await emailService.Send(shippedEmail.Contact.ContactEmail, "Order status", shippedEmail);
            return Ok();
        }
    }
}