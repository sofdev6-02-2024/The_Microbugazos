using Commons.Dto;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MediatR;
using MongoDB.Driver.Linq;
using ReviewService.Application.CommandsQueries.Commons;
using ReviewService.Application.CommandsQueries.ProductReview.Queries.Requests;
using ReviewService.Application.Dtos.ProductReview;
using ReviewService.Concretes;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Application.CommandsQueries.ProductReview.Queries.Handlers;

public class GetProductReviewByIdHandler(
    IRepository<Concretes.ProductReview> repository, 
    IValidator<PaginationRequest> validator,
    IResponseHandlingHelper responseHandlingHelper) 
    : IRequestHandler<GetProductReviewById, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetProductReviewById request, CancellationToken cancellationToken)
    {
        var result = await validator.ValidateAsync(request.PaginationRequest, cancellationToken);
        if (!result.IsValid)
            return responseHandlingHelper.BadRequest<PaginationRequest>("Bad pagination request");

        var response = await repository.GetByIdAsync(request.ProductId);
        if (response == null)
            return responseHandlingHelper.NotFound<Concretes.ProductReview>("Product review not found");
        double summationRating = 0;
        response.Reviews.ForEach(r => summationRating += r.IsActive ? r.Rating : 0);
        
        var paginatedReviews = response.Reviews
            .OrderByDescending(r => r.Rating)
            .ThenBy(r => r.CreatedAt)
            .Skip((request.PaginationRequest.Page - 1) * request.PaginationRequest.PageSize)
            .Take(request.PaginationRequest.PageSize).ToList();
        var paginatedResponse = new PaginatedResponseDto<Review>(
            paginatedReviews,
            response.Reviews.Count,
            request.PaginationRequest.Page,
            request.PaginationRequest.PageSize);
        
        return responseHandlingHelper.Ok("Product review found", new ProductReviewDto
        {
            AverageRating = Math.Round((summationRating / response.Reviews.Count(r => r.IsActive)), 1),
            Reviews = paginatedResponse
        });
    }
}