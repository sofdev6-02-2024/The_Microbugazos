using PaymentService.Domain.Entities.Enums;

namespace PaymentService.Application.Services.EnumsConverters;

public class PaymentStatusConverterService
{
    private static readonly Dictionary<PaymentStatus, string> PaymentStatusMap = new()
    {
        { PaymentStatus.Paid, "Paid" },
        { PaymentStatus.Unpaid, "Unpaid" }
    };

    public string ConvertPaymentStatusToString(PaymentStatus status)
    {
        return PaymentStatusMap.GetValueOrDefault(status, "Unknown"); 
    }
}