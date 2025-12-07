using Microsoft.AspNetCore.Mvc;
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventTypesController : ControllerBase
{
    private readonly ApiDbContext _db;
    public EventTypesController(ApiDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _db.EventTypes.OrderByDescending(e => e.CreatedAt).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var e = await _db.EventTypes.FindAsync(id);
        if (e == null) return NotFound();
        return Ok(e);
    }

    [HttpPost]
    public async Task<IActionResult> Create(EventType ev)
    {
        _db.EventTypes.Add(ev);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = ev.Id }, ev);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, EventType ev)
    {
        var existing = await _db.EventTypes.FindAsync(id);
        if (existing == null) return NotFound();
        existing.Title = ev.Title;
        existing.Description = ev.Description;
        existing.DurationMinutes = ev.DurationMinutes;
        existing.IsGroup = ev.IsGroup;
        existing.HostsCsv = ev.HostsCsv;
        existing.Icon = ev.Icon;
        existing.IsActive = ev.IsActive;
        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var e = await _db.EventTypes.FindAsync(id);
        if (e == null) return NotFound();
        _db.EventTypes.Remove(e);
        await _db.SaveChangesAsync();
        return Ok();
    }
}
