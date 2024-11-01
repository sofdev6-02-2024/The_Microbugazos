using MediatR;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Commands;

public class UserRegisterCommandHandler : IRequestHandler<UserRegisterCommand, User>
{
    private readonly IUserRepository _userRepository;
    public UserRegisterCommandHandler(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> Handle(UserRegisterCommand request, CancellationToken cancellationToken)
    {
        var usersFound = await _userRepository.GetByAsync(user => user.Email == request.Email);
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
        return await _userRepository.AddAsync(user);

    }
}
