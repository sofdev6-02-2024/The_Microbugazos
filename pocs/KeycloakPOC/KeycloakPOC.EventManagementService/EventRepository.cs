namespace KeycloakPOC.EventManagementService
{
    public class EventRepository : IEventRepository
    {
        private readonly List<EventEntity> _events;

        public EventRepository()
        {
            _events = [
                new EventEntity
                {
                    EventId = new Guid("cb37e419-47cb-43c2-a424-9f19c4042010"),
                    Name = "Tech Conference 2024",
                    Description = "An annual conference for technology enthusiasts, featuring speakers from the tech industry.",
                    Location = "San Francisco, CA",
                    Date = new DateTime(2024, 5, 20),
                    Duration = new TimeSpan(8, 0, 0),
                    MaxCapacity = 500,
                    AvailableTickets = 300,
                    TicketPrice = 199.99,
                    Organizer = "Tech Innovations Inc."
                },
                new EventEntity
                {
                    EventId = new Guid("74dc175f-be92-4203-a5e9-8809655dea2d"),
                    Name = "Summer Music Festival 2024",
                    Description = "A three-day festival celebrating music and arts with various artists performing live.",
                    Location = "Los Angeles, CA",
                    Date = new DateTime(2024, 6, 15),
                    Duration = new TimeSpan(24, 0, 0),
                    MaxCapacity = 10000,
                    AvailableTickets = 8000,
                    TicketPrice = 149.99,
                    Organizer = "Music Events LLC"
                }
            ];
        }

        public Guid Add(EventEntity eventEntity)
        {
            eventEntity.EventId = Guid.NewGuid(); // Assign a unique ID
            _events.Add(eventEntity);
            return eventEntity.EventId;
        }

        public void Delete(Guid guid)
        {
            var eventToDelete = _events.FirstOrDefault(e => e.EventId == guid);
            if (eventToDelete != null)
            {
                _events.Remove(eventToDelete);
            }
            else
            {
                throw new ArgumentException("Event not found");
            }
        }

        public EventEntity? Get(Guid guid)
        {
            var eventEntity = _events.FirstOrDefault(e => e.EventId == guid);
            return eventEntity ?? null;
        }

        public List<EventEntity> GetEvents()
        {
            return _events;
        }

        public void Update(Guid guid, EventEntity eventEntity)
        {
            var eventToUpdate = _events.FirstOrDefault(e => e.EventId == guid);
            if (eventToUpdate != null)
            {
                eventToUpdate.Name = eventEntity.Name;
                eventToUpdate.Description = eventEntity.Description;
                eventToUpdate.Location = eventEntity.Location;
                eventToUpdate.Date = eventEntity.Date;
                eventToUpdate.Duration = eventEntity.Duration;
                eventToUpdate.MaxCapacity = eventEntity.MaxCapacity;
                eventToUpdate.MaxCapacity = eventEntity.MaxCapacity;
                eventToUpdate.TicketPrice = eventEntity.TicketPrice;
                eventToUpdate.Organizer = eventEntity.Organizer;
            }
            else
            {
                throw new ArgumentException("Event not found");
            }
        }
    }
}
