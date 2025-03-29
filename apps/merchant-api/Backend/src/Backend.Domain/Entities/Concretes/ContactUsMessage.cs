using Backend.Domain.Entities.Bases;

namespace Backend.Domain.Entities.Concretes;

public class ContactUsMessage : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}