
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Database, Activity, Code, Info, BarChart } from "lucide-react";
import { EnhancedSimulationScene } from "@/components/3d/EnhancedSimulationScene";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { SimulationProps } from "./SimulationCard";

// Data visualization component to show simulation metrics
const MetricsVisualizer = ({ 
  type, 
  progress, 
  active 
}: { 
  type: 'SIL' | 'HIL'; 
  progress: number;
  active: boolean;
}) => {
  // Generate some fake data for visualization
  const data = [
    { value: Math.random() * 80 + 20, label: "CPU" },
    { value: Math.random() * 60 + 20, label: "RAM" },
    { value: Math.random() * 100, label: "Network" },
    { value: progress, label: "Progress" }
  ];
  
  const barHeight = 5;
  
  return (
    <div className={`mt-4 space-y-2 ${!active && "opacity-50"}`}>
      {data.map((item, index) => (
        <div key={index} className="flex items-center text-xs">
          <span className="w-16 text-muted-foreground">{item.label}</span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                type === 'SIL' 
                  ? 'bg-gradient-to-r from-amber-400 to-amber-600' 
                  : 'bg-gradient-to-r from-blue-400 to-blue-600'
              }`}
              style={{ width: `${active ? item.value : 0}%`, transition: 'width 1s ease-in-out' }}
            />
          </div>
          <span className="w-8 text-right">{Math.round(item.value)}%</span>
        </div>
      ))}
    </div>
  );
};

export function EnhancedSimulationCard({ simulation }: { simulation: SimulationProps }) {
  const { name, status, progress, type, startedAt } = simulation;
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Different approach for SIL vs HIL simulations
  const isHIL = type === "HIL";
  const isActive = status === "Running" || status === "Completed";
  
  const handleViewDetails = () => {
    setIsExpanded(!isExpanded);
    toast({
      title: `${name}`,
      description: `Showing ${isExpanded ? 'less' : 'more'} details for this simulation`,
      variant: "default",
    });
  };
  
  return (
    <Card className={`
      ${isHIL ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-amber-500'}
      transition-all duration-300 ease-in-out
      ${isExpanded ? 'shadow-lg' : 'hover:shadow-md'}
    `}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          {isHIL ? (
            <Server size={18} className="text-blue-500" />
          ) : (
            <Database size={18} className="text-amber-500" />
          )}
          <CardTitle className="text-sm font-medium line-clamp-1">
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
      <CardContent className="p-0">
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'h-[500px]' : 'h-[200px]'}`}>
          <EnhancedSimulationScene 
            type={type} 
            height={isExpanded ? "350px" : "200px"} 
            active={isActive} 
          />
        </div>
        
        <div className="p-4 pt-0 space-y-4">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className={`font-medium ${isHIL ? 'text-blue-500' : 'text-amber-500'}`}>
                {type === 'SIL' ? 'Software-in-the-Loop' : 'Hardware-in-the-Loop'}
              </span>
            </div>
            
            {/* Different progress visualization based on type */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Progress:</span>
              {isHIL ? (
                <div className="flex items-center gap-1">
                  <div className="bg-muted w-24 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 h-full rounded-full transition-all duration-1000" 
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
                        className={`h-2 w-2 rounded-full mx-0.5 transition-colors duration-500 ${
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
          
          {isExpanded && (
            <div className="pt-2 border-t border-border">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <Activity size={14} />
                Simulation Metrics
              </h4>
              <MetricsVisualizer type={type} progress={progress} active={isActive} />
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-muted-foreground">Data Sources</h5>
                  <ul className="text-xs space-y-1">
                    {type === 'SIL' ? (
                      <>
                        <li className="flex items-center gap-1"><Code size={10} /> Mathematical Models</li>
                        <li className="flex items-center gap-1"><Code size={10} /> Virtual Sensors</li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-1"><Server size={10} /> ECU Data</li>
                        <li className="flex items-center gap-1"><Server size={10} /> Hardware Sensors</li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-medium text-muted-foreground">Processing</h5>
                  <ul className="text-xs space-y-1">
                    {type === 'SIL' ? (
                      <>
                        <li className="flex items-center gap-1"><BarChart size={10} /> CPU: Desktop-class</li>
                        <li className="flex items-center gap-1"><Info size={10} /> Non-realtime</li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-center gap-1"><BarChart size={10} /> Hardware Loop</li>
                        <li className="flex items-center gap-1"><Info size={10} /> Real-time</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleViewDetails} 
          className="ml-auto"
        >
          {isExpanded ? 'Show Less' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  );
}
