namespace MerchantCommon.RabbitMqMessaging.Services;
public interface IMessageConsumer
{
    Task StartAsync<T>(string queueName, Action<T> onMessageReceived);
    Task StopAsync(CancellationToken cancellationToken);
}

