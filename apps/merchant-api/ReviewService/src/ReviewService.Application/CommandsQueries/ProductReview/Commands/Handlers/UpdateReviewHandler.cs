using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using MongoDB.Driver;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Handlers;

public class UpdateReviewHandler(
    IRepository<Concretes.ProductReview> repository,
    IResponseHandlingHelper responseHandlingHelper) 
    : IRequestHandler<UpdateReview, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateReview request, CancellationToken cancellationToken)
    {
        var productReview = await repository.GetByIdAsync(request.ProductId);
        if (productReview == null)
            return responseHandlingHelper.NotFound<Concretes.ProductReview>("Product review not found");
        var review = productReview.Reviews.Find(r => r.ClientId == request.ClientId && r.IsActive);
        if (review == null) return responseHandlingHelper.NotFound<Review>("Client's review not found");

        var reviewsExcluded = productReview.Reviews.Where(r => r.Id != review.Id);
        review.Comment = request.UpdateReviewDto.Comment ?? review.Comment;
        review.Rating = request.UpdateReviewDto.Rating ?? review.Rating;
        review.UpdatedAt = DateTime.UtcNow;
        var reviewsUpdated = reviewsExcluded.Append(review);

        var updateBuilder = new UpdateDefinitionBuilder<Concretes.ProductReview>()
            .Set<List<Review>>(e => e.Reviews, reviewsUpdated.ToList());
        var response = await repository.UpdateAsync(productReview.Id, productReview, updateBuilder);

        return response > 0
            ? responseHandlingHelper.Ok("Review updated successfully", review)
            : responseHandlingHelper.InternalServerError<Review>("Some error happens while review updating");
    }
}