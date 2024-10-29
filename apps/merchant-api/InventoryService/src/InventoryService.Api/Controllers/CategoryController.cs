using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.Dtos.Category;
using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateCategoryDto request)
    {
        var result = await mediator.Send(new CreateCategoryCommand(request));

        return Ok(new Dictionary<string, string>
        {
            { "result", result.Id.ToString() }
        });
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetById(Guid id)
    {
        var category = await mediator.Send(new GetCategoryByIdQuery(id));
        return Ok(category);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<CategoryDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllCategoriesQuery(page, pageSize));
        return Ok(result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateCategoryDto request)
    {
        if (id != request.Id) return BadRequest();
        var result = await mediator.Send(new UpdateCategoryCommand(request));
        
        return Ok(new Dictionary<string, CategoryDto>
        {
            { "result", result }
        });
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteCategoryCommand(id));
        
        return Ok(new Dictionary<string, bool>
        {
            { "result", result }
        });
    }
}