using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetCategoryByIdQueryHandler(IRepository<Category> categoryRepository)
: IRequestHandler<GetCategoryByIdQuery, CategoryDto?>
{
    public async Task<CategoryDto?> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(request.Id);
        return new CategoryDto
        {
            FatherCategoryName = categoryRepository.GetByIdAsync(category!.ParentCategoryId.GetValueOrDefault()).Result?.Name,
            Name = category.Name,
            Id = category.Id
        };
    }
}