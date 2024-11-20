using UserService.Domain.Entities.Bases;

namespace UserService.Domain.Entities.Concretes;

public class Store : BaseEntity
{

    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? BannerImage { get; set; }
    public string? ProfileImage { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public ICollection<Guid> SellerIds { get; set; } = new List<Guid>();
}