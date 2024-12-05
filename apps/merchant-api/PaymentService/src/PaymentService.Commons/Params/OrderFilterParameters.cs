using PaymentService.Domain.Entities.Enums;

namespace PaymentService.Commons.Params;

public class OrderFilterParameters
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
    public OrderStatus? Status { get; set; }
}