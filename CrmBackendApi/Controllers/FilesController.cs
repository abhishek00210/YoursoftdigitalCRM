using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrmBackendApi.Data;
using CrmBackendApi.Models;

namespace CrmBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilesController : ControllerBase
{
    private readonly ApiDbContext _db;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<FilesController> _logger;

    // configuration
    private readonly long _maxFileSize = 50 * 1024 * 1024; // 50 MB
    private readonly string[] _allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".docx", ".xlsx", ".txt", ".csv" };

    public FilesController(ApiDbContext db, IWebHostEnvironment env, ILogger<FilesController> logger)
    {
        _db = db;
        _env = env;
        _logger = logger;
    }

    private string UploadsFolder => Path.Combine(_env.ContentRootPath ?? ".", "wwwroot", "uploads");

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var files = await _db.Files.OrderByDescending(f => f.UploadedAt).ToListAsync();
        return Ok(files);
    }

    [HttpPost]
    [RequestSizeLimit(100_000_000)] // 100MB limit at request level (adjust)
    public async Task<IActionResult> Upload([FromForm] IFormFile file)
    {
        if (file == null) return BadRequest(new { message = "No file uploaded" });

        if (file.Length == 0) return BadRequest(new { message = "Empty file" });
        if (file.Length > _maxFileSize) return BadRequest(new { message = $"File too large. Max {_maxFileSize} bytes" });

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!_allowedExtensions.Contains(ext))
        {
            return BadRequest(new { message = $"File type not allowed ({ext})" });
        }

        // ensure upload folder exists
        Directory.CreateDirectory(UploadsFolder);

        // generate safe filename
        var storedName = $"{Guid.NewGuid():N}{ext}";
        var filePath = Path.Combine(UploadsFolder, storedName);

        try
        {
            using var stream = System.IO.File.Create(filePath);
            await file.CopyToAsync(stream);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to save uploaded file");
            return StatusCode(500, new { message = "Failed to save file" });
        }

        var record = new FileRecord
        {
            OriginalName = Path.GetFileName(file.FileName),
            StoredName = storedName,
            ContentType = file.ContentType ?? "application/octet-stream",
            Size = file.Length,
            UploadedAt = DateTime.UtcNow,
            // UploadedBy = ... if you have auth
        };

        _db.Files.Add(record);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(Download), new { id = record.Id }, record);
    }

    [HttpGet("{id}/download")]
    public async Task<IActionResult> Download(int id)
    {
        var rec = await _db.Files.FindAsync(id);
        if (rec == null) return NotFound();

        var filePath = Path.Combine(UploadsFolder, rec.StoredName);
        if (!System.IO.File.Exists(filePath)) return NotFound(new { message = "File not found on disk" });

        var memory = new MemoryStream();
        using (var stream = System.IO.File.OpenRead(filePath))
        {
            await stream.CopyToAsync(memory);
        }
        memory.Position = 0;
        return File(memory, rec.ContentType, rec.OriginalName);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var rec = await _db.Files.FindAsync(id);
        if (rec == null) return NotFound();
        var filePath = Path.Combine(UploadsFolder, rec.StoredName);
        try
        {
            if (System.IO.File.Exists(filePath)) System.IO.File.Delete(filePath);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to delete file from disk: {Path}", filePath);
            // continue to remove DB record anyway
        }
        _db.Files.Remove(rec);
        await _db.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
