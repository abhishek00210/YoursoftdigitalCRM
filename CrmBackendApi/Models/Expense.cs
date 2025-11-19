// Models/Expense.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrmBackendApi.Models
{
    public class Expense
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Item { get; set; } // e.g., "Software Subscription"

        [Required]
        public string Category { get; set; } // e.g., "Software", "Marketing"

        [Required]
        [Column(TypeName = "decimal(18, 2)")] // Precision for money
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string? Vendor { get; set; } // e.g., "Adobe", "AWS"
    }
}