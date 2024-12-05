using MongoDB.Bson.Serialization.Attributes;
using ReviewService.Interfaces;

namespace ReviewService.Bases;

public class BaseRegister : IRegister
{
    [BsonElement("created_at")]
    public DateTime CreatedAt { get; } = DateTime.Now;
    
    [BsonElement("updated_at")]
    public DateTime? UpdatedAt { get; set; }
    
    [BsonElement("deleted_at")]
    public DateTime? DeletedAt { get; set; }
}