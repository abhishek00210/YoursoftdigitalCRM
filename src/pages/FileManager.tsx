// src/pages/FileManager.tsx

import React, { useRef } from "react"; // <-- Import useRef and React
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
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
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
  Search,
  Upload,
  Folder,
  FileText,
  Clock,
  Share2,
  Trash2,
  MoreVertical,
  LayoutGrid,
  List,
  HardDrive
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Dummy data for folders
const folders = [
  { name: "Projects", files: 45, size: "2.1 GB" },
  { name: "Clients", files: 12, size: "800 MB" },
  { name: "Invoices", files: 120, size: "300 MB" },
  { name: "Assets", files: 8, size: "4.5 GB" },
];

// Dummy data for recent files
const recentFiles = [
  { name: "dashboard_redesign.fig", type: "Figma", size: "12.5 MB", modified: "5 mins ago" },
  { name: "client_contract.pdf", type: "PDF", size: "1.2 MB", modified: "1 hour ago" },
  { name: "project_timeline.xlsx", type: "Spreadsheet", size: "800 KB", modified: "3 hours ago" },
  { name: "api_notes.md", type: "Document", size: "12 KB", modified: "Yesterday" },
];

const FileManagerPage = () => {
  // --- Additions for file upload ---
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    // Trigger the hidden file input
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // This is where you would handle the file upload logic
      // (e.g., send to a server, add to state)
      console.log("Selected file:", file.name, file.size);

      // Reset the input value to allow uploading the same file again
      event.target.value = '';
    }
  };
  // --- End of additions ---

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
                    <BreadcrumbPage>File Manager</BreadcrumbPage>
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

        {/* File Manager Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* File Folders Sidebar */}
          <aside className="w-64 border-r border-border bg-card p-4 flex flex-col">
            {/* --- UPDATED BUTTON --- */}
            <Button size="lg" className="w-full" onClick={handleUploadClick}>
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
            {/* --- HIDDEN FILE INPUT --- */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden" // Tailwind class for display: none
            />
            
            <nav className="flex-1 mt-6 space-y-2">
              <Button variant="ghost" className="w-full justify-start text-base font-semibold bg-muted text-primary">
                <HardDrive className="h-5 w-5 mr-3" />
                My Storage
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <Clock className="h-5 w-5 mr-3" />
                Recents
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <Share2 className="h-5 w-5 mr-3" />
                Shared
              </Button>
              <Button variant="ghost" className="w-full justify-start text-base text-muted-foreground hover:text-foreground">
                <Trash2 className="h-5 w-5 mr-3" />
                Trash
              </Button>
            </nav>

            {/* Storage Indicator */}
            <div className="mt-auto">
              <Separator className="my-4" />
              <p className="text-sm font-medium mb-2">Storage</p>
              <Progress value={65} className="w-full" />
              <p className="text-xs text-muted-foreground mt-1">
                65 GB of 100 GB used
              </p>
            </div>
          </aside>

          {/* File Content Area */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search files..." className="pl-10" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <LayoutGrid className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <List className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Folders Grid */}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Folders</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {folders.map((folder) => (
                  <Card key={folder.name} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Folder className="h-10 w-10 text-primary" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Share</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h3 className="font-medium">{folder.name}</h3>
                      <p className="text-sm text-muted-foreground">{folder.files} files</p>
                      <p className="text-sm text-muted-foreground">{folder.size}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Recent Files Table */}
            <div className="p-6 pt-0">
              <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentFiles.map((file) => (
                      <TableRow key={file.name}>
                        <TableCell className="font-medium flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {file.name}
                        </TableCell>
                        <TableCell>{file.type}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell>{file.modified}</TableCell>
                        <TableCell className="text-right">
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Download</DropdownMenuItem>
                              <DropdownMenuItem>Share</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FileManagerPage;