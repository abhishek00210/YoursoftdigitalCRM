// src/pages/Employee.tsx

import { useState, useEffect } from "react"; // <-- Import useEffect
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Maximize2, 
  Star, 
  Plus, 
  MoreVertical,
  Loader2 // <-- Import loader
} from "lucide-react";
import { AddEmployeeDialog } from "@/components/employee/AddEmployeeDialog";
import { useToast } from "@/components/ui/use-toast"; // <-- Import toast

// Your .NET API's base URL
const API_URL = import.meta.env.VITE_API_URL; // Make sure this port is correct!

// REMOVED the 'initialEmployees' dummy data array

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "Project Manager":
      return "default";
    case "Developer":
      return "secondary";
    case "UI Designer":
      return "outline";
    default:
      return "secondary";
  }
};

const EmployeePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]); // <-- Start with an empty array
  const [isLoading, setIsLoading] = useState(true); // <-- Add loading state
  const { toast } = useToast();

  // --- 1. Fetch data from API on page load ---
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/employees`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        toast({
          title: "Failed to fetch employees",
          description: "Could not connect to the server.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [toast]); // <-- Add toast as dependency

  // --- 2. Post new employee to API ---
  const handleAddEmployee = async (employeeData: any) => {
    // The dialog creates a temporary ID, we only send what the API needs
    const newEmployee = {
      name: employeeData.name,
      email: employeeData.email,
      phone: employeeData.phone,
      role: employeeData.role,
      joinDate: employeeData.joinDate,
    };

    try {
      const response = await fetch(`${API_URL}/api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmployee)
      });

      if (response.ok) {
        const savedEmployee = await response.json(); // Get the new employee back (with ID)
        setEmployees((prev) => [savedEmployee, ...prev]); // Add to top of list
        toast({
          title: "Employee Added",
          description: `${savedEmployee.name} has been added to the team.`,
        });
      } else {
        throw new Error("Failed to save employee");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the new employee.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Employee</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Employee
              </Button>
              {/* ... other header buttons ... */}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee List</CardTitle>
              <CardDescription>Manage your team members and roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joining Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        <Loader2 className="h-6 w-6 animate-spin inline-block" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    employees.map((employee) => (
                      <TableRow key={employee.id}> {/* <-- Use database ID as key */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {employee.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{employee.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.phone}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(employee.role)}>
                            {employee.role}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>

      <AddEmployeeDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onEmployeeCreate={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeePage;