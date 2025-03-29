using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates.OrdersStatus;
using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;
using MassTransit;

namespace Backend.Api.QueueHandlers.OrderEmailHandlers;

public class PendingOrderStatusHandler : IConsumer<PendingEmail>
{
    public async Task Consume(ConsumeContext<PendingEmail> context)
    {
        var pendingEmail = context.Message;
        EmailTemplateService<IOrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-pending");
        var emailService = new EmailService<IOrderStatusWithProductsEmail>(service);
        await emailService.Send(pendingEmail.Contact.ContactEmail, "Order status", pendingEmail);

    }

}