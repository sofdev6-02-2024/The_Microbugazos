using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class CreateCategoryCommandHandler(IRepository<Category> categoryRepository, IResponseHandlingHelper responseHandlingHelper) : 
    IRequestHandler<CreateCategoryCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryDto = request.CreateCategoryDto;
        if (string.IsNullOrEmpty(categoryDto.Name)) return responseHandlingHelper.BadRequest<CategoryDto>("The field name is requires.");
        
        var category = new Category
        {
            Name = categoryDto.Name,
            ParentCategoryId = categoryDto.ParentCategoryId
        };
        
        category = await categoryRepository.AddAsync(category);
        return responseHandlingHelper.Created("The category was added successfully.", category.Id);
    }
}