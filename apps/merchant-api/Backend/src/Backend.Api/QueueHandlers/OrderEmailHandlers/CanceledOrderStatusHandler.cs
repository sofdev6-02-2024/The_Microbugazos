using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates.OrdersStatus;
using Backend.Domain.Entities.Concretes.Emails.OrderStatusEmails;
using Backend.Domain.Entities.Interfaces.OrderStatusEmails;
using MassTransit;

namespace Backend.Api.QueueHandlers.OrderEmailHandlers;

public class CanceledOrderStatusHandler : IConsumer<CanceledEmail>
{
    public async Task Consume(ConsumeContext<CanceledEmail> context)
    {
        var canceledEmail = context.Message;
        EmailTemplateService<IOrderStatusWithProductsEmail> service = new StatusWithProductTemplateService("order-canceled");
        var emailService = new EmailService<IOrderStatusWithProductsEmail>(service);
        await emailService.Send(canceledEmail.Contact.ContactEmail, "Order status", canceledEmail);

    }
}
