using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
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
    IMapper mapper) 
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
            return responseHandlingHelper.Ok("Review added successfully", request.Review);
        }

        var clientReview = productReview.Reviews.Find(r => r.ClientId == request.Review.ClientId); 
        if (clientReview is { IsActive: true })
            return responseHandlingHelper.BadRequest<Review>("Client already make review for this product");
        
        var reviewsUpdated = productReview.Reviews;
        reviewsUpdated.Add(mapper.Map<Review>(request.Review));
        var updateBuilder = new UpdateDefinitionBuilder<Concretes.ProductReview>()
            .Set<List<Review>>(e => e.Reviews, reviewsUpdated);
        var response = await repository.UpdateAsync(request.ProductId, productReview, updateBuilder);
        if (response < 0) 
            return responseHandlingHelper.InternalServerError<Review>("Some error happens while try to add review"); 
        return responseHandlingHelper.Ok("Review added successfully", mapper.Map<Review>(request.Review));
    }
}