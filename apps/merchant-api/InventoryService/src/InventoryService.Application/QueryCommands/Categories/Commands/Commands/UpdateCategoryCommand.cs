using InventoryService.Application.Dtos.Categories;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class UpdateCategoryCommand(UpdateCategoryDto categoryDto) : IRequest<BaseResponse>
{
    public UpdateCategoryDto CategoryDto { get; } = categoryDto;
}