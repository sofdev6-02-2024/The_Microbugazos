namespace Backend.Application.Dtos.Stores;

public class AddStoreSellersDto (Guid storeId, string email)
{
    public Guid StoreId { get; set; } = storeId;
    public string? SellerEmail { get; set; } = email;
}
