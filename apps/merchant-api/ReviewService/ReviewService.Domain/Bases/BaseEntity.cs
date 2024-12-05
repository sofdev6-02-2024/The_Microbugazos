using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ReviewService.Interfaces;

namespace ReviewService.Bases;

public class BaseEntity : BaseRegister, IEntity
{
    [BsonId]
    [BsonGuidRepresentation(GuidRepresentation.Standard)]
    public Guid Id { get; } = Guid.NewGuid();
    
    [BsonElement("is_active")]
    public bool IsActive { get; set; } = true;
}