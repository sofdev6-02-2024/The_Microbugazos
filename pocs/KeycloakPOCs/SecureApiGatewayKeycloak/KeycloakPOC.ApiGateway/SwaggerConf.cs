using Microsoft.OpenApi.Models;

namespace KeycloakPOC.ApiGateway;

public static class SwaggerConf
{
    public static void ConfigureSwagger(this IServiceCollection services)
    {

        // Swagger Configuration with Keycloak Authentication
        services.AddSwaggerGen(o =>
        {
            o.CustomSchemaIds(id => id.FullName!.Replace('+', '-'));
            o.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.OAuth2,
                Flows = new OpenApiOAuthFlows
                {
                    Implicit = new OpenApiOAuthFlow
                    {
                        AuthorizationUrl = new Uri("http://localhost:5050/realms/merchant-realm/protocol/openid-connect/auth"),
                        Scopes = new Dictionary<string, string>
                        {
                    { "openid", "openid" },
                    { "profile", "profile" }
                        }
                    }
                }
            });

            var securityRequirement = new OpenApiSecurityRequirement
            {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                },
                In = ParameterLocation.Header,
                Name = "Bearer",
                Scheme = "Bearer"
            },
            new List<string>()
        }
            };
            o.AddSecurityRequirement(securityRequirement);
        });
    }

}