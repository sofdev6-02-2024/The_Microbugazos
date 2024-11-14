using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Categories;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class UpdateCategoryCommand(UpdateCategoryDto categoryDto) : IRequest<BaseResponse>
{
    public UpdateCategoryDto CategoryDto { get; } = categoryDto;
}