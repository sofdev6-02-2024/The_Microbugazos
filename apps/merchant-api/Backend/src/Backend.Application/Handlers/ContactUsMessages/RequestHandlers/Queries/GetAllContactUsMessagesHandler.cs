using Backend.Application.Dtos.ContactUsMessages;
using Backend.Application.Handlers.ContactUsMessages.Request.Queries;
using Backend.Commons.ResponseHandler.Handler.Interfaces;
using Backend.Commons.ResponseHandler.Responses.Bases;
using Backend.Infrastructure.Repositories.Interfaces;
using MediatR;

namespace Backend.Application.Handlers.ContactUsMessages.RequestHandlers.Queries;

public class GetAllContactUsMessagesHandler(
    IResponseHandlingHelper responseHandlingHelper,
    IContactUsMessageRepository contactUsMessageRepository
    ) : IRequestHandler<GetAllContactUsMessagesQuery, BaseResponse>
{
    public async Task<BaseResponse> Handle(GetAllContactUsMessagesQuery request, CancellationToken cancellationToken)
    {
        var totalContactUsMessages = await contactUsMessageRepository.GetAllAsync();
        
        return responseHandlingHelper.Ok("Contact us messages have been successfully obtained.",
            totalContactUsMessages.Select(contactUsMessage => new ContactUsMessageDto
            {
                Id = contactUsMessage.Id,
                Name = contactUsMessage.Name,
                Email = contactUsMessage.Email,
                Message = contactUsMessage.Message
            }).ToList());
    }
}