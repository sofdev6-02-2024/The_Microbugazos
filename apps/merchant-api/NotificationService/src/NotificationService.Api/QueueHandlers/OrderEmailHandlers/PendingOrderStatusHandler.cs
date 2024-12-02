using MassTransit;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

public class PendingOrderStatusHandler : IConsumer<PendingEmail>
{
    public async Task Consume(ConsumeContext<PendingEmail> context)
    {
        var pendingEmail = context.Message;
        EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-pending");
        var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
        await emailService.Send(pendingEmail.Contact.ContactEmail, "Order status", pendingEmail);

    }

}