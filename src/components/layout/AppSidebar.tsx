
import { Home, BarChart2, FileText, Settings, Users, Database, Server, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

type AccessLevel = "all" | "admin" | "engineer" | "viewer";

interface MenuItem {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  title: string;
  path: string;
  accessLevel: AccessLevel;
}

// Current user role - In a real app, this would come from authentication context
const currentUserRole: AccessLevel = "admin";

export function AppSidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { icon: Home, title: "Dashboard", path: "/", accessLevel: "all" },
    { icon: Layers, title: "Simulations", path: "/simulations", accessLevel: "all" },
    { icon: FileText, title: "Test Cases", path: "/test-cases", accessLevel: "all" },
    { icon: BarChart2, title: "Analytics", path: "/analytics", accessLevel: "all" },
    { icon: Server, title: "Infrastructure", path: "/infrastructure", accessLevel: "engineer" },
    { icon: Database, title: "Data Management", path: "/data", accessLevel: "admin" },
    { icon: Users, title: "Teams", path: "/teams", accessLevel: "admin" },
    { icon: Settings, title: "Settings", path: "/settings", accessLevel: "admin" }
  ];

  // Access control function
  const hasAccess = (requiredLevel: AccessLevel): boolean => {
    if (requiredLevel === "all") return true;
    if (currentUserRole === "admin") return true;
    if (currentUserRole === "engineer" && requiredLevel !== "admin") return true;
    if (currentUserRole === "viewer" && requiredLevel === "viewer") return true;
    return false;
  };

  // Filter menu items based on access
  const accessibleMenuItems = menuItems.filter(item => hasAccess(item.accessLevel));

  return (
    <div
      className={cn(
        "flex flex-col bg-sidebar transition-all duration-300 border-r border-border h-screen",
        collapsed ? "w-16" : "w-60",
        className
      )}
    >
      <div className="flex items-center h-14 px-3 border-b border-border">
        {!collapsed && (
          <div className="text-lg font-semibold text-helix-700">Helix DTP</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("ml-auto")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {accessibleMenuItems.map((item) => (
          <Button
            key={item.title}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              location.pathname === item.path 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground",
              item.accessLevel === "admin" && "border-l-2 border-helix-600"
            )}
            asChild
          >
            <Link to={item.path}>
              <item.icon className={cn(
                "h-5 w-5",
                location.pathname === item.path && "text-helix-600"
              )} />
              {!collapsed && (
                <div className="ml-2 flex items-center gap-2">
                  <span>{item.title}</span>
                  {item.accessLevel === "admin" && (
                    <span className="text-xs px-1.5 py-0.5 bg-helix-100 text-helix-700 rounded-md">Admin</span>
                  )}
                </div>
              )}
            </Link>
          </Button>
        ))}
      </nav>
      
      <div className="p-2 border-t border-border">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-helix-100 flex items-center justify-center">
            <span className="text-sm font-medium text-helix-700">MB</span>
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium">MBRDI User</p>
              <p className="text-xs text-muted-foreground">RD/ICZ Dept.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
