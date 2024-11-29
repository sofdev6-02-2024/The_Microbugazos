using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.MerchantEmailHandlers;

public class NewUserEmailHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override Task StartAsync(CancellationToken cancellationToken)
    {
        return Consumer!.StartAsync("merchant.new_user", async (NewUserEmail newUserEmail) =>
        {
            EmailTemplateService<NewUserEmail> service = new NewUserEmailTemplateService();
            var emailService = new EmailService<NewUserEmail>(service);
            await emailService.Send(newUserEmail.Contact.ContactEmail, "New User", newUserEmail);
        });
    }
}