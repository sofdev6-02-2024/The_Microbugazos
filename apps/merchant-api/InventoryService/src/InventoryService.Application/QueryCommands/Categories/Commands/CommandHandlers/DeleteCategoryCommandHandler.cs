using InventoryService.Application.QueryCommands.Categories.Commands.Commands;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Categories.Commands.CommandHandlers;

public class DeleteCategoryCommandHandler(IRepository<Category> categoryRepository, IResponseHandlingHelper responseHandlingHelper) : 
    IRequestHandler<DeleteCategoryCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetByIdAsync(request.Id);
        if (category == null) return responseHandlingHelper.NotFound<Category>($"The category with the follow id '{request.Id}' was not found.");

        var response = await categoryRepository.DeleteAsync(request.Id);
        return responseHandlingHelper.Ok("The category has been successfully deleted.", response);
    }
}