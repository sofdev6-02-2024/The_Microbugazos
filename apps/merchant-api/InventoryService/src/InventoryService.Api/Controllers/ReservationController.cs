using Commons.ResponseHandler.Responses.Concretes;
using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Reservations;
using InventoryService.Application.QueryCommands.Reservations.Queries.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class ReservationController(IMediator mediator) : ControllerBase
{
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
}