using InventoryService.Application.Dtos;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetAllCategoriesQueryHandler(IRepository<Category> categoryRepository)
    : IRequestHandler<GetAllCategoriesQuery, PaginatedResponseDto<CategoryDto>>
{
    public async Task<PaginatedResponseDto<CategoryDto>> Handle(GetAllCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var totalCategories = await categoryRepository.GetAllAsync(request.Page, request.PageSize);
        var count = await categoryRepository.GetCountAsync();
        var totalCategoriesDto = totalCategories.Select(category => new CategoryDto
        {
            Name = category.Name,
            Id = category.Id,
            SubCategories = category.SubCategories.Select(subCategory => subCategory.Name).ToList()
        }).ToList();
        return new PaginatedResponseDto<CategoryDto>
        {
            Items = totalCategoriesDto,
            TotalCount = count,
            Page = request.Page,
            PageSize = request.PageSize
        };
    }
}