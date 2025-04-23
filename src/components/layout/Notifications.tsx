
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: 1,
    type: "alert",
    message: "Simulation #2831 failed due to timeouts",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "info",
    message: "Lane detection model updated to v2.3",
    time: "30 minutes ago",
  },
  {
    id: 3,
    type: "success",
    message: "Test batch #892 completed successfully",
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "info",
    message: "System maintenance scheduled for 10:00 PM",
    time: "2 hours ago",
  },
  {
    id: 5,
    type: "alert",
    message: "Low storage warning on primary simulation cluster",
    time: "5 hours ago",
  },
];

export function Notifications() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <Badge className="absolute top-1 right-1 h-2 w-2 p-0 bg-helix-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="text-center">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-80 overflow-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-2 cursor-pointer">
              <div className="flex items-center w-full">
                <div className="flex-1">
                  <p className={`text-sm ${notification.type === "alert" ? "text-red-600 font-medium" : ""}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {notification.type === "alert" && (
                  <Badge variant="destructive" className="ml-2 bg-red-100 text-red-800 hover:bg-red-200">
                    Alert
                  </Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center cursor-pointer hover:bg-accent" asChild>
          <a href="#" className="w-full text-center text-sm text-primary">View all notifications</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
