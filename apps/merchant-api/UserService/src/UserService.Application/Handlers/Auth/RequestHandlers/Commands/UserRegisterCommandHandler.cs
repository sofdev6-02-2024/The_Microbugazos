using MassTransit;
using MediatR;
using NotificationService.Domain.Dtos;
using NotificationService.Domain.Dtos.Emails;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Commands;

public class UserRegisterCommandHandler(IUserRepository userRepository, IBus producer) : IRequestHandler<UserRegisterCommand, User>
{

    public async Task<User> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
    {
        var usersFound = await userRepository.GetByAsync(user => user.Email == request.Email);
        if (usersFound.Any())
        {
            throw new Exception("User already exists.");
        }

        User user = new()
        {
            Id = Guid.NewGuid(),
            Email = request.Email,
            Name = request.Name,
            IdentityId = request.IdentityId
        };

        if (request.EmailVerified)
        {
            await producer.Publish(
             new WelcomeEmail(new Contact(user.Name, user.Email)),
             CancellationToken.None
         );
        }


        return await userRepository.AddAsync(user);
    }
}
