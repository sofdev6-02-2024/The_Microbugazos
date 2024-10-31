using InventoryService.Application.Dtos.Categories;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class UpdateCategoryCommand(UpdateCategoryDto categoryDto) : IRequest<CategoryDto>
{
    public UpdateCategoryDto CategoryDto { get; } = categoryDto;
}