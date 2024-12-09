using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.WishLists.Commands.Commands;

public class AddProductToWishListCommand(Guid userId, Guid productId) : IRequest<BaseResponse>
{
    public Guid UserId { get; set; } = userId;
    public Guid ProductId { get; set; } = productId;
}