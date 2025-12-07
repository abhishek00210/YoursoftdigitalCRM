// src/pages/ClientContactList.tsx
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Loader2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = "http://localhost:5011";

interface Client {
  id: number;
  type: string;
  clientName: string;
  contactPerson?: string;
  designation?: string;
  contactEmail?: string;
  contactNo?: string;
}

const ClientContactListPage = () => {
  const [contacts, setContacts] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/clients`);
        if (!response.ok) {
          const errText = await response.text();
          console.error("GET /api/clients failed:", response.status, errText);
          setContacts([]);
          return;
        }

        const data = await response.json();

        const mapped = (data || []).map((c: any) => ({
          id: c.id ?? c.Id ?? 0,
          type: c.type ?? c.Type ?? "Client",
          clientName: c.clientName ?? c.ClientName ?? c.name ?? c.Name ?? "",
          contactPerson: (c.contactPerson ?? c.ContactPerson ?? "") as string,
          designation: c.designation ?? c.Designation ?? "",
          contactEmail: c.contactEmail ?? c.ContactEmail ?? c.email ?? c.Email ?? "",
          contactNo: c.contactNo ?? c.ContactNo ?? c.phone ?? c.Phone ?? "",
        }));

        // Keep all clients (you wanted to fetch whatever client you add)
        setContacts(mapped);
      } catch (error) {
        console.error("Network error while fetching clients:", error);
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border/5 bg-background/95 backdrop-blur flex h-16 items-center justify-between px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Client Contact List</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-muted"><Bell className="h-5 w-5 text-muted-foreground" /></button>
          </div>
        </header>

        <div className="p-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Client Contacts</h2>
                <Input type="search" placeholder="Search..." className="w-[250px]" />
              </div>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Client Name</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Contact No</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Badge variant={contact.type === "Client" ? "default" : "secondary"}>
                            {contact.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{contact.clientName}</TableCell>
                        <TableCell>{contact.contactPerson || "-"}</TableCell>
                        <TableCell>{contact.designation || "-"}</TableCell>
                        <TableCell>{contact.contactEmail || "-"}</TableCell>
                        <TableCell>{contact.contactNo || "-"}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {contacts.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">No clients found.</TableCell>
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

export default ClientContactListPage;
