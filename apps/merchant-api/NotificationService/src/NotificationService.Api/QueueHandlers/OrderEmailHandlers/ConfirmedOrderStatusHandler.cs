using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

public class ConfirmedOrderStatusHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        await Consumer!.StartAsync("order_status.confirmed", async (ConfirmedEmail confirmedEmail) =>
        {
            EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-confirmed");
            var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
            await emailService.Send(confirmedEmail.Contact.ContactEmail, "Order status", confirmedEmail);
        });
    }
}