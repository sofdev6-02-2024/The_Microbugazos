using MassTransit;
using NotificationService.Application.Services.Templates;
using NotificationService.Domain.Dtos.Emails;
using NotificationService.Infraestructure.EmailService;

namespace NotificationService.Api.QueueHandlers.OrderEmailHandlers;

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