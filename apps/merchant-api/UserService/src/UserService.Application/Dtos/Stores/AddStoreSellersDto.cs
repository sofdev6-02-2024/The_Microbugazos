namespace UserService.Application.Dtos.Stores;

public class AddStoreSellersDto
{
    public List<Guid> SellerIds { get; set; } = new();
}
