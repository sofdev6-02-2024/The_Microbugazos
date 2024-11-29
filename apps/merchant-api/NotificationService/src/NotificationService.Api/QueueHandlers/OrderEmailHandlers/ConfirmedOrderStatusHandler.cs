using MassTransit;
using NotificationService.Application.Services;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

public class ConfirmedOrderStatusHandler : IConsumer<ConfirmedEmail>
{
    public async Task Consume(ConsumeContext<ConfirmedEmail> context)
    {
        var confirmedEmail = context.Message;
        EmailTemplateService<OrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-confirmed");
        var emailService = new EmailService<OrderStatusWithProductsEmail>(service);
        await emailService.Send(confirmedEmail.Contact.ContactEmail, "Order status", confirmedEmail);

    }
}