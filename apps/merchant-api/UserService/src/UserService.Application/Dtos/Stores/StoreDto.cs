namespace UserService.Application.Dtos.Stores;

public class StoreDto
{

    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public Guid UserId { get; set; }

    public string? BannerImage { get; set; }
    public string? ProfileImage { get; set; }
}