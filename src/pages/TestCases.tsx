
import { PageLayout } from "@/components/layout/PageLayout";

const TestCases = () => {
  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-helix-700 to-helix-500">
          Test Cases
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="font-medium mb-2">Collision Avoidance Tests</h3>
            <p className="text-muted-foreground">Test scenarios for vehicle collision avoidance systems</p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="font-medium mb-2">Lane Keeping Tests</h3>
            <p className="text-muted-foreground">Lane keeping and lane departure warning system tests</p>
          </div>
          
          <div className="p-6 border rounded-lg shadow-sm bg-white">
            <h3 className="font-medium mb-2">Adaptive Cruise Control</h3>
            <p className="text-muted-foreground">ACC functionality and edge case scenario tests</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TestCases;
