using InventoryService.Application.Dtos.Images;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Queries.Queries;

public class GetImageByIdQuery(Guid id) : IRequest<ImageDto?>
{
    public Guid Id { get; set; } = id;
}