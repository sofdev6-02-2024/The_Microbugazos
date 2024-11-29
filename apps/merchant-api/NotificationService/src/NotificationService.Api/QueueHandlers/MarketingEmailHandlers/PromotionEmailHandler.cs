using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.MarketingEmailHandlers;

public class PromotionEmailHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        await Consumer!.StartAsync("marketing.promotion", async (PromotionEmail promotionEmail) =>
        {
            EmailTemplateService<PromotionEmail> service = new PromotionEmailTemplateService();
            var emailService = new EmailService<PromotionEmail>(service);
            await emailService.Send(promotionEmail.Contact.ContactEmail, "Promotions", promotionEmail);
        });
    }
}