using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/shipped")]
    public class ShippedEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ShippedEmail shippedEmail)
        {
            return Ok();
        }
    }
}