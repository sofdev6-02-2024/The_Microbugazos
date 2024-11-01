using InventoryService.Application.Dtos.Images;
using InventoryService.Application.QueryCommands.Images.Commands.Commands;
using InventoryService.Application.QueryCommands.Images.Queries.Queries;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using MerchantCommon.RabbitMqMessaging.Services;

namespace InventoryService.Api.Controllers;

[ApiController]
[Route("api/inventory/[controller]")]
public class PublishEventController(IMessageProducer messageProducer) : ControllerBase
{
    [HttpPost]
    public ActionResult Create([FromBody] CreateImageDto request)
    {
        messageProducer.Publish("images", request);
        return Ok("Published");
    }
}