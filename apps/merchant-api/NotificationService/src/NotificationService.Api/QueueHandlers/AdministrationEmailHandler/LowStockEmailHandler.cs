using MassTransit;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.AdministrationEmailHandlers;

public class LowStockEmailHandler : IConsumer<LowStockEmail>
{
    public async Task Consume(ConsumeContext<LowStockEmail> context)
    {
        var lowStockEmail = context.Message;
        EmailTemplateService<LowStockEmail> emailTemplateService = new LowStockEmailTemplaceService();
        var emailService = new EmailService<LowStockEmail>(emailTemplateService);
        await emailService.Send(lowStockEmail.Contact.ContactEmail, "Low stock", lowStockEmail);
    }
}