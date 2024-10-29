using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.Dtos.Category;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class UpdateCategoryCommand(UpdateCategoryDto categoryDto) : IRequest<CategoryDto>
{
    public UpdateCategoryDto CategoryDto { get; } = categoryDto;
}