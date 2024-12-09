using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;

public class DeleteReview(Guid productId, Guid clientId) : IRequest<BaseResponse>
{
    public Guid ProductId { get; set; } = productId;
    public Guid ClientId { get; set; } = clientId;
}