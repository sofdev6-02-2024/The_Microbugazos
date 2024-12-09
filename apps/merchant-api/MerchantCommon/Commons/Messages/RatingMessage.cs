namespace Commons.Messages;

public class RatingMessage
{
    public required Guid ProductId { get; set; }
    public required float Rating { get; set; }
}