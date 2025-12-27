using System.Text.Json.Serialization;

public class InvoiceItem
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Hsn { get; set; }

    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public decimal GstPercent { get; set; }

    public decimal Amount { get; set; }
    public decimal CGST { get; set; }
    public decimal SGST { get; set; }
    public decimal Total { get; set; }

    [JsonIgnore] // 🔥 THIS LINE FIXES SWAGGER
    public Invoice? Invoice { get; set; }
}
