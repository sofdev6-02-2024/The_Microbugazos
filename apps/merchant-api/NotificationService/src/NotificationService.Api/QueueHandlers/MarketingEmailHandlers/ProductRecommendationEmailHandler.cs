using MassTransit;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.MarketingEmailHandlers;

public class ProductRecommendationEmailHandler : IConsumer<ProductRecommendationEmail>
{
    public async Task Consume(ConsumeContext<ProductRecommendationEmail> context)
    {
        var productRecommendationEmail = context.Message;
        EmailTemplateService<ProductRecommendationEmail> service = new ProductRecommendationEmailTemplateService();
        var emailService = new EmailService<ProductRecommendationEmail>(service);
        await emailService.Send(productRecommendationEmail.Contact.ContactEmail, "Product recommendation", productRecommendationEmail);

    }
}