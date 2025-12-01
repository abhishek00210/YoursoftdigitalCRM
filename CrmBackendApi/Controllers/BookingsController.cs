using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL: /api/bookings
    public class BookingsController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public BookingsController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/bookings
        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            // Order by date (newest first)
            var bookings = await _db.Bookings.OrderByDescending(b => b.Date).ToListAsync();
            return Ok(bookings);
        }

        // POST: /api/bookings
        [HttpPost]
        public async Task<IActionResult> AddBooking([FromBody] Booking newBooking)
        {
            if (newBooking == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Bookings.Add(newBooking);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookings), new { id = newBooking.Id }, newBooking);
        }
    }
}