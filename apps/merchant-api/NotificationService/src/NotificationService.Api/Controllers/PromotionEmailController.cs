using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/promotions")]
    public class PromotionEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] PromotionEmail promotionEmail)
        {
            EmailTemplateService<PromotionEmail> service = new PromotionEmailTemplateService();
            var emailService = new EmailService<PromotionEmail>(service);
            await emailService.Send(promotionEmail.Contact.ContactEmail, "Promotions", promotionEmail);
            return Ok();
        }
    }
}