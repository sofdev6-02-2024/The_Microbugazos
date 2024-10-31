using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Categories;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.Queries;

public class GetAllCategoriesQuery : IRequest<List<CategoryDto>>;