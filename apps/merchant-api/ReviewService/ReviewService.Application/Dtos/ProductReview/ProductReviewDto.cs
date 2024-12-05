using ReviewService.Concretes;

namespace ReviewService.Application.Dtos.ProductReview;

public class ProductReviewDto
{
    public required List<Concretes.Review> Reviews { get; set; }
}