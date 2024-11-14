using Commons.ResponseHandler.Handler.Interfaces;
using Commons.ResponseHandler.Responses;
using Commons.ResponseHandler.Responses.Concretes;
using Microsoft.AspNetCore.Http;

namespace Commons.ResponseHandler.Handler.Concretes;

public class ResponseHandlingHelper : IResponseHandlingHelper
{
    public SuccessResponse<T> Ok<T>(string message, T data)
    {
        return ResponseFactory<T>.CreateSuccess(
            StatusCodes.Status200OK,
            message,
            data
        );
    }

    public SuccessResponse<T> Created<T>(string message, T data)
    {
        return ResponseFactory<T>.CreateSuccess(
            StatusCodes.Status201Created,
            message,
            data
        );
    }

    public ErrorResponse NotFound<T>(string message)
    {
        return ResponseFactory<T>.CreateError(
            StatusCodes.Status404NotFound,
            message
        );
    }

    public ErrorResponse BadRequest<T>(string message, List<string>? errors = null)
    {
        return ResponseFactory<T>.CreateError(
            StatusCodes.Status400BadRequest,
            message,
            errors
        );
    }

    public ErrorResponse InternalServerError<T>(string message)
    {
        return ResponseFactory<T>.CreateError(
            StatusCodes.Status500InternalServerError,
            message
        );
    }
}