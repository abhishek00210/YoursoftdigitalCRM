using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrmBackendApi.Data;
using CrmBackendApi.Models;

namespace CrmBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingPagesController : ControllerBase
{
    private readonly ApiDbContext _db;
    private readonly ILogger<BookingPagesController> _logger;

    public BookingPagesController(ApiDbContext db, ILogger<BookingPagesController> logger)
    {
        _db = db;
        _logger = logger;
    }

    // GET: api/bookingpages?search=workspace
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search = null)
    {
        var q = _db.BookingPages.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            var lowered = search.Trim().ToLowerInvariant();
            q = q.Where(p => p.Title.ToLower().Contains(lowered) || p.Description.ToLower().Contains(lowered));
        }

        var list = await q.OrderByDescending(p => p.CreatedAt).ToListAsync();
        return Ok(list);
    }

    // GET api/bookingpages/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var page = await _db.BookingPages.FindAsync(id);
        if (page == null) return NotFound();
        return Ok(page);
    }

    // POST api/bookingpages
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] BookingPage payload)
    {
        if (string.IsNullOrWhiteSpace(payload.Title)) return BadRequest(new { message = "Title is required" });

        payload.CreatedAt = DateTime.UtcNow;
        _db.BookingPages.Add(payload);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = payload.Id }, payload);
    }

    // PUT api/bookingpages/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] BookingPage payload)
    {
        var existing = await _db.BookingPages.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Title = payload.Title;
        existing.Description = payload.Description;
        existing.OwnerUserId = payload.OwnerUserId;
        existing.ThemeName = payload.ThemeName;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    // DELETE api/bookingpages/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.BookingPages.FindAsync(id);
        if (existing == null) return NotFound();

        _db.BookingPages.Remove(existing);
        await _db.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
