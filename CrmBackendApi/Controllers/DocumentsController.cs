using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL: /api/documents
    public class DocumentsController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public DocumentsController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/documents
        [HttpGet]
        public async Task<IActionResult> GetDocuments()
        {
            var docs = await _db.Documents.OrderByDescending(d => d.LastModified).ToListAsync();
            return Ok(docs);
        }

        // POST: /api/documents
        [HttpPost]
        public async Task<IActionResult> AddDocument([FromBody] Document newDoc)
        {
            if (newDoc == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            // Auto-set modification date if missing
            if (newDoc.LastModified == default) 
                newDoc.LastModified = DateTime.Now;

            _db.Documents.Add(newDoc);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDocuments), new { id = newDoc.Id }, newDoc);
        }
    }
}