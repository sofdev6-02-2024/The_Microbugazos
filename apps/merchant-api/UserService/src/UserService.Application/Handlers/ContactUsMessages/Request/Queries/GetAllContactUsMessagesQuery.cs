using Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace UserService.Application.Handlers.ContactUsMessages.Request.Queries;

public class GetAllContactUsMessagesQuery : IRequest<BaseResponse>;