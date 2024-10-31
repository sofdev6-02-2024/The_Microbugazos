using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;
using System.Linq;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetAllCategoriesQueryHandler(IRepository<Category> categoryRepository) 
    : IRequestHandler<GetAllCategoriesQuery, List<CategoryDto>>
{
    public async Task<List<CategoryDto>> Handle(
        GetAllCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var totalCategories = await categoryRepository.GetAllAsync();
        var categories = totalCategories.ToList();
        
        var mainCategories = categories
            .Where(c => !categories.Any(parent => 
                parent.SubCategories.Any(sub => sub.Name == c.Name)))
            .Distinct();

        var totalCategoriesDto = mainCategories
            .Select(category => new CategoryDto
            {
                Name = category.Name,
                Id = category.Id,
                SubCategories = category.SubCategories
                    .Select(sc => sc.Name)
                    .Distinct()
                    .ToList()
            })
            .ToList();

        return totalCategoriesDto;
    }
}