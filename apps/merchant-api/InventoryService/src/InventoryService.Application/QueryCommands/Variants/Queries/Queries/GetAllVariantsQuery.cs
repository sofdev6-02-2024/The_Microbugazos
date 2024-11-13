using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.Queries;

public class GetAllVariantsQuery : IRequest<BaseResponse>;