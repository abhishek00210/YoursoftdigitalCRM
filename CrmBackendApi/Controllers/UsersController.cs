using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrmBackendApi.Data;
using CrmBackendApi.Models;

namespace CrmBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ApiDbContext _db;
    private readonly ILogger<UsersController> _logger;

    public UsersController(ApiDbContext db, ILogger<UsersController> logger)
    {
        _db = db;
        _logger = logger;
    }

    // GET: api/users?search=michelle
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search = null)
    {
        var q = _db.UsersSimple.AsQueryable();
        if (!string.IsNullOrWhiteSpace(search))
        {
            var s = search.Trim().ToLowerInvariant();
            q = q.Where(u => u.FullName.ToLower().Contains(s) || u.Email.ToLower().Contains(s) || u.Role.ToLower().Contains(s));
        }

        var list = await q.OrderBy(u => u.FullName).ToListAsync();
        return Ok(list);
    }

    // GET api/users/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var user = await _db.UsersSimple.FindAsync(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    // POST api/users
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserSimple payload)
    {
        if (string.IsNullOrWhiteSpace(payload.FullName)) return BadRequest(new { message = "FullName is required" });
        if (string.IsNullOrWhiteSpace(payload.Email)) return BadRequest(new { message = "Email is required" });

        _db.UsersSimple.Add(payload);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = payload.Id }, payload);
    }

    // PUT api/users/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UserSimple payload)
    {
        var existing = await _db.UsersSimple.FindAsync(id);
        if (existing == null) return NotFound();

        existing.FullName = payload.FullName;
        existing.Email = payload.Email;
        existing.Role = payload.Role;
        existing.AvatarUrl = payload.AvatarUrl;

        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    // DELETE api/users/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.UsersSimple.FindAsync(id);
        if (existing == null) return NotFound();

        _db.UsersSimple.Remove(existing);
        await _db.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
