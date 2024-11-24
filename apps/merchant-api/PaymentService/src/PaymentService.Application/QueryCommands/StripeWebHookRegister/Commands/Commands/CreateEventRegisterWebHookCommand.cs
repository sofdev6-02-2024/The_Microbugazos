using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace PaymentService.Application.QueryCommands.StripeWebHookRegister.Commands.Commands;

public class CreateEventRegisterWebHookCommand(string requestBody) : IRequest<BaseResponse>
{
    public string RequestBody { get; set; } = requestBody;
}
