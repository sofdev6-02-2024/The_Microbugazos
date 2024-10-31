using Microsoft.AspNetCore.Mvc;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/low-stock")]
    public class LowStockEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] LowStockEmail lowStockEmail)
        {
            var template = new LowStockEmailTemplaceService();
            string result = await template.GenerateEmailTemplate(lowStockEmail);
            Console.WriteLine(result);
            return Ok();
        }
    }
}