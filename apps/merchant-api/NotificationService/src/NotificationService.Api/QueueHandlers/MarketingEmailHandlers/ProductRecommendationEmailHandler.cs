using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
using RabbitMqMessaging.Services.Interfaces;
using RabbitMQMessaging.Services.Abstracts;

namespace NotificationService.Api.QueueHandlers.MarketingEmailHandlers;

public class ProductRecommendationEmailHandler(IMessageConsumer consumer) : QueueHandlerBase(consumer)
{
    public override async Task StartAsync(CancellationToken cancellationToken)
    {
        await Consumer!.StartAsync("marketing.recommendation", async (ProductRecommendationEmail productRecommendationEmail) =>
        {
            EmailTemplateService<ProductRecommendationEmail> service = new ProductRecommendationEmailTemplateService();
            var emailService = new EmailService<ProductRecommendationEmail>(service);
            await emailService.Send(productRecommendationEmail.Contact.ContactEmail, "Product recommendation", productRecommendationEmail);
        });
    }
}