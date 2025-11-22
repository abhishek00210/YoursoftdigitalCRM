using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrmBackendApi.Models
{
    public class Task
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        public string? Assignees { get; set; } // Stored as comma-separated initials/names

        [Required]
        public string Status { get; set; } // Matches Kanban columns: todo, in-progress, review, done
        
        public string? Tags { get; set; } // Stored as comma-separated tags

        public int Comments { get; set; } = 0;
        public int Attachments { get; set; } = 0;

        // Foreign Key to Project (optional link)
        public int? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Project? Project { get; set; }
    }
}