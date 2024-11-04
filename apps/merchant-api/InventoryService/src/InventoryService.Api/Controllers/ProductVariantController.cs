using InventoryService.Application.Dtos.ProductVariants;
using InventoryService.Application.QueryCommands.ProductVariants.Commands.Commands;
using InventoryService.Application.QueryCommands.ProductVariants.Queries.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class ProductVariantController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateProductVariantDto request)
    {
        var result = await mediator.Send(new CreateProductVariantCommand(request));

        return Ok(new Dictionary<string, string>
        {
            { "result", result.ProductVariantId.ToString() }
        });
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductVariantDto>> GetById(Guid id)
    {
        var image = await mediator.Send(new GetProductVariantByIdQuery(id));
        return Ok(image);
    }
    
    [HttpGet("Product/{id}/Variants")]
    public async Task<ActionResult<List<ProductVariantDto>>> GetAllVariantsByProduct(Guid id, int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetProductsVariantsBySpecificProductQuery(id, page, pageSize));
        return Ok(result);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<ProductVariantDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllProductVariantsQuery(page, pageSize));
        return Ok(result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductVariantDto request)
    {
        if (id != request.ProductVariantId) return BadRequest();
        var result = await mediator.Send(new UpdateProductVariantCommand(request));
        
        return Ok(new Dictionary<string, ProductVariantDto>
        {
            { "result", result }
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteProductVariantCommand(id));
        
        return Ok(new Dictionary<string, bool>
        {
            { "result", result }
        });
    }
}