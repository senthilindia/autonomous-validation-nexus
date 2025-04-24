
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server, Cpu, HardDrive, Network, Layers, Activity } from "lucide-react";

const Infrastructure = () => {
  const servers = [
    { name: "SIL-Server-01", status: "online", cpu: 45, memory: 62, disk: 38 },
    { name: "SIL-Server-02", status: "online", cpu: 28, memory: 54, disk: 41 },
    { name: "HIL-Server-01", status: "online", cpu: 72, memory: 83, disk: 56 },
    { name: "HIL-Server-02", status: "maintenance", cpu: 0, memory: 12, disk: 38 },
    { name: "Data-Processing-01", status: "online", cpu: 65, memory: 72, disk: 89 },
    { name: "Backup-Server-01", status: "online", cpu: 12, memory: 25, disk: 76 },
  ];

  return (
    <PageLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Infrastructure</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5 text-green-600" />
                Servers
              </CardTitle>
              <CardDescription>Total servers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{servers.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {servers.filter(s => s.status === "online").length} online
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-blue-600" />
                CPU Usage
              </CardTitle>
              <CardDescription>Average utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(servers.filter(s => s.status === "online").reduce((acc, s) => acc + s.cpu, 0) / 
                  servers.filter(s => s.status === "online").length)}%
              </div>
              <Progress value={Math.round(servers.filter(s => s.status === "online").reduce((acc, s) => acc + s.cpu, 0) / 
                  servers.filter(s => s.status === "online").length)} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <HardDrive className="mr-2 h-5 w-5 text-amber-600" />
                Disk Usage
              </CardTitle>
              <CardDescription>Average utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(servers.filter(s => s.status === "online").reduce((acc, s) => acc + s.disk, 0) / 
                  servers.filter(s => s.status === "online").length)}%
              </div>
              <Progress value={Math.round(servers.filter(s => s.status === "online").reduce((acc, s) => acc + s.disk, 0) / 
                  servers.filter(s => s.status === "online").length)} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Network className="mr-2 h-5 w-5 text-purple-600" />
                Network
              </CardTitle>
              <CardDescription>Current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                Optimal
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                2.1 Gbps throughput
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="servers" className="w-full">
          <TabsList>
            <TabsTrigger value="servers">Servers</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="virtualization">Virtualization</TabsTrigger>
          </TabsList>
          <TabsContent value="servers" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {servers.map((server, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className={`h-2 w-full ${server.status === "online" ? "bg-green-500" : "bg-amber-500"}`}></div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{server.name}</CardTitle>
                          <Badge variant={server.status === "online" ? "default" : "outline"}>
                            {server.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>CPU</span>
                              <span>{server.cpu}%</span>
                            </div>
                            <Progress value={server.cpu} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Memory</span>
                              <span>{server.memory}%</span>
                            </div>
                            <Progress value={server.memory} />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Disk</span>
                              <span>{server.disk}%</span>
                            </div>
                            <Progress value={server.disk} />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="storage" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Storage infrastructure details...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="network" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Network infrastructure details...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="virtualization" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Virtualization infrastructure details...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Infrastructure;
