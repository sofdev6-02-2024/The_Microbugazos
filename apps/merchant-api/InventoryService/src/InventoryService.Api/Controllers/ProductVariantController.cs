using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Concretes;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class ProductVariantController(IMediator mediator, IResponseHandlingHelper responseHandlingHelper) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateProductVariantDto request)
    {
        var result = await mediator.Send(new CreateProductVariantCommand(request));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse); 
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductVariantDto>> GetById(Guid id)
    {
        var result = await mediator.Send(new GetProductVariantByIdQuery(id));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);

        var successResponse = (SuccessResponse<ProductVariantDto>)result;
        return StatusCode(successResponse.StatusCode, successResponse);    
    }
    
    [HttpGet("Product/{id}/Variants")]
    public async Task<ActionResult<List<ProductVariantDto>>> GetAllVariantsByProduct(Guid id, int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetProductsVariantsBySpecificProductQuery(id, page, pageSize));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<PaginatedResponseDto<ProductVariantDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<ProductVariantDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllProductVariantsQuery(page, pageSize));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<PaginatedResponseDto<ProductVariantDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);     
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductVariantDto request)
    {
        if (id != request.ProductVariantId) return StatusCode(400, responseHandlingHelper.BadRequest<Guid>(
            "The ID in the route and in the body of the request do not match."));
        
        var result = await mediator.Send(new UpdateProductVariantCommand(request));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<ProductVariantDto>)result;
        return StatusCode(successResponse.StatusCode, successResponse);   
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteProductVariantCommand(id));
        if (result is ErrorResponse errorResponse)
            return StatusCode(errorResponse.StatusCode, errorResponse);
        
        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);  
    }
}