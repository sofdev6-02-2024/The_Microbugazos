using PaymentService.Domain.Entities.Concretes;

namespace PaymentService.Infrastructure.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    public Task<IEnumerable<Order>> GetAllOrdersBySpecificUserAsync(Guid userId, int pageNumber, int pageSize);
}