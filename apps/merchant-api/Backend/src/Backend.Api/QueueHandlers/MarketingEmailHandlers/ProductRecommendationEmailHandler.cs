using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;

namespace Backend.Api.QueueHandlers.MarketingEmailHandlers;

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