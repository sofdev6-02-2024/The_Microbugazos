using System.Text;
using System.Text.Json;
using RabbitMQ.Client;

namespace FormulaAirline.API.Services
{
    public class MessageProcuder : IMessageProducer
    {
        public void SendMessage<T>(T message)
        {
            var factory = new ConnectionFactory()
            {
                HostName = "localhost",
                UserName = "danuser",
                Password = "danpassword",
                VirtualHost = "/",
                Port = 5672
            };

            var conn = factory.CreateConnection();


            using var channel = conn.CreateModel();

            channel.QueueDeclare("booking", durable: true, exclusive: false);

            var jsonString = JsonSerializer.Serialize(message);

            var body = Encoding.UTF8.GetBytes(jsonString);

            channel.BasicPublish(exchange: "", routingKey: "booking", basicProperties: null, body: body);
        }
    }
}