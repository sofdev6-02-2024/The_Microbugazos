using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Commands;
public class AddStoreSellersCommand : IRequest<bool>
{
    public Guid StoreId { get; set; }
    public List<Guid> SellerIds { get; set; } = new();

    public AddStoreSellersCommand(Guid storeId, List<Guid> sellerIds)
    {
        StoreId = storeId;
        SellerIds = sellerIds;
    }
}
