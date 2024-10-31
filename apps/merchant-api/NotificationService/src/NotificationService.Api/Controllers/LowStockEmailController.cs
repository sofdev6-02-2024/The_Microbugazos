using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/low-stock")]
    public class LowStockEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] LowStockEmail lowStockEmail)
        {
            EmailTemplateService<LowStockEmail> emailTemplateService = new LowStockEmailTemplaceService();
            var emailService = new EmailService<LowStockEmail>(emailTemplateService);
            await emailService.Send(lowStockEmail.Contact.ContactEmail, lowStockEmail.Subject, lowStockEmail);
            return Ok();
        }
    }
}