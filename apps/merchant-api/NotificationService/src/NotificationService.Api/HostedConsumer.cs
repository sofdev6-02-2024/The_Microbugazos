
using InventoryService.Application.Dtos.Images;
using MerchantCommon.RabbitMqMessaging.Services;

namespace NotificationService.Api;


public class HostedConsumer(IMessageConsumer messageConsumer) : IHostedService
{

    public Task StartAsync(CancellationToken cancellationToken)
    {
        messageConsumer.StartAsync<CreateImageDto>("", (image) =>
        {
            Console.WriteLine($"Received: {image.ProductId}");
            Console.WriteLine($"Received: {image.AltText}");
            Console.WriteLine($"Received: {image.Url}");

        });

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        messageConsumer.StopAsync(cancellationToken);
        return Task.CompletedTask;
    }
}