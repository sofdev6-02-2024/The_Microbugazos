using InventoryService.Application.Dtos.Variants;
using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Application.QueryCommands.Variants.Queries.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VariantController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateVariantDto request)
    {
        var result = await mediator.Send(new CreateVariantCommand(request));

        return Ok(new Dictionary<string, string>
        {
            { "result", result.Id.ToString() }
        });
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<VariantDto>> GetById(Guid id)
    {
        var image = await mediator.Send(new GetVariantByIdQuery(id));
        return Ok(image);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<VariantDto>>> GetAll()
    {
        var result = await mediator.Send(new GetAllVariantsQuery());
        return Ok(result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateVariantDto request)
    {
        if (id != request.Id) return BadRequest();
        var result = await mediator.Send(new UpdateVariantCommand(request));
        
        return Ok(new Dictionary<string, VariantDto>
        {
            { "result", result }
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteVariantCommand(id));
        
        return Ok(new Dictionary<string, bool>
        {
            { "result", result }
        });
    }
}