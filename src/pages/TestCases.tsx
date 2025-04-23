
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestCases = () => {
  const testCases = [
    {
      id: "TC001",
      name: "Emergency Brake Assist",
      status: "Passed",
      executionTime: "45s",
      lastRun: "2024-04-23",
      coverage: "95%"
    },
    {
      id: "TC002",
      name: "Lane Departure Warning",
      status: "Failed",
      executionTime: "32s",
      lastRun: "2024-04-23",
      coverage: "87%"
    },
    {
      id: "TC003",
      name: "Adaptive Cruise Control",
      status: "In Progress",
      executionTime: "28s",
      lastRun: "2024-04-23",
      coverage: "92%"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Test Cases</h1>
        <div className="flex gap-2">
          <Badge variant="outline">Total: 150</Badge>
          <Badge variant="default">Passed: 142</Badge>
          <Badge variant="destructive">Failed: 8</Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {testCases.map((test) => (
          <Card key={test.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">{test.name}</CardTitle>
                <Badge variant={
                  test.status === "Passed" ? "default" :
                  test.status === "Failed" ? "destructive" : "outline"
                }>
                  {test.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Test ID</p>
                  <p className="font-medium">{test.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Execution Time</p>
                  <p className="font-medium">{test.executionTime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Run</p>
                  <p className="font-medium">{test.lastRun}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Coverage</p>
                  <p className="font-medium">{test.coverage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestCases;
