using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace MerchantCommon.RabbitMqMessaging.Services
{
    public class MessageConsumer : IMessageConsumer
    {
        private readonly IConnection _connection;
        private IModel _channel;

        public MessageConsumer(IConnection connection)
        {
            _connection = connection;
            _channel = _connection.CreateModel();
        }


        public Task StartAsync<T>(string queueName, Action<T> onMessageReceived)
        {
            _channel.ExchangeDeclare(exchange: queueName, type: ExchangeType.Direct, durable: true, autoDelete: false);
            _channel.QueueDeclare(queueName, durable: true, exclusive: false);

            var consumer = new EventingBasicConsumer(_channel);

            consumer.Received += (model, args) =>
            {
                var body = args.Body.ToArray();
                var jsonString = Encoding.UTF8.GetString(body);

                try
                {
                    T? message = JsonSerializer.Deserialize<T>(jsonString);
                    if (message != null)
                    {
                        onMessageReceived(message);
                    }
                }
                catch (JsonException ex)
                {
                    Console.WriteLine($"Error al deserializar el mensaje: {ex.Message}");
                }
            };

            _channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);

            return Task.CompletedTask;
        }


        public Task StopAsync(CancellationToken cancellationToken)
        {
            _channel?.Close();
            _connection?.Close();
            return Task.CompletedTask;
        }
    }
}
