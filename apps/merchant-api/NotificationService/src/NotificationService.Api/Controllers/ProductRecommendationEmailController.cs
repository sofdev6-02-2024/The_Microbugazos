using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/recommendations")]
    public class ProductRecommendationEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ProductRecommendationEmail productRecommendationEmail)
        {
            EmailTemplateService<ProductRecommendationEmail> service = new ProductRecommendationEmailTemplateService();
            var emailService = new EmailService<ProductRecommendationEmail>(service);
            await emailService.Send(productRecommendationEmail.Contact.ContactEmail, "Product recommendation", productRecommendationEmail);
            return Ok();
        }
    }
}