
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";

interface WorkflowCardProps {
  title: string;
  description: string;
  status: "completed" | "in-progress" | "upcoming";
  steps: number;
  completedSteps: number;
  date: string;
}

export function WorkflowCard({ 
  title, 
  description, 
  status,
  steps,
  completedSteps,
  date 
}: WorkflowCardProps) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-helix-600">
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {status === "completed" && (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> Completed
          </Badge>
        )}
        {status === "in-progress" && (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1 animate-pulse" /> In Progress
          </Badge>
        )}
        {status === "upcoming" && (
          <Badge variant="outline">Upcoming</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center">
            <span className="font-medium">{completedSteps}/{steps} Steps</span>
            <span className="mx-2">•</span>
            <span>{date}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-helix-500" />
        </div>
      </CardContent>
    </Card>
  );
}
