using Ocelot.Middleware;

namespace ApiGateway.ServerConfigurations;

public static class SwaggerConfiguration
{
    public static void UseSwaggerConfig(this WebApplication app)
    {
        app.UseSwaggerForOcelotUI(opt =>
        {
            opt.PathToSwaggerGenerator = "/swagger/docs";
        })
        .UseOcelot()
        .Wait();

    }

}