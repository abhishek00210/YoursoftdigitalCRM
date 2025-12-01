// src/components/Sidebar.tsx

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
  X,
  Circle,
  Briefcase,
  CalendarDays,
  Receipt,
  Landmark,
  UserCog
} from "lucide-react";
import { useState, useEffect } from "react"; // <-- Added useEffect
import { cn } from "@/lib/utils";

// Updated navigation structure
const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }, // Fixed path
  { 
    title: "Client", 
    icon: Users,
    submenu: [
      { title: "Client List", path: "/client-list" },
      { title: "Client Contact List", path: "/client-contact-list" },
    ] 
  },
  { title: "Projects", icon: Briefcase, path: "/projects" },
  { title: "Kanban", icon: FolderKanban, path: "/kanban" },
  { title: "File Manager", icon: FileText, path: "/filemanager" },
  { title: "Bookings", icon: CalendarDays, path: "/bookings" },
  { title: "Invoice", icon: Receipt, path: "/invoice" },
  { title: "Expenses", icon: Landmark, path: "/expenses" },
  { title: "Employee", icon: UserCog, path: "/employee" },
  { title: "Ecommerce", icon: ShoppingCart, path: "/ecommerce" },
  { title: "Letter Box", icon: Mail, path: "/letterbox" },
  { title: "Chats", icon: MessageSquare, path: "/chats" },
  { title: "Users", icon: Users, path: "/users" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [clientSubmenuOpen, setClientSubmenuOpen] = useState(false);
  
  // --- NEW: User State ---
  const [user, setUser] = useState<{ firstName: string; lastName: string } | null>(null);

  // Load user from LocalStorage on mount
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Failed to parse user data");
        }
      }
    };

    loadUser();

    // Listen for storage changes (in case of login/logout in other tabs)
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Helper to get initials (e.g., "John Doe" -> "JD")
  const getInitials = () => {
    if (!user) return "GU"; // Guest User default
    const first = user.firstName ? user.firstName[0] : "";
    const last = user.lastName ? user.lastName[0] : "";
    return (first + last).toUpperCase();
  };

  const getFullName = () => {
    if (!user) return "Guest User";
    return `${user.firstName} ${user.lastName}`;
  };

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
            {/* ... (Keep the navigation logic exactly the same as before) ... */}
            {/* For brevity, I'm pasting the logic back in so you don't lose it */}
            <div className="space-y-1">
            <p className={cn(
              "text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3",
              collapsed && "hidden"
            )}>
              General
            </p>
            {navigationItems.slice(0, 2).map((item) => (
              item.submenu ? (
                <div key={item.title}>
                  <button
                    onClick={() => setClientSubmenuOpen(!clientSubmenuOpen)}
                    className={cn(
                      "flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground transition-all duration-200",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      collapsed && "justify-center"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </div>
                    {!collapsed && (
                      <ChevronRight className={cn("h-4 w-4 transition-transform", clientSubmenuOpen && "rotate-90")} />
                    )}
                  </button>
                  {!collapsed && clientSubmenuOpen && (
                    <div className="pl-9 space-y-1 mt-1">
                      {item.submenu.map((subItem) => (
                        <NavLink
                          key={subItem.path}
                          to={subItem.path}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 transition-all duration-200",
                              "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                              isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            )
                          }
                        >
                          <Circle className="h-2 w-2 fill-current" />
                          <span>{subItem.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
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
              )
            ))}
          </div>
          
          <div className="space-y-1 pt-4">
            <p className={cn("text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-3", collapsed && "hidden")}>
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

        {/* --- MODIFIED: User Profile Section --- */}
        {!collapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-accent via-secondary to-primary flex items-center justify-center text-white font-semibold shadow-lg">
                {/* Dynamic Initials */}
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                {/* Dynamic Name */}
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {getFullName()}
                </p>
                {/* Removed the 'UI Designer' p tag, so it shows nothing here */}
              </div>
              <ChevronRight className="h-4 w-4 text-sidebar-foreground/40" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}