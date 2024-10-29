using UserService.Domain.Bases;

namespace UserService.Domain.Concretes;

public class User : BaseEntity
{
    public string Name { get; set; }
    public UserType UserType { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
