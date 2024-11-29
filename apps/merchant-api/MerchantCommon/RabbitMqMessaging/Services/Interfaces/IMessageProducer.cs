namespace RabbitMqMessaging.Services.Interfaces;
public interface IMessageProducer
{
  void PublishToDirectExchange<T>(string exchangeName, string routingKey, T message);
  void PublishToFanoutExchange<T>(string exchangeName, T message);
  void PublishToTopicExchange<T>(string exchangeName, string routingKey, T message);
}