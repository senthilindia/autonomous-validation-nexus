
import { Search, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Notifications } from "./Notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeaderBackground } from "@/components/3d/HeaderBackground";

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="border-b border-border bg-white h-14 flex items-center px-4 relative overflow-hidden">
      <HeaderBackground />
      <div className="flex-1 flex items-center gap-2 z-10">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2">
            <Menu size={20} />
          </Button>
        )}
        <div className={`relative ${isMobile ? 'w-full' : 'w-96'}`}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={isMobile ? "Search..." : "Search tests, simulations, configurations..."}
            className="pl-8 bg-muted/30"
          />
        </div>
      </div>
      <div className="flex items-center space-x-2 ml-2 z-10">
        {!isMobile && (
          <Button variant="ghost" size="icon">
            <HelpCircle size={20} />
          </Button>
        )}
        <Notifications />
      </div>
    </header>
  );
}
