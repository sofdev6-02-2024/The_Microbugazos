using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using PaymentService.Application.Dtos;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.QueryCommands.Orders.Queries.Queries;
using PaymentService.Application.Services.Clients;
using PaymentService.Application.Services.EnumsConverters;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.QueryCommands.Orders.Queries.QueryHandlers;

public class GetAllOrdersQueryHandler(
    ProductClientService productClientService,
    IResponseHandlingHelper responseHandlingHelper,
    IRepository<Order> orderRepository
    ) : IRequestHandler<GetAllOrdersQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllOrdersQuery request, CancellationToken cancellationToken)
    {
        var totalOrders = await orderRepository.GetAllAsync(request.Page, request.PageSize);
        var converter = new OrderStatusConverterService();
        List<OrderDto> totalOrderDtos = [];
        
        foreach (var order in totalOrders)
        {
            var orderDto = new OrderDto
            {
                OrderId = order.Id,
                UserId = order.UserId,
                OrderStatus = converter.ConvertOrderStatusToString(order.OrderStatus),
                TotalPrice = order.TotalPrice,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    OrderItemId = oi.Id,
                    ProductId = productClientService.GetProductVariantByIdAsync(oi.ProductVariantId).Result.ProductId,
                    ProductVariantId = oi.ProductVariantId,
                    Quantity = oi.Quantity,
                    UnitPrice = oi.UnitPrice,
                    DiscountPercent = oi.DiscountPercent,
                    SubTotalPrice = oi.TotalPrice
                }).ToList()
            };
            totalOrderDtos.Add(orderDto);
        }
        
        var paymentTransactionsToDisplay = new PaginatedResponseDto<OrderDto>
        {
            Items = totalOrderDtos, 
            TotalCount = totalOrderDtos.Count, 
            Page = request.Page, 
            PageSize = request.PageSize
        };
        return responseHandlingHelper.Ok("Orders have been successfully obtained.", paymentTransactionsToDisplay);
    }
}