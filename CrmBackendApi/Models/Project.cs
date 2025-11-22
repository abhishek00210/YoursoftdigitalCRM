using System.ComponentModel.DataAnnotations;
using System.Collections.Generic; // For the List of Tasks

namespace CrmBackendApi.Models
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } // Project Title
        
        public string? ClientName { get; set; } // Client name from the form

        public string? ProjectManager { get; set; }
        public string? Description { get; set; }
        public decimal? ProjectRate { get; set; }
        public string? ProjectType { get; set; } // Hourly / Fix price
        public string? Priority { get; set; } // Low, Medium, High, Urgent
        public string? ProjectSize { get; set; } // Small, Medium, Big

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        // Status fields used in Projects.tsx table
        public int Progress { get; set; } = 0; // 0-100
        public string Status { get; set; } = "Planning"; // Planning, In Progress, Testing, Completed

        // We'll store members as a comma-separated string based on Projects.tsx usage
        public string? Members { get; set; }
        
        // Navigation property for Kanban (Tasks)
        public ICollection<Task> Tasks { get; set; } = new List<Task>();
    }
}