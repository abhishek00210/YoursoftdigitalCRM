using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// --- FIX: Give your model a specific name to avoid conflict with System.Threading.Tasks.Task ---
using CrmTask = CrmBackendApi.Models.Task; 

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL: /api/tasks
    public class TasksController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public TasksController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/tasks
        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _db.Tasks.ToListAsync();
            return Ok(tasks);
        }

        // POST: /api/tasks
        [HttpPost]
        // Use 'CrmTask' here instead of just 'Task'
        public async Task<IActionResult> AddTask([FromBody] CrmTask newTask)
        {
            if (newTask == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Set initial values
            if (newTask.Comments == 0) newTask.Comments = 0;
            if (newTask.Attachments == 0) newTask.Attachments = 0;
            if (string.IsNullOrEmpty(newTask.Status)) newTask.Status = "todo";

            _db.Tasks.Add(newTask);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = newTask.Id }, newTask);
        }

        // PUT: /api/tasks/5/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateTaskStatus(int id, [FromBody] string newStatus)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Status = newStatus;
            await _db.SaveChangesAsync();
            return NoContent(); // 204 Success
        }
        
        // GET: /api/tasks/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var task = await _db.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }
    }
}