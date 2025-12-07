using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class Client
    {
        public int Id { get; set; }

        // --- Client (Company) Info ---
        [Required]
        public string Type { get; set; } = "Client"; // Client or Vendor
        
        [Required]
        public string ClientName { get; set; }
        
        [Required]
        public string Phone { get; set; }
        
        public string? Website { get; set; }
        public string? GstNo { get; set; }
        public string? StateNo { get; set; }

        // --- Contact Person Info (NEW: Added directly here) ---
        public string? ContactPerson { get; set; }
        public string? Designation { get; set; }
        public string? ContactNo { get; set; }
        public string? ContactEmail { get; set; }

        // --- Billing Address ---
        public string? Country { get; set; }
        public string? State { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Street { get; set; }

        // --- Additional Info ---
        public string? CustomerPriority { get; set; }
        public string? Industry { get; set; }
        public string? SubIndustry { get; set; }
        public string? ClientSource { get; set; }
        public string? Skype { get; set; }
        public string? Twitter { get; set; }
        public string? Facebook { get; set; }
        public string? Linkedin { get; set; }
    }
}