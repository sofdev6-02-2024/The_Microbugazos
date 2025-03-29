using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;

namespace Backend.Api.QueueHandlers.MarketingEmailHandlers;

public class PromotionEmailHandler : IConsumer<PromotionEmail>
{
    public async Task Consume(ConsumeContext<PromotionEmail> context)
    {
        var promotionEmail = context.Message;
        EmailTemplateService<PromotionEmail> service = new PromotionEmailTemplateService();
        var emailService = new EmailService<PromotionEmail>(service);
        await emailService.Send(promotionEmail.Contact.ContactEmail, "Promotions", promotionEmail);

    }
}