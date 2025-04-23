
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would redirect to dashboard
      window.location.href = "/";
    }, 1500);
  };

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Helix Platform</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the Digital Testing Platform
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="m.johnson@mbrdi.com"
                  type="email"
                  disabled={isLoading}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  disabled={isLoading}
                  className="pl-8"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-helix-600 to-helix-700 hover:from-helix-700 hover:to-helix-800"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-muted-foreground text-center">
          Secure Authentication for Mercedes-Benz R&D India
        </div>
      </CardFooter>
    </Card>
  );
}
