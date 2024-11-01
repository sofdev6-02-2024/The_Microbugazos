using UserService.Domain.Entities.Concretes;
using MediatR;

namespace UserService.Application.Handlers.Auth.Request.Commands;

public class UserRegisterCommand : IRequest<User>
{
    public required string Email { get; set; }
    public required string Name { get; set; }
    public required string IdentityId { get; set; }


    public UserRegisterCommand(string email, string name, string identityId)
    {
        Email = email;
        Name = name;
        IdentityId = identityId;
    }
}
