using Backend.Domain.Entities.Concretes;

namespace Backend.Application.Dtos.Users;
public class UserDto
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }

    public UserType UserType { get; set; }
}

