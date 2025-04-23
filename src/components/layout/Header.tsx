
import { Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notifications } from "./Notifications";

export function Header() {
  return (
    <header className="border-b border-border bg-white h-14 flex items-center px-4">
      <div className="flex-1 flex items-center">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tests, simulations, configurations..."
            className="pl-8 bg-muted/30"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon">
          <HelpCircle size={20} />
        </Button>
        <Notifications />
      </div>
    </header>
  );
}
