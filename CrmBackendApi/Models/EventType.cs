namespace CrmBackendApi.Models;

public class EventType
{
    public int Id { get; set; }
    public string Title { get; set; } = "";
    public int DurationMinutes { get; set; } = 30;
    public bool IsGroup { get; set; } = false; // group vs one-on-one
    public string Description { get; set; } = "";
    public string Icon { get; set; } = ""; // optional icon name
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Hosts / resources (comma separated user ids) simple approach; could be normalized
    public string HostsCsv { get; set; } = "";
}
