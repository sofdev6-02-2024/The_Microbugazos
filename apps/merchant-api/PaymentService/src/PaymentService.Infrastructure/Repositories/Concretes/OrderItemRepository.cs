using PaymentService.Domain.Entities.Concretes;
using PaymentService.Infrastructure.Data;
using PaymentService.Infrastructure.Repositories.Bases;

namespace PaymentService.Infrastructure.Repositories.Concretes;

public class OrderItemRepository(PaymentDbContext context) : BaseRepository<OrderItem>(context);