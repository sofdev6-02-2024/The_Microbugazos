using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Dtos.CheckoutSessions;
using PaymentService.Application.QueryCommands.StripeCheckoutSessions.Commands.CommandHandlers;

namespace Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CheckoutController(IMediator mediator) : ControllerBase
{
    [HttpPost("submit-cart")]
    public async Task<ActionResult<Dictionary<string, string>>> InitCheckoutSession(List<ShoppingCartItemDto> itemsToBuy)
    {
        if (itemsToBuy == null || !itemsToBuy.Any()) return BadRequest();

        var result = await mediator.Send(new CreateCheckoutSessionCommand(itemsToBuy));
        return Ok(new Dictionary<string, string>
        {
            { "id", result }
        });
    }
}
