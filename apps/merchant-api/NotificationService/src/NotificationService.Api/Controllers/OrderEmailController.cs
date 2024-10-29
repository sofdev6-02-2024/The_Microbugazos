using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] OrderEmail order) {
            return Ok();
        }

        [HttpPost("discount")]
        public async Task<ActionResult> DiscountSend([FromBody] OrderWithDiscountEmail order)
        {
            return Ok();
        }
    }
}