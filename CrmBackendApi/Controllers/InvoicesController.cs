// Controllers/InvoicesController.cs
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // /api/invoices
    public class InvoicesController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public InvoicesController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/invoices
        [HttpGet]
        public async Task<IActionResult> GetInvoices()
        {
            var invoices = await _db.Invoices.OrderByDescending(i => i.Date).ToListAsync();
            return Ok(invoices);
        }

        // GET: /api/invoices/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetInvoice(int id)
        {
            var invoice = await _db.Invoices.FindAsync(id);
            if (invoice == null) return NotFound();
            return Ok(invoice);
        }

        // POST: /api/invoices
        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromBody] Invoice invoice)
        {
            if (invoice == null)
            {
                return BadRequest("Invoice payload is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure date is set if missing
            if (invoice.Date == DateTime.MinValue)
            {
                invoice.Date = DateTime.UtcNow;
            }

            _db.Invoices.Add(invoice);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, invoice);
        }

        // GET: /api/invoices/summary
        [HttpGet("summary")]
        public async Task<IActionResult> GetInvoiceSummary()
        {
            var total = await _db.Invoices.SumAsync(i => i.Amount);
            return Ok(new { TotalInvoiced = total });
        }
    }
}
