using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/invoices")]
    public class InvoicesController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public InvoicesController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: api/invoices
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var invoices = await _db.Invoices
                .Include(i => i.Items)
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync();

            return Ok(invoices);
        }

        // POST: api/invoices
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateInvoiceDto dto)
        {
            if (dto == null || dto.Items == null || !dto.Items.Any())
                return BadRequest("Invoice data or items are missing.");

            // 1️⃣ Fetch Client (Single Source of Truth)
            var client = await _db.Clients
                .Where(c => c.Id == dto.ClientId)
                .Select(c => new { c.ClientName })
                .FirstOrDefaultAsync();

            if (client == null)
                return BadRequest("Invalid ClientId. Client not found.");

            // 2️⃣ Generate Invoice Number
            var count = await _db.Invoices.CountAsync() + 1;
            var invoiceNo = $"INV-2025-{count:D4}";

            // 3️⃣ Create Invoice Entity
            var invoice = new Invoice
            {
                Id = Guid.NewGuid(),
                InvoiceNumber = invoiceNo,
                ClientId = dto.ClientId,
                ClientName = client.ClientName,
                InvoiceDate = dto.InvoiceDate,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow,
                Items = new List<InvoiceItem>()
            };

            // 4️⃣ Process Line Items
            foreach (var itemDto in dto.Items)
            {
                if (itemDto.Quantity <= 0 || itemDto.Rate < 0)
                    return BadRequest("Invalid item quantity or rate.");

                var amount = itemDto.Quantity * itemDto.Rate;
                var gstAmount = (amount * itemDto.GstPercent) / 100;

                var cgst = gstAmount / 2;
                var sgst = gstAmount / 2;

                var newItem = new InvoiceItem
                {
                    Id = Guid.NewGuid(),
                    Name = itemDto.Name,
                    Hsn = itemDto.Hsn, // nullable-safe
                    Quantity = itemDto.Quantity,
                    Rate = itemDto.Rate,
                    GstPercent = itemDto.GstPercent,
                    Amount = amount,
                    CGST = cgst,
                    SGST = sgst,
                    Total = amount + gstAmount
                };

                invoice.Items.Add(newItem);
            }

            // 5️⃣ Calculate Invoice Totals
            invoice.SubTotal = invoice.Items.Sum(x => x.Amount);
            invoice.CGST = invoice.Items.Sum(x => x.CGST);
            invoice.SGST = invoice.Items.Sum(x => x.SGST);
            invoice.Total = invoice.Items.Sum(x => x.Total);

            // 6️⃣ Save to Database
            _db.Invoices.Add(invoice);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Invoice saved successfully",
                invoiceId = invoice.Id,
                invoiceNumber = invoice.InvoiceNumber
            });
        }
    }
}
