
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Database } from "lucide-react";

export interface SimulationProps {
  id: number;
  name: string;
  status: "Running" | "Queued" | "Completed" | "Failed";
  progress: number;
  type: "SIL" | "HIL";
  startedAt: string;
}

export function SimulationCard({ simulation }: { simulation: SimulationProps }) {
  const { name, status, progress, type, startedAt } = simulation;
  
  // Different approach for SIL vs HIL simulations
  const isHIL = type === "HIL";
  
  return (
    <Card className={`${isHIL ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-amber-500'}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {isHIL ? (
            <Server size={18} className="text-blue-500" />
          ) : (
            <Database size={18} className="text-amber-500" />
          )}
          <CardTitle className="text-sm font-medium">
            {name}
          </CardTitle>
        </div>
        <Badge variant={
          status === "Running" ? "default" :
          status === "Completed" ? "secondary" : 
          status === "Failed" ? "destructive" :
          "outline"
        }>
          {status}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className={`font-medium ${isHIL ? 'text-blue-500' : 'text-amber-500'}`}>{type}</span>
          </div>
          
          {/* Different progress visualization based on type */}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Progress:</span>
            {isHIL ? (
              <div className="flex items-center gap-1">
                <div className="bg-muted w-24 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span>{progress}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-2 w-2 rounded-full mx-0.5 ${
                        i < Math.ceil(progress / 20) ? 'bg-amber-500' : 'bg-muted'
                      }`} 
                    />
                  ))}
                </div>
                <span>{progress}%</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Started:</span>
            <span>{new Date(startedAt).toLocaleTimeString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
