using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class UpdateCategoryCommandHandler(IRepository<Category> categoryRepository) : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryDto = request.CategoryDto;
        var categoryToUpdate = await categoryRepository.GetByIdAsync(categoryDto.Id);

        if (categoryToUpdate == null) throw new ArgumentException("The requested category was not found.");
        
        categoryToUpdate.Name = categoryDto.Name ?? categoryToUpdate.Name;
        categoryToUpdate.ParentCategoryId = categoryDto.ParentCategoryId ?? categoryToUpdate.ParentCategoryId;
        categoryToUpdate.IsActive = categoryDto.IsActive ?? categoryToUpdate.IsActive;
        
        await categoryRepository.UpdateAsync(categoryToUpdate);
        var subcategories = categoryToUpdate.SubCategories.Select(subCategory => new SubCategoryDto
        {
            Id = subCategory.Id,
            Name = subCategory.Name
        }).ToList();
        
        return new CategoryDto
        {
            Id = categoryToUpdate.Id,
            Name = categoryToUpdate.Name,
            SubCategories = subcategories
        };
    }
}