// src/pages/Expenses.tsx

import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Maximize2, 
  Star, 
  Plus, 
  Search, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Receipt // <-- Using Receipt for Expenses icon
} from "lucide-react";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { StatCard } from "@/components/dashboard/StatCard"; // Using your new StatCard

// Dummy data for expenses
const initialExpenses = [
  { id: "exp-1", item: "Monthly SaaS Subscription", category: "Software", amount: 150.00, date: "2025-11-01", vendor: "Salesforce" },
  { id: "exp-2", item: "Google Ads Campaign", category: "Marketing", amount: 500.00, date: "2025-11-03", vendor: "Google" },
  { id: "exp-3", item: "Office Snacks", category: "Office Supplies", amount: 75.50, date: "2025-11-04", vendor: "Local Mart" },
];

const ExpensesPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState(initialExpenses);

  const handleAddExpense = (expense: any) => {
    setExpenses((prev) => [expense, ...prev]);
    console.log("New Expense:", expense);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const totalRevenue = 15000; // Dummy data
  const netProfit = totalRevenue - totalExpenses;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              {/* Breadcrumb Navigation */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Expenses</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Maximize2 className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                <Star className="h-5 w-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center text-white font-semibold shadow-lg">
                  SA
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">SAdmin</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Stat Cards - Updated to use your new StatCard props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              title="Total Revenue" // This prop is unused in your StatCard JSX
              subtitle="Total Revenue"
              value={`$${totalRevenue.toLocaleString()}`}
              icon={TrendingUp} // Pass the component, not the element
              trend={12.5}
              color="success"
            />
            <StatCard
              title="Total Expenses" // This prop is unused
              subtitle="Total Expenses"
              value={`$${totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={Receipt} // Pass the component
              trend={-5.2}
              color="secondary"
            />
            <StatCard
              title="Net Profit" // This prop is unused
              subtitle="Net Profit"
              value={`$${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={DollarSign} // Pass the component
              trend={8.1}
              color="primary"
            />
          </div>

          {/* Transactions Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>A list of your recent expenses.</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
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
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell className="font-medium">{expense.item}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>{expense.vendor}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell className="text-right">
                        -${expense.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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