using Backend.Application.Dtos.ContactUsMessages;
using Backend.Application.Handlers.ContactUsMessages.Request.Commands;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Domain.Entities.Concretes;
using Backend.Infrastructure.Repositories.Interfaces;
using FluentValidation;
using MediatR;

namespace Backend.Application.Handlers.ContactUsMessages.RequestHandlers.Commands;

public class CreateContactUsMessageHandler(
    IResponseHandlingHelper responseHandlingHelper,
    IValidator<CreateContactUsMessageDto> validator,
    IContactUsMessageRepository contactUsMessageRepository) : IRequestHandler<CreateContactUsMessageCommand, BaseResponse>
{
    public async Task<BaseResponse> Handle(CreateContactUsMessageCommand request, CancellationToken cancellationToken)
    {
        var contactUsMessageDto = request.CreateContactUsMessageDto;
        
        var response = await validator.ValidateAsync(contactUsMessageDto, cancellationToken);
        if (!response.IsValid) return responseHandlingHelper.BadRequest<CreateContactUsMessageDto>(
            "The operation to create a contact us message was not completed, please check the errors.", 
            response.Errors.Select(e => e.ErrorMessage).ToList());

        var contactUsMessage = new ContactUsMessage
        {
            Name = contactUsMessageDto.Name,
            Message = contactUsMessageDto.Message,
            Email = contactUsMessageDto.Email,
        };

        contactUsMessage = await contactUsMessageRepository.AddAsync(contactUsMessage);
        return responseHandlingHelper.Created("The contact us message was added successfully.", contactUsMessage.Id);;
    }
}