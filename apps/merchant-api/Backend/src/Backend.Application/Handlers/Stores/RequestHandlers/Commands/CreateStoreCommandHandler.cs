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

public class CreateStoreCommandHandler(
    IStoreRepository storeRepository, 
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<StoreDto> validator,
    IMapper mapper) : IRequestHandler<CreateStoreCommand, BaseResponse>
{

    public async Task<BaseResponse> Handle(CreateStoreCommand request, CancellationToken cancellationToken)
    {
        var validation = validator.Validate(request.StoreDto);
        if (!validation.IsValid) return responseHandlingHelper.BadRequest<StoreDto>(
            "The operation to create a store was not completed, please check the errors.", 
            validation.Errors.Select(e => e.ErrorMessage).ToList());
        
        var store = mapper.Map<Store>(request.StoreDto);
        
        var user = await userRepository.GetByIdAsync(store.UserId);
        if (user is null)
            return responseHandlingHelper.BadRequest<StoreDto>("User not found");

        var storeExist = await storeRepository.GetByAsync((x) => x.UserId == store.UserId);

        if (storeExist.Any())
            return responseHandlingHelper.BadRequest<StoreDto>("User already has a store");

        store = await storeRepository.AddAsync(store);
        user.UserType = UserType.OWNER;
        await userRepository.UpdateAsync(user);
        return responseHandlingHelper.Created("The store has been created", store.Id);
    }
}