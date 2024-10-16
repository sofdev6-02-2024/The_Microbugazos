using Microsoft.AspNetCore.Mvc;


namespace KeycloakPOC.EventManagementService
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;

        public EventController(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;
        }

        [HttpGet]
        public ActionResult<List<EventEntity>> GetEvents()
        {
            var events = _eventRepository.GetEvents();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public ActionResult<EventEntity> GetEvent(Guid id)
        {
            var eventEntity = _eventRepository.Get(id);
            if (eventEntity == null)
            {
                return NotFound();
            }
            return Ok(eventEntity);
        }

        [HttpPost]
        public ActionResult<Guid> AddEvent([FromBody] EventEntity eventEntity)
        {
            if (eventEntity == null)
            {
                return BadRequest("Invalid event data");
            }

            var eventId = _eventRepository.Add(eventEntity);
            return CreatedAtAction(nameof(GetEvent), new { id = eventId }, eventId);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEvent(Guid id, [FromBody] EventEntity eventEntity)
        {
            var existingEvent = _eventRepository.Get(id);
            if (existingEvent == null)
            {
                return NotFound();
            }

            _eventRepository.Update(id, eventEntity);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(Guid id)
        {
            var existingEvent = _eventRepository.Get(id);
            if (existingEvent == null)
            {
                return NotFound();
            }

            _eventRepository.Delete(id);
            return NoContent();
        }
    }
}
