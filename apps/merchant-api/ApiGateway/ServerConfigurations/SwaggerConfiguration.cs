using Microsoft.OpenApi.Models;
using Ocelot.Middleware;

namespace ApiGateway.ServerConfigurations
{
    public static class SwaggerConfiguration
    {
        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Inventory Service", Version = "v1" });
                c.SwaggerDoc("v2", new OpenApiInfo { Title = "User Service", Version = "v1" });
                c.SwaggerDoc("v3", new OpenApiInfo { Title = "Payment Service", Version = "v1" });
            });
        }

        public static void UseSwaggerConfig(this WebApplication app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("http://localhost:5001/swagger/inventory", "Inventory Service V1");
                c.SwaggerEndpoint("http://localhost:5001/swagger/user", "User Service V1");
                c.SwaggerEndpoint("http://localhost:5001/swagger/payment", "Payment Service V1");
                c.RoutePrefix = string.Empty;
            });
        }
    }
}
