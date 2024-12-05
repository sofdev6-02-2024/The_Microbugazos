using AutoMapper;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Domain.Concretes;

namespace InventoryService.Application.Profiles;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>().ReverseMap();
        CreateMap<ProductDto, UpdateProductDto>().ReverseMap();
        CreateMap<Image, UpdateImageDto>().ReverseMap();
        CreateMap<Image, ProductVariantImageDto>().ReverseMap();
        CreateMap<ProductVariant, UpdateProductVariantDto>().ReverseMap();
    }
}