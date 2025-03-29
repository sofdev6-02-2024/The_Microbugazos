using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers.Notifications
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