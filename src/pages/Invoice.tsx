import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "@/services/invoiceService";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadInvoices = async () => {
    const data = await getInvoices();
    setInvoices(data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <button
          onClick={() => navigate("/invoice/create")}
          className="bg-cyan-500 text-white px-4 py-2 rounded-md"
        >
          + Add Invoice
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-3 text-left">Invoice #</th>
              <th className="p-3 text-left">Client</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  No invoices found
                </td>
              </tr>
            )}

            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{inv.invoiceNumber}</td>
                <td className="p-3">{inv.clientName}</td>
                <td className="p-3">
                  {new Date(inv.invoiceDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                    {inv.status}
                  </span>
                </td>
                <td className="p-3 text-right font-medium">
                  ₹ {inv.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
