// src/pages/AddProject.tsx
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5011";

const AddProjectPage = () => {
  const navigate = useNavigate();

  // form state
  const [name, setName] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState("Not Started");
  const [dueDate, setDueDate] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter project title");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          projectManager,
          description,
          progress: Number(progress),
          status,
          dueDate,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }));
        throw new Error(err?.message || "Create failed");
      }

      // success -> go back to projects list
      navigate("/projects");
    } catch (err: any) {
      console.error("Failed to create project", err);
      alert("Failed to create project: " + (err?.message || err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        <header className="sticky top-0 z-30 border-b border-border/5 backdrop-blur flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-semibold">Add Project</h1>
          </div>
        </header>

        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project-title">Project Title</Label>
                    <Input
                      id="project-title"
                      placeholder="Enter project title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client-name">Project Manager</Label>
                    <Input
                      id="client-name"
                      placeholder="Project Manager"
                      value={projectManager}
                      onChange={(e) => setProjectManager(e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="progress">Progress (%)</Label>
                    <Input
                      id="progress"
                      type="number"
                      min={0}
                      max={100}
                      value={String(progress)}
                      onChange={(e) => setProgress(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Input
                      id="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => navigate("/projects")}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddProjectPage;
