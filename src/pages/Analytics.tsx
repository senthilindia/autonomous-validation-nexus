
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
  return (
    <PageLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <Badge variant="outline">System Overview</Badge>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Placeholder for analytics content</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Placeholder for test coverage analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Analytics;
