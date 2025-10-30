// src/pages/ClientContactList.tsx

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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Maximize2, 
  Star, 
  Pencil,
  Trash2,
  Phone
} from "lucide-react";

// Dummy data based on the screenshot
const contactData = [
  {
    id: 1,
    type: "Client",
    clientName: "Harsh Sharma",
    contactPerson: "Harsh Sharma",
    designation: "CEO",
    contactNo: "N/A",
  },
  {
    id: 2,
    type: "Client",
    clientName: "Harsh Sharma",
    contactPerson: "Dr. venugopal jhanvar",
    designation: "",
    contactNo: "N/A",
  },
  {
    id: 3,
    type: "Vendor",
    clientName: "Hostinger",
    contactPerson: "Rajesh",
    designation: "",
    contactNo: "N/A",
  },
  {
    id: 4,
    type: "Vendor",
    clientName: "Ashish Ent",
    contactPerson: "Anurag Mohanti",
    designation: "Deputy Director",
    contactNo: "N/A",
  },
  {
    id: 5,
    type: "Client",
    clientName: "Ravi Kumar",
    contactPerson: "Ravi Kumar",
    designation: "Residential",
    contactNo: "N/A",
  },
  {
    id: 6,
    type: "Client",
    clientName: "Ravi Kumar",
    contactPerson: "Vinod",
    designation: "",
    contactNo: "N/A",
  },
  {
    id: 7,
    type: "Client",
    clientName: "EcoMall India",
    contactPerson: "Mr. Vikas Malhotra",
    designation: "",
    contactNo: "N/A",
  },
  {
    id: 8,
    type: "Client",
    clientName: "She Creation",
    contactPerson: "Hurria",
    designation: "",
    contactNo: "N/A",
  },
  {
    id: 9,
    type: "Client",
    clientName: "IAIT",
    contactPerson: "Deepa",
    designation: "Admin",
    contactNo: "N/A",
  },
  {
    id: 10,
    type: "Client",
    clientName: "IAIT",
    contactPerson: "KK Verma",
    designation: "Director",
    contactNo: "N/A",
  },
];

const ClientContactListPage = () => {
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
                    <BreadcrumbPage>Client Contact List</BreadcrumbPage>
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
          <h1 className="text-lg font-semibold">Client Contact List</h1>
        </div>

        {/* Content */}
        <div className="p-6 pt-0 space-y-6">
          <Card>
            <CardHeader>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Client/Vendor</span>
                  <Select>
                    <SelectTrigger className="w-[250px]">
                      <SelectValue placeholder="--Select--" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Search:</span>
                  <Input type="search" className="w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Client Contact Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">S.No.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Contact Person</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Contact No</TableHead>
                    <TableHead className="text-right w-[150px]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contactData.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.id}</TableCell>
                      <TableCell>
                        <Badge variant={contact.type === "Client" ? "default" : "secondary"}>
                          {contact.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{contact.clientName}</TableCell>
                      <TableCell>{contact.contactPerson}</TableCell>
                      <TableCell>{contact.designation}</TableCell>
                      <TableCell>{contact.contactNo}</TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700">
                          <Pencil className="h-4 w-4" />
                        </Button>
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

export default ClientContactListPage;