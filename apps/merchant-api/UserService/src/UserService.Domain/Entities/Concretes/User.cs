using UserService.Domain.Entities.Bases;

namespace UserService.Domain.Entities.Concretes;

public class User : BaseEntity
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? IdentityId { get; set; }
    public UserAddress? Address { get; set; }
}
