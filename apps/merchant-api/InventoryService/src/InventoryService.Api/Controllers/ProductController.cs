using InventoryService.Application.Dtos.Products;
using InventoryService.Application.QueryCommands.Products.Commands.Commands;
using InventoryService.Application.QueryCommands.Products.Queries.Queries;
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

        return Ok(new Dictionary<string, string>
        {
            { "result", result }
        });

    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var image = await mediator.Send(new GetProductByIdQuery(id));
        return Ok(image);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllProductsQuery(page, pageSize));
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteProductCommand(id));
        
        return Ok(new Dictionary<string, bool>
        {
            { "result", result }
        });
    }
}