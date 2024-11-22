using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Dtos.Stores;
using UserService.Application.Handlers.Stores.Request.Commands;
using UserService.Application.Handlers.Stores.Request.Queries;

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

    [HttpGet("user/{id}")]
    public async Task<ActionResult<StoreDto>> GetStoreByUserId([FromRoute] Guid id)
    {
        var store = await mediator.Send(new GetStoreByUserIdQuery(id));
        if (store == null)
        {
            return NotFound();
        }
        return Ok(store);
    }
    
    [HttpPost("{storeId}/sellers")]
    public async Task<IActionResult> AddSeller(Guid storeId, [FromBody] string sellerEmail)
    {
        try
        {
            var command = new AddStoreSellersCommand(storeId, null, sellerEmail);

            var result = await mediator.Send(command);
            return Ok(result);
        }
        catch (InvalidOperationException ex) when (ex.Message.Contains("already exists"))
        {
            return Conflict(new { message = ex.Message });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
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
    
    [HttpDelete("{id}/sellers/")]
    public async Task<ActionResult<bool>> DeleteSellers([FromRoute] Guid id, [FromBody] Guid sellerId)
    {
        try
        {
            var result = await mediator.Send(new DeleteStoreSellersCommand(id, sellerId));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("seller/{id}")]
    public async Task<ActionResult<StoreDto>> GetStoreForSeller([FromRoute] Guid id)
    {
        try
        {
            var store = await mediator.Send(new GetStoreForSellerQuery(id));
            if (store == null)
            {
                return NotFound();
            }
            return Ok(store);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}