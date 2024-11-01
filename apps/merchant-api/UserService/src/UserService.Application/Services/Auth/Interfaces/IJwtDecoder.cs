using UserService.Application.Dtos.Auth;

namespace UserService.Application.Services.Auth.Interfaces;

public interface IJwtDecoder
{
    Task<AuthToken?> DecodeJwtToken(string token);
}
