using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/promotions")]
    public class PromotionEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] PromotionEmail promotionEmail)
        {
            return Ok();
        }
    }
}