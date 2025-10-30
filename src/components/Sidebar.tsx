import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  ShoppingCart, 
  Mail, 
  MessageSquare, 
  Users, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Projects", icon: FolderKanban, path: "/projects" },
  { title: "File Manager", icon: FileText, path: "/files" },
  { title: "Ecommerce", icon: ShoppingCart, path: "/ecommerce" },
  { title: "Letter Box", icon: Mail, path: "/mailbox" },
  { title: "Chats", icon: MessageSquare, path: "/chats" },
  { title: "Users", icon: Users, path: "/users" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
                C
              </div>
              <span className="font-semibold text-sidebar-foreground">CRM Pro</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="space-y-1">
            <p className={cn(
              "text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3",
              collapsed && "hidden"
            )}>
              General
            </p>
            {navigationItems.slice(0, 2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>

          <div className="space-y-1 pt-4">
            <p className={cn(
              "text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3",
              collapsed && "hidden"
            )}>
              Applications
            </p>
            {navigationItems.slice(2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                    collapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* User Profile */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center text-white font-semibold shadow-lg">
                WW
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">Wade Warren</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">UI Designer</p>
              </div>
              <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
