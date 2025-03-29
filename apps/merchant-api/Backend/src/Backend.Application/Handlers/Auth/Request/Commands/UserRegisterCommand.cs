using Backend.Application.Dtos.Users;
using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Auth.Request.Commands;

public class UserRegisterCommand(RegisterUserDto registerUserDto) : IRequest<BaseResponse>
{
    public RegisterUserDto RegisterUserDto { get; set; } = registerUserDto;
}
