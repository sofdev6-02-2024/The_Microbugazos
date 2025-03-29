using Backend.Application.Services.Email.Bases;
using Backend.Application.Services.Email.Concretes;
using Backend.Application.Services.Email.Templates;
using Backend.Domain.Entities.Concretes.Emails;
using MassTransit;

namespace Backend.Api.QueueHandlers.OrderEmailHandlers;

public class OrderEmailHandler : IConsumer<OrderEmail>
{
    public async Task Consume(ConsumeContext<OrderEmail> context)
    {
        var orderEmail = context.Message;
        EmailTemplateService<OrderEmail> service = new InvoiceEmailTemplateService();
        var emailService = new EmailService<OrderEmail>(service);
        await emailService.Send(orderEmail.Contact.ContactEmail, "Invoice", orderEmail);

    }
}