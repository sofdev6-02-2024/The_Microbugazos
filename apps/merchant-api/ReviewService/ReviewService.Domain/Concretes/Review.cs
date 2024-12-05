using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson.Serialization.Attributes;
using ReviewService.Bases;

namespace ReviewService.Concretes;

public class Review
{
    [Key]
    public Guid Id { get; set; }
    
    [BsonElement("client_id")]
    public required Guid ClientId { get; set; }
    
    [BsonElement("client_name")]
    public required string ClientName { get; set; }
    
    [BsonElement("rating")]
    public required int Rating { get; set; }
    
    [BsonElement("comment")]
    public string? Comment { get; set; }
}