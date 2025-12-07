namespace CrmBackendApi.Models;

public class KanbanTask
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Status { get; set; } = "todo";
    public List<string> Tags { get; set; } = new();
    public string? Assignee { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
