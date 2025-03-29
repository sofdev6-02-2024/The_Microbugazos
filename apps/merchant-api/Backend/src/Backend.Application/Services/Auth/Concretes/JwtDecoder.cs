using System.IdentityModel.Tokens.Jwt;
using System.Text.Json;
using Backend.Application.Dtos.Auth;
using Backend.Application.Services.Auth.Interfaces;

namespace Backend.Application.Services.Auth.Concretes;

public class JwtDecoder : IJwtDecoder
{
    public Task<AuthToken?> DecodeJwtToken(string token)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        var jsonPayload = jwtToken.Payload.SerializeToJson();

        var authToken = JsonSerializer.Deserialize<AuthToken>(jsonPayload);

        return Task.FromResult(authToken);
    }
}
