using Commons.Dto;
using ReviewService.Application.CommandsQueries.Commons;
using ReviewService.Concretes;

namespace ReviewService.Application.Dtos.ProductReview;

public class ProductReviewDto
{
    public required double AverageRating { get; set; }
    public required PaginatedResponseDto<Concretes.Review> Reviews { get; set; }
}