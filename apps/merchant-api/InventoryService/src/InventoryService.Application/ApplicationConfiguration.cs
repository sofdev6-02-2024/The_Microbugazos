using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.Services;
using InventoryService.Commons.ResponseHandler.Handler.Concretes;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace InventoryService.Application;

public static class ApplicationConfiguration
{
    public static void AddApplication(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
            cfg.RegisterServicesFromAssemblies(typeof(CreateImageDto).Assembly)
        );
        services.AddScoped<IRepository<Category>, CategoryRepository>();
        services.AddScoped<IRepository<Product>, ProductRepository>();
        services.AddScoped<IRepository<Image>, ImageRepository>();
        services.AddScoped<IRepository<ProductAttribute>, ProductAttributeRepository>();
        services.AddScoped<IRepository<ProductReview>, ProductReviewRepository>();
        services.AddScoped<IRepository<ProductVariant>, ProductVariantRepository>();
        services.AddScoped<IRepository<Variant>, VariantRepository>();
        
        services.AddScoped<IResponseHandlingHelper, ResponseHandlingHelper>();
        
        services.AddTransient<ProductVariantService>();
        services.AddTransient<ProductService>();
    }
}