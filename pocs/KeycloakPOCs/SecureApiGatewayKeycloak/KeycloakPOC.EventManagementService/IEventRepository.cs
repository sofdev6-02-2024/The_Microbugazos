namespace KeycloakPOC.EventManagementService;

public interface IEventRepository
{
    EventEntity? Get(Guid guid);
    List<EventEntity> GetEvents();
    Guid Add(EventEntity eventEntity);
    void Update(Guid guid, EventEntity eventEntity);
    void Delete(Guid guid);
}