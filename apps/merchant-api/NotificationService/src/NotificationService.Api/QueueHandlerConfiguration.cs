using NotificationService.Api.QueueHandlers;
using NotificationService.Api.QueueHandlers.AdministrationEmailHandlers;
using NotificationService.Api.QueueHandlers.MarketingEmailHandlers;
using NotificationService.Api.QueueHandlers.MerchantEmailHandlers;
using NotificationService.Api.QueueHandlers.OrderEmailHandlers;
using RabbitMQ.Client;
using RabbitMqMessaging.Services.Concretes;
using RabbitMqMessaging.Services.Interfaces;
namespace NotificationService.Api;

public static class QueueConfiguration
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
        services.AddSingleton<IMessageConsumer, MessageConsumer>();
        services.AddHostedService(sp =>
        {
            var messageConsumer = sp.GetRequiredService<IMessageConsumer>();
            var consumer = new NotificationConsumer(
                sp.GetRequiredService<ILogger<NotificationConsumer>>(),
                [
                    new LowStockEmailHandler(messageConsumer),
                    new NewUserEmailHandler(messageConsumer),
                    new WelcomeEmailHandler(messageConsumer),
                    new PromotionEmailHandler(messageConsumer),
                    new ProductRecommendationEmailHandler(messageConsumer),
                    new OrderEmailHandler(messageConsumer),
                    new ConfirmedOrderStatusHandler(messageConsumer),
                    new CanceledOrderStatusHandler(messageConsumer),
                    new PendingOrderStatusHandler(messageConsumer)
                ]
            );
            return consumer;
        });
    }
}