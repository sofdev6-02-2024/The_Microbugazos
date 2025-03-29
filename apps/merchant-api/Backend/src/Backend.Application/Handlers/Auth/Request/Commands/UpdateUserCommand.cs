using Backend.Application.Dtos.Users;
using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Auth.Request.Commands;

public class UpdateUserCommand (UpdateUserDto updateUserDto) : IRequest<BaseResponse>
{
    public UpdateUserDto UpdateUserDto { get; set; } = updateUserDto;
}