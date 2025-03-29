using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.Users.Request.Commands;

public class NotifyLowStockUsersCommand : IRequest<BaseResponse>
{
    public Dictionary<Guid, List<OrderItem>> LowStockEmails { get; set; } = [];
}