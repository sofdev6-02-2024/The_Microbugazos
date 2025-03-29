namespace Backend.Application.ValidatorSettings;

public class UserSettings
{
    public int UserNameMinLength { get; set; }
    public int UserNameMaxLength { get; set; }
    public string? EmailRegex { get; set; }
}