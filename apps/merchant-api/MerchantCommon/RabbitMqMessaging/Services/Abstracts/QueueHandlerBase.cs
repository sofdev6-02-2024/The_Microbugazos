
using RabbitMqMessaging.Services.Interfaces;

namespace RabbitMQMessaging.Services.Abstracts;

public abstract class QueueHandlerBase(IMessageConsumer consumer)
{
    public IMessageConsumer? Consumer { get; set; } = consumer;
    public abstract Task StartAsync(CancellationToken cancellationToken);
    public async Task StopAsync(CancellationToken cancellationToken)
    {
        if (Consumer != null)
        {
            await Consumer.StopAsync(cancellationToken);
        }
    }
}