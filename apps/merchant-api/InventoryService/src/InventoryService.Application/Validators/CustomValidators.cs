namespace InventoryService.Application.Validators;

public class CustomValidators
{
    public static bool BeAValidUrl(string url)
    {
        return Uri.TryCreate(url, UriKind.Absolute, out _);
    }
}