using Backend.Application.Dtos.ContactUsMessages;
using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.ContactUsMessages.Request.Commands;

public class CreateContactUsMessageCommand(CreateContactUsMessageDto contactUsMessageDto) : IRequest<BaseResponse>
{
    public CreateContactUsMessageDto CreateContactUsMessageDto { get; set; } = contactUsMessageDto;
}