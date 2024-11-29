using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers;

public class NotificationConsumer(ILogger<NotificationConsumer> logger, IList<QueueHandlerBase> queueHandlers) : IHostedService
{
    public async Task StartAsync(CancellationToken cancellationToken)
    {
        logger.LogInformation("Starting queue handlers");
        foreach (var queueHandler in queueHandlers)
        {
            await queueHandler.StartAsync(cancellationToken);
        }
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        foreach (var queueHandler in queueHandlers)
        {
            await queueHandler.StopAsync(cancellationToken);
        }
        logger.LogInformation("Queue handlers stopped");
    }
}