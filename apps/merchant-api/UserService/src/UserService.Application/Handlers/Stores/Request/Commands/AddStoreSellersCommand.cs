using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Commands;
public class AddStoreSellersCommand(Guid storeId, Guid? sellerId = null, string? sellerEmail = null)
    : IRequest<bool>
{
    public Guid StoreId { get; set; } = storeId;
    public Guid? SellerId { get; set; } = sellerId;
    public string? SellerEmail { get; set; } = sellerEmail;
}
