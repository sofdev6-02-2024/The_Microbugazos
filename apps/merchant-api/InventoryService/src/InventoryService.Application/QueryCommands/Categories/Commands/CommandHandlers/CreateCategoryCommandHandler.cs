using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class CreateCategoryCommandHandler(IRepository<Category> categoryRepository) : IRequestHandler<CreateCategoryCommand, Category>
{
    public async Task<Category> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryDto = request.CreateCategoryDto;
        if (string.IsNullOrEmpty(categoryDto.Name)) throw new ArgumentException("Name is required fields.");

        var category = new Category
        {
            Name = categoryDto.Name,
            ParentCategoryId = categoryDto.ParentCategoryId
        };
        
        await categoryRepository.AddAsync(category);
        return category;
    }
}