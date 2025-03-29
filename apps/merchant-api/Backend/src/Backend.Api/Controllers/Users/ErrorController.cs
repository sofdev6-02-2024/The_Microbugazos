using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Api.Controllers;

[ApiExplorerSettings(IgnoreApi = true)]
[ApiController]
[Route("[controller]")]
public class ErrorController : ControllerBase
{
    private readonly IExceptionHandler _exceptionHandler;

    public ErrorController(IExceptionHandler exceptionHandler)
    {
        _exceptionHandler = exceptionHandler;
    }

    [Route("/error")]
    public async Task HandleError(CancellationToken cancellationToken)
    {
        var context = HttpContext.Features.Get<IExceptionHandlerFeature>();
        if (context?.Error != null)
        {
            await _exceptionHandler.TryHandleAsync(HttpContext, context.Error, cancellationToken);
        }
    }
}
