"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Users,
  FileText,
  Wallet,
  ClipboardCheck,
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  DollarSign,
  User,
} from "lucide-react";
import Link from "next/link";

const projectData = {
  id: "PRJ-001",
  name: "Riverside Tower",
  client: "Urban Development Corp",
  status: "active",
  progress: 65,
  budget: 12000000,
  spent: 7800000,
  location: "Downtown, City Center",
  startDate: "2026-01-15",
  endDate: "2026-12-15",
  manager: "John Smith",
  description: "Construction of a 20-story commercial tower with underground parking, retail spaces, and office units.",
};

const milestones = [
  { name: "Foundation Complete", date: "2026-03-15", status: "completed" },
  { name: "Structural Framework", date: "2026-06-30", status: "completed" },
  { name: "Floor 10 Completion", date: "2026-08-10", status: "on-track" },
  { name: "Exterior Finishing", date: "2026-10-01", status: "on-track" },
  { name: "Interior Handover", date: "2026-12-01", status: "pending" },
];

const tasks = [
  { name: "Floor 11 Concrete Pouring", assignee: "Mike Wilson", due: "2026-07-15", priority: "high", status: "in-progress" },
  { name: "HVAC Installation - Floor 8", assignee: "Sarah Lee", due: "2026-07-18", priority: "medium", status: "pending" },
  { name: "Electrical Wiring - Floor 6-7", assignee: "James Brown", due: "2026-07-12", priority: "high", status: "completed" },
  { name: "Window Installation - Floor 5", assignee: "Anna Davis", due: "2026-07-20", priority: "low", status: "pending" },
];

const teamMembers = [
  { name: "John Smith", role: "Project Manager", email: "john@cos.com" },
  { name: "Mike Wilson", role: "Site Supervisor", email: "mike@cos.com" },
  { name: "Sarah Lee", role: "Structural Engineer", email: "sarah@cos.com" },
  { name: "James Brown", role: "Electrical Engineer", email: "james@cos.com" },
  { name: "Anna Davis", role: "Architect", email: "anna@cos.com" },
];

export default function ProjectDetailPage() {
  const params = useParams();
  const project = projectData;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(amount);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/projects">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-cos-blue">{project.name}</h1>
              <Badge variant="success">{project.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{project.id} • {project.client}</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Edit className="mr-2 h-4 w-4" />
          Edit Project
        </Button>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{project.progress}%</span>
              </div>
              <Progress value={project.progress} variant="success" className="h-3" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-8">
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="font-semibold">{formatCurrency(project.budget)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Spent</p>
                <p className="font-semibold">{formatCurrency(project.spent)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Start</p>
                <p className="font-semibold">{project.startDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">End</p>
                <p className="font-semibold">{project.endDate}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <Building2 className="h-8 w-8 text-cos-orange" />
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <MapPin className="h-8 w-8 text-cos-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{project.location}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <User className="h-8 w-8 text-amber-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Manager</p>
                  <p className="font-medium">{project.manager}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardContent className="flex items-center gap-3 p-4">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Budget Remaining</p>
                  <p className="font-medium">{formatCurrency(project.budget - project.spent)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-cos-blue">Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {milestones.map((ms) => (
                  <div key={ms.name} className="flex items-center gap-3 border-b pb-3 last:border-0 last:pb-0">
                    {ms.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : ms.status === "on-track" ? (
                      <Clock className="h-5 w-5 text-blue-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{ms.name}</p>
                      <p className="text-xs text-muted-foreground">{ms.date}</p>
                    </div>
                    <Badge variant={ms.status === "completed" ? "success" : ms.status === "on-track" ? "default" : "warning"}>
                      {ms.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-cos-blue">Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map((task) => (
                      <TableRow key={task.name}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>
                          <Badge variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "warning" : "secondary"}>
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={task.status === "completed" ? "success" : "warning"}>{task.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Timeline and Gantt chart view will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-cos-blue">Project Team</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.name}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Project documents and drawings will be listed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Detailed budget breakdown and cost tracking will be shown here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Quality control checklists and inspection reports.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <p className="text-muted-foreground">Safety reports, incident logs, and compliance documents.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
