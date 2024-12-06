using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using ReviewService.Application.Dtos.Review;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;

public class AddReview(Guid productId, CreateReviewDto review) : IRequest<BaseResponse>
{
    public Guid ProductId { get; set; } = productId;
    public CreateReviewDto Review { get; set; } = review;
}