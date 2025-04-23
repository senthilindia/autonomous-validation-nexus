
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  const data = [
    { name: 'Week 1', passed: 120, failed: 8, total: 128 },
    { name: 'Week 2', passed: 135, failed: 5, total: 140 },
    { name: 'Week 3', passed: 142, failed: 8, total: 150 },
    { name: 'Week 4', passed: 158, failed: 12, total: 170 },
  ];

  const metrics = [
    { title: "Test Success Rate", value: "94.5%", change: "+2.1%" },
    { title: "Average Response Time", value: "235ms", change: "-12ms" },
    { title: "Code Coverage", value: "87%", change: "+5%" },
    { title: "Bug Detection Rate", value: "96%", change: "+1.5%" }
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Test Execution Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="passed" fill="#22c55e" stackId="a" name="Passed Tests" />
                <Bar dataKey="failed" fill="#ef4444" stackId="a" name="Failed Tests" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
