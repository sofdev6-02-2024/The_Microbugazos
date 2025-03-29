using Commons.ResponseHandler.Handler.Concretes;
using Commons.ResponseHandler.Handler.Interfaces;
using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.PaymentTransactions;
using PaymentService.Application.Services;
using PaymentService.Application.Services.Clients;
using PaymentService.Application.Validators.Orders;
using PaymentService.Application.Validators.PaymentTransactions;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;
using RabbitMqMessaging.Extensions;

namespace PaymentService.Application;

public static class ApplicationConfiguration
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblies(typeof(CreateOrderDto).Assembly)
        );
        
        services.AddScoped<IOrderRepository, OrderRepository>();
        services.AddScoped<IRepository<OrderItem>, OrderItemRepository>();
        services.AddScoped<IRepository<PaymentMethod>, PaymentMethodRepository>();
        services.AddScoped<IRepository<PaymentTransaction>, PaymentTransactionRepository>();
        
        services.AddTransient<OrderItemService>();
        services.AddTransient<OrderService>();
        services.AddTransient<OrderItemsWithExtraDetailsService>();
        services.AddTransient<PaymentTransactionService>();
        
        services.AddScoped<IResponseHandlingHelper, ResponseHandlingHelper>();
        services.AddTransient<ProductClientService>();
        services.AddMassTransitWithRabbitMq("payment");
        
        services.AddScoped<IValidator<CreateOrderDto>, CreateOrderValidator>();
        services.AddScoped<IValidator<CreatePaymentTransactionDto>, CreatePaymentTransactionValidator>();
    }
}