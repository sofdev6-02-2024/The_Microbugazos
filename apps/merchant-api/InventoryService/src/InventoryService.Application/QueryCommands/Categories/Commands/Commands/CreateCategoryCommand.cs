using InventoryService.Application.Dtos.Categories;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.Commands;

public class CreateCategoryCommand(CreateCategoryDto createCategoryDto) : IRequest<BaseResponse>
{
    public CreateCategoryDto CreateCategoryDto { get; set; } = createCategoryDto;
}