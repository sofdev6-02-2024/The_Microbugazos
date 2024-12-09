using System.Reflection;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace RabbitMQMessaging.Extensions;

public static class Extensions
{
    public static IServiceCollection AddMassTransitWithRabbitMq(this IServiceCollection services, string serviceName, Type? type=null)
    {
        var rabbitMqConnectionString = Environment.GetEnvironmentVariable("RABBITMQ_CONNECTION_STRING");
        var rabbitMqUser = Environment.GetEnvironmentVariable("RABBITMQ_USER") ?? throw new("RABBITMQ_USER");
        var rabbitMqPass = Environment.GetEnvironmentVariable("RABBITMQ_PASS") ?? throw new("RABBITMQ_PASS");

        services.AddMassTransit(configure =>
        {
           if (type != null)
                configure.AddConsumers(Assembly.GetAssembly(type));
           

            configure.UsingRabbitMq((context, configurator) =>
            {
                var configuration = context.GetService<IConfiguration>();

                configurator.Host(rabbitMqConnectionString, h =>
                {
                    h.Username(rabbitMqUser);
                    h.Password(rabbitMqPass);
                });

                configurator.ConfigureEndpoints(context, new KebabCaseEndpointNameFormatter(serviceName, false));
                configurator.UseMessageRetry(retryConfigurator =>
                {
                    retryConfigurator.Exponential(5, TimeSpan.FromSeconds(1), TimeSpan.FromSeconds(30), TimeSpan.FromSeconds(5));
                });
            });

        });

        return services;
    }
}
