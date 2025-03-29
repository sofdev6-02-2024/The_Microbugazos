using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates.OrdersStatus;
using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;
using MassTransit;

namespace Backend.Api.QueueHandlers.OrderEmailHandlers;

public class ConfirmedOrderStatusHandler : IConsumer<ConfirmedEmail>
{
    public async Task Consume(ConsumeContext<ConfirmedEmail> context)
    {
        var confirmedEmail = context.Message;
        EmailTemplateService<IOrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-confirmed");
        var emailService = new EmailService<IOrderStatusWithProductsEmail>(service);
        await emailService.Send(confirmedEmail.Contact.ContactEmail, "Order status", confirmedEmail);

    }
}