using Backend.Domain.Entities.Bases;

namespace Backend.Domain.Entities.Concretes;

public class User : BaseEntity
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? IdentityId { get; set; }
    public UserType UserType { get; set; } = UserType.CLIENT;
    public UserAddress? Address { get; set; }
    public Store? Store { get; set; }
}
