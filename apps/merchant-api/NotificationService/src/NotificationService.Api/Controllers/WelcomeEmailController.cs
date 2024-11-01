using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WelcomeEmailController : ControllerBase
    {
        [HttpPost("send")]
        public async Task<ActionResult> Send([FromBody] WelcomeEmail welcomeEmail) {
            EmailTemplateService<WelcomeEmail> service = new WelcomeEmailTemplateService();
            var emailService = new EmailService<WelcomeEmail>(service);
            await emailService.Send(welcomeEmail.Contact.ContactEmail, "Welcome", welcomeEmail);
            return Ok();
        }
    }
}