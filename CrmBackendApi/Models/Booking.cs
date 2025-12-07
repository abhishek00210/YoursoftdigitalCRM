namespace CrmBackendApi.Models;

public class Booking
{
    public int Id { get; set; }
    public string BookingId { get; set; } = ""; // e.g. ZY-00001
    public int EventTypeId { get; set; }
    public EventType? EventType { get; set; }

    // resource / host user id
    public int? HostUserId { get; set; }

    // customer details (simple)
    public string CustomerName { get; set; } = "";
    public string CustomerEmail { get; set; } = "";
    public string CustomerPhone { get; set; } = "";

    public DateTime StartAt { get; set; }
    public DateTime EndAt { get; set; }

    public string PaymentStatus { get; set; } = "Free"; // Free | Paid | Pending
    public string Status { get; set; } = "Upcoming"; // Upcoming | Completed | Cancelled | NoShow

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
