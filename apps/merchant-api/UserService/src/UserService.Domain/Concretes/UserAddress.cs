using UserService.Domain.Bases;

namespace UserService.Domain.Concretes;

public class UserAddress : BaseEntity
{
    public Guid UserId { get; set; }
    public float Latitude { get; set; }
    public float Longitude { get; set; }
}
