using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace UserService.Application.Handlers.Auth.Request.Commands;

public class UpdateUserCommand : IRequest<BaseResponse>
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
}