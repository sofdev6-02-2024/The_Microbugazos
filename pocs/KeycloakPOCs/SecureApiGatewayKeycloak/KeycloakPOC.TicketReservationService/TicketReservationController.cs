using Microsoft.AspNetCore.Mvc;

namespace KeycloakPOC.TicketReservationService
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketReservationController : ControllerBase
    {
        private static readonly List<EventEntity> _events = [
            new EventEntity{
                    EventId = new Guid("cb37e419-47cb-43c2-a424-9f19c4042010"),
                    Name = "Tech Conference 2024",
            },
            new EventEntity{
                    EventId = new Guid("74dc175f-be92-4203-a5e9-8809655dea2d"),
                    Name = "Summer Music Festival 2024",
            }
        ];
        private static readonly Dictionary<Guid, List<string>> _registrations = [];


        [HttpPost("{eventId}/register")]
        public IActionResult RegisterForEvent(Guid eventId, [FromBody] string participantName)
        {
            if (!_events.Any(e => e.EventId == eventId))
            {
                return NotFound("Event not found.");
            }

            if (!_registrations.ContainsKey(eventId))
            {
                _registrations[eventId] = new List<string>();
            }

            _registrations[eventId].Add(participantName);
            return Ok("Successfully registered for the event.");
        }

        [HttpPost("{eventId}/cancel")]
        public IActionResult CancelRegistration(Guid eventId, [FromBody] string participantName)
        {
            if (!_events.Any(e => e.EventId == eventId))
            {
                return NotFound("Event not found.");
            }

            if (_registrations.ContainsKey(eventId) && _registrations[eventId].Contains(participantName))
            {
                _registrations[eventId].Remove(participantName);
                return Ok("Successfully canceled registration.");
            }

            return NotFound("Registration not found.");
        }

        [HttpGet("{eventId}/registrations")]
        public IActionResult GetEventRegistrations(Guid eventId)
        {
            if (!_events.Any(e => e.EventId == eventId))
            {
                return NotFound("Event not found.");
            }

            if (_registrations.TryGetValue(eventId, out var participants))
            {
                return Ok(participants);
            }

            return Ok(new List<string>());
        }
    }
}
