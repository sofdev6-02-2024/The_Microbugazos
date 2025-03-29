using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.Stores.Request.Queries;

public class GetStoreForSellerQuery(Guid sellerId) : IRequest<BaseResponse?>
{
    public Guid SellerId { get; set; } = sellerId;
}
