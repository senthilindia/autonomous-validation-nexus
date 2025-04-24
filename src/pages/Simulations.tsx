import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";
import { SimulationCard, SimulationProps } from "@/components/simulations/SimulationCard";
import { Database, Server } from "lucide-react";

const Simulations = () => {
  const simulations: SimulationProps[] = [
    {
      id: 1,
      name: "Highway Drive Scenario",
      status: "Running",
      progress: 78,
      type: "SIL",
      startedAt: "2024-04-23T09:00:00",
    },
    {
      id: 2,
      name: "Urban Traffic Test",
      status: "Queued",
      progress: 0,
      type: "HIL",
      startedAt: "2024-04-23T09:30:00",
    },
    {
      id: 3,
      name: "Parking Assistant Validation",
      status: "Completed",
      progress: 100,
      type: "SIL",
      startedAt: "2024-04-23T08:00:00",
    },
    {
      id: 4,
      name: "Emergency Braking System",
      status: "Running",
      progress: 45,
      type: "HIL",
      startedAt: "2024-04-23T10:15:00",
    },
    {
      id: 5,
      name: "Lane Change Algorithm",
      status: "Failed",
      progress: 67,
      type: "SIL",
      startedAt: "2024-04-23T07:30:00",
    }
  ];

  const silSimulations = simulations.filter(sim => sim.type === "SIL");
  const hilSimulations = simulations.filter(sim => sim.type === "HIL");

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Simulations</h1>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              SIL: {silSimulations.length}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              HIL: {hilSimulations.length}
            </Badge>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Database size={16} className="text-amber-500" /> 
            Software-in-the-Loop Simulations
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {silSimulations.map((sim) => (
              <SimulationCard key={sim.id} simulation={sim} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Server size={16} className="text-blue-500" /> 
            Hardware-in-the-Loop Simulations
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {hilSimulations.map((sim) => (
              <SimulationCard key={sim.id} simulation={sim} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Simulations;
