using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using CrmBackendApi.DTOs;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public BookingController(ApiDbContext db)
        {
            _db = db;
        }

        // 1. GET ALL BOOKINGS
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _db.Bookings
                .Include(b => b.Service)
                .Include(b => b.Provider)
                .OrderByDescending(b => b.AppointmentDate)
                .ThenBy(b => b.StartTime)
                .ToListAsync();
            return Ok(bookings);
        }

        // 2. CREATE BOOKING (With Conflict Check)
        [HttpPost]
        public async Task<IActionResult> Create(CreateBookingDto dto)
        {
            // A. Get Service Duration
            var service = await _db.Services.FindAsync(dto.ServiceId);
            if (service == null) return BadRequest("Invalid Service");

            // B. Calculate Timings
            TimeSpan start = TimeSpan.Parse(dto.StartTime);
            TimeSpan end = start.Add(TimeSpan.FromMinutes(service.DurationMinutes));

            // C. CRITICAL: Check for Double Booking
            var conflict = await _db.Bookings.AnyAsync(b =>
                b.ProviderId == dto.ProviderId &&
                b.AppointmentDate.Date == dto.AppointmentDate.Date &&
                b.Status != "Cancelled" &&
                // FIXED BELOW: changed Endtime to EndTime (Capital T)
                ((start >= b.StartTime && start < b.EndTime) || // Starts inside another
                 (end > b.StartTime && end <= b.EndTime))       // Ends inside another
            );

            if (conflict)
            {
                return Conflict("This time slot is already booked!");
            }

            // D. Save Booking
            var booking = new Booking
            {
                Id = Guid.NewGuid(),
                ClientId = dto.ClientId,
                ProviderId = dto.ProviderId,
                ServiceId = dto.ServiceId,
                AppointmentDate = dto.AppointmentDate,
                StartTime = start,
                EndTime = end, // This matches the Model property
                Notes = dto.Notes,
                Status = "Confirmed"
            };

            _db.Bookings.Add(booking);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Booking Confirmed", bookingId = booking.Id });
        }
    }
}