using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

public class PendingOrderStatusHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override Task StartAsync(CancellationToken cancellationToken)
    {
        return Consumer!.StartAsync("order_status.pending", async (PendingEmail pendingEmail) =>
        {
            EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-pending");
            var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
            await emailService.Send(pendingEmail.Contact.ContactEmail, "Order status", pendingEmail);

        });
    }
}