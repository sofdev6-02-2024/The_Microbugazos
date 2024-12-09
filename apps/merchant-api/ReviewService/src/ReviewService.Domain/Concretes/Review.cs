using System.Text;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ReviewService.Bases;

namespace ReviewService.Concretes;

public class Review : BaseEntity
{
    
    [BsonElement("client_id")]
    [BsonGuidRepresentation(GuidRepresentation.Standard)]
    public required Guid ClientId { get; set; }
    
    [BsonElement("client_name")]
    public required string ClientName { get; set; }
    
    [BsonElement("rating")]
    public required int Rating { get; set; }
    
    [BsonElement("comment")]
    public string? Comment { get; set; }

    public override string ToString()
    {
        StringBuilder sb = new StringBuilder("{Review: {");
        sb.Append($"ClientID:  {ClientName}, ");
        sb.Append($"ClientName:  {ClientName}, ");
        sb.Append($"Rating:  {Rating}, ");
        sb.Append($"Comment:  {Comment}");
        sb.Append("}}");

        return sb.ToString();
    }
}