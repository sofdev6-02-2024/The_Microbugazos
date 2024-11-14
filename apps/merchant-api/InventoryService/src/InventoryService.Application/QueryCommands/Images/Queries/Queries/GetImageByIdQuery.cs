using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Queries.Queries;

public class GetImageByIdQuery(Guid id) : IRequest<BaseResponse>
{
    public Guid Id { get; set; } = id;
}