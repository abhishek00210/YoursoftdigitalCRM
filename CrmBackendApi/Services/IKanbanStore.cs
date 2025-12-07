using CrmBackendApi.Models;

namespace CrmBackendApi.Services;

public interface IKanbanStore
{
    IEnumerable<KanbanColumn> GetAllColumns();
    KanbanTask? GetTask(string id);
    KanbanTask CreateTask(KanbanTask task);
    KanbanTask? UpdateTask(string id, KanbanTask task);
    KanbanTask? DeleteTask(string id);
}
