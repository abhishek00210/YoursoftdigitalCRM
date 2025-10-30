// src/pages/Projects.tsx

import { Sidebar } from "@/components/Sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { 
  Bell, 
  Maximize2, 
  Star,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

// Dummy data for the projects
const projectData = [
  {
    name: "CRM Dashboard Redesign",
    manager: "Wade Warren",
    managerInitials: "WW",
    description: "Revamp the main dashboard with new widgets.",
    progress: 75,
    status: "In Progress",
    dueDate: "2025-11-15",
    members: [
      { name: "Jane Cooper", initials: "JC", image: "/placeholder.svg" },
      { name: "Robert Fox", initials: "RF", image: "/placeholder.svg" },
      { name: "Esther Howard", initials: "EH", image: "/placeholder.svg" },
    ],
  },
  {
    name: "E-commerce Integration",
    manager: "Esther Howard",
    managerInitials: "EH",
    description: "Integrate Shopify API for product management.",
    progress: 40,
    status: "In Progress",
    dueDate: "2025-12-01",
    members: [
      { name: "Wade Warren", initials: "WW", image: "/placeholder.svg" },
      { name: "Cameron Williamson", initials: "CW", image: "/placeholder.svg" },
    ],
  },
  {
    name: "Mobile App Development",
    manager: "Robert Fox",
    managerInitials: "RF",
    description: "Build native iOS and Android apps.",
    progress: 90,
    status: "Testing",
    dueDate: "2025-10-30",
    members: [
      { name: "Jane Cooper", initials: "JC", image: "/placeholder.svg" },
    ],
  },
  {
    name: "Client Portal Setup",
    manager: "Jane Cooper",
    managerInitials: "JC",
    description: "Deploy a secure portal for client file sharing.",
    progress: 100,
    status: "Completed",
    dueDate: "2025-09-01",
    members: [
      { name: "Robert Fox", initials: "RF", image: "/placeholder.svg" },
      { name: "Wade Warren", initials: "WW", image: "/placeholder.svg" },
    ],
  },
  {
    name: "API Documentation",
    manager: "Wade Warren",
    managerInitials: "WW",
    description: "Write and publish docs for the new v3 API.",
    progress: 20,
    status: "Planning",
    dueDate: "2026-01-10",
    members: [
      { name: "Esther Howard", initials: "EH", image: "/placeholder.svg" },
    ],
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "Completed":
      return "default"; // Greenish
    case "In Progress":
      return "secondary"; // Bluish
    case "Testing":
      return "outline"; // Gray
    case "Planning":
      return "destructive"; // Reddish (or choose another)
    default:
      return "secondary";
  }
};

const ProjectsPage = () => {
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
                    <BreadcrumbPage>Projects</BreadcrumbPage>
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
          <h1 className="text-lg font-semibold">Projects List</h1>
        </div>

        {/* Content */}
        <div className="p-6 pt-0 space-y-6">
          <Card>
            <CardHeader>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button onClick={() => navigate('/projects/add')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Search:</span>
                  <Input type="search" className="w-[250px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Projects Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project Name</TableHead>
                    <TableHead>Project Manager</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Members</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectData.map((project) => (
                    <TableRow key={project.name}>
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{project.managerInitials}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{project.manager}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground max-w-xs truncate">
                        {project.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={project.progress} className="w-24" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(project.status)}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{project.dueDate}</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          <TooltipProvider>
                            {project.members.map((member) => (
                              <Tooltip key={member.name}>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-8 w-8 border-2 border-background">
                                    <AvatarImage src={member.image} />
                                    <AvatarFallback>{member.initials}</AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{member.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </TooltipProvider>
                        </div>
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

export default ProjectsPage;