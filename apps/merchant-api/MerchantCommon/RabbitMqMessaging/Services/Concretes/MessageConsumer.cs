using System.Text;
using System.Text.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMqMessaging.Services.Interfaces;

namespace RabbitMqMessaging.Services.Concretes;

public class MessageConsumer : IMessageConsumer
{
    private readonly IConnection _connection;
    private readonly IModel _channel;
    private const int MaxRetryAttempts = 3;
    private const string RetryHeader = "x-retry-count";

    public MessageConsumer(IConnection connection)
    {
        _connection = connection;
        _channel = _connection.CreateModel();
    }

    public Task StartAsync<T>(string queueName, Action<T> onMessageReceived)
    {

        var consumer = new EventingBasicConsumer(_channel);

        consumer.Received += (model, args) =>
        {
            var body = args.Body.ToArray();
            var jsonString = Encoding.UTF8.GetString(body);
            HandleMessage(jsonString, onMessageReceived, args, queueName);
        };
        _channel.BasicConsume(queue: queueName, autoAck: false, consumer: consumer);
        return Task.CompletedTask;
    }


    private void HandleMessage<T>(string jsonString, Action<T> onMessageReceived, BasicDeliverEventArgs args, string queueName)
    {
        try
        {
            T? message = JsonSerializer.Deserialize<T>(jsonString);
            if (message != null)
            {
                onMessageReceived(message);
                _channel.BasicAck(deliveryTag: args.DeliveryTag, multiple: false);
            }
            else
            {
                RetryOrDeadLetter(args, queueName);
            }
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"Error deserializing message: {ex.Message}");
            RetryOrDeadLetter(args, queueName);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error processing message: {ex.Message}");
            RetryOrDeadLetter(args, queueName);
        }
    }


    private void RetryOrDeadLetter(BasicDeliverEventArgs args, string queueName)
    {
        var headers = args.BasicProperties.Headers;
        int retryCount = 0;

        if (headers != null && headers.ContainsKey(RetryHeader))
        {
            retryCount = Convert.ToInt32(headers[RetryHeader]);
        }

        retryCount++;

        if (retryCount > MaxRetryAttempts)
        {
            Console.WriteLine("Maximum retry attempts exceeded. Sending message to Dead Letter Exchange.");
            _channel.BasicNack(deliveryTag: args.DeliveryTag, multiple: false, requeue: false);
        }
        else
        {
            Console.WriteLine($"Retry attempt {retryCount} for message.");
            _channel.BasicNack(deliveryTag: args.DeliveryTag, multiple: false, requeue: true);
        }
    }


    public Task StopAsync(CancellationToken cancellationToken)
    {
        _channel?.Close();
        _connection?.Close();
        return Task.CompletedTask;
    }
}
