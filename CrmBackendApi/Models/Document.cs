using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class Document
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Type { get; set; } // e.g. "PDF"

        public string? Size { get; set; }

        public DateTime LastModified { get; set; } = DateTime.Now;
        
        public string? FilePath { get; set; } 
    }
}