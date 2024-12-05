using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.Products;
using PaymentService.Application.Services.Clients;
using PaymentService.Domain.Entities.Concretes;

namespace PaymentService.Application.Services;

public class OrderItemsWithExtraDetailsService(
    ProductClientService productClientService, 
    IResponseHandlingHelper responseHandlingHelper)
{
    public async Task<BaseResponse> CreateOrderItemWithExtraDetailsDtoFromOrderItem(OrderItem orderItem,
        Dictionary<Guid, ProductDto> register)
    {
        var response = await ValidateIfDataCanBeFoundSuccessful(orderItem);
        if (!response.IsSuccess) return response;
        var successResponse = (SuccessResponse<ProductDto>)response;
        
        var productDto = successResponse.Data;
        var orderItemDto = GetOrderItemDtoUsingProductInformation(productDto, orderItem, register);
        return responseHandlingHelper.Created(
            "The order item Dto with extra details has been successful created", orderItemDto);
    }

    private async Task<BaseResponse> ValidateIfDataCanBeFoundSuccessful(OrderItem orderItem)
    {
        var productVariantDto = await productClientService.GetProductVariantByIdAsync(orderItem.ProductVariantId);
        if (productVariantDto == null)
            return responseHandlingHelper.NotFound<ProductVariantDto>(
                $"Product variant with follow id {orderItem.ProductVariantId} was not found.");
        
        var productDto = await productClientService.GetProductByIdAsync(productVariantDto.ProductId);
        if (productDto == null)
            return responseHandlingHelper.NotFound<ProductDto>(
                $"Product with follow id {orderItem.ProductVariantId} was not found.");

        if (productVariantDto.ProductVariantImage != null)
            productDto.Images[0].Url = productVariantDto.ProductVariantImage.Url;
        
        return responseHandlingHelper.Ok("Data successfully validated.", productDto);
    }

    private OrderItemWithCompletedDetailsDto GetOrderItemDtoUsingProductInformation(
        ProductDto productDto, OrderItem orderItem,  Dictionary<Guid, ProductDto> register)
    {
        var orderItemDto = new OrderItemWithCompletedDetailsDto();

        if (register.TryGetValue(orderItem.ProductVariantId, out var product))
        {
            orderItemDto.ProductName = product.Name;
            orderItemDto.Brand = product.Brand;
            orderItemDto.BasePrice = product.Price;
        }
        
        register[orderItem.ProductVariantId] = productDto;

        orderItemDto.ProductName = productDto.Name;
        orderItemDto.Brand = productDto.Brand;
        orderItemDto.BasePrice = productDto.Price;
        orderItemDto.ImageUrl = productDto.Images[0].Url;
        orderItemDto.OrderItemVariant.Quantity = orderItem.Quantity;
        orderItemDto.OrderItemVariant.UnitPrice = orderItem.UnitPrice;
        orderItemDto.OrderItemVariant.DiscountPercent = orderItem.DiscountPercent;
        orderItemDto.OrderItemVariant.SubTotalPrice = orderItem.TotalPrice;

        return orderItemDto;
    }
}