using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using NotificationService.Domain.Dtos.OrderItems;

namespace UserService.Application.Handlers.Users.Request.Commands;

public class NotifyLowStockUsersCommand : IRequest<BaseResponse>
{
    public Dictionary<Guid, List<OrderItem>> LowStockEmails { get; set; } = [];
}