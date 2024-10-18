using FormulaAirline.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace FormulaAirline.API
{

    [ApiController]
    [Route("[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly ILogger<BookingController> _logger;
        private readonly IMessageProducer _messageProducer;


        public BookingController(ILogger<BookingController> logger, IMessageProducer messageProducer)
        {
            _logger = logger;
            _messageProducer = messageProducer;
        }

        // in- memory db

        public static readonly List<Booking> _bookings = new List<Booking>() { };

        [HttpPost]
        public IActionResult CreatingBooking([FromBody] Booking booking)
        {
            if (!ModelState.IsValid) return BadRequest();


            _bookings.Add(booking);
            _messageProducer.SendMessage(booking);
            return Ok();
        }

    }
}