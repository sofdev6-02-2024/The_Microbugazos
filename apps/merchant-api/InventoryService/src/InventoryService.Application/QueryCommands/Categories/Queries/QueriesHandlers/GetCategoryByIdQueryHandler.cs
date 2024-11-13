using InventoryService.Application.Dtos.Categories;
using InventoryService.Application.QueryCommands.Categories.Queries.Queries;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Queries.QueriesHandlers;

public class GetCategoryByIdQueryHandler(IRepository<Category> categoryRepository, IResponseHandlingHelper responseHandlingHelper)
: IRequestHandler<GetCategoryByIdQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(request.Id);
        if (category == null)
            return responseHandlingHelper.NotFound<CategoryDto>("The category with the follow id " + request.Id + " was not found");
        
        var subcategories = category.SubCategories.Select(subCategory => new SubCategoryDto
        {
            Id = subCategory.Id,
            Name = subCategory.Name,
        }).ToList();

        return responseHandlingHelper.Ok("The category has been successfully obtained.", new CategoryDto
        {
            Name = category.Name,
            Id = category?.Id,
            SubCategories = subcategories
        }); 
    }
}