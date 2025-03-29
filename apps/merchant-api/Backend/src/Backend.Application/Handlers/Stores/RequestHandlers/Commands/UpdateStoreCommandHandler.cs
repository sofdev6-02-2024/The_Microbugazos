using AutoMapper;
using Backend.Application.Dtos.Stores;
using Backend.Application.Handlers.Stores.Request.Commands;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using FluentValidation;
using MediatR;

namespace Backend.Application.Handlers.Stores.RequestHandlers.Commands;

public class UpdateStoreCommandHandler(
    IStoreRepository storeRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<StoreDto> validator,
    IMapper mapper) : IRequestHandler<UpdateStoreCommand, BaseResponse>
{

    public async Task<BaseResponse> Handle(UpdateStoreCommand request, CancellationToken cancellationToken)
    {
        var validation = validator.Validate(request.StoreDto);
        if (!validation.IsValid) return responseHandlingHelper.BadRequest<StoreDto>(
            "The operation to create a store was not completed, please check the errors.",
            validation.Errors.Select(e => e.ErrorMessage).ToList());
        var store = mapper.Map<Store>(request.StoreDto);
        store = await storeRepository.UpdateAsync(store);
        return responseHandlingHelper.Ok("The category has been successfully updated.", mapper.Map<StoreDto>(store));
    }
}