
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, Calendar, Clock, Briefcase } from "lucide-react";

const Teams = () => {
  const teams = [
    {
      name: "SIL Development",
      members: 8,
      progress: 76,
      activeTasks: 12,
      lead: {
        name: "Emma Johnson",
        role: "Lead Engineer",
        avatar: "EJ"
      }
    },
    {
      name: "HIL Testing",
      members: 6,
      progress: 62,
      activeTasks: 9,
      lead: {
        name: "Michael Chen",
        role: "Test Manager",
        avatar: "MC"
      }
    },
    {
      name: "Integration",
      members: 5,
      progress: 48,
      activeTasks: 7,
      lead: {
        name: "Sarah Miller",
        role: "Integration Specialist",
        avatar: "SM"
      }
    },
    {
      name: "Verification",
      members: 4,
      progress: 89,
      activeTasks: 3,
      lead: {
        name: "David Patel",
        role: "QA Lead",
        avatar: "DP"
      }
    }
  ];

  const members = [
    { name: "Emma Johnson", role: "Lead Engineer", team: "SIL Development", avatar: "EJ" },
    { name: "Michael Chen", role: "Test Manager", team: "HIL Testing", avatar: "MC" },
    { name: "Sarah Miller", role: "Integration Specialist", team: "Integration", avatar: "SM" },
    { name: "David Patel", role: "QA Lead", team: "Verification", avatar: "DP" },
    { name: "Olivia Rodriguez", role: "SIL Engineer", team: "SIL Development", avatar: "OR" },
    { name: "James Wilson", role: "HIL Engineer", team: "HIL Testing", avatar: "JW" },
    { name: "Sophia Lee", role: "Test Engineer", team: "Verification", avatar: "SL" },
    { name: "William Taylor", role: "Integration Engineer", team: "Integration", avatar: "WT" },
  ];

  return (
    <PageLayout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Teams</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-helix-600" />
                Total Teams
              </CardTitle>
              <CardDescription>Active project teams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{teams.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {teams.reduce((acc, team) => acc + team.members, 0)} members
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <UserCheck className="mr-2 h-5 w-5 text-helix-600" />
                Members
              </CardTitle>
              <CardDescription>Total team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{members.length}</div>
              <div className="text-sm text-muted-foreground mt-1">
                4 team leads
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-helix-600" />
                Active Tasks
              </CardTitle>
              <CardDescription>Current workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {teams.reduce((acc, team) => acc + team.activeTasks, 0)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Across all teams
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-helix-600" />
                Average Progress
              </CardTitle>
              <CardDescription>Project completion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(teams.reduce((acc, team) => acc + team.progress, 0) / teams.length)}%
              </div>
              <Progress value={Math.round(teams.reduce((acc, team) => acc + team.progress, 0) / teams.length)} className="mt-2" />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="teams" className="w-full">
          <TabsList>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          <TabsContent value="teams" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((team, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{team.name}</CardTitle>
                        <CardDescription className="mt-1">{team.members} members</CardDescription>
                      </div>
                      <Badge variant={team.progress > 75 ? "default" : "outline"}>
                        {team.progress}% Complete
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{team.progress}%</span>
                      </div>
                      <Progress value={team.progress} />
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback>{team.lead.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{team.lead.name}</div>
                        <div className="text-sm text-muted-foreground">{team.lead.role}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="text-sm text-muted-foreground">{team.activeTasks} Active Tasks</div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="members" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {members.map((member, i) => (
                    <Card key={i}>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-20 w-20 mb-4">
                            <AvatarFallback className="text-xl">{member.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-lg">{member.name}</div>
                          <div className="text-sm text-muted-foreground mb-2">{member.role}</div>
                          <Badge variant="outline">{member.team}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Project assignments and details...</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">Team schedules and calendar...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Teams;
