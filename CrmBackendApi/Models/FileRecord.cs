using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models;

public class FileRecord
{
    [Key]
    public int Id { get; set; }

    public string OriginalName { get; set; } = string.Empty;
    public string StoredName { get; set; } = string.Empty; // filename on disk
    public string ContentType { get; set; } = string.Empty;
    public long Size { get; set; }
    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    // optional: which user uploaded it
    public string? UploadedBy { get; set; }
}
