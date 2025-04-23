
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Dummy data
const data = [
  {
    name: "Day 1",
    cpu: 40,
    memory: 24,
    storage: 10,
  },
  {
    name: "Day 2",
    cpu: 30,
    memory: 18,
    storage: 12,
  },
  {
    name: "Day 3",
    cpu: 20,
    memory: 98,
    storage: 15,
  },
  {
    name: "Day 4",
    cpu: 27,
    memory: 39,
    storage: 11,
  },
  {
    name: "Day 5",
    cpu: 18,
    memory: 48,
    storage: 13,
  },
  {
    name: "Day 6",
    cpu: 23,
    memory: 38,
    storage: 14,
  },
  {
    name: "Day 7",
    cpu: 34,
    memory: 43,
    storage: 16,
  },
];

export function EnvironmentMetrics() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Resource Utilization</CardTitle>
        <CardDescription>
          7-day overview of system resources utilization metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="cpu"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="memory"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="storage"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
