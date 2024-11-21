using MediatR;

namespace UserService.Application.Handlers.Stores.Request.Commands;

public class DeleteStoreSellersCommand : IRequest<bool>
{
    public Guid StoreId { get; set; }
    public List<Guid> SellerIds { get; set; } = new();

    public DeleteStoreSellersCommand(Guid storeId, List<Guid> sellerIds)
    {
        StoreId = storeId;
        SellerIds = sellerIds;
    }
}