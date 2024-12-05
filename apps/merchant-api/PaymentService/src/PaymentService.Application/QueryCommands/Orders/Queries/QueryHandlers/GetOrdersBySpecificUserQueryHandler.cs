using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using MediatR;
using PaymentService.Application.Dtos;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Application.Dtos.Products;
using PaymentService.Application.QueryCommands.Orders.Queries.Queries;
using PaymentService.Application.Services;
using PaymentService.Commons.EnumsConverters;
using PaymentService.Commons.Params;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.QueryCommands.Orders.Queries.QueryHandlers;

public class GetOrdersBySpecificUserQueryHandler(
    OrderItemsWithExtraDetailsService orderItemsWithExtraDetailsService,
    IResponseHandlingHelper responseHandlingHelper,
    IOrderRepository orderRepository) : IRequestHandler<GetOrdersBySpecificUserQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetOrdersBySpecificUserQuery request, CancellationToken cancellationToken)
    {
        UpdateDatesFormat(request.FilterParameters);
        
        var orders = await orderRepository.GetAllOrdersBySpecificUserAsync(
            request.UserId, request.FilterParameters, request.Page, request.PageSize);
        var ordersList = orders.ToList();
        if (ordersList.Count == 0)  
            return responseHandlingHelper.Ok(
                "Orders have been successfully obtained", new PaginatedResponseDto<OrderWithCompleteDetailsDto>
                {
                    Items = [],
                    Page = request.Page,
                    PageSize = 0,
                    TotalCount = 0
                });

        var converterStatusOrder = new OrderStatusConverterService();
        var converterStatusPayment = new PaymentStatusConverterService();
        var register = new Dictionary<Guid, ProductDto>();
        var ordersDto = new List<OrderWithCompleteDetailsDto>();
        var totalCount = await orderRepository.GetCountBySpecificUserAsync(request.UserId, request.FilterParameters);

        foreach (var order in ordersList)
        {
            var orderDto = new OrderWithCompleteDetailsDto
            {
                OrderNumber = order.OrderNumber,
                OrderStatus = converterStatusOrder.ConvertOrderStatusToString(order.OrderStatus),
                PaymentStatus = converterStatusPayment.ConvertPaymentStatusToString(order.PaymentTransaction!.TransactionOrderStatus),
                //TODO: apply here manage disccount
                Discount = 0,
                SubTotalPrice = order.TotalPrice,
                CreatedOrderDate = DateOnly.FromDateTime(order.CreatedAt),
                TotalPrice = order.TotalPrice,
            };
            
            foreach (var orderItem in order.OrderItems)
            {
                var response = await orderItemsWithExtraDetailsService.
                    CreateOrderItemWithExtraDetailsDtoFromOrderItem(orderItem, register);
                if (!response.IsSuccess) return response;
                
                var successResponse = (SuccessResponse<OrderItemWithCompletedDetailsDto>)response;
                if (successResponse.Data != null) orderDto.OrderItems.Add(successResponse.Data);
            }
            ordersDto.Add(orderDto);
        } return responseHandlingHelper.Ok(
            "Orders have been successfully obtained", new PaginatedResponseDto<OrderWithCompleteDetailsDto>
            {
                Items = ordersDto,
                Page = request.Page,
                PageSize = ordersDto.Count,
                TotalCount = totalCount
            });
    }

    private void UpdateDatesFormat(OrderFilterParameters orderFilterParameters)
    {
        if (orderFilterParameters.StartDate.HasValue)
            orderFilterParameters.StartDate = DateTime.SpecifyKind(orderFilterParameters.StartDate.Value, DateTimeKind.Utc);
        if (orderFilterParameters.EndDate.HasValue)
            orderFilterParameters.EndDate = DateTime.SpecifyKind(orderFilterParameters.EndDate.Value, DateTimeKind.Utc);
    }
}