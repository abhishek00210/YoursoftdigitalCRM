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
        // Returns a list of all expenses, ordered by date (newest first)
        [HttpGet]
        public async Task<IActionResult> GetExpenses()
        {
            var expenses = await _db.Expenses
                                    .OrderByDescending(e => e.Date)
                                    .ToListAsync();
            return Ok(expenses);
        }

        // POST: /api/expenses
        // Adds a new expense
        [HttpPost]
        public async Task<IActionResult> AddExpense([FromBody] Expense newExpense)
        {
            if (newExpense == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Add to database
            _db.Expenses.Add(newExpense);
            await _db.SaveChangesAsync();

            // Return 201 Created with the new object
            return CreatedAtAction(nameof(GetExpense), new { id = newExpense.Id }, newExpense);
        }

        // GET: /api/expenses/5
        // Helper endpoint to get a single expense
        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpense(int id)
        {
            var expense = await _db.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }
            return Ok(expense);
        }

        // GET: /api/expenses/summary
        // Optional: Returns total expenses calculated on the server
        [HttpGet("summary")]
        public async Task<IActionResult> GetExpenseSummary()
        {
            var total = await _db.Expenses.SumAsync(e => e.Amount);
            return Ok(new { TotalExpenses = total });
        }
    }
}


