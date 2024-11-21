using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using Commons.ResponseHandler.Responses.Concretes;
using PaymentService.Application.Dtos.Orders;
using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Repositories.Interfaces;

namespace PaymentService.Application.Services;

public class OrderService(
    IResponseHandlingHelper responseHandlingHelper,
    OrderItemService orderItemService,
    IRepository<Order> orderRepository
)
{
    public async Task<BaseResponse> CreateOrder(CreateOrderDto orderDto)
    {
        double totalPrice = 0;

        var orderToCreate = new Order
        {
            UserId = orderDto.UserId,
            OrderStatus = orderDto.OrderStatus,
        };
        
        await orderRepository.AddAsync(orderToCreate);

        foreach (var orderItemDto in orderDto.Items)
        {
            var response =  await orderItemService.CreateOrderItem(orderItemDto, orderToCreate.Id);
            if (response is ErrorResponse errorResponse)
                return errorResponse;

            var successResponse = (SuccessResponse<OrderItem>)response;
            totalPrice += successResponse.Data.TotalPrice;
        }
        
        orderToCreate.TotalPrice = totalPrice;
        await orderRepository.UpdateAsync(orderToCreate);

        return responseHandlingHelper.Created("Order has been successfully created.", orderToCreate.Id);
    }
}