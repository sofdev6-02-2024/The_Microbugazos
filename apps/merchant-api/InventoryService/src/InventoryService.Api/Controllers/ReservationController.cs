using Commons.ResponseHandler.Responses.Concretes;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Reservations;
using InventoryService.Application.QueryCommands.Reservations.Commands.Commands;
using InventoryService.Application.QueryCommands.Reservations.Queries.Queries;
using InventoryService.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class ReservationController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] CreateReservationDto request)
    {
        var result = await mediator.Send(new CreateReservationCommand(request));

        if (result is ErrorResponse errorResponse)
        {
            return StatusCode(errorResponse.StatusCode, errorResponse);
        }

        var successResponse = (SuccessResponse<Guid>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpGet]
    public async Task<ActionResult<List<InventoryReservationDto>>> GetAll(int page = 1, int pageSize = 10)
    {
        var result = await mediator.Send(new GetAllReservationsQuery(page, pageSize));

        if (result is ErrorResponse errorResponse)
        {
            return StatusCode(errorResponse.StatusCode, errorResponse);
        }

        var successResponse = (SuccessResponse<PaginatedResponseDto<InventoryReservationDto>>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<InventoryReservationDto>> GetById(Guid id)
    {
        var result = await mediator.Send(new GetReservationByIdQuery(id));

        if (result is ErrorResponse errorResponse)
        {
            return StatusCode(errorResponse.StatusCode, errorResponse);
        }

        var successResponse = (SuccessResponse<InventoryReservationDto>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var result = await mediator.Send(new DeleteReservationCommand(id));

        if (result is ErrorResponse errorResponse)
        {
            return StatusCode(errorResponse.StatusCode, errorResponse);
        }

        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpPatch("completed/{id}")]
    public async Task<ActionResult> CompleteReservation(Guid id)
    {
        var result = await mediator.Send(new UpdateReservationStatusCommand(id, ReservationStatus.COMPLETED));

        if (result is ErrorResponse errorResponse)
        {
            return StatusCode(errorResponse.StatusCode, errorResponse);
        }

        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }

    [HttpPatch("cancel/{id}")]
    public async Task<ActionResult> CancelReservation(Guid id)
    {
        var result = await mediator.Send(new UpdateReservationStatusCommand(id, ReservationStatus.CANCELED));

        if (result is ErrorResponse errorResponse)
        {
            return StatusCode(errorResponse.StatusCode, errorResponse);
        }

        var successResponse = (SuccessResponse<bool>)result;
        return StatusCode(successResponse.StatusCode, successResponse);
    }
}