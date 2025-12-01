using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL: /api/invoices
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

        // POST: /api/invoices
        [HttpPost]
        public async Task<IActionResult> AddInvoice([FromBody] Invoice newInvoice)
        {
            if (newInvoice == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _db.Invoices.Add(newInvoice);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetInvoices), new { id = newInvoice.Id }, newInvoice);
        }
    }
}