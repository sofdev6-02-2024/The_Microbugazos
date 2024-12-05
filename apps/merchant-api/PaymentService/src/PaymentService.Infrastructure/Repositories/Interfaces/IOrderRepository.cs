using PaymentService.Commons.Params;
using PaymentService.Domain.Entities.Concretes;

namespace PaymentService.Infrastructure.Repositories.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    public Task<IEnumerable<Order>> GetAllOrdersBySpecificUserAsync(Guid userId, OrderFilterParameters parameters, int pageNumber, int pageSize);
    public Task<int> GetCountBySpecificUserAsync(Guid userId, OrderFilterParameters parameters);
}