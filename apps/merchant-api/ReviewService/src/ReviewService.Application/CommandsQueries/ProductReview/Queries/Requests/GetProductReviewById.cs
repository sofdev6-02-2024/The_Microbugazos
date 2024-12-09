using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using ReviewService.Application.CommandsQueries.Commons;

namespace ReviewService.Application.CommandsQueries.ProductReview.Queries.Requests;

public class GetProductReviewById(Guid productId, Guid? clientId, PaginationRequest paginationRequest) : IRequest<BaseResponse>
{
    public Guid ProductId { get; set; } = productId;
    public Guid? ClientId { get; set; } = clientId;
    public PaginationRequest PaginationRequest { get; set; } = paginationRequest;
}