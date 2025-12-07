using Microsoft.AspNetCore.Mvc;
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly ApiDbContext _db;
    public BookingsController(ApiDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> List([FromQuery] string? filter = null, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null)
    {
        var q = _db.Bookings.Include(b => b.EventType).AsQueryable();
        if (from.HasValue) q = q.Where(b => b.StartAt >= from.Value);
        if (to.HasValue) q = q.Where(b => b.StartAt <= to.Value);
        // custom filter (upcoming/past)
        if (!string.IsNullOrEmpty(filter))
        {
            if (filter == "upcoming") q = q.Where(b => b.Status == "Upcoming");
            if (filter == "past") q = q.Where(b => b.StartAt < DateTime.UtcNow);
        }
        var list = await q.OrderBy(b => b.StartAt).ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var b = await _db.Bookings.Include(x => x.EventType).FirstOrDefaultAsync(x => x.Id == id);
        if (b == null) return NotFound();
        return Ok(b);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Booking booking)
    {
        // create BookingId e.g. BK-00001
        booking.BookingId = $"BK-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() % 1000000:D6}";
        booking.CreatedAt = DateTime.UtcNow;
        _db.Bookings.Add(booking);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Booking payload)
    {
        var existing = await _db.Bookings.FindAsync(id);
        if (existing == null) return NotFound();
        existing.CustomerName = payload.CustomerName;
        existing.CustomerEmail = payload.CustomerEmail;
        existing.CustomerPhone = payload.CustomerPhone;
        existing.StartAt = payload.StartAt;
        existing.EndAt = payload.EndAt;
        existing.Status = payload.Status;
        existing.PaymentStatus = payload.PaymentStatus;
        existing.HostUserId = payload.HostUserId;
        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var b = await _db.Bookings.FindAsync(id);
        if (b == null) return NotFound();
        _db.Bookings.Remove(b);
        await _db.SaveChangesAsync();
        return Ok();
    }
}
