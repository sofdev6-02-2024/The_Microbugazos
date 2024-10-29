using Microsoft.AspNetCore.Mvc;
using NotificationService.Domain.Dtos.Emails;

namespace NotificationService.Api.Controllers
{
    [ApiController]
    [Route("api/order/delivered")]
    public class DeliveredEmailController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> Send([FromBody] DeliveredEmail deliveredEmail)
        {
            return Ok();
        }
    }
}