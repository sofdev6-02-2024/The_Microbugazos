using Commons.ResponseHandler.Responses.Concretes;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Commands.Commands;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
using InventoryService.Intraestructure.Types;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class ProductController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateProductDto request)
    {
        var result = await mediator.Send(new CreateProductCommand(request));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var result = await mediator.Send(new GetProductByIdQuery(id));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<ProductDto>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllProductsQuery(page, pageSize));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<PaginatedResponseDto<ProductDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteProductCommand(id));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }


    [HttpGet("store/{storeId}")]
    public async Task<IActionResult> GetProductsByStoreId(
        Guid storeId,
        int page = 1,
        int pageSize = 10,
        SortingType name = 0,
        SortingType price = 0,
        string search = "")
    {
        var result = await mediator.Send(new GetProductsByStoreIdQuery(
            storeId,
            page,
            pageSize,
            name,
            price,
            search
        ));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<PaginatedResponseDto<ProductDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
}