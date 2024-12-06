namespace ReviewService.Application.Dtos.Review;

public class CreateReviewDto
{
    public required Guid ClientId { get; set; }
    public required string ClientName { get; set; }
    public required uint Rating { get; set; }
    public string? Comment { get; set; }
}