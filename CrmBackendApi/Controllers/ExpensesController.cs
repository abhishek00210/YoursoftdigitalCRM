// Controllers/ExpensesController.cs
using CrmBackendApi.Data;
using CrmBackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrmBackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // URL will be /api/expenses
    public class ExpensesController : ControllerBase
    {
        private readonly ApiDbContext _db;

        public ExpensesController(ApiDbContext db)
        {
            _db = db;
        }

        // GET: /api/expenses
        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            // Return all expenses ordered by date desc
            var expenses = await _db.Expenses.OrderByDescending(e => e.Date).ToListAsync();
            return Ok(expenses);
        }

        // GET: /api/expenses/{id}
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            var expense = await _db.Expenses.FindAsync(id);
            if (expense == null) return NotFound();
            return Ok(expense);
        }

        // POST: /api/expenses
        [HttpPost]
        public async Task<IActionResult> CreateExpense([FromBody] Expense expense)
        {
            if (expense == null)
            {
                return BadRequest("Expense payload is null.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure date is set if caller didn't supply it
            if (expense.Date == DateTime.MinValue)
            {
                expense.Date = DateTime.UtcNow;
            }

            _db.Expenses.Add(expense);
            await _db.SaveChangesAsync();

            // Return 201 Created and the new expense with Id
            return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
        }

        // Optionally: GET: /api/expenses/summary
        [HttpGet("summary")]
        public async Task<IActionResult> GetExpenseSummary()
        {
            var total = await _db.Expenses.SumAsync(e => e.Amount);
            return Ok(new { TotalExpenses = total });
        }
    }
}
