namespace RabbitMqMessaging.Services.Interfaces;
public interface IMessageConsumer
{
    Task StartAsync<T>(string queueName, Action<T> onMessageReceived);

    Task StopAsync(CancellationToken cancellationToken);
}

