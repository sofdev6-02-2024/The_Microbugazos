using Commons.ResponseHandler.Handler.Concretes;
using Commons.ResponseHandler.Handler.Interfaces;
using FluentValidation;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Services;
using InventoryService.Application.Validators.Categories;
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
        
        services.AddTransient<ProductVariantService>();
        services.AddTransient<ProductService>();
        
        services.AddScoped<IResponseHandlingHelper, ResponseHandlingHelper>();
        
        services.AddScoped<IValidator<CreateCategoryDto>, CreateCategoryValidator>();
        services.AddScoped<IValidator<UpdateCategoryDto>, UpdateCategoryValidator>();

    }
}