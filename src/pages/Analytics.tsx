
import { PageLayout } from "@/components/layout/PageLayout";

const Analytics = () => {
  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-helix-700 to-helix-500">
          Analytics
        </h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="font-medium mb-2">Simulation Performance</h3>
            <p className="text-muted-foreground">View performance metrics for all simulation runs</p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="font-medium mb-2">Test Coverage</h3>
            <p className="text-muted-foreground">Analyze test coverage statistics and trends</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Analytics;
