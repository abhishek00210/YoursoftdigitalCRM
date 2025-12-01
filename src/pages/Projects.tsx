import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Maximize2, Star, Plus, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- DYNAMIC: Points to your real backend ---
const API_URL = "http://localhost:5011";

interface Project {
  id: number;
  name: string;
  projectManager: string;
  description: string;
  progress: number;
  status: string;
  dueDate: string;
}

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // --- DYNAMIC: Fetch data from API on load ---
  useEffect(() => {
    fetch(`${API_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        {/* Header (Simplified for brevity) */}
        <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur flex h-16 items-center justify-between px-6">
           <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>Projects</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
           </Breadcrumb>
        </header>

        <div className="p-6 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <Button onClick={() => navigate('/projects/add')}><Plus className="mr-2 h-4 w-4" /> Add Project</Button>
                <Input placeholder="Search..." className="w-[250px]" />
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project Name</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>{project.projectManager}</TableCell>
                        <TableCell><Badge variant="outline">{project.status}</Badge></TableCell>
                        <TableCell><Progress value={project.progress} className="w-24" /></TableCell>
                        <TableCell>{new Date(project.dueDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                    {projects.length === 0 && <TableRow><TableCell colSpan={5} className="text-center">No projects found</TableCell></TableRow>}
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

export default ProjectsPage;