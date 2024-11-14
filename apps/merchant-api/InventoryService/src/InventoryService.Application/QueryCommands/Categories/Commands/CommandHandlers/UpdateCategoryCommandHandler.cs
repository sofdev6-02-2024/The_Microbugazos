using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class UpdateCategoryCommandHandler(IRepository<Category> categoryRepository, IResponseHandlingHelper responseHandlingHelper) : IRequestHandler<UpdateCategoryCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryDto = request.CategoryDto;
        var categoryToUpdate = await categoryRepository.GetByIdAsync(categoryDto.Id);
        if (categoryToUpdate == null) return responseHandlingHelper.NotFound<Category>(
            $"The category with the follow id '{categoryDto.Id}' was not found.");
        
        categoryToUpdate.Name = categoryDto.Name ?? categoryToUpdate.Name;
        categoryToUpdate.ParentCategoryId = categoryDto.ParentCategoryId ?? categoryToUpdate.ParentCategoryId;
        categoryToUpdate.IsActive = categoryDto.IsActive ?? categoryToUpdate.IsActive;
        await categoryRepository.UpdateAsync(categoryToUpdate);
        
        var subcategories = categoryToUpdate.SubCategories.Select(subCategory => new SubCategoryDto
        {
            Id = subCategory.Id,
            Name = subCategory.Name
        }).ToList();
        
        var categoryToDisplay = new CategoryDto
        {
            Id = categoryToUpdate.Id,
            Name = categoryToUpdate.Name,
            SubCategories = subcategories
        };
        
        return responseHandlingHelper.Ok("The category has been successfully updated.", categoryToDisplay);
    }
}