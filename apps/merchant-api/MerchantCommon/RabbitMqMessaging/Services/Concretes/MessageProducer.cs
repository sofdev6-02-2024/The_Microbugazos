using System.Text;
using System.Text.Json;
using RabbitMQ.Client;

namespace MerchantCommon.RabbitMqMessaging.Services;
public class MessageProducer : IMessageProducer
{
    private readonly IConnection _connection;

    public MessageProducer(IConnection connection)
    {
        _connection = connection;
    }

    public void Publish<T>(string queueName, T message)
    {
        using var channel = _connection.CreateModel();
        channel.QueueDeclare(queueName, durable: true, exclusive: false);

        var jsonString = JsonSerializer.Serialize(message);
        var body = Encoding.UTF8.GetBytes(jsonString);

        channel.BasicPublish(exchange: "", routingKey: queueName, basicProperties: null, body: body);
    }
}
