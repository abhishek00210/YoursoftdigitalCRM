// src/pages/Expenses.tsx
import React, { useState, useEffect } from "react";
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
import { Plus, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";

type ExpenseType = {
  id?: number | string;
  Id?: number | string;
  Item?: string;
  item?: string;
  Category?: string;
  category?: string;
  Amount?: number;
  amount?: number;
  Date?: string;
  date?: string;
  Vendor?: string;
  vendor?: string;
};

const apiBase = "/api/expenses";

/**
 * Safe parser for fetch responses.
 * Reads the body as text first, checks content-type or textual cues, then attempts JSON.parse.
 * If it is HTML or plain text, it throws with the raw body so you can see what came back.
 */
async function parseResponse(res: Response) {
  const ct = res.headers.get("content-type") || "";
  const text = await res.text();

  // If content-type claims JSON or the text looks JSON-ish, parse it
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

  // Not JSON — helpful error with the returned body (often HTML)
  throw new Error(
    `Expected JSON response but got content-type="${ct}". Body:\n${text}`
  );
}

const ExpensesPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Placeholder revenue value — replace with actual revenue calculation or API call later
  const [totalRevenue, setTotalRevenue] = useState<number>(15000);

  // Fetch expenses on mount
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(apiBase, { method: "GET" });

        if (!res.ok) {
          // Try parse for helpful server message, otherwise include text
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
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Fetch expenses error:", err);
        setError(err?.message ?? String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Create expense on server and update UI
  const handleAddExpense = async (expense: any) => {
    try {
      const payload = {
        Item: expense.item || expense.Item || "",
        Category: expense.category || expense.Category || "",
        Amount: Number(expense.amount ?? expense.Amount ?? 0),
        Date: expense.date || expense.Date || new Date().toISOString(),
        Vendor: expense.vendor || expense.Vendor || "",
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
      // Prepend created record
      setExpenses((prev) => [created, ...prev]);
      setIsDialogOpen(false);
    } catch (err: any) {
      console.error("Failed to create expense", err);
      alert("Failed to save expense: " + (err.message || String(err)));
    }
  };

  // Calculate totals
  const totalExpenses = expenses.reduce((acc, e) => {
    const amt = Number(e.amount ?? e.Amount ?? 0);
    return acc + (isNaN(amt) ? 0 : amt);
  }, 0);

  const netProfit = totalRevenue - totalExpenses;

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
                    <BreadcrumbPage>Expenses</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <h1 className="text-2xl font-semibold mt-2">Expenses</h1>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* KPI cards row */}
          <div className="grid grid-cols-3 gap-6">
            {/* Total Revenue */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                  <div className="text-2xl font-bold mt-2">₹{Number(totalRevenue).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
                  <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" /> <span>12.5%</span>
                  </div>
                </div>
                <div className="bg-green-50 rounded p-3">
                  <DollarSign className="h-6 w-6 text-green-700" />
                </div>
              </CardContent>
            </Card>

            {/* Total Expenses */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Total Expenses</div>
                  <div className="text-2xl font-bold mt-2">₹{Number(totalExpenses).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
                  <div className="text-sm text-red-600 mt-1 flex items-center gap-1">
                    <TrendingDown className="h-4 w-4" /> <span>5.2%</span>
                  </div>
                </div>
                <div className="bg-purple-50 rounded p-3">
                  <DollarSign className="h-6 w-6 text-purple-700" />
                </div>
              </CardContent>
            </Card>

            {/* Net Profit */}
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Net Profit</div>
                  <div className="text-2xl font-bold mt-2">₹{Number(netProfit).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
                  <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" /> <span>8.1%</span>
                  </div>
                </div>
                <div className="bg-sky-50 rounded p-3">
                  <DollarSign className="h-6 w-6 text-sky-700" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expenses table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>A list of your recent expenses.</CardDescription>
            </CardHeader>

            <CardContent>
              {loading ? (
                <div className="py-8 text-center">Loading expenses…</div>
              ) : error ? (
                <div className="text-red-600 py-4">Error: {error}</div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item/Service</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {expenses.map((exp: ExpenseType, idx) => {
                        const amount = exp.amount ?? exp.Amount ?? 0;
                        const item = exp.item ?? exp.Item ?? "";
                        const category = exp.category ?? exp.Category ?? "";
                        const vendor = exp.vendor ?? exp.Vendor ?? "";
                        const date = exp.date ?? exp.Date ?? "";
                        const id = exp.id ?? exp.Id ?? idx;
                        return (
                          <TableRow key={String(id)}>
                            <TableCell className="font-medium">{item}</TableCell>
                            <TableCell>{category}</TableCell>
                            <TableCell>{vendor}</TableCell>
                            <TableCell>{date ? new Date(date).toLocaleDateString() : "-"}</TableCell>
                            <TableCell className="text-right">-₹{Number(amount).toFixed(2)}</TableCell>
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

      <AddExpenseDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onExpenseCreate={handleAddExpense}
      />
    </div>
  );
};

export default ExpensesPage;
