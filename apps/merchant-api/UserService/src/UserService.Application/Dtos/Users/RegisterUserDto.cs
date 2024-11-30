namespace UserService.Application.Dtos.Users;

public class RegisterUserDto
{
    public string? Email { get; set; }
    public string? Name { get; set; }
    public string? IdentityId { get; set; }
    public required bool EmailVerified { get; set; }
}