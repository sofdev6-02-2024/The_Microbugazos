using AutoMapper;
using Backend.Application.Dtos.Users;
using Backend.Application.Handlers.Auth.Request.Commands;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using FluentValidation;
using MediatR;

namespace Backend.Application.Handlers.Auth.RequestHandlers.Commands;

public class UpdateUserCommandHandler(
    IUserRepository userRepository,
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<UpdateUserDto> validator,
    IMapper mapper
    ) : IRequestHandler<UpdateUserCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
    {
        var updateUserDto = request.UpdateUserDto;
        var response = await validator.ValidateAsync(updateUserDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<UpdateUserDto>(
            "The operation to create a user was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());
        var user = await userRepository.GetByIdAsync(updateUserDto.Id);
        if (user == null)
            return responseHandlingHelper.BadRequest<User>($"User with ID {updateUserDto.Id} not found.");

        user.Name = updateUserDto.Name ?? user.Name;
        user.Email = updateUserDto.Email ?? user.Email;
    
        await userRepository.UpdateAsync(user);
        var updatedUserDto = mapper.Map<UserDto>(user);
    
        return responseHandlingHelper.Ok("The user has been successfully updated.", updatedUserDto);
    }
}