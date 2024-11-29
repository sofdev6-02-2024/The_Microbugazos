using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

public class OrderEmailHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        await Consumer!.StartAsync("order.new_order", async (OrderEmail orderEmail) =>
        {
            EmailTemplateService<OrderEmail> service = new InvoiceEmailTemplateService();
            var emailService = new EmailService<OrderEmail>(service);
            await emailService.Send(orderEmail.Contact.ContactEmail, "Invoice", orderEmail);
        });
    }
}