
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { TestsTable } from "@/components/dashboard/TestsTable";
import { EnvironmentMetrics } from "@/components/dashboard/EnvironmentMetrics";
import { SimulationStatus } from "@/components/dashboard/SimulationStatus";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { WorkflowList } from "@/components/dashboard/WorkflowList";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-helix-50 to-helix-100 flex items-center justify-center">
        <LoginForm />
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Autonomous Validation Nexus</h1>
            <p className="text-muted-foreground">Digital Testing Platform for Automated Driving Systems</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock size={14} />
            {currentTime.toLocaleTimeString()}
          </Badge>
        </div>
        
        <div className="space-y-6">
          <DashboardStats />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-full md:col-span-1 lg:col-span-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">Recent Tests</CardTitle>
                <Badge variant="outline" className="ml-auto">Last 24 hours</Badge>
              </CardHeader>
              <CardContent>
                <TestsTable />
              </CardContent>
            </Card>
            
            <div className="col-span-full md:col-span-1 lg:col-span-3">
              <SimulationStatus />
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-full md:col-span-1 lg:col-span-4">
              <EnvironmentMetrics />
            </div>
            
            <div className="col-span-full md:col-span-1 lg:col-span-3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">API Server</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Database Cluster</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Simulation Workers</span>
                      <Badge className="bg-green-100 text-green-800">16/16 Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Storage System</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Analytics Pipeline</span>
                      <Badge className="bg-amber-100 text-amber-800">Degraded</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Background Jobs</span>
                      <Badge className="bg-green-100 text-green-800">Running</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Backup System</span>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <WorkflowList />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
