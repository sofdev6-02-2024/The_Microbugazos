using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/pending")]
    public class PendingEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] PendingEmail pendingEmail)
        {
            return Ok();
        }
    }
}