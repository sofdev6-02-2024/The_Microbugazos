using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/recommendations")]
    public class ProductRecommendationEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ProductRecommendationEmail productRecommendationEmail)
        {
            return Ok();
        }
    }
}