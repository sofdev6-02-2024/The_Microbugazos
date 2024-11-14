using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Categories;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class CreateCategoryCommand(CreateCategoryDto createCategoryDto) : IRequest<BaseResponse>
{
    public CreateCategoryDto CreateCategoryDto { get; set; } = createCategoryDto;
}