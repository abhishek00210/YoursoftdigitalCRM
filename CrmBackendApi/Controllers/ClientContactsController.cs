// Controllers/ClientContactsController.cs
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientContactsController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public ClientContactsController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/ClientContacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientContact>>> GetClientContacts()
        {
            return await _context.ClientContacts.ToListAsync();
        }

        // POST: api/ClientContacts
        [HttpPost]
        public async Task<ActionResult<ClientContact>> CreateClientContact(ClientContact contact)
        {
            _context.ClientContacts.Add(contact);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetClientContacts), new { id = contact.Id }, contact);
        }

        // DELETE: api/ClientContacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClientContact(int id)
        {
            var contact = await _context.ClientContacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.ClientContacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}