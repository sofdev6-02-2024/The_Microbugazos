namespace KeycloakPOC.TicketReservationService;
public class EventEntity
{
    public Guid EventId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Location { get; set; }
    public DateTime Date { get; set; }
    public TimeSpan Duration { get; set; }
    public int MaxCapacity { get; set; }
    public int AvailableTickets { get; set; }
    public double TicketPrice { get; set; }
    public string? Organizer { get; set; }
}