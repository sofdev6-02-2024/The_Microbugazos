using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace DefaultNamespace;

public class GetProductsByStore(Guid id, int page, int pageSize) : IRequest<BaseResponse>
{
    public Guid StoreId { get; set; } = id;
    public int Page { get; set; } = page;
    public int PageSize { get; set; } = pageSize;
}