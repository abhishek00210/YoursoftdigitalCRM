// src/pages/LetterBox.tsx

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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  Maximize2, 
  Star,
  Search,
  Inbox,
  Send,
  FileText,
  Archive,
  Trash2,
  Edit,
  ChevronLeft,
  ChevronRight,
  Archive as ArchiveIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy email data
const emails = [
  { id: 1, sender: "Wade Warren", subject: "Re: Project Update", preview: "Here's the latest progress on the dashboard...", read: false, time: "3:45 PM" },
  { id: 2, sender: "Esther Howard", subject: "New Task Assigned", preview: "Please review the new designs for the client...", read: false, time: "1:20 PM" },
  { id: 3, sender: "Robert Fox", subject: "Lunch Meeting", preview: "Are you free for lunch tomorrow at 1 PM?", read: true, time: "Yesterday" },
  { id: 4, sender: "Jane Cooper", subject: "Fwd: Important Announcement", preview: "Please see the attached company-wide update.", read: true, time: "Oct 28" },
  { id: 5, sender: "Kanban Alerts", subject: "Task Moved to 'Done'", preview: "'Setup Shadcn/ui' was completed by SAdmin.", read: true, time: "Oct 27" },
];

const LetterBoxPage = () => { // <-- Renamed component
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 transition-all duration-300 flex flex-col h-screen">
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
                    <BreadcrumbPage>Letter Box</BreadcrumbPage>
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

        {/* Mailbox Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Mail Folders Sidebar */}
          <aside className="w-64 border-r border-border bg-card p-4 flex flex-col">
            <Button size="lg" className="w-full">
              <Edit className="h-4 w-4 mr-2" />
              Compose
            </Button>
            <nav className="flex-1 mt-6 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-base font-semibold bg-muted text-primary">
                <Inbox className="h-5 w-5 mr-3" />
                Inbox
                <Badge variant="default" className="ml-auto">12</Badge>
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <Send className="h-5 w-5 mr-3" />
                Sent
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <FileText className="h-5 w-5 mr-3" />
                Drafts
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <Archive className="h-5 w-5 mr-3" />
                Archive
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <Trash2 className="h-5 w-5 mr-3" />
                Trash
              </Button>
            </nav>
          </aside>

          {/* Email List / Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search mail..." className="pl-10" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ArchiveIcon className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-5 w-5" />
                </Button>
                <Separator orientation="vertical" className="h-8 mx-2" />
                <span className="text-sm text-muted-foreground">1-50 of 2,345</span>
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-border">
                {emails.map((email) => (
                  <li 
                    key={email.id} 
                    className={cn(
                      "p-4 flex gap-4 hover:bg-muted/50 cursor-pointer",
                      !email.read && "bg-muted"
                    )}
                  >
                    <div className="flex-1 flex items-center gap-4">
                      <div className="w-24">
                        <p className={cn("font-semibold truncate", !email.read && "text-foreground")}>
                          {email.sender}
                        </p>
                      </div>
                      <div className="flex-1 truncate">
                        <span className={cn("font-medium", !email.read && "text-foreground")}>
                          {email.subject}
                        </span>
                        <span className="text-muted-foreground"> - {email.preview}</span>
                      </div>
                      <time className={cn("text-xs w-20 text-right", !email.read ? "text-primary font-medium" : "text-muted-foreground")}>
                        {email.time}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LetterBoxPage; // <-- Renamed export