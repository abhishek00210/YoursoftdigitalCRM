// Controllers/ClientsController.cs
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // This will be /api/clients
    public class ClientsController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public ClientsController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/clients
        // Gets a list of all clients
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _db.Clients.ToListAsync();
            return Ok(clients); 
        }

        // POST: /api/clients
        // Adds a new client from the form
        [HttpPost]
        public async Task<IActionResult> AddClient([FromBody] Client newClient)
        {
            if (newClient == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Clients.Add(newClient);
            await _db.SaveChangesAsync();

            // Return a 201 Created response
            return CreatedAtAction(nameof(GetClient), new { id = newClient.Id }, newClient);
        }

        // This is a helper method for the "CreatedAtAction" above
        // GET: /api/clients/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _db.Clients.FindAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }
    }
}