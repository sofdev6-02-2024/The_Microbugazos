using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Application.Handlers.Stores.Request.Queries;
using UserService.Application.Validators;

namespace UserService.Api.Controllers;

[ApiController]
[Route("api/stores")]
public class StoreController(IMediator mediator, IValidator<StoreDto> validator) : ControllerBase
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
        var validation = validator.Validate(storeDto);
        if (validation.IsValid == false)
        {
            return BadRequest(validation.Errors);
        }
        var newId = await mediator.Send(new CreateStoreCommand(storeDto));
        return Ok(newId);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<StoreDto>> UpdateStore([FromRoute] Guid id, [FromBody] StoreDto storeDto)
    {
        var validation = validator.Validate(storeDto);
        if (validation.IsValid == false)
        {
            return BadRequest(validation.Errors);
        }
        var updatedStore = await mediator.Send(new UpdateStoreCommand(id, storeDto));
        return Ok(updatedStore);
    }
    
    [HttpPost("{id}/sellers")]
    public async Task<ActionResult<bool>> AddSellers([FromRoute] Guid id, [FromBody] AddStoreSellersDto sellersDto)
    {
        try
        {
            var result = await mediator.Send(new AddStoreSellersCommand(id, sellersDto.SellerIds));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}/sellers")]
    public async Task<ActionResult<List<SellerDto>>> GetSellers([FromRoute] Guid id)
    {
        try
        {
            var sellers = await mediator.Send(new GetStoreSellersQuery(id));
            return Ok(sellers);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}