using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.MerchantEmailHandlers;

public class WelcomeEmailHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        await Consumer!.StartAsync("merchant.welcome_email", async (WelcomeEmail welcomeEmail) =>
        {
            EmailTemplateService<WelcomeEmail> service = new WelcomeEmailTemplateService();
            var emailService = new EmailService<WelcomeEmail>(service);
            await emailService.Send(welcomeEmail.Contact.ContactEmail, "Welcome", welcomeEmail);

        });
    }
}