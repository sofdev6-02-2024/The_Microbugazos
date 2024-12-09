using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Concretes;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.WishLists.Commands.Commands;
using InventoryService.Application.QueryCommands.WishLists.Queries.Queries;
using InventoryService.Commons.Params;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class WishListController(IMediator mediator) : ControllerBase
{
    [HttpPost("{userId:guid}/user/{productId:guid}/product")]
    public async Task<IActionResult> AddProductToWishList(Guid userId, Guid productId)
    {
        var result = await mediator.Send(new AddProductToWishListCommand(userId, productId));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse);   
    }
    
    [HttpDelete("{userId:guid}/user/{productId:guid}/product")]
    public async Task<IActionResult> RemoveProductToWishList(Guid userId, Guid productId)
    {
        var result = await mediator.Send(new RemoveProductToWishListCommand(userId, productId));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);   
    }
    
    [HttpGet("{userId:guid}/user")]
    public async Task<IActionResult> GetFavoriteProductsBySpecificUser(Guid userId, [FromQuery] ProductFilteringQueryParams queryParams,
        int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllProductsBySpecificUserQuery(userId, page, pageSize, queryParams));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<PaginatedResponseDto<ProductDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
}