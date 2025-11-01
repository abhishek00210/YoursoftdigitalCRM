// src/pages/Invoice.tsx

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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Maximize2, 
  Star, 
  Plus, 
  Search, 
  ChevronDown, 
  FileDown,
  Printer
} from "lucide-react";

// Dummy data for invoices
const invoiceData = [
  {
    id: "INV-001",
    client: "DEVBHBOMI AUXILLARY",
    date: "2025-10-28",
    status: "Paid",
    amount: "$1,200.00",
  },
  {
    id: "INV-002",
    client: "Ansh Construction",
    date: "2025-10-25",
    status: "Pending",
    amount: "$850.00",
  },
  {
    id: "INV-003",
    client: "M/s ACCENTOR ENTERPRISES",
    date: "2025-10-22",
    status: "Paid",
    amount: "$3,500.00",
  },
  {
    id: "INV-004",
    client: "Harsh Sharma",
    date: "2025-10-20",
    status: "Overdue",
    amount: "$450.00",
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Paid":
      return "default";
    case "Pending":
      return "secondary";
    case "Overdue":
      return "destructive";
    default:
      return "outline";
  }
};

const InvoicePage = () => {
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
                    <BreadcrumbPage>Invoice</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-3">
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

        {/* Green Title Bar */}
        <div className="bg-primary text-primary-foreground p-4 m-6 rounded-lg">
          <h1 className="text-lg font-semibold">Invoice List</h1>
        </div>

        {/* Content */}
        <div className="p-6 pt-0 space-y-6">
          <Card>
            <CardHeader>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                  </Button>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline">
                    <FileDown className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Search:</span>
                  <Input type="search" className="w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Invoice Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Invoice ID</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right w-[100px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceData.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Download PDF</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default InvoicePage;