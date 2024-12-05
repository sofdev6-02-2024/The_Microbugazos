using AutoMapper;
using ReviewService.Application.CommandsQueries.ProductReview.Commands.Requests;
using ReviewService.Application.Dtos.ProductReview;
using ReviewService.Application.Dtos.Review;
using ReviewService.Concretes;

namespace ReviewService.Application.Profiles;

public class ReviewServiceProfile : Profile
{
    public ReviewServiceProfile()
    {
        CreateMap<ProductReview, ProductReviewDto>().ReverseMap();
        CreateMap<ProductReview, CreateProductReviewDto>().ReverseMap();
        CreateMap<Review, CreateReviewDto>().ReverseMap();
    }
}