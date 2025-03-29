using Backend.Application.Dtos.Auth;

namespace Backend.Application.Services.Auth.Interfaces;

public interface IJwtDecoder
{
    Task<AuthToken?> DecodeJwtToken(string token);
}
