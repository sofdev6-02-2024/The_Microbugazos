using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace NotificationService.Api;

public static class SwaggerConf
{
    public static void ConfigureSwagger(this IServiceCollection services)
    {
        services.AddSwaggerGen(o =>
        {
            ConfigureApiKeyBearer(o);
            AddApiKeyRequirement(o);
        });
    }

    private static void ConfigureApiKeyBearer(SwaggerGenOptions o)
    {
        o.AddSecurityDefinition("ApiKeyBearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter the JWT token with the 'Bearer ' prefix",
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
    }

    private static void AddApiKeyRequirement(SwaggerGenOptions o)
    {
        o.AddSecurityRequirement(new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "ApiKeyBearer"
                    },
                    Scheme = "Bearer",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                },
                new List<string>()
            }
        });
    }
}
