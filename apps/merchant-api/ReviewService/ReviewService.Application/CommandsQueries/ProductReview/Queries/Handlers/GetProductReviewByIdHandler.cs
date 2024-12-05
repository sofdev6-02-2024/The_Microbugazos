using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using ReviewService.Application.Dtos.ProductReview;

namespace ReviewService.Application.Queries.Handlers;

public class GetProductReviewByIdHandler : IRequestHandler<GetProductReviewById, BaseResponse>
{
    public Task<BaseResponse> Handle(GetProductReviewById request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}