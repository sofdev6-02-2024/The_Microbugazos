namespace Backend.Application.ValidatorSettings;

public class ContactUsSettings
{
    public int NameMinLength { get; set; }
    public int NameMaxLength { get; set; }
    public int MessageMinLength { get; set; }
    public int MessageMaxLength { get; set; }
}
