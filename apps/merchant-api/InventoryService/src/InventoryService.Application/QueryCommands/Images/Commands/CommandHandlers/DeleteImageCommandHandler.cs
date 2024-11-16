using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MediatR;

namespace InventoryService.Application.QueryCommands.Images.Commands.CommandHandlers;

public class DeleteImageCommandHandler(IRepository<Image> imageRepository, IResponseHandlingHelper responseHandlingHelper)
    : IRequestHandler<DeleteImageCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
    {
        var image = await imageRepository.GetByIdAsync(request.Id);
        if (image == null) return responseHandlingHelper.NotFound<Image>($"The image with the follow id '{request.Id}' was not found.");

        var response = await imageRepository.DeleteAsync(request.Id);
        return responseHandlingHelper.Ok("The image has been successfully deleted.", response);
    }
}