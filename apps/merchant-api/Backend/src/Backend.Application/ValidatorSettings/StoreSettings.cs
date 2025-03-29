namespace Backend.Application.ValidatorSettings;

public class StoreSettings
{
    public int NameMinLength { get; set; }
    public int NameMaxLength { get; set; }
    public string NameRegex { get; set; } = string.Empty;
    public int DescriptionMinLength { get; set; }
    public int DescriptionMaxLength { get; set; }
    public int AddressMinLength { get; set; }
    public int AddressMaxLength { get; set; }
    public string AddressRegex { get; set; } = string.Empty;
    public int PhoneNumberMinLength { get; set; }
    public int PhoneNumberMaxLength { get; set; }
    public string PhoneNumberRegex { get; set; } = string.Empty;
}
