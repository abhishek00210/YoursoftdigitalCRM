// src/components/invoices/AddInvoiceDialog.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { formatISO } from "date-fns";

type AddInvoiceDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInvoiceCreate: (invoice: any) => void;
};

type ClientType = {
  id?: number | string;
  Id?: number | string;
  Name?: string;
  name?: string;
  Company?: string;
  company?: string;
  // other client props if present
};

export const AddInvoiceDialog: React.FC<AddInvoiceDialogProps> = ({
  isOpen,
  onOpenChange,
  onInvoiceCreate,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [selectedClientName, setSelectedClientName] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [date, setDate] = useState<string>("");
  const [status, setStatus] = useState<string>("Unpaid");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Client list state
  const [clients, setClients] = useState<ClientType[]>([]);
  const [clientsLoading, setClientsLoading] = useState<boolean>(false);
  const [clientsError, setClientsError] = useState<string | null>(null);

  // Load clients when dialog opens
  useEffect(() => {
    if (!isOpen) return;

    let mounted = true;
    (async () => {
      try {
        setClientsLoading(true);
        setClientsError(null);

        const res = await fetch("/api/clients");
        const text = await res.text();
        // try to parse JSON safely (some servers return HTML on error)
        try {
          const parsed = JSON.parse(text);
          if (!mounted) return;
          setClients(Array.isArray(parsed) ? parsed : []);
        } catch {
          // not JSON
          throw new Error(`Failed to load clients: ${text}`);
        }
      } catch (err: any) {
        console.error("Failed to fetch clients:", err);
        if (!mounted) return;
        setClientsError(err?.message ?? String(err));
        setClients([]);
      } finally {
        if (mounted) setClientsLoading(false);
      }
    })();

    // initialize form fields each open
    setInvoiceNumber("");
    setSelectedClientName("");
    setAmount("");
    setDate(formatISO(new Date(), { representation: "date" }));
    setStatus("Unpaid");
    setErrors({});

    return () => {
      mounted = false;
    };
  }, [isOpen]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!invoiceNumber || invoiceNumber.trim().length === 0)
      e.invoiceNumber = "Invoice number is required";
    if (!selectedClientName || selectedClientName.trim().length === 0)
      e.client = "Please select a client";
    if (amount === "" || amount === null || isNaN(Number(amount)))
      e.amount = "Amount is required";
    if (date && isNaN(new Date(date).getTime())) e.date = "Invalid date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const payload = {
        InvoiceNumber: invoiceNumber.trim(),
        // BACKEND expects ClientName — include that field
        ClientName: selectedClientName,
        // keep Client as well for compatibility
        Client: selectedClientName,
        Amount: Number(amount),
        Date: date ? new Date(date).toISOString() : new Date().toISOString(),
        Status: status,
      };

      // call parent — parent will POST and update UI
      onInvoiceCreate(payload);

      // close dialog and reset
      onOpenChange(false);
      setInvoiceNumber("");
      setSelectedClientName("");
      setAmount("");
      setDate("");
      setStatus("Unpaid");
      setErrors({});
    } catch (err) {
      console.error("Failed to create invoice (client-side):", err);
      alert("Failed to create invoice: " + (err as any)?.message ?? err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
          <DialogDescription>
            Select a client from your list and fill in invoice details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="invoice-number">Invoice #</Label>
              <Input
                id="invoice-number"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                placeholder="INV-001"
                className={errors.invoiceNumber ? "border-red-500" : ""}
              />
              {errors.invoiceNumber && (
                <p className="text-xs text-red-600 mt-1">{errors.invoiceNumber}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="client-select">Client</Label>

              {clientsLoading ? (
                <div className="py-2">Loading clients…</div>
              ) : clientsError ? (
                <div className="text-xs text-red-600 py-2">{clientsError}</div>
              ) : (
                <Select
                  value={selectedClientName}
                  onValueChange={(val) => setSelectedClientName(val)}
                >
                  <SelectTrigger id="client-select" className={errors.client ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Map clients to items; use Name or fallback to company or id */}
                    {clients.length === 0 ? (
                      <SelectItem value="">No clients found</SelectItem>
                    ) : (
                      clients.map((c, idx) => {
                        const name =
                          (c as any).Name ?? (c as any).name ?? (c as any).Company ?? (c as any).company ?? String((c as any).id ?? (c as any).Id ?? `client-${idx}`);
                        return (
                          <SelectItem key={String(idx)} value={name}>
                            {name}
                          </SelectItem>
                        );
                      })
                    )}
                  </SelectContent>
                </Select>
              )}

              {errors.client && <p className="text-xs text-red-600 mt-1">{errors.client}</p>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1 col-span-1">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={amount === "" ? "" : String(amount)}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") setAmount("");
                  else {
                    const num = Number(v);
                    if (!isNaN(num)) setAmount(num);
                    else setAmount(v as any);
                  }
                }}
                placeholder="0.00"
                inputMode="decimal"
                className={errors.amount ? "border-red-500" : ""}
              />
              {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
            </div>

            <div className="space-y-1 col-span-1">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 pointer-events-none">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </span>
              </div>
              {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
            </div>

            <div className="space-y-1 col-span-1">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(val) => setStatus(val)}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <div className="flex items-center justify-end gap-2 w-full">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Invoice"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default undefined as unknown as void; // intentionally keep default export absent; using named export
