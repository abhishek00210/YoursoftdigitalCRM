import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const projects = [
  {
    name: "Development",
    team: ["JS", "AM", "KR"],
    teamSize: 3,
    dueDate: "15 Jan 2024",
    status: "In Progress",
    statusColor: "primary",
  },
  {
    name: "Web Landing",
    team: ["TM", "SC"],
    teamSize: 2,
    dueDate: "25 Feb 2024",
    status: "Pending",
    statusColor: "secondary",
  },
  {
    name: "Mobile App",
    team: ["DR", "PK", "MJ", "SL"],
    teamSize: 4,
    dueDate: "10 Mar 2024",
    status: "Completed",
    statusColor: "success",
  },
];

const statusStyles = {
  primary: "bg-primary/10 text-primary border border-primary/20",
  secondary: "bg-secondary/10 text-secondary border border-secondary/20",
  success: "bg-success/10 text-success border border-success/20",
};

export function ProjectsTable() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="h-1 w-8 bg-primary rounded" />
          <h3 className="text-xl font-semibold text-foreground">Projects Status</h3>
        </div>
        <button className="text-sm text-primary hover:underline">
          View all →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Project</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Team</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Due Date</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4">
                  <span className="font-medium text-foreground">{project.name}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-1">
                    {project.team.map((initial, i) => (
                      <Avatar key={i} className="h-8 w-8 -ml-2 first:ml-0 border-2 border-card shadow-sm">
                        <AvatarFallback className={cn(
                          "text-white text-xs font-semibold",
                          i % 3 === 0 && "bg-gradient-to-br from-primary to-accent",
                          i % 3 === 1 && "bg-gradient-to-br from-secondary to-primary",
                          i % 3 === 2 && "bg-gradient-to-br from-accent to-secondary"
                        )}>
                          {initial}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamSize > 3 && (
                      <div className="h-8 w-8 -ml-2 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                        +{project.teamSize - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-muted-foreground">{project.dueDate}</span>
                </td>
                <td className="py-4 px-4">
                  <Badge className={statusStyles[project.statusColor as keyof typeof statusStyles]}>
                    {project.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
