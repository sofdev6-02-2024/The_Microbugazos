using MongoDB.Driver;
using ReviewService.Interfaces;

namespace ReviewService.Infrastructure.Context.Interfaces;

public interface IContext<T> where T : IEntity
{ 
    IMongoCollection<T> Collection { get; set; }
}