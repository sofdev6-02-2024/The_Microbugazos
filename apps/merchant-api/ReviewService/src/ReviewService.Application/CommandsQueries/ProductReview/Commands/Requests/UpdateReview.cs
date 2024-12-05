using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using ReviewService.Application.Dtos.Review;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;

public class UpdateReview(Guid productId, Guid clientId, UpdateReviewDto updateReviewDto) : IRequest<BaseResponse>
{
    public Guid ProductId { get; set; } = productId;
    public Guid ClientId { get; set; } = clientId;
    public UpdateReviewDto UpdateReviewDto { get; set; } = updateReviewDto;
}