import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Bell, Shield, User, Database } from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

const Settings = () => {
  const { theme, setTheme } = useTheme();

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    toast.success(`${checked ? "Dark" : "Light"} mode enabled`);
  };

  return (
    <PageLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <div className="flex">
            <div className="w-64 mr-8 shrink-0">
              <Card className="sticky top-6">
                <CardContent className="p-0">
                  <TabsList className="flex flex-col w-full rounded-none h-auto bg-transparent">
                    <TabsTrigger 
                      value="general" 
                      className="justify-start px-4 py-3 border-l-2 border-transparent data-[state=active]:border-helix-600 rounded-none w-full"
                    >
                      <SettingsIcon className="mr-2 h-5 w-5" />
                      General
                    </TabsTrigger>
                    <TabsTrigger 
                      value="notifications" 
                      className="justify-start px-4 py-3 border-l-2 border-transparent data-[state=active]:border-helix-600 rounded-none w-full"
                    >
                      <Bell className="mr-2 h-5 w-5" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger 
                      value="security" 
                      className="justify-start px-4 py-3 border-l-2 border-transparent data-[state=active]:border-helix-600 rounded-none w-full"
                    >
                      <Shield className="mr-2 h-5 w-5" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger 
                      value="account" 
                      className="justify-start px-4 py-3 border-l-2 border-transparent data-[state=active]:border-helix-600 rounded-none w-full"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Account
                    </TabsTrigger>
                    <TabsTrigger 
                      value="integrations" 
                      className="justify-start px-4 py-3 border-l-2 border-transparent data-[state=active]:border-helix-600 rounded-none w-full"
                    >
                      <Database className="mr-2 h-5 w-5" />
                      Integrations
                    </TabsTrigger>
                  </TabsList>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <TabsContent value="general" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Manage your application preferences and display settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Application Preferences</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="dark-mode">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Enable dark mode for the application interface
                            </p>
                          </div>
                          <Switch 
                            id="dark-mode"
                            checked={theme === "dark"}
                            onCheckedChange={handleDarkModeToggle}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="auto-save">Auto Save</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically save changes to configurations
                            </p>
                          </div>
                          <Switch id="auto-save" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="analytics">Usage Analytics</Label>
                            <p className="text-sm text-muted-foreground">
                              Share anonymous usage data to improve the platform
                            </p>
                          </div>
                          <Switch id="analytics" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Display Settings</h3>
                      <div className="grid gap-6">
                        <div className="grid gap-2">
                          <Label htmlFor="language">Language</Label>
                          <Select defaultValue="en">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="de">German</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="zh">Chinese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="utc+1">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                              <SelectItem value="utc+1">Central European Time (GMT+1)</SelectItem>
                              <SelectItem value="utc+5.5">Indian Standard Time (GMT+5:30)</SelectItem>
                              <SelectItem value="utc-5">Eastern Standard Time (GMT-5)</SelectItem>
                              <SelectItem value="utc-8">Pacific Standard Time (GMT-8)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select defaultValue="dd/mm/yyyy">
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Simulation Completion</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive emails when simulations are complete
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Test Failures</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive emails when tests fail
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>System Alerts</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive emails for critical system alerts
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Weekly Reports</Label>
                              <p className="text-sm text-muted-foreground">
                                Receive weekly summary reports
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">In-App Notifications</h3>
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Task Assignments</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when you're assigned to tasks
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>Mentions</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified when mentioned in comments
                              </p>
                            </div>
                            <Switch defaultChecked />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>All Activity</Label>
                              <p className="text-sm text-muted-foreground">
                                Get notified for all project activity
                              </p>
                            </div>
                            <Switch />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your account security and authentication settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Security settings content...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your personal information and account details.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Account settings content...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Settings</CardTitle>
                    <CardDescription>
                      Connect external services and APIs to the platform.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Integration settings content...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Settings;
