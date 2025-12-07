import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddTaskDialog } from "@/components/kanban/AddTaskDialog";

const API_URL = "http://localhost:5011";

interface KanbanTask { id: string; title: string; description?: string; status: string; tags: string[]; createdAt?: string; }
interface KanbanColumn { id: string; title: string; tasks: KanbanTask[]; }

const KanbanPage: React.FC = () => {
  const [columns, setColumns] = useState<KanbanColumn[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    console.log("Loading kanban from", `${API_URL}/api/kanban`);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/kanban`);
      console.log("GET /api/kanban status", res.status);
      const data = await res.json();
      setColumns(data);
    } catch (err) {
      console.error("Failed to load kanban", err);
      setColumns([
        { id: "todo", title: "To Do", tasks: [] },
        { id: "in-progress", title: "In Progress", tasks: [] },
        { id: "review", title: "Review", tasks: [] },
        { id: "done", title: "Done", tasks: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleAddTask = async (task: Partial<KanbanTask>) => {
    try {
      const res = await fetch(`${API_URL}/api/kanban/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to create task");
      }
      const created: KanbanTask = await res.json();
      setColumns(prev => {
        const next = prev.map(c => ({ ...c, tasks: [...c.tasks] }));
        const col = next.find(x => x.id === created.status);
        if (col) col.tasks.unshift(created);
        else next[0].tasks.unshift(created);
        return next;
      });
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Failed to create task: " + (err as any).message);
    }
  };

  const handleUpdateTask = async (task: KanbanTask) => {
    try {
      const res = await fetch(`${API_URL}/api/kanban/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to update task");
      const updated: KanbanTask = await res.json();
      setColumns(prev => {
        const next = prev.map(c => ({ ...c, tasks: c.tasks.filter(t => t.id !== updated.id) }));
        const col = next.find(x => x.id === updated.status) ?? next[0];
        col.tasks.unshift(updated);
        return next;
      });
    } catch (err) {
      console.error("Failed to update task", err);
      alert("Failed to update task: " + (err as any).message);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Delete task?")) return;
    try {
      const res = await fetch(`${API_URL}/api/kanban/tasks/${taskId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setColumns(prev => prev.map(c => ({ ...c, tasks: c.tasks.filter(t => t.id !== taskId) })));
    } catch (err) {
      console.error("Failed to delete task", err);
      alert("Failed to delete: " + (err as any).message);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Kanban...</div>;

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Kanban Board</h1>
          <Button onClick={() => setIsDialogOpen(true)}>Add Task</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {columns.map(col => (
            <Card key={col.id}>
              <CardHeader><CardTitle>{col.title} ({col.tasks.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {col.tasks.map(task => (
                    <div key={task.id} className="p-3 border rounded bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold">{task.title}</div>
                          <div className="text-sm text-muted-foreground">{task.description}</div>
                          <div className="text-xs text-muted-foreground mt-2">{task.tags?.map(t => <span key={t} className="mr-1">#{t}</span>)}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" onClick={() => {
                            const order = ["todo","in-progress","review","done"];
                            const idx = order.indexOf(task.status);
                            const next = order[(idx+1) % order.length];
                            handleUpdateTask({ ...task, status: next });
                          }}>Move</Button>

                          <Button size="sm" variant="destructive" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <AddTaskDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} onTaskCreate={handleAddTask} />
      </main>
    </div>
  );
};

export default KanbanPage;
