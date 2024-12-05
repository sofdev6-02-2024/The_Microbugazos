using AutoMapper;
using Commons.ResponseHandler.Handler.Concretes;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MediatR;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Application.Dtos.ProductReview;
using ReviewService.Infrastructure.Repositories.Interfaces;

namespace ReviewService.Application.CommandsQueries.ProductReview.Commands.Handlers;

public class CreateProductReviewHandler(
    IRepository<Concretes.ProductReview> repository,
    IValidator<CreateProductReviewDto> validator,
    IResponseHandlingHelper responseHandlingHelper,
    IMapper mapper) 
    : IRequestHandler<CreateProductReview, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateProductReview request, CancellationToken cancellationToken)
    {
        var result = await validator.ValidateAsync(request.ProductReview, cancellationToken);
        if (!result.IsValid) return responseHandlingHelper.BadRequest<CreateProductReviewDto>("Validations failed");
        
        var productReview = mapper.Map<Concretes.ProductReview>(request.ProductReview);
        await repository.AddAsync(productReview);
        return responseHandlingHelper.Created("Product review successfully added", productReview);
    }
}