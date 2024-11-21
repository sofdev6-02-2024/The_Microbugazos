using UserService.Domain.Concretes;

namespace UserService.Application.Dtos.Stores;

public class SellerDto
{
    public Guid Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public UserType UserType { get; set; }
}
