using Commons.ResponseHandler.Responses.Concretes;

using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Application.Dtos.ProductReview;
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
}