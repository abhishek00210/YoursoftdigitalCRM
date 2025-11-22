using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL: /api/projects
    public class ProjectsController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public ProjectsController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/projects
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            var projects = await _db.Projects
                                    .OrderByDescending(p => p.DueDate)
                                    .ToListAsync();
            return Ok(projects);
        }

        // POST: /api/projects
        [HttpPost]
        public async Task<IActionResult> AddProject([FromBody] Project newProject)
        {
            // Note: C# DateTime format requires dates to be sent correctly from the frontend.
            if (newProject == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            // Set initial status/progress if they were not explicitly defined
            if (string.IsNullOrEmpty(newProject.Status)) newProject.Status = "Planning";
            if (newProject.Progress == 0) newProject.Progress = 0;

            _db.Projects.Add(newProject);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProject), new { id = newProject.Id }, newProject);
        }

        // GET: /api/projects/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProject(int id)
        {
            var project = await _db.Projects.FindAsync(id);
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }
    }
}