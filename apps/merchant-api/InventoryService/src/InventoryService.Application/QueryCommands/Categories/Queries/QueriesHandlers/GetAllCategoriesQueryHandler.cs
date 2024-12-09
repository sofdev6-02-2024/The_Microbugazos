using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
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
        Dictionary<Guid, List<Category>> subcategories = [];
        List<Category> categories = [];

        foreach (var category in totalCategories)
        {
            if (category.ParentCategoryId == null)
            {
                categories.Add(category);
            }
            else
            {
                if (subcategories.TryGetValue(category.ParentCategoryId.Value, out var value))
                {
                    value.Add(category);
                }
                else
                {

                    subcategories[category.ParentCategoryId.Value] = [category];
                }
            }
        }

        return responseHandlingHelper.Ok("Categories have been successfully obtained.", (from category in categories
                                                                                         let subcats = subcategories[category.Id]
                                                                                             .Select(sc => new SubCategoryDto { Name = sc.Name, Id = sc.Id })
                                                                                             .ToList()
                                                                                         select new CategoryDto { Name = category.Name, Id = category.Id, SubCategories = subcats }).ToList());
    }
}