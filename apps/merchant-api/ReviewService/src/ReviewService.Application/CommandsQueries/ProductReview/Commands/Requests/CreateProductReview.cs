using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using ReviewService.Application.Dtos.ProductReview;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;

public class CreateProductReview(CreateProductReviewDto productReview) : IRequest<BaseResponse>
{
    public CreateProductReviewDto ProductReview { get; set; } = productReview;
}