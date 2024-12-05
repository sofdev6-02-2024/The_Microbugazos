using InventoryService.Application.Dtos.Reservations;
using InventoryService.Domain.Concretes;
using InventoryService.Intraestructure.Repositories.Interfaces;

namespace InventoryService.Application.Services;

public class ProductReservationService(
    IRepository<InventoryReservation> reservationRepository
)
{
    public async Task<InventoryReservation> CreateReservation(CreateReservationDto reservationDto, Guid reservationId)
    {
        var inventoryReservation = new InventoryReservation
        {
            Id = reservationId
        };

        var productReservations = new List<ProductReservation>();
        foreach (var productReservationDto in reservationDto.Products)
        {
            var productReservation = new ProductReservation
            {
                ProductVariantId = productReservationDto.VariantId,
                Quantity = productReservationDto.Quantity,
                InventoryReservation = inventoryReservation
            };
            productReservations.Add(productReservation);
        }
        inventoryReservation.Products = productReservations;

        var reservationCreated = await reservationRepository.AddAsync(inventoryReservation);
        return reservationCreated;
    }
}