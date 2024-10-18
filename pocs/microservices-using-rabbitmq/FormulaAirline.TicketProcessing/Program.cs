using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;


Console.WriteLine("Hello, World!");
Console.WriteLine("Press [enter] to exit");


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


channel.ExchangeDeclare(exchange: "booking", type: ExchangeType.Direct);

var consumer = new EventingBasicConsumer(channel);



consumer.Received += (model, args) =>
{
    var body = args.Body.ToArray();
    var message = Encoding.UTF8.GetString(body);
    Console.WriteLine($" [x] Received {message}");
};

channel.BasicConsume(queue: "booking", autoAck: true, consumer: consumer);
Console.ReadKey();