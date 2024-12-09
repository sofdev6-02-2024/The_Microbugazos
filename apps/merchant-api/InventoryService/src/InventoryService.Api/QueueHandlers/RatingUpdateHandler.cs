using Commons.Messages;
using InventoryService.Intraestructure.Repositories.Interfaces;
using MassTransit;

namespace InventoryService.Api.QueueHandlers;

public class RatingUpdateHandler(IProductRepository repository) : IConsumer<RatingMessage>
{
    public async Task Consume(ConsumeContext<RatingMessage> context)
    {
        var ratingUpdated = context.Message;
        await repository.UpdateRating(ratingUpdated.ProductId, ratingUpdated.Rating);
    }
}