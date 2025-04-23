
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkflowCard } from "@/components/dashboard/WorkflowCard";

const workflows = [
  {
    id: 1,
    title: "SIL Validation - ACC System",
    description: "Software-in-the-loop validation for Adaptive Cruise Control",
    status: "completed" as const,
    steps: 8,
    completedSteps: 8,
    date: "Today, 9:42 AM",
  },
  {
    id: 2,
    title: "HIL Tests - Lane Keeping",
    description: "Hardware-in-the-loop testing for Lane Keeping Assistant",
    status: "in-progress" as const,
    steps: 12,
    completedSteps: 7,
    date: "Today, 10:15 AM",
  },
  {
    id: 3,
    title: "Recompute - Collision Avoidance",
    description: "Re-evaluating collision avoidance algorithms with updated parameters",
    status: "in-progress" as const,
    steps: 5,
    completedSteps: 2,
    date: "Today, 11:03 AM",
  },
  {
    id: 4,
    title: "SIL Testing - Parking System",
    description: "Scheduled validation of automated parking system components",
    status: "upcoming" as const,
    steps: 9,
    completedSteps: 0,
    date: "Tomorrow, 9:00 AM",
  },
];

export function WorkflowList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Workflows</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {workflows.map((workflow) => (
          <WorkflowCard key={workflow.id} {...workflow} />
        ))}
      </CardContent>
    </Card>
  );
}
