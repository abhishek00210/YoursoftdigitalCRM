// CrmBackendApi/Controllers/ClientsController.cs
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // /api/clients
    public class ClientsController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public ClientsController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/clients
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            // Return all clients. If you have navigation properties (ClientContacts) and want them included, use Include(...)
            var clients = await _db.Clients.ToListAsync();
            return Ok(clients);
        }

        // GET: /api/clients/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _db.Clients.FindAsync(id);
            if (client == null) return NotFound();
            return Ok(client);
        }

        // POST: /api/clients
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] Client client)
        {
            if (client == null) return BadRequest("Client payload is null.");

            // Validate basic required fields (ModelState will include DataAnnotation checks)
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Clients.Add(client);
            await _db.SaveChangesAsync();

            // Return 201 Created with the new resource location
            return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
        }
    }
}
