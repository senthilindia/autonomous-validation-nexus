
import { Home, BarChart2, FileText, Settings, Users, Database, Server, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

export function AppSidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

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
        <SidebarItem icon={Home} title="Dashboard" active={true} collapsed={collapsed} />
        <SidebarItem icon={Layers} title="Simulations" collapsed={collapsed} />
        <SidebarItem icon={FileText} title="Test Cases" collapsed={collapsed} />
        <SidebarItem icon={BarChart2} title="Analytics" collapsed={collapsed} />
        <SidebarItem icon={Server} title="Infrastructure" collapsed={collapsed} />
        <SidebarItem icon={Database} title="Data Management" collapsed={collapsed} />
        <SidebarItem icon={Users} title="Teams" collapsed={collapsed} />
        <SidebarItem icon={Settings} title="Settings" collapsed={collapsed} />
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

interface SidebarItemProps {
  icon: any;
  title: string;
  active?: boolean;
  collapsed?: boolean;
}

function SidebarItem({ icon: Icon, title, active, collapsed }: SidebarItemProps) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
      )}
    >
      <Icon className={cn("h-5 w-5", active && "text-helix-600")} />
      {!collapsed && <span className="ml-2">{title}</span>}
    </Button>
  );
}
