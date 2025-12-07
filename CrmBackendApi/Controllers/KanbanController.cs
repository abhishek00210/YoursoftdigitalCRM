using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CrmBackendApi.Models;
using CrmBackendApi.Services;

namespace CrmBackendApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KanbanController : ControllerBase
{
    private readonly IKanbanStore _store;
    private readonly ILogger<KanbanController> _logger;

    public KanbanController(IKanbanStore store, ILogger<KanbanController> logger)
    {
        _store = store;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        try
        {
            var cols = _store.GetAllColumns();
            return Ok(cols);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GetAll failed");
            return Problem(detail: ex.Message, statusCode: 500);
        }
    }

    [HttpGet("tasks/{id}")]
    public IActionResult GetTask(string id)
    {
        try
        {
            var t = _store.GetTask(id);
            if (t == null) return NotFound(new { message = "Task not found" });
            return Ok(t);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "GetTask failed for {Id}", id);
            return Problem(detail: ex.Message, statusCode: 500);
        }
    }

    [HttpPost("tasks")]
    public IActionResult CreateTask([FromBody] KanbanTask task)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(task?.Title)) return BadRequest(new { message = "Title required" });
            var created = _store.CreateTask(task);
            return CreatedAtAction(nameof(GetTask), new { id = created.Id }, created);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "CreateTask failed");
            return Problem(detail: ex.Message, statusCode: 500);
        }
    }

    [HttpPut("tasks/{id}")]
    public IActionResult UpdateTask(string id, [FromBody] KanbanTask task)
    {
        try
        {
            var updated = _store.UpdateTask(id, task);
            if (updated == null) return NotFound(new { message = "Task not found" });
            return Ok(updated);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "UpdateTask failed for {Id}", id);
            return Problem(detail: ex.Message, statusCode: 500);
        }
    }

    [HttpDelete("tasks/{id}")]
    public IActionResult DeleteTask(string id)
    {
        try
        {
            var removed = _store.DeleteTask(id);
            if (removed == null) return NotFound(new { message = "Task not found" });
            return Ok(new { success = true, removed });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "DeleteTask failed for {Id}", id);
            return Problem(detail: ex.Message, statusCode: 500);
        }
    }
}
