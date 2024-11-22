using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using PaymentService.Application.Dtos.CheckoutSessions;
using PaymentService.Application.QueryCommands.StripeCheckoutSessions.Commands.CommandHandlers;
using PaymentService.Application.QueryCommands.StripeWebHookRegister.Commands.Commands;

namespace PaymentService.Api.Controllers;

[ApiController]
[Route("api/payment/[controller]")]
public class StripeController(IMediator mediator) : ControllerBase
{
    [HttpPost("checkout-session/submit-cart")]
    public ActionResult<BaseResponse> InitCheckoutSession([FromBody] CheckoutSessionRequestDto request)
    {
        var result = mediator.Send(new CreateCheckoutSessionCommand(request)).Result;
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<string>)result;
        return successResponse;
    }
    
    [HttpPost("web-hook/register-web-hook-event")]
    public async Task<ActionResult<BaseResponse>> ManageStripeWebHookDetection()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var result = await mediator.Send(new CreateEventRegisterWebHookCommand(json));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<string>)result;
        return successResponse;
    }
}