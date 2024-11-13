using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetAllCategoriesQueryHandler(IRepository<Category> categoryRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<GetAllCategoriesQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
    {
        var totalCategories = await categoryRepository.GetAllAsync();
        var categoriesToDisplay = new HashSet<string>();
        
        return responseHandlingHelper.Ok("The category were successfully obtained.", (from category in totalCategories
            where categoriesToDisplay.Add(category.Name)
            let subcategories = category.SubCategories.Where(sc => categoriesToDisplay.Add(sc.Name))
                .Select(sc => new SubCategoryDto { Name = sc.Name, Id = sc.Id })
                .ToList()
            select new CategoryDto { Name = category.Name, Id = category.Id, SubCategories = subcategories }).ToList());
    }
}