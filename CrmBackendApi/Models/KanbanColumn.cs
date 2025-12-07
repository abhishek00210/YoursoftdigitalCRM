namespace CrmBackendApi.Models;

public class KanbanColumn
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public List<KanbanTask> Tasks { get; set; } = new();
}
