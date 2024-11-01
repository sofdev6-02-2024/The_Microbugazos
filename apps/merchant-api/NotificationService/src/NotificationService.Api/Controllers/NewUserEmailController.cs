using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/new-user")]
    public class NewUserEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] NewUserEmail newUserEmail)
        {
            EmailTemplateService<NewUserEmail> service = new NewUserEmailTemplateService();
            var emailService = new EmailService<NewUserEmail>(service);
            await emailService.Send(newUserEmail.Contact.ContactEmail, "New User", newUserEmail);
            return Ok();
        }
    }
}