using Commons.ResponseHandler.Responses.Concretes;

using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReviewService.Application.CommandsQueries.Commons;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Application.CommandsQueries.ProductReview.Queries.Requests;
using ReviewService.Application.Dtos.ProductReview;
using ReviewService.Application.Dtos.Review;
using ReviewService.Concretes;

namespace ReviewService.Api.Controllers;

[ApiController]
[Route("api/review/[controller]")]
public class ProductReviewController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create(CreateProductReviewDto productReview)
    {
        var result = await mediator.Send(new CreateProductReview(productReview));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        var successResponse = (SuccessResponse<ProductReview>)result;
        return StatusCode(successResponse.StatusCode, successResponse.Data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetProductReview(Guid id, int page, int pageSize)
    {
        var result = await mediator
            .Send(new GetProductReviewById(id, new PaginationRequest(page, pageSize)));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        var successResponse = (SuccessResponse<ProductReviewDto>)result;
        return StatusCode(successResponse.StatusCode, successResponse.Data);
    }

    [HttpPut("{productId}")]
    public async Task<ActionResult> AddReview(Guid productId, CreateReviewDto review)
    {
        var result = await mediator.Send(new AddReview(productId, review));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        var successResponse = (SuccessResponse<Review>)result;
        return StatusCode(successResponse.StatusCode, successResponse.Data);
    }
}