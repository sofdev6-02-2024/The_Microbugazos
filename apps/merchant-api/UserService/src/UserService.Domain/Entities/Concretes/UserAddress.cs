using UserService.Domain.Entities.Bases;

namespace UserService.Domain.Entities.Concretes;

public class UserAddress : BaseEntity
{
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
}
