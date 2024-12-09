using AutoMapper;
using Commons.Messages;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MassTransit;
using MediatR;
using MongoDB.Driver;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Application.Dtos.Review;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Handlers;

public class AddReviewHandler(
    IRepository<Concretes.ProductReview> repository,
    IValidator<CreateReviewDto> validator,
    IResponseHandlingHelper responseHandlingHelper,
    IMapper mapper,
    IBus producer) 
    : IRequestHandler<AddReview, BaseResponse>
{
    public async Task<BaseResponse> Handle(AddReview request, CancellationToken cancellationToken)
    {
        var result = await validator.ValidateAsync(request.Review, cancellationToken);
        if (!result.IsValid)
            return responseHandlingHelper.BadRequest<CreateReviewDto>(
                "Validations failed",
                result.Errors.Select(e => e.ErrorMessage).ToList());
        var productReview = await repository.GetByIdAsync(request.ProductId);
        
        if (productReview == null)
        {
            await repository.AddAsync(new Concretes.ProductReview
            {
                ProductId = request.ProductId,
                Reviews = [mapper.Map<Review>(request.Review)]
            });
            return responseHandlingHelper.Ok("Review added successfully", mapper.Map<Review>(request.Review));
        }

        var clientReview = productReview.Reviews.Find(r => r.ClientId == request.Review.ClientId); 
        if (clientReview is { IsActive: true })
            return responseHandlingHelper.BadRequest<Review>("Client already make review for this product");
        
        var reviewsUpdated = productReview.Reviews;
        reviewsUpdated.Add(mapper.Map<Review>(request.Review));
        var updateBuilder = new UpdateDefinitionBuilder<Concretes.ProductReview>()
            .Set<List<Review>>(e => e.Reviews, reviewsUpdated);
        
        var response = await repository.UpdateAsync(productReview.Id, productReview, updateBuilder);

        float ratingSummation = reviewsUpdated.Aggregate(0, (i, review) => i + review.Rating);
        var averageRating = ratingSummation / reviewsUpdated.Count;
        
        await producer.Publish(new RatingMessage
        {
            ProductId = request.ProductId,
            Rating = averageRating
        });
        
        if (response < 0) 
            return responseHandlingHelper.InternalServerError<Review>("Some error happens while try to add review"); 
        return responseHandlingHelper.Ok("Review added successfully", mapper.Map<Review>(request.Review));
    }
}