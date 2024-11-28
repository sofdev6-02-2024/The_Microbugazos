using System.Diagnostics;
using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using InventoryService.Application.Comparers.Image;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.CommandHandlers;

public class UpdateProductCommandHandler(
    IValidator<UpdateProductDto> validator,
    IProductRepository productRepository,
    IRepository<Category> categoryRepository,
    IRepository<Image> imageRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IMapper mapper
    ) : 
    IRequestHandler<UpdateProductCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var productDto = request.ProductDto;
        var previousStatusProduct = await productRepository.GetByIdAsync(request.Id);
        
        var response = await validator.ValidateAsync(productDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<UpdateProductDto>(
            "The operation to update a product was not completed, please check the errors",
            response.Errors.Select(e => e.ErrorMessage).ToList());

        ICollection<Category> categories = new List<Category>();
        foreach (var categoryId in productDto.CategoryIds)
        {
            var categoryToAdd = await categoryRepository.GetByIdAsync(categoryId);
            if (categoryToAdd == null) return responseHandlingHelper.NotFound<CategoryDto>(
                "The category with the follow id " + categoryId + " was not found");
            categories.Add(categoryToAdd);
        }
        
        Debug.Assert(previousStatusProduct != null, nameof(previousStatusProduct) + " != null");
        previousStatusProduct.StoreId = productDto.StoreId;
        previousStatusProduct.Name = productDto.Name;
        previousStatusProduct.Description = productDto.Description;
        previousStatusProduct.BasePrice = productDto.Price;
        previousStatusProduct.Brand = productDto.Brand;
        previousStatusProduct.Categories = categories;
        
        await productRepository.UpdateAsync(previousStatusProduct);

        var status = await HandleImagesUpdate(
            request.Id,
            previousStatusProduct.Images.Select(mapper.Map<UpdateImageDto>).ToList(), 
            productDto.Images);
        return responseHandlingHelper.Ok("Product Updated", request.ProductDto);
    }

    private async Task<bool> HandleImagesUpdate(
        Guid productId,
        ICollection<UpdateImageDto> previousImages,
        ICollection<UpdateImageDto> currentImages)
    {
        try
        {
            var currentImagesDto = currentImages
                .Select(mapper.Map<UpdateImageDto>)
                .ToList();
            var comparer = new ImageEntityComparer();
            var newImages = currentImagesDto.Except(previousImages, comparer);
            var deletedImages = previousImages.Except(currentImagesDto, comparer);
        
            foreach (UpdateImageDto image in newImages)
            {
                if (image.AltText == null || image.Url == null) return false;
                await imageRepository.AddAsync(new Image
                {
                    ProductId = productId,
                    AltText = image.AltText!,
                    Url = image.Url,
                });
            }
        
            foreach (UpdateImageDto image in deletedImages)
            {
                await imageRepository.DeleteAsync(image.Id);
            }

            return true;
        }
        catch
        {
            return false;
        }
    }
}
