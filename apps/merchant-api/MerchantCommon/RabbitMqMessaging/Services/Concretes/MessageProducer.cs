using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMqMessaging.Services.Interfaces;

namespace RabbitMqMessaging.Services.Concretes;

public class MessageProducer : IMessageProducer
{
    private readonly IConnection _connection;

    public MessageProducer(IConnection connection)
    {
        _connection = connection;
    }

    private void PublishToExchange<T>(string exchangeName, string exchangeType, string routingKey, T message)
    {
        using var channel = _connection.CreateModel();

        channel.ExchangeDeclare(exchange: exchangeName, type: exchangeType, durable: true, autoDelete: false);

        var jsonString = JsonSerializer.Serialize(message);
        var body = Encoding.UTF8.GetBytes(jsonString);

        channel.BasicPublish(exchange: exchangeName, routingKey: routingKey, basicProperties: null, body: body);
    }

    public void PublishToDirectExchange<T>(string exchangeName, string routingKey, T message)
    {
        PublishToExchange(exchangeName, ExchangeType.Direct, routingKey, message);
    }

    public void PublishToFanoutExchange<T>(string exchangeName, T message)
    {
        PublishToExchange(exchangeName, ExchangeType.Fanout, "", message);
    }

    public void PublishToTopicExchange<T>(string exchangeName, string routingKey, T message)
    {
        PublishToExchange(exchangeName, ExchangeType.Topic, routingKey, message);
    }
}
