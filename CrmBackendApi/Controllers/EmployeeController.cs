// Controllers/EmployeeController.cs
using CrmBackendApi.Data;  // <-- Add this to find ApiDbContext
using CrmBackendApi.Models; // <-- Add this to find Employee
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // <-- Add this to find EF Core functions

namespace CrmBackendApi.Controllers // The template adds this namespace
{
    [ApiController]
    [Route("api/[controller]")] 
    public class EmployeesController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public EmployeesController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/employees
        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _db.Employees.ToListAsync();
            return Ok(employees); 
        }

        // POST: /api/employees
        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee newEmployee)
        {
            if (newEmployee == null)
            {
                return BadRequest();
            }

            _db.Employees.Add(newEmployee);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEmployee), new { id = newEmployee.Id }, newEmployee);
        }

        // GET: /api/employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _db.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }
    }
}