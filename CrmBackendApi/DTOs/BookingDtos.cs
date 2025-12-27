using System;

namespace CrmBackendApi.DTOs
{
    public class CreateBookingDto
    {
        public int ClientId { get; set; }
        public int ProviderId { get; set; }
        public int ServiceId { get; set; }
        public DateTime AppointmentDate { get; set; } // 2025-12-28
        public string StartTime { get; set; } // "10:30"
        public string Notes { get; set; }
    }
    
    public class SlotCheckDto
    {
        public int ProviderId { get; set; }
        public DateTime Date { get; set; }
    }
}