using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.Products;
using PaymentService.Application.QueryCommands.Orders.Queries.Queries;
using PaymentService.Application.Services.Clients;
using PaymentService.Application.Services.EnumsConverters;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.QueryCommands.Orders.Queries.QueryHandlers;

public class GetOrdersBySpecificUserAndDateQueryHandler(
    ProductClientService productClientService,
    IResponseHandlingHelper responseHandlingHelper,
    IOrderRepository orderRepository) : IRequestHandler<GetOrdersBySpecificUserAndDateQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetOrdersBySpecificUserAndDateQuery request, CancellationToken cancellationToken)
    {
        var orders = await orderRepository.GetAllOrdersBySpecificUserAsync(
            request.UserId, request.Page, request.PageSize);

        var converter = new OrderStatusConverterService();
        var register = new Dictionary<Guid, ProductDto>();
        var ordersDto = new List<OrderWithCompleteDetailsDto>();
        var ordersBySpecificUser = orders.ToList();
        
        if (ordersBySpecificUser.Count == 0)
            responseHandlingHelper.NotFound<Order>("The specified user does not have any order.");

        foreach (var order in ordersBySpecificUser)
        {
            var orderDto = new OrderWithCompleteDetailsDto
            {
                OrderNumber = order.OrderNumber,
                OrderStatus = converter.ConvertOrderStatusToString(order.OrderStatus),
                CreatedOrderDate = DateOnly.FromDateTime(order.CreatedAt),
                TotalPrice = order.TotalPrice,
            };
            
            foreach (var orderItem in order.OrderItems)
            {
                var productVariantDto = await productClientService.GetProductVariantByIdAsync(orderItem.ProductVariantId);
                if (productVariantDto == null)
                    return responseHandlingHelper.NotFound<ProductVariantDto>(
                        $"Product variant with follow id {orderItem.ProductVariantId} was not found.");
                
                var orderItemDto = new OrderItemWithCompletedDetailsDto();
                if (register.TryGetValue(orderItem.ProductVariantId, out var product))
                {
                    orderItemDto.ProductName = product.Name;
                    orderItemDto.Brand = product.Brand;
                    orderItemDto.ImageUrl = product.Images[0].Url;
                    orderItemDto.BasePrice = product.Price;
                }
                
                var productDto = await productClientService.GetProductByIdAsync(productVariantDto.ProductId);
                if (productDto == null)
                    return responseHandlingHelper.NotFound<ProductDto>(
                        $"Product with follow id {orderItem.ProductVariantId} was not found.");
                
                register[orderItem.ProductVariantId] = productDto;
                
                orderItemDto.ProductName = productDto.Name;
                orderItemDto.Brand = productDto.Brand;
                orderItemDto.ImageUrl = productDto.Images[0].Url;
                orderItemDto.BasePrice = productDto.Price;
                orderItemDto.OrderItemVariant.Quantity = orderItem.Quantity;
                orderItemDto.OrderItemVariant.UnitPrice = orderItem.UnitPrice;
                orderItemDto.OrderItemVariant.DiscountPercent = orderItem.DiscountPercent;
                orderItemDto.OrderItemVariant.SubTotalPrice = orderItem.TotalPrice;
                
                foreach (var item in productVariantDto.Attributes)
                {
                    orderItemDto.OrderItemVariant.Attributes.Add(new OrderAttributeDto
                    {
                        Attribute = item.Name,
                        Value = item.Value
                    });
                }
                
                orderDto.OrderItems.Add(orderItemDto);
            }
            ordersDto.Add(orderDto);
        }

        return responseHandlingHelper.Ok("Orders have been successfully obtained", ordersDto);
    }
}