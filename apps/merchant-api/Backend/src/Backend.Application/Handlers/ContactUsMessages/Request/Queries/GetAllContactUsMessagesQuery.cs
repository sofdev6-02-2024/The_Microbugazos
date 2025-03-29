using Backend.Commons.ResponseHandler.Responses.Bases;
using MediatR;

namespace Backend.Application.Handlers.ContactUsMessages.Request.Queries;

public class GetAllContactUsMessagesQuery : IRequest<BaseResponse>;