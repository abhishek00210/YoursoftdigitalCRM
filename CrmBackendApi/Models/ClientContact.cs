// Models/ClientContact.cs
using System.ComponentModel.DataAnnotations;

namespace CrmBackendApi.Models
{
    public class ClientContact
    {
        public int Id { get; set; }

        [Required]
        public string Type { get; set; } // "Client" or "Vendor"

        [Required]
        public string ClientName { get; set; } // The company name

        [Required]
        public string ContactPerson { get; set; } // The person's name

        public string? Designation { get; set; } // e.g., "CEO", "Manager"

        public string? ContactNo { get; set; } // e.g., Phone number
    }
}