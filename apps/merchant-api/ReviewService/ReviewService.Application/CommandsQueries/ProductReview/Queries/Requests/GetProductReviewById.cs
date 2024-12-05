using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace ReviewService.Application.Queries;

public class GetProductReviewById : IRequest<BaseResponse>
{
    public Guid ProductId { get; set; }
}