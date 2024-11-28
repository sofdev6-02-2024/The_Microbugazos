namespace RabbitMqMessaging.Services.Interfaces;
public interface IMessageConsumer
{
    Task StartAsync<T>(string queueName, Action<T> onMessageReceived, string retryExchangeName = "retry-exchange");

    Task StopAsync(CancellationToken cancellationToken);
}

