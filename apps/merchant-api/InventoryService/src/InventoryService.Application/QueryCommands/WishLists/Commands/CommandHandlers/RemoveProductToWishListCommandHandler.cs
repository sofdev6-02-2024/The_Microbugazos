using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.WishLists.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.WishLists.Commands.CommandHandlers;

public class RemoveProductToWishListCommandHandler(
    IProductRepository productRepository,
    IWishListRepository wishListRepository,
    IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<RemoveProductToWishListCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(RemoveProductToWishListCommand request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetByIdAsync(request.ProductId);
        if (product == null)
            return responseHandlingHelper.NotFound<Product>("The product with the follow id " + request.ProductId + " was not found");
        
        var existingWishListEntry = await wishListRepository.GetByUserIdAndProductIdAsync(request.UserId, request.ProductId);
        if (existingWishListEntry == null)
            return responseHandlingHelper.BadRequest<Product>($"The product with the ID {request.ProductId} is not in the wishlist.");

        var response = await wishListRepository.DeleteAsync(existingWishListEntry.Id);

        return responseHandlingHelper.Ok(
            $"Product with ID {request.ProductId} was successfully removed to the wishlist.", response
        );
    }
}