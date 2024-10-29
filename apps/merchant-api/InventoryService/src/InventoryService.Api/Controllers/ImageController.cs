using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using Microsoft.AspNetCore.Mvc;
using MediatR;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ImageController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Dictionary<string, bool>>> Create([FromBody] CreateImageDto request)
    {
        var result = await mediator.Send(new CreateImageCommand(request));

        return Ok(new Dictionary<string, string>
        {
            { "result", result.Id.ToString() }
        });
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<ImageDto>> GetById(Guid id)
    {
        var image = await mediator.Send(new GetImageByIdQuery(id));
        return Ok(image);
    }
    
    [HttpGet]
    public async Task<ActionResult<List<ImageDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllImagesQuery(page, pageSize));
        return Ok(result);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateImageDto request)
    {
        if (id != request.ImageId) return BadRequest();
        var result = await mediator.Send(new UpdateImageCommand(request));
        
        return Ok(new Dictionary<string, ImageDto>
        {
            { "result", result }
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteImageCommand(id));
        
        return Ok(new Dictionary<string, bool>
        {
            { "result", result }
        });
    }
}