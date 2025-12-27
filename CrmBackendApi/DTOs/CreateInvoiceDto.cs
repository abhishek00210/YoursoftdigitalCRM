public class CreateInvoiceDto
{
    public int ClientId { get; set; }
    public DateTime InvoiceDate { get; set; }
    public DateTime DueDate { get; set; }
    public List<CreateInvoiceItemDto> Items { get; set; } = [];
}

public class CreateInvoiceItemDto
{
    public string Name { get; set; } = string.Empty;
    public string? Hsn { get; set; }
    public int Quantity { get; set; }
    public decimal Rate { get; set; }
    public decimal GstPercent { get; set; }
}
