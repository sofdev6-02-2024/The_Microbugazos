using Commons.ResponseHandler.Responses.Bases;

namespace Commons.ResponseHandler.Responses.Concretes;

public class ErrorResponse : BaseResponse
{
    public List<string> Errors { get; set; }

    public ErrorResponse(int statusCode, string message, List<string>? errors = null)
    {
        IsSuccess = false;
        StatusCode = statusCode;
        Message = message;
        Errors = errors ?? [];
    }
}