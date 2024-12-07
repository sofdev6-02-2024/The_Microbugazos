
using Commons.ResponseHandler.Responses.Concretes;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using NotificationService.Domain.Dtos.OrderItems;
using UserService.Application.Handlers.Users.Request.Commands;


namespace UserService.Api.Controllers;

[ApiController]
[Route("api/users/[controller]")]
public class UserController(IMediator mediator) : ControllerBase
{

    [HttpPost("lowStock")]
    public async Task<ActionResult> SendLowStockInfo([FromBody] Dictionary<Guid, List<OrderItem>> request)
    {
        var result = await mediator.Send(new NotifyLowStockUsersCommand() { LowStockEmails = request });
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
}
