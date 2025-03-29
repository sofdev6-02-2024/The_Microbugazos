using Backend.Application.Dtos.Users;
using Backend.Application.Handlers.Auth.Request.Commands;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Domain.Entities.Concretes.Emails;
using Backend.Infrastructure.Repositories.Interfaces;
using FluentValidation;
using MassTransit;
using MediatR;

namespace Backend.Application.Handlers.Auth.RequestHandlers.Commands;

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
