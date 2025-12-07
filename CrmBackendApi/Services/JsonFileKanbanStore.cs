using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using CrmBackendApi.Models;

namespace CrmBackendApi.Services;

public class JsonFileKanbanStore : IKanbanStore
{
    private readonly string _dbPath;
    private readonly object _fileLock = new();
    private readonly ILogger<JsonFileKanbanStore> _logger;

    private class DbSchema
    {
        public List<KanbanColumn> Columns { get; set; } = new();
    }

    public JsonFileKanbanStore(IWebHostEnvironment env, ILogger<JsonFileKanbanStore> logger)
    {
        _logger = logger;
        _dbPath = Path.Combine(env.ContentRootPath ?? ".", "kanban-db.json");
        try
        {
            EnsureDbExists();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to ensure kanban DB exists at {Path}", _dbPath);
            throw;
        }
    }

    private void EnsureDbExists()
    {
        lock (_fileLock)
        {
            if (!File.Exists(_dbPath))
            {
                var initial = new DbSchema
                {
                    Columns = new List<KanbanColumn>
                    {
                        new KanbanColumn { Id = "todo", Title = "To Do", Tasks = new List<KanbanTask>() },
                        new KanbanColumn { Id = "in-progress", Title = "In Progress", Tasks = new List<KanbanTask>() },
                        new KanbanColumn { Id = "review", Title = "Review", Tasks = new List<KanbanTask>() },
                        new KanbanColumn { Id = "done", Title = "Done", Tasks = new List<KanbanTask>() }
                    }
                };

                var json = JsonSerializer.Serialize(initial, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_dbPath, json);
                _logger.LogInformation("Created new kanban DB at {Path}", _dbPath);
            }
        }
    }

    private DbSchema ReadDb()
    {
        lock (_fileLock)
        {
            var txt = File.ReadAllText(_dbPath);
            try
            {
                var db = JsonSerializer.Deserialize<DbSchema>(txt);
                return db ?? new DbSchema();
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to parse kanban DB JSON — reinitializing file.");
                var db = new DbSchema();
                File.WriteAllText(_dbPath, JsonSerializer.Serialize(db, new JsonSerializerOptions { WriteIndented = true }));
                return db;
            }
        }
    }

    private void WriteDb(DbSchema db)
    {
        lock (_fileLock)
        {
            var json = JsonSerializer.Serialize(db, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_dbPath, json);
        }
    }

    public IEnumerable<KanbanColumn> GetAllColumns()
    {
        try
        {
            var db = ReadDb();
            return db.Columns;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error reading kanban DB");
            throw;
        }
    }

    public KanbanTask? GetTask(string id)
    {
        try
        {
            var db = ReadDb();
            return db.Columns.SelectMany(c => c.Tasks).FirstOrDefault(t => t.Id == id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting task {Id}", id);
            throw;
        }
    }

    public KanbanTask CreateTask(KanbanTask task)
    {
        try
        {
            var db = ReadDb();
            var col = db.Columns.FirstOrDefault(c => c.Id == task.Status) ?? db.Columns.First();
            if (string.IsNullOrWhiteSpace(task.Id))
                task.Id = $"task-{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}";
            task.CreatedAt = DateTime.UtcNow;
            col.Tasks.Insert(0, task);
            WriteDb(db);
            return task;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating task");
            throw;
        }
    }

    public KanbanTask? UpdateTask(string id, KanbanTask task)
    {
        try
        {
            var db = ReadDb();
            foreach (var col in db.Columns)
            {
                var idx = col.Tasks.FindIndex(t => t.Id == id);
                if (idx >= 0)
                {
                    col.Tasks.RemoveAt(idx);
                    break;
                }
            }
            var target = db.Columns.FirstOrDefault(c => c.Id == task.Status) ?? db.Columns.First();
            task.Id = id;
            target.Tasks.Insert(0, task);
            WriteDb(db);
            return task;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating task {Id}", id);
            throw;
        }
    }

    public KanbanTask? DeleteTask(string id)
    {
        try
        {
            var db = ReadDb();
            foreach (var col in db.Columns)
            {
                var idx = col.Tasks.FindIndex(t => t.Id == id);
                if (idx >= 0)
                {
                    var removed = col.Tasks[idx];
                    col.Tasks.RemoveAt(idx);
                    WriteDb(db);
                    return removed;
                }
            }
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting task {Id}", id);
            throw;
        }
    }
}
