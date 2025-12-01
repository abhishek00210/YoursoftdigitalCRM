using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL: /api/messages
    public class MessagesController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public MessagesController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/messages
        [HttpGet]
        public async Task<IActionResult> GetMessages()
        {
            var msgs = await _db.Messages.OrderByDescending(m => m.Time).ToListAsync();
            return Ok(msgs);
        }

        // POST: /api/messages
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] Message newMsg)
        {
            if (newMsg == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (newMsg.Time == default) newMsg.Time = DateTime.Now;

            _db.Messages.Add(newMsg);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMessages), new { id = newMsg.Id }, newMsg);
        }
    }
}