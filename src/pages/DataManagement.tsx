
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Database, FileType2, Server, UploadCloud } from "lucide-react";

const DataManagement = () => {
  // Sample data for visualization
  const storageData = [
    { name: 'Used', value: 68, color: '#3182ce' },
    { name: 'Available', value: 32, color: '#9ae6b4' },
  ];

  const dataSourcesData = [
    { name: 'Simulation Data', value: 42, color: '#f6ad55' },
    { name: 'Sensor Data', value: 28, color: '#63b3ed' },
    { name: 'Vehicle Parameters', value: 18, color: '#b794f4' },
    { name: 'Test Results', value: 12, color: '#f687b3' },
  ];

  return (
    <PageLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Data Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-helix-600" />
                Storage Usage
              </CardTitle>
              <CardDescription>Total storage allocation and usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {storageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center mt-2 text-muted-foreground">
                <p>13.6 TB / 20 TB Used</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileType2 className="mr-2 h-5 w-5 text-helix-600" />
                Recent Files
              </CardTitle>
              <CardDescription>Latest modified files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['vehicle_params_v2.json', 'sil_test_results.csv', 'sensor_config.xml', 'hil_simulation_data.bin'].map((file, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="text-sm font-medium">{file}</div>
                    <div className="text-xs text-muted-foreground">{i === 0 ? '2m ago' : i === 1 ? '1h ago' : i === 2 ? '3h ago' : '1d ago'}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <UploadCloud className="mr-2 h-5 w-5 text-helix-600" />
                Data Sources
              </CardTitle>
              <CardDescription>Distribution by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataSourcesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {dataSourcesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            <TabsTrigger value="simulation">Simulation Data</TabsTrigger>
            <TabsTrigger value="calibration">Calibration Files</TabsTrigger>
            <TabsTrigger value="parameters">Parameters</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4">Name</th>
                      <th className="text-left pb-4">Type</th>
                      <th className="text-left pb-4">Size</th>
                      <th className="text-left pb-4">Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'vehicle_params_v2.json', type: 'JSON', size: '2.4 MB', date: 'Apr 24, 2025' },
                      { name: 'sil_test_results.csv', type: 'CSV', size: '15.7 MB', date: 'Apr 24, 2025' },
                      { name: 'sensor_config.xml', type: 'XML', size: '1.2 MB', date: 'Apr 24, 2025' },
                      { name: 'hil_simulation_data.bin', type: 'Binary', size: '845 MB', date: 'Apr 23, 2025' },
                      { name: 'ecu_calibration.hex', type: 'HEX', size: '128 KB', date: 'Apr 22, 2025' },
                      { name: 'test_environment_setup.json', type: 'JSON', size: '4.9 MB', date: 'Apr 21, 2025' },
                    ].map((file, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3">{file.name}</td>
                        <td className="py-3">{file.type}</td>
                        <td className="py-3">{file.size}</td>
                        <td className="py-3">{file.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="simulation" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Simulation data files...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="calibration" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Calibration files...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="parameters" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Parameter files...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default DataManagement;
