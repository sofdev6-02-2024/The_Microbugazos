using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/returned")]
    public class ReturnedEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] ReturnedEmail returnedEmail)
        {
            return Ok();
        }
    }
}