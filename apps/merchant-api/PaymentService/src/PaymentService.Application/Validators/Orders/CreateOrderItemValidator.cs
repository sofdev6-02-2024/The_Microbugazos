using FluentValidation;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Services.Clients;
namespace PaymentService.Application.Validators.Orders;

public class CreateOrderItemValidator : AbstractValidator<CreateOrderItemDto>
{
    public CreateOrderItemValidator(ProductClientService productClientService)
    {
        RuleFor(item => item.ProductVariantId)
            .NotNull().WithMessage("Product Variant ID cannot be null.")
            .NotEmpty().WithMessage("Product Variant ID is required.")
            .MustAsync(async (productVariantId, _) =>
            {
                var productVariantExists = await productClientService.GetProductVariantByIdAsync(productVariantId);
                return productVariantExists != null;
            }).WithMessage("Product Variant does not exist.");

        RuleFor(item => item.Quantity)
            .GreaterThan(0).WithMessage("Quantity must be greater than 0.")
            .MustAsync(async (item, quantity, _) =>
            {
                var productVariant = await productClientService.GetProductVariantByIdAsync(item.ProductVariantId);
                return productVariant != null && productVariant.StockQuantity >= quantity;
            })
            .WithMessage(_ => "Requested quantity exceeds available stock.");

        RuleFor(item => item.DiscountPercent)
            .InclusiveBetween(0, 100)
            .WithMessage("DiscountPercent must be between 0 and 100.");
    }
}