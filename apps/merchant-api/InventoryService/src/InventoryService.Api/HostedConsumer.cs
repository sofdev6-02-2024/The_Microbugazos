
using MerchantCommon.RabbitMqMessaging.Services;
using UserService.Domain.Entities.Concretes;

namespace UserService.Api.Controllers;

public class HostedConsumer(IMessageConsumer messageConsumer) : IHostedService
{
    public Task StartAsync(CancellationToken cancellationToken)
    {
        messageConsumer.StartAsync<User>("user-registry", (user) =>
        {
            Console.WriteLine("Message received: " + user.Email);
            Console.WriteLine("Message received: " + user.IdentityId);
            Console.WriteLine("Message received: " + user.Name);
        });
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        messageConsumer.StopAsync(cancellationToken);
        return Task.CompletedTask;
    }
}