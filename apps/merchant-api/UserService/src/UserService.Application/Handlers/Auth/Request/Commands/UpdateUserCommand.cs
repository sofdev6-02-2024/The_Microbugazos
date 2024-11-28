using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Users;

namespace UserService.Application.Handlers.Auth.Request.Commands;

public class UpdateUserCommand (UpdateUserDto updateUserDto) : IRequest<BaseResponse>
{
    public UpdateUserDto UpdateUserDto { get; set; } = updateUserDto;
}