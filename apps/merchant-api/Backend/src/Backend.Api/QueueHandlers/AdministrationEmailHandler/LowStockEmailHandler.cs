using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;

namespace Backend.Api.QueueHandlers.AdministrationEmailHandler;

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