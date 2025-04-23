
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-helix-50 to-helix-100">
      <div className="text-center mx-auto max-w-md p-6">
        <div className="rounded-full bg-helix-100 h-24 w-24 flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} className="text-helix-700" />
        </div>
        <h1 className="text-4xl font-bold text-helix-900 mb-4">404</h1>
        <p className="text-xl text-helix-700 mb-6">The page you requested could not be found</p>
        <p className="text-muted-foreground mb-8">
          The page at <code className="px-2 py-1 bg-helix-100 rounded text-helix-700">{location.pathname}</code> does not exist or has been moved.
        </p>
        <Button
          className="bg-gradient-to-r from-helix-600 to-helix-700 hover:from-helix-700 hover:to-helix-800"
          onClick={() => window.location.href = "/"}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
