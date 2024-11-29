using RabbitMQ.Client;
using RabbitMqMessaging.Services.Concretes;
using RabbitMqMessaging.Services.Interfaces;

namespace PaymentService.Api;

public static class PublisherQueueConfiguration
{

    public static void AddQueueHandlers(this IServiceCollection services)
    {
        services.AddSingleton(sp =>
        {
            var factory = new ConnectionFactory
            {
                HostName = Environment.GetEnvironmentVariable("RABBITMQ_HOST"),
                UserName = Environment.GetEnvironmentVariable("RABBITMQ_USER"),
                Password = Environment.GetEnvironmentVariable("RABBITMQ_PASS"),
                VirtualHost = Environment.GetEnvironmentVariable("RABBITMQ_VHOST"),
                Port = int.Parse(Environment.GetEnvironmentVariable("RABBITMQ_PORT") ?? "5672")
            };
            return factory.CreateConnection();
        });

        services.AddSingleton<IMessageProducer, MessageProducer>();

    }
}