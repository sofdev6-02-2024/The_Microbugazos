using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.Users;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Commands;

public class UpdateUserCommandHandler(
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IMapper mapper
    ) : IRequestHandler<UpdateUserCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.GetByIdAsync(request.Id);
        if (user == null)
            return responseHandlingHelper.BadRequest<User>($"User with ID {request.Id} not found.");

        user.Name = request.Name ?? user.Name;
        user.Email = request.Email ?? user.Email;
        
        var result = await userRepository.UpdateAsync(user);
        var userDto = mapper.Map<UserDto>(result);
        return responseHandlingHelper.Ok("The user has been successfully updated.", userDto);
    }
}