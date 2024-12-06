using System.Text;
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

    public override string ToString()
    {
        StringBuilder sb = new StringBuilder("ProductReview: {");
        sb.Append($"ID: {Id}, ");
        sb.Append($"ProductId: {ProductId}, ");
        sb.Append($"Reviews: {Reviews.ToString()}");
        return sb.ToString();
    }
}