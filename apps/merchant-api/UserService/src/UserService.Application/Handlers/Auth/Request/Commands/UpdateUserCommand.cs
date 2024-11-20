using MediatR;
using UserService.Domain.Entities.Concretes;

namespace UserService.Application.Handlers.Auth.Request.Commands;

public class UpdateUserCommand : IRequest<User>
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
}