namespace ReviewService.Application.ValidationSettings;

public class ReviewSettings
{
    public int MinLengthName { get; set; }
    public int MaxLengthName { get; set; }
    
    public int MaxLengthComment { get; set; }
    public int MinRatingRange { get; set; }
    public int MaxRatingRange { get; set; }
}