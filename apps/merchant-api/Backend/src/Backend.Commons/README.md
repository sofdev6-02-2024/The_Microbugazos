# Merchant Common -  RabbitMQ Messaging Library

This library provides a simple interface for producing and consuming messages using RabbitMQ in .NET applications. It allows seamless integration of message queuing capabilities into your microservices.

#### Features

- Message Producer: Publish messages to RabbitMQ queues.
- Message Consumer: Consume messages from RabbitMQ queues with ease.
- Strongly Typed Messages: Serialize and deserialize messages using JSON.

#### Installation

To use this library, include it in your project. You can reference it directly from your solution or package it as a NuGet package.

#### Usage

- Step 1: Setup RabbitMQ Connection

    First, you need to set up the RabbitMQ connection in your ASP.NET application. The following code establishes a connection using the provided credentials:

    ```csharp

    builder.Services.AddSingleton(sp =>
    {
        var factory = new ConnectionFactory
        {
            HostName = "localhost",
            UserName = "merchantadmin",
            Password = "merchantpass",
            VirtualHost = "/",
            Port = 5672
        };
        return factory.CreateConnection();
    });
    ```

- Step 2: Register Message Producer and Consumer

    Register the message producer and consumer services in your ASP.NET application:

    ```csharp
    builder.Services.AddSingleton<IMessageProducer, MessageProducer>();
    builder.Services.AddSingleton<IMessageConsumer, MessageConsumer>();
    ```

- Step 3: Implement Message Consumer

    Create a hosted service to start the message consumer. This service will listen for messages on the specified queue and process them:

    ```csharp

    using MerchantCommon.RabbitMqMessaging.Services;
    using Microsoft.Extensions.Hosting;

    public class Consumer : IHostedService
    {
        private readonly IMessageConsumer _messageConsumer;

        public Consumer(IMessageConsumer messageConsumer)
        {
            _messageConsumer = messageConsumer;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            // Start consuming messages from the "**booking**" queue
            _messageConsumer.StartAsync<string>(**"booking"**, Console.WriteLine);
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return _messageConsumer.StopAsync(cancellationToken);
        }
    }
    // Register the hosted service
    builder.Services.AddHostedService<Consumer>();

    ```


- Step 4: Implement Message Producer

    You can implement a controller to publish messages to RabbitMQ. Here’s an example of how to create an API endpoint for publishing messages:

    ```csharp

    using MerchantCommon.RabbitMqMessaging.Services;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class PublishController : ControllerBase
    {
        private readonly IMessageProducer _messageProducer;

        public PublishController(IMessageProducer messageProducer)
        {
            _messageProducer = messageProducer;
        }

        [HttpGet]
        public IActionResult Publish()
        {
            _messageProducer.Publish("booking", "hello!");
            return Ok("Message published");
        }
    }
    ```
- Step 5: Run Your Application

    Run your ASP.NET application. The consumer will start listening for messages on the specified queue, and you can publish messages using the /api/publish endpoint.
    - Notes

        Ensure that RabbitMQ is installed and running on your machine or server.
        Modify the RabbitMQ connection settings as needed (e.g., HostName, UserName, Password, etc.) to match your RabbitMQ server configuration.

