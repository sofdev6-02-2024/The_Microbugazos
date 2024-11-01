using InventoryService.Application.Dtos.Categories;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.Queries;

public class GetCategoryByIdQuery(Guid id) : IRequest<CategoryDto?>
{
    public Guid Id { get; set; } = id;
}