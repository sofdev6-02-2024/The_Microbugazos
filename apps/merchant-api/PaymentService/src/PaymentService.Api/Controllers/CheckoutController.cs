using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Dtos.CheckoutSessions;
using PaymentService.Application.QueryCommands.StripeCheckoutSessions.Commands.CommandHandlers;

namespace PaymentService.Api.Controllers;

[ApiController]
[Route("api/payment/[controller]")]
public class CheckoutController(IMediator mediator) : ControllerBase
{
    [HttpPost("submit-cart")]
    public ActionResult<BaseResponse> InitCheckoutSession([FromBody] CheckoutSessionRequestDto request)
    {
        var result = mediator.Send(new CreateCheckoutSessionCommand(request)).Result;
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<string>)result;
        return successResponse;
    }
}