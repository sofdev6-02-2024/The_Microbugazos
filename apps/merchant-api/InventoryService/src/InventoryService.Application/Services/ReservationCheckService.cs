using InventoryService.Domain.Concretes;
using InventoryService.Domain.Enums;
using InventoryService.Intraestructure.Repositories.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace InventoryService.Application.Services;

public class ReservationCheckService(IServiceScopeFactory serviceScopeFactory) : IHostedService, IDisposable
{
    private readonly IServiceScopeFactory _serviceScopeFactory = serviceScopeFactory;
    private Timer _timer;

    private async Task StockRestoration(IServiceScope scope, Guid id)
    {
        var repository = scope.ServiceProvider.GetRequiredService<IRepository<ProductVariant>>();
        var productRepository = scope.ServiceProvider.GetRequiredService<IProductReservationRepository>();

        var products = productRepository.GetAllByInventoryIdAsync(id).Result;

        foreach (var product in products)
        {
            var existingVariant = await repository.GetByIdAsync(product.ProductVariantId);
            if (existingVariant != null)
            {
                existingVariant.StockQuantity += product.Quantity;
                await repository.UpdateAsync(existingVariant);
            }
        }
    }


    private async void ReservationsCheck(object state)
    {
        using (var scope = _serviceScopeFactory.CreateScope())
        {
            var repository = scope.ServiceProvider.GetRequiredService<IRepository<InventoryReservation>>();

            var reservations = await repository.GetAllAsync();

            if (!reservations.Any()) return;

            foreach (var reservation in reservations)
            {
                if (reservation.SavedDate.AddMinutes(1) <= DateTime.Now && reservation.ReservationStatus is ReservationStatus.PENDING)
                {
                    reservation.ReservationStatus = ReservationStatus.CANCELED;
                    await repository.UpdateAsync(reservation);
                    await StockRestoration(scope, reservation.Id);
                }
            }
        }
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        _timer = new Timer(ReservationsCheck, null, TimeSpan.Zero, TimeSpan.FromMinutes(1));
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        _timer.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
