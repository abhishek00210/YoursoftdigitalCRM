import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  Maximize2, 
  Star,
  Plus,
  MessageSquare,
  Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTaskDialog } from "@/components/kanban/AddTaskDialog";

// Dummy data for the Kanban board
const initialColumns = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Revamp dashboard UI",
        description: "Update the main dashboard with new chart components.",
        tags: ["UI/UX", "Dashboard"],
        assignees: [{ initials: "WW" }, { initials: "JC" }],
        comments: 3,
        attachments: 2,
      },
      {
        id: "task-2",
        title: "API Integration for Clients",
        description: "Connect to the new client endpoint.",
        tags: ["API", "Backend"],
        assignees: [{ initials: "RF" }],
        comments: 0,
        attachments: 1,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-3",
        title: "Develop Client List Page",
        description: "Build the table and search functionality.",
        tags: ["Frontend", "React"],
        assignees: [{ initials: "EH" }],
        comments: 5,
        attachments: 0,
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "task-4",
        title: "Sidebar Navigation Logic",
        description: "Fix submenu toggle state bug.",
        tags: ["Bug", "Navigation"],
        assignees: [{ initials: "WW" }],
        comments: 1,
        attachments: 0,
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task-5",
        title: "Setup Shadcn/ui",
        description: "Install and configure all base components.",
        tags: ["Setup", "UI"],
        assignees: [{ initials: "SA" }],
        comments: 0,
        attachments: 0,
      },
    ],
  },
];

// Reusable Task Card Component
const TaskCard = ({ task }: { task: any }) => (
  <Card className="mb-4 bg-card hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <h4 className="font-medium text-sm mb-2">{task.title}</h4>
      <p className="text-xs text-muted-foreground mb-3">{task.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {task.tags.map((tag: string) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignees.map((assignee: any, index: number) => (
            <Avatar key={index} className="h-6 w-6 border-2 border-background">
              <AvatarFallback>{assignee.initials}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          {task.comments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare className="h-3 w-3" />
              {task.comments}
            </span>
          )}
          {task.attachments > 0 && (
            <span className="flex items-center gap-1 text-xs">
              <Paperclip className="h-3 w-3" />
              {task.attachments}
            </span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

// Kanban Column Component
const KanbanColumn = ({ column }: { column: any }) => (
  <Card className="bg-muted/50 border-none">
    <CardHeader className="p-4">
      <CardTitle className="flex items-center justify-between">
        <span className="text-base font-semibold">{column.title}</span>
        <Badge variant="secondary" className="rounded-md">{column.tasks.length}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      {column.tasks.map((task: any) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </CardContent>
  </Card>
);

const KanbanPage = () => {
  // State for dialog and tasks
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [columns, setColumns] = useState(initialColumns);

  // Function to add a new task
  const handleAddTask = (task: any) => {
    setColumns((prevColumns) => {
      // Create a deep copy of the columns
      const newColumns = prevColumns.map(col => ({
        ...col,
        tasks: [...col.tasks]
      }));
      
      // Find the target column
      const targetColumn = newColumns.find(col => col.id === task.status);
      
      if (targetColumn) {
        // Add the new task
        targetColumn.tasks.unshift(task); // Add to the top
      } else {
        // Fallback: add to "To Do" if status is invalid
        const todoColumn = newColumns.find(col => col.id === 'todo');
        if(todoColumn) {
          todoColumn.tasks.unshift(task);
        }
      }
      return newColumns;
    });
  };

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
                    <BreadcrumbPage>Kanban</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
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

        {/* Kanban Board Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <KanbanColumn key={column.id} column={column} />
            ))}
          </div>
        </div>
      </main>

      {/* Add Dialog Component Here */}
      <AddTaskDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onTaskCreate={handleAddTask}
      />
    </div>
  );
};

export default KanbanPage;