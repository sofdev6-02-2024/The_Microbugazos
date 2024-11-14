namespace Commons.ResponseHandler.Responses.Bases;

public abstract class BaseResponse
{
    public bool IsSuccess { get; set; }
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
}