using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Application.Handlers.Stores.Request.Queries;

namespace UserService.Api.Controllers;

[ApiController]
[Route("api/stores")]
public class StoreController(IMediator mediator) : ControllerBase
{

    [HttpGet("{id}")]
    public async Task<ActionResult<StoreDto?>> GetStoreById([FromRoute] Guid id)
    {
        var store = await mediator.Send(new GetStoreByIdQuery(id));
        if (store == null)
        {
            return NotFound();
        }
        return Ok(store);
    }

    [HttpPost]

    public async Task<ActionResult<Guid>> CreateStore([FromBody] StoreDto storeDto)
    {
        var newId = await mediator.Send(new CreateStoreCommand(storeDto));
        return Ok(newId);
    }

    [HttpPost("{id}")]
    public async Task<ActionResult<StoreDto>> UpdateStore([FromRoute] Guid id, [FromBody] StoreDto storeDto)
    {
        var updatedStore = await mediator.Send(new UpdateStoreCommand(id, storeDto));
        return Ok(updatedStore);

    }
}