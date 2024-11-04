namespace MerchantCommon.RabbitMqMessaging.Services;

public interface IMessageProducer
{
  void Publish<T>(string queueName, T message);
}