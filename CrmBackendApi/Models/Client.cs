// Models/Client.cs
using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class Client
    {
        public int Id { get; set; }

        // Client Information
        [Required]
        public string? Type { get; set; } // "Client" or "Vendor"
        
        [Required]
        public string? ClientName { get; set; }
        
        [Required]
        public string? Phone { get; set; }
        
        public string? Website { get; set; }
        public string? GstNo { get; set; }
        public string? StateNo { get; set; }

        // Billing Address
        public string? Country { get; set; }
        
        [Required]
        public string? State { get; set; }
        
        [Required]
        public string? City { get; set; }
        
        public string? PostalCode { get; set; }
        public string? Street { get; set; }

        // Additional Information
        public string? CustomerPriority { get; set; }
        
        [Required]
        public string? Industry { get; set; }
        
        [Required]
        public string? SubIndustry { get; set; }
        
        public string? ClientSource { get; set; }
        public string? Skype { get; set; }
        public string? Twitter { get; set; }
        public string? Facebook { get; set; }
        public string? Linkedin { get; set; }
        
        // We will add ContactPerson as a separate table later
    }
}