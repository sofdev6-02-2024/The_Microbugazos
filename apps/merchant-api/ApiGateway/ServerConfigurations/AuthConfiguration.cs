
using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace ApiGateway.ServerConfigurations;

public static class AuthConfiguration
{
    public static void ConfigureAuth(this IServiceCollection services)
    {
        string authority = Env.GetString("AUTH_JWT_AUTHORITY");
        string audience = Env.GetString("AUTH_JWT_AUDIENCE");
        services.AddAuthorization();
        services.AddAuthentication(
            options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }
        )
        .AddJwtBearer(
            options =>
            {
                options.Authority = authority;
                options.Audience = audience;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuer = authority,
                    ValidateAudience = true,
                    ValidAudience = audience,
                    ValidateLifetime = true
                };
            }
        );

    }
}