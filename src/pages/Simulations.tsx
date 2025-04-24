import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout/PageLayout";

const Simulations = () => {
  const simulations = [
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
    }
  ];

  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Simulations</h1>
          <Badge variant="outline">3 Active Simulations</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {simulations.map((sim) => (
            <Card key={sim.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {sim.name}
                </CardTitle>
                <Badge variant={
                  sim.status === "Running" ? "default" :
                  sim.status === "Completed" ? "secondary" : "outline"
                }>
                  {sim.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{sim.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Progress:</span>
                    <span>{sim.progress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Started:</span>
                    <span>{new Date(sim.startedAt).toLocaleTimeString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Simulations;
