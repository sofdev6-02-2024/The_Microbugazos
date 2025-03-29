using System.Diagnostics;
using Microsoft.AspNetCore.Diagnostics;

namespace Backend.Api;

public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger = logger;
    private static readonly Dictionary<Type, (int statusCode, string title)> _exceptionMap = new()
        {
            { typeof(ArgumentOutOfRangeException), (StatusCodes.Status400BadRequest, "An error occurred while processing your request.") },
            { typeof(ArgumentException), (StatusCodes.Status400BadRequest, "An error occurred while processing your request.") },
            { typeof(InvalidOperationException), (StatusCodes.Status400BadRequest, "An error occurred while processing your request.") },
            { typeof(NullReferenceException), (StatusCodes.Status400BadRequest, "An error occurred while processing your request.") }
        };

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        var traceId = Activity.Current?.Id ?? httpContext.TraceIdentifier;
        _logger.LogError(exception, "Unhandled exception in {MachineName} at {TraceId} with message {Time}", Environment.MachineName, traceId, DateTime.UtcNow);

        var (statusCode, title) = MapException(exception);

        var firstErrorLine = exception.ToString().Split('\n').FirstOrDefault() ?? "An unexpected error occurred.";

        await Results.Problem(
            title: title,
            statusCode: statusCode,
            detail: firstErrorLine,
            extensions: new Dictionary<string, object?>
            {
            { "traceId", traceId }
            }
        ).ExecuteAsync(httpContext);

        return true;
    }

    public static (int statusCode, string title) MapException(Exception exception)
    {
        if (exception is AggregateException aggregateException && aggregateException.InnerException != null)
        {
            return MapException(aggregateException.InnerException);
        }

        return _exceptionMap.TryGetValue(exception.GetType(), out var result)
            ? result
            : (StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
    }
}
