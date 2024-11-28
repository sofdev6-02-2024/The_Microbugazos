using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Commands;

public class UserRegisterCommandHandler(
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper) : 
    IRequestHandler<UserRegisterCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
    {
        var registerUserDto = request.RegisterUserDto;
        
        var usersFound = await userRepository.GetByAsync(user => user.Email == registerUserDto.Email);
        if (usersFound.Any())
        {
            return responseHandlingHelper.BadRequest<User>(
                "User already exists.");
        }

        var user = new User()
        {
            Id = Guid.NewGuid(),
            Email = registerUserDto.Email,
            Name = registerUserDto.Name,
            IdentityId = registerUserDto.IdentityId
        };
        user = await userRepository.AddAsync(user);
        return responseHandlingHelper.Created("The user was added successfully.", user.Id);
    }
}
