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
        var subcategories = category?.SubCategories.Select(subCategory => subCategory.Name).ToList();

        return new CategoryDto
        {
            Name = category?.Name,
            Id = category?.Id,
            SubCategories = subcategories
        };
    }
}