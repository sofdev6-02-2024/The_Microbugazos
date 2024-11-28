namespace UserService.Application.ValidatorSettings;

public class ValidationSettings
{
    public UserSettings User { get; set; } = new ();
    public StoreSettings Store { get; set; } = new ();
}