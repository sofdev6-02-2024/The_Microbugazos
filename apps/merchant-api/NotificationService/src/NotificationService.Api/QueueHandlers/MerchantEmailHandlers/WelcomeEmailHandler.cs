using MassTransit;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.MerchantEmailHandlers;

public class WelcomeEmailHandler : IConsumer<WelcomeEmail>
{
    public async Task Consume(ConsumeContext<WelcomeEmail> context)
    {
        var welcomeEmail = context.Message;
        EmailTemplateService<WelcomeEmail> service = new WelcomeEmailTemplateService();
        var emailService = new EmailService<WelcomeEmail>(service);
        await emailService.Send(welcomeEmail.Contact.ContactEmail, "Welcome", welcomeEmail);
    }
}