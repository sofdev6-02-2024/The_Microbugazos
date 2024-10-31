using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetAllCategoriesQueryHandler(IRepository<Category> categoryRepository)
    : IRequestHandler<GetAllCategoriesQuery, List<CategoryDto>>
{
    public async Task<List<CategoryDto>> Handle(
        GetAllCategoriesQuery request, 
        CancellationToken cancellationToken)
    {
        var totalCategories = await categoryRepository.GetAllAsync();
        var categoriesToDisplay = new HashSet<string>();

        return (from category in totalCategories
            where categoriesToDisplay.Add(category.Name)
            let subcategories = category.SubCategories.Where(sc => categoriesToDisplay.Add(sc.Name))
                .Select(sc => new SubCategoryDto { Name = sc.Name, Id = sc.Id })
                .ToList()
            select new CategoryDto { Name = category.Name, Id = category.Id, SubCategories = subcategories }).ToList();
    }
}