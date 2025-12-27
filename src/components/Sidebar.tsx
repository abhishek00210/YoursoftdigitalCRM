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
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Updated navigation structure
const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
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
  { title: "Invoice", icon: Receipt, path: "/invoices" }, // Fixed path to match App.tsx
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
  
  // --- User State ---
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
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // Helper to get initials
  const getInitials = () => {
    if (!user) return "GU";
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
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                C
              </div>
              <span className="font-semibold text-gray-800">CRM Pro</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            <div className="space-y-1">
            <p className={cn(
              "text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3",
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
                      "flex items-center justify-between w-full gap-3 px-3 py-2.5 rounded-lg text-gray-600 transition-all duration-200",
                      "hover:bg-gray-100 hover:text-gray-900",
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
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 transition-all duration-200",
                              "hover:bg-gray-50 hover:text-gray-900",
                              isActive && "bg-indigo-50 text-indigo-600 font-medium"
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
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 transition-all duration-200",
                      "hover:bg-gray-100 hover:text-gray-900",
                      isActive && "bg-indigo-50 text-indigo-600 font-medium",
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
            <p className={cn("text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3", collapsed && "hidden")}>
              Applications
            </p>
            {navigationItems.slice(2).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 transition-all duration-200",
                    "hover:bg-gray-100 hover:text-gray-900",
                    isActive && "bg-indigo-50 text-indigo-600 font-medium",
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

        {/* User Profile Section */}
        {!collapsed && (
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold shadow-lg">
                {/* Dynamic Initials */}
                {getInitials()}
              </div>
              <div className="flex-1 min-w-0">
                {/* Dynamic Name */}
                <p className="text-sm font-medium text-gray-900 truncate">
                  {getFullName()}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}