using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Images;
using InventoryService.Application.Dtos.Variants;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Queries.Queries;

public class GetAllVariantsQuery : IRequest<List<VariantDto>>;