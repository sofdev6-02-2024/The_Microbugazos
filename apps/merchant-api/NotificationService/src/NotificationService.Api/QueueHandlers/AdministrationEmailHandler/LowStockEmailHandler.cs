using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.AdministrationEmailHandlers;

public class LowStockEmailHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override Task StartAsync(CancellationToken cancellationToken)
    {
        return Consumer!.StartAsync("administrative.low_stock", async (LowStockEmail lowStockEmail) =>
        {
            EmailTemplateService<LowStockEmail> emailTemplateService = new LowStockEmailTemplaceService();
            var emailService = new EmailService<LowStockEmail>(emailTemplateService);
            await emailService.Send(lowStockEmail.Contact.ContactEmail, "Low stock", lowStockEmail);
        });
    }
}