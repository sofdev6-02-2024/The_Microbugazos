using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.Queries;

public class GetAllVariantsQuery : IRequest<BaseResponse>;