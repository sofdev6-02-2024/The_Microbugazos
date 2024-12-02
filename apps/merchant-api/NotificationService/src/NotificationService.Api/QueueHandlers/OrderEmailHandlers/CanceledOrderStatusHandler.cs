using MassTransit;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;
namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

public class CanceledOrderStatusHandler : IConsumer<CanceledEmail>
{
    public async Task Consume(ConsumeContext<CanceledEmail> context)
    {
        var canceledEmail = context.Message;
        EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-canceled");
        var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
        await emailService.Send(canceledEmail.Contact.ContactEmail, "Order status", canceledEmail);

    }
}
