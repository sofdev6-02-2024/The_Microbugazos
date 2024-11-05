using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.Products.Commands.Commands;
using InventoryService.Application.Services;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.CommandHandlers;

public class CreateProductCommandHandler(
    IRepository<Product> productRepository,
    IRepository<Category> categoryRepository,
    IRepository<Image> imageRepository,
    ProductVariantService productVariantService) :
    IRequestHandler<CreateProductCommand, string>
{
    public async Task<string> Handle(CreateProductCommand request,
        CancellationToken cancellationToken)
    {
        var productDto = request.ProductDto;
        ICollection<Category> categories = new List<Category>();
        foreach (var categoryId in productDto.CategoryIds)
        {
            var categoryToAdd = await categoryRepository.GetByIdAsync(categoryId);
            if (categoryToAdd == null) throw new NullReferenceException($"Category with id {categoryId} not found");
            categories.Add(categoryToAdd);
        }
        
        var productToAdd = await productRepository.AddAsync(new Product
        {
            Name = productDto.Name,
            Description = productDto.Description,
            BasePrice = productDto.Price,
            Brand = productDto.Brand,
            Categories = categories
        });

        foreach (var imageDto in productDto.Images)
        {
            await imageRepository.AddAsync(new Image { ProductId = productToAdd.Id, Url = imageDto.Url, AltText = imageDto.AltText });
        }

        foreach (var productVariantDto in productDto.ProductVariants)
        {
            var createProductVariantDto = new CreateProductVariantDto
            {
                ProductId = productToAdd.Id,
                Image = productVariantDto.Image,
                PriceAdjustment = productVariantDto.PriceAdjustment,
                StockQuantity = productVariantDto.StockQuantity,
                Attributes = productVariantDto.Attributes
            };
            
            await productVariantService.CreateProductVariant(createProductVariantDto, productToAdd.Id);
        }

        return productToAdd.Id.ToString();
    }
}