// src/pages/Invoices.tsx
import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

// NOTE: AddInvoiceDialog in your project is likely a named export (like AddExpenseDialog).
// Keep this import as named — if your component uses default export, change accordingly.
import { AddInvoiceDialog } from "@/components/invoices/AddInvoiceDialog";

type InvoiceType = {
  id?: number | string;
  Id?: number | string;
  InvoiceNumber?: string;
  invoiceNumber?: string;
  Client?: string;
  client?: string;
  Amount?: number;
  amount?: number;
  Date?: string;
  date?: string;
  Status?: string;
  status?: string;
};

const apiBase = "/api/invoices";

/** Safe response parser (reads text first, checks content-type) */
async function parseResponse(res: Response) {
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  if (
    ct.includes("application/json") ||
    text.trim().startsWith("{") ||
    text.trim().startsWith("[")
  ) {
    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error(
        `Failed to parse JSON response: ${(e as Error).message}. Raw response:\n${text}`
      );
    }
  }

  throw new Error(
    `Expected JSON response but got content-type="${ct}". Body:\n${text}`
  );
}

const InvoicesPage: React.FC = () => {
  const [invoices, setInvoices] = useState<InvoiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch invoices on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(apiBase, { method: "GET" });

        if (!res.ok) {
          try {
            const body = await parseResponse(res);
            throw new Error(
              `HTTP ${res.status} ${res.statusText}: ${JSON.stringify(body)}`
            );
          } catch (inner: any) {
            throw new Error(
              `HTTP ${res.status} ${res.statusText} - ${inner.message}`
            );
          }
        }

        const data = await parseResponse(res);
        if (!mounted) return;
        setInvoices(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Fetch invoices error:", err);
        setError(err?.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Add invoice (POST) and update UI
  const handleAddInvoice = async (invoice: any) => {
    try {
      const payload = {
        InvoiceNumber: invoice.invoiceNumber ?? invoice.InvoiceNumber ?? "",
        Client: invoice.client ?? invoice.Client ?? "",
        Amount: Number(invoice.amount ?? invoice.Amount ?? 0),
        Date: invoice.date ?? invoice.Date ?? new Date().toISOString(),
        Status: invoice.status ?? invoice.Status ?? "Unpaid",
      };

      const res = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        try {
          const body = await parseResponse(res);
          throw new Error(
            `Server returned ${res.status} ${res.statusText}: ${JSON.stringify(
              body
            )}`
          );
        } catch (inner: any) {
          throw new Error(
            `Server returned ${res.status} ${res.statusText} - ${inner.message}`
          );
        }
      }

      const created = await parseResponse(res);
      setInvoices((prev) => [created, ...prev]);
      setIsDialogOpen(false);
    } catch (err: any) {
      console.error("Failed to create invoice", err);
      alert("Failed to save invoice: " + (err.message || String(err)));
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />

      <main className="flex-1 ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b bg-card/95 p-4">
          <div className="flex items-center justify-between">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Invoices</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-2xl font-semibold mt-2">Invoices</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Invoice
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>All invoices</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading invoices…</div>
              ) : error ? (
                <div className="text-red-600 py-4">Error: {error}</div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((inv: InvoiceType, idx) => {
                        const id = inv.id ?? inv.Id ?? idx;
                        const num = inv.invoiceNumber ?? inv.InvoiceNumber ?? "-";
                        const client = inv.client ?? inv.Client ?? "-";
                        const date = inv.date ?? inv.Date ?? "";
                        const status = inv.status ?? inv.Status ?? "-";
                        const amount = inv.amount ?? inv.Amount ?? 0;
                        return (
                          <TableRow key={String(id)}>
                            <TableCell className="font-medium">{num}</TableCell>
                            <TableCell>{client}</TableCell>
                            <TableCell>
                              {date ? new Date(date).toLocaleDateString() : "-"}
                            </TableCell>
                            <TableCell>{status}</TableCell>
                            <TableCell className="text-right">
                              ₹{Number(amount).toFixed(2)}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <AddInvoiceDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onInvoiceCreate={handleAddInvoice}
      />
    </div>
  );
};

export default InvoicesPage;
