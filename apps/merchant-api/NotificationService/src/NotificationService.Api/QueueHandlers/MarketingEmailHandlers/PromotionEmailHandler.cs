using MassTransit;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.MarketingEmailHandlers;

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