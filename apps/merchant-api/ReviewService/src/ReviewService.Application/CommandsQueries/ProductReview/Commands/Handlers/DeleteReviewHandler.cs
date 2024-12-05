using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using MongoDB.Driver;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Handlers;

public class DeleteReviewHandler(
    IRepository<Concretes.ProductReview> repository,
    IResponseHandlingHelper responseHandlingHelper) 
    : IRequestHandler<DeleteReview, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteReview request, CancellationToken cancellationToken)
    {
        var productReview = await repository.GetByIdAsync(request.ProductId);
        if (productReview == null)
            return responseHandlingHelper.NotFound<Concretes.ProductReview>("Product review not found");
        var review = productReview.Reviews.Find(r => r.ClientId == request.ClientId);
        if (review == null) 
            return responseHandlingHelper.NotFound<Review>("Client's review not found");
        
        var reviewsUpdated = productReview.Reviews.Where(r => r.ClientId != request.ClientId).ToList();
        review.IsActive = false;
        review.DeletedAt = DateTime.UtcNow;
        reviewsUpdated.Add(review);
        
        var updateBuilder = new UpdateDefinitionBuilder<Concretes.ProductReview>()
            .Set<List<Review>>(e => e.Reviews, reviewsUpdated);
        var response = await repository.UpdateAsync(request.ProductId, productReview, updateBuilder);

        return response > 0
            ? responseHandlingHelper.Ok("Review deleted successfully", review)
            : responseHandlingHelper.InternalServerError<Review>("Some error happens while try to delete review");
    }
}