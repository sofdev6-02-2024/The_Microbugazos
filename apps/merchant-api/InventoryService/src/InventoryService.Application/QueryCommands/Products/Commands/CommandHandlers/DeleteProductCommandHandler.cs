using InventoryService.Application.QueryCommands.Products.Commands.Commands;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Products.Commands.CommandHandlers;

public class DeleteProductCommandHandler(IRepository<Product> productRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<DeleteProductCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(request.Id);
        if (product == null) return responseHandlingHelper.NotFound<Category>($"The product with the follow id '{request.Id}' was not found.");

        var response = await productRepository.DeleteAsync(request.Id);
        return responseHandlingHelper.Ok("The product has been successfully deleted.", response); 
    }
}