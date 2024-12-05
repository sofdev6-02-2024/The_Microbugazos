using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ReviewService.Bases;

namespace ReviewService.Concretes;

public class ProductReview : BaseEntity
{
    [BsonElement("product_id")]
    [BsonGuidRepresentation(GuidRepresentation.Standard)]
    public required Guid ProductId { get; set; }

    [BsonElement("reviews")]
    public required List<Review> Reviews { get; set; } = new();
}