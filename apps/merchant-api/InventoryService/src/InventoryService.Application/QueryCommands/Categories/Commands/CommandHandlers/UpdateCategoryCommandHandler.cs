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
        var fatherCategoryName = categoryRepository.GetByIdAsync(categoryToUpdate.ParentCategoryId.GetValueOrDefault()).Result?.Name;
        
        await categoryRepository.UpdateAsync(categoryToUpdate);
        return new CategoryDto
        {
            FatherCategoryName = fatherCategoryName,
            Id = categoryToUpdate.Id,
            Name = categoryToUpdate.Name,
        };
    }
}