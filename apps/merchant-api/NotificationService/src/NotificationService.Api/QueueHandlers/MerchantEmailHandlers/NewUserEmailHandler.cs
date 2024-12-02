using MassTransit;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.MerchantEmailHandlers;

public class NewUserEmailHandler : IConsumer<NewUserEmail>
{
    public async Task Consume(ConsumeContext<NewUserEmail> context)
    {
        var newUserEmail = context.Message;
        EmailTemplateService<NewUserEmail> service = new NewUserEmailTemplateService();
        var emailService = new EmailService<NewUserEmail>(service);
        await emailService.Send(newUserEmail.Contact.ContactEmail, "New User", newUserEmail);
    }
}