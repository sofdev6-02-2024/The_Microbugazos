using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;

namespace Backend.Api.QueueHandlers.MerchantEmailHandlers;

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