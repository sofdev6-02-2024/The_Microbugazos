using Commons.ResponseHandler.Responses.Bases;

namespace Commons.ResponseHandler.Responses.Concretes;

public class SuccessResponse<T> : BaseResponse
{
    public T? Data { get; set; }

    public SuccessResponse(int statusCode, string message, T data)
    {
        IsSuccess = true;
        StatusCode = statusCode;
        Message = message;
        Data = data;
    }
}