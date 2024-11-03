using MerchantCommon.RabbitMqMessaging.Services;
using Microsoft.AspNetCore.Mvc;
using UserService.Application.Dtos.User;
using UserService.Application.Handlers.Auth.Request.Commands;
using UserService.Domain.Entities.Concretes;

namespace UserService.Api.Controllers;

[ApiController]
[Route("api/users/[controller]")]
public class ProducerController(IMessageProducer messageProducer) : ControllerBase
{
    [HttpPost]
    public IActionResult PublishMessage([FromBody] UserRegisterCommand user)
    {
        messageProducer.Publish("user-registry", new User
        {
            Email = user.Email,
            IdentityId = user.IdentityId,
            Name = user.Name
        });
        return Ok();
    }

}