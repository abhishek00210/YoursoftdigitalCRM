using System.ComponentModel.DataAnnotations;

public class Invoice
{
    [Key]
    public Guid Id { get; set; }

    public string InvoiceNumber { get; set; } = default!;

    public int ClientId { get; set; }
    public string ClientName { get; set; } = default!;

    public DateTime InvoiceDate { get; set; }
    public DateTime DueDate { get; set; }

    public decimal SubTotal { get; set; }
    public decimal CGST { get; set; }
    public decimal SGST { get; set; }
    public decimal Total { get; set; }

    public string Status { get; set; } = "Draft";

    public List<InvoiceItem> Items { get; set; } = new();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
