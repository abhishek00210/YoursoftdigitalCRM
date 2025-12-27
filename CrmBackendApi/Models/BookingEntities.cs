using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CrmBackendApi.Models
{
    // 1. The Service (e.g., "General Consultation", "Haircut")
    public class Service
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } 

        public int DurationMinutes { get; set; } = 30;
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        public bool IsActive { get; set; } = true;
    }

    // 2. The Provider (Renamed from ServiceProvider to fix Error CS0104)
    public class Provider
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Specialization { get; set; }
        
        public string Email { get; set; }
        public string Phone { get; set; }

        // Start/End hours (e.g., 09:00 to 17:00)
        public TimeSpan StartTime { get; set; } = new TimeSpan(9, 0, 0);
        public TimeSpan EndTime { get; set; } = new TimeSpan(17, 0, 0);
        
        public bool IsActive { get; set; } = true;
    }

    // 3. The Booking
    public class Booking
    {
        [Key]
        public Guid Id { get; set; }

        public int ClientId { get; set; } 

        // Link to Provider (Updated class name)
        public int ProviderId { get; set; }
        public Provider Provider { get; set; } 

        public int ServiceId { get; set; }
        public Service Service { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        public string Status { get; set; } = "Confirmed";

        public string Notes { get; set; }

        public Guid? InvoiceId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}