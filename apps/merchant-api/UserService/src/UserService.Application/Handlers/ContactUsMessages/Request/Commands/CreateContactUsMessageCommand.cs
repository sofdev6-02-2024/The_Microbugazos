using Commons.ResponseHandler.Responses.Bases;
using MediatR;
using UserService.Application.Dtos.ContactUsMessages;

namespace UserService.Application.Handlers.ContactUsMessages.Request.Commands;

public class CreateContactUsMessageCommand(CreateContactUsMessageDto contactUsMessageDto) : IRequest<BaseResponse>
{
    public CreateContactUsMessageDto CreateContactUsMessageDto { get; set; } = contactUsMessageDto;
}