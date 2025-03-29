using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;

namespace Backend.Api.QueueHandlers.MerchantEmailHandlers;

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