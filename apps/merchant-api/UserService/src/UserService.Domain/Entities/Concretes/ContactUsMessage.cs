using UserService.Domain.Entities.Bases;

namespace UserService.Domain.Entities.Concretes;

public class ContactUsMessage : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}