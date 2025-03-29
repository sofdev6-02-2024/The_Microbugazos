using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates.OrdersStatus;
using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications.OrderStatus
{
    [ApiController]
    [Route("api/notification/order/delivered")]
    public class DeliveredEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] DeliveredEmail deliveredEmail)
        {
            EmailTemplateService<IOrderStatusWithTimeEmail> service = new StatusWithTImeTemplateService("order-delivered");
            var emailService = new EmailService<IOrderStatusWithTimeEmail>(service);
            await emailService.Send(deliveredEmail.Contact.ContactEmail, "Order status", deliveredEmail);
            return Ok();
        }
    }
}