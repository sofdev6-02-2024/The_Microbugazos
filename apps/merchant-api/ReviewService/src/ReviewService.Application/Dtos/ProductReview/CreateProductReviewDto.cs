using ReviewService.Application.Dtos.Review;

namespace ReviewService.Application.Dtos.ProductReview;

public class CreateProductReviewDto
{
    public required Guid ProductId { get; set; }
    public required List<CreateReviewDto> Reviews { get; set; }
}