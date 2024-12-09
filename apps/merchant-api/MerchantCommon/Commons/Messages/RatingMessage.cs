namespace Commons.Messages;

public class RatingMessage
{
    public required Guid ProductId { get; set; }
    public required int Rating { get; set; }
}