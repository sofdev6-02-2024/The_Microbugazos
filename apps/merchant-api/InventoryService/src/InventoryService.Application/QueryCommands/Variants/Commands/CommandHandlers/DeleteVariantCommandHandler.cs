using InventoryService.Application.QueryCommands.Variants.Commands.Commands;
using InventoryService.Commons.ResponseHandler.Handler.Interfaces;
using InventoryService.Commons.ResponseHandler.Responses.Bases;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Variants.Commands.CommandHandlers;

public class DeleteVariantCommandHandler(IRepository<Variant> variantRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<DeleteVariantCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteVariantCommand request, CancellationToken cancellationToken)
    {
        var variant = await variantRepository.GetByIdAsync(request.Id);
        if (variant == null) return responseHandlingHelper.NotFound<Category>($"The variant with the follow id '{request.Id}' was not found.");

        var response = await variantRepository.DeleteAsync(request.Id);
        return responseHandlingHelper.Ok("The variant has been successfully deleted.", response);
    }
}