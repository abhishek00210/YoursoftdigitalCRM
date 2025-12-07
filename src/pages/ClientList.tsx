import { useEffect, useState } from "react";
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
  Plus, 
  FileText, 
  FileDown,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- CONFIGURATION ---
const API_URL = "http://localhost:5011";

// Interface matching your C# Client Model
interface Client {
  id: number;
  type: string;
  clientName: string;
  industry: string;
  subIndustry: string;
  phone: string;
}

const ClientListPage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH DATA FROM DB ---
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_URL}/api/clients`);
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error("Failed to fetch clients");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Client List</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
             <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-muted"><Bell className="h-5 w-5 text-muted-foreground" /></button>
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">SA</div>
              </div>
            </div>
          </div>
        </header>

        <div className="bg-primary text-primary-foreground p-4 m-6 rounded-lg">
          <h1 className="text-lg font-semibold">Client List</h1>
        </div>

        <div className="p-6 pt-0 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button onClick={() => navigate('/client-list/add')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Client/Vendor
                  </Button>
                  <Select>
                    <SelectTrigger className="w-[180px]"><SelectValue placeholder="Filter Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline"><FileDown className="h-4 w-4 mr-2" /> Excel</Button>
                  <Button variant="outline"><FileText className="h-4 w-4 mr-2" /> PDF</Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Search:</span>
                  <Input type="search" className="w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Sub Industry</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.id}</TableCell>
                        <TableCell>
                          <Badge variant={client.type === "Client" ? "default" : "secondary"}>
                            {client.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{client.clientName}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{client.industry}</TableCell>
                        <TableCell>{client.subIndustry}</TableCell>
                      </TableRow>
                    ))}
                    {clients.length === 0 && (
                      <TableRow>
                         <TableCell colSpan={6} className="text-center text-muted-foreground h-24">
                           No clients found. Click "Add Client/Vendor" to create one.
                         </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClientListPage;