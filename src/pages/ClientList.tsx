// src/pages/ClientList.tsx

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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
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
  FileText, 
  Search, 
  ChevronDown, 
  Pencil,
  FileDown
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

// Dummy data based on the screenshot
const clientData = [
  {
    id: 1,
    type: "Client",
    name: "DEVBHBOMI AUXILLARY SERVICES PRIVATE LIMITED",
    industry: "Other",
    subIndustry: "other",
  },
  {
    id: 2,
    type: "Vendor",
    name: "Ansh Construction",
    industry: "Other",
    subIndustry: "other",
  },
  // ... other client data ...
];

const ClientListPage = () => {
  const navigate = useNavigate(); // <-- Initialize navigate

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
                    <BreadcrumbPage>Client List</BreadcrumbPage>
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
          <h1 className="text-lg font-semibold">Client List</h1>
        </div>

        {/* Content */}
        <div className="p-6 pt-0 space-y-6">
          <Card>
            <CardHeader>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {/* --- UPDATED BUTTON --- */}
                  <Button onClick={() => navigate('/client-list/add')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client/Vendor
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <FileDown className="h-4 w-4 mr-2" />
                    Excel
                  </Button>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Search:</span>
                  <Input type="search" className="w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Client Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.No.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Industry Name</TableHead>
                    <TableHead>Sub Industry Name</TableHead>
                    <TableHead className="text-right w-[200px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clientData.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.id}</TableCell>
                      <TableCell>
                        <Badge variant={client.type === "Client" ? "default" : "secondary"}>
                          {client.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.industry}</TableCell>
                      <TableCell>{client.subIndustry}</TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700">
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8">
                              Action <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
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

export default ClientListPage;