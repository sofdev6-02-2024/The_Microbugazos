using MassTransit;
using MediatR;
using NotificationService.Domain.Dtos;
using NotificationService.Domain.Dtos.Emails;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using UserService.Application.Dtos.Users;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Commands;

public class UserRegisterCommandHandler(
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<RegisterUserDto> validator,
    IBus producer) :
    IRequestHandler<UserRegisterCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
    {
        var registerUserDto = request.RegisterUserDto;
        var response = await validator.ValidateAsync(registerUserDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<RegisterUserDto>(
            "The operation to create a user was not completed, please check the errors.",
            response.Errors.Select(e => e.ErrorMessage).ToList());
        var usersFound = await userRepository.GetByAsync(user => user.Email == registerUserDto.Email);
        if (usersFound.Any())
            return responseHandlingHelper.BadRequest<User>("User already exists.");

        var user = new User()
        {
            Id = Guid.NewGuid(),
            Email = registerUserDto.Email,
            Name = registerUserDto.Name,
            IdentityId = registerUserDto.IdentityId
        };

        if (registerUserDto.EmailVerified)
        {
            await producer.Publish(
             new WelcomeEmail(new Contact(registerUserDto.Name ?? "", registerUserDto.Email ?? "")),
             CancellationToken.None
         );
        }

        user = await userRepository.AddAsync(user);
        return responseHandlingHelper.Created("The user was added successfully.", user.Id);
    }
}
