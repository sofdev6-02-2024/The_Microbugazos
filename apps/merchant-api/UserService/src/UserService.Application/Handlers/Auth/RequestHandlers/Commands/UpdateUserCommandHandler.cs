using AutoMapper;
using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses.Bases;
using FluentValidation;
using MediatR;
using UserService.Application.Dtos.Users;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;
using UserService.Infrastructure.Repositories.Interfaces;

namespace UserService.Application.Handlers.Auth.RequestHandlers.Commands;

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