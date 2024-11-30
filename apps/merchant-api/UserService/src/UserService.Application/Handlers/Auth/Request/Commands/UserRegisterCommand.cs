using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Users;

namespace UserService.Application.Handlers.Auth.Request.Commands;

public class UserRegisterCommand(RegisterUserDto registerUserDto) : IRequest<BaseResponse>
{
    public RegisterUserDto RegisterUserDto { get; set; } = registerUserDto;
}
