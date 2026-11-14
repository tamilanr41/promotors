"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Calendar, Eye, HardHat, MapPin, User } from "lucide-react";

const projects = [
  { id: "PRJ-001", name: "Riverside Tower", description: "25-story luxury residential tower with 120 apartments, ground-floor retail, and 3-level basement parking.", status: "active", progress: 65, budget: "$12M", spent: "$7.8M", startDate: "2025-06-01", endDate: "2026-12-15", location: "Mumbai, MH", manager: "John Smith", type: "Residential" },
  { id: "PRJ-005", name: "Green Valley School", description: "K-12 school campus with academic block, sports complex, auditorium, and hostel facilities.", status: "active", progress: 80, budget: "$3.2M", spent: "$2.56M", startDate: "2026-01-15", endDate: "2026-09-15", location: "Pune, MH", manager: "Sarah Lee", type: "Educational" },
];

const milestones = [
  { project: "Riverside Tower", name: "Foundation Complete", due: "2026-07-20", status: "on-track" },
  { project: "Riverside Tower", name: "Floor 10 Completion", due: "2026-08-10", status: "on-track" },
  { project: "Green Valley School", name: "Interior Finishing", due: "2026-07-25", status: "on-track" },
  { project: "Green Valley School", name: "Handover", due: "2026-09-15", status: "pending" },
];

export default function PortalProjects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-cos-blue">My Projects</h1>
        <p className="text-muted-foreground">Track the progress of your construction projects</p>
      </div>

      {projects.map((p) => (
        <Card key={p.id} className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cos-orange to-cos-orange-dark shadow-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.id}</p>
                  </div>
                  <Badge variant="success" className="ml-auto lg:ml-0">{p.status}</Badge>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground"><MapPin className="h-4 w-4" /> {p.location}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><User className="h-4 w-4" /> {p.manager}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><Calendar className="h-4 w-4" /> {p.startDate} - {p.endDate}</span>
                  <span className="flex items-center gap-1 text-muted-foreground"><HardHat className="h-4 w-4" /> {p.type}</span>
                </div>
              </div>
              <div className="w-full lg:w-48">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-bold">{p.progress}%</span>
                </div>
                <Progress value={p.progress} variant="success" />
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>Budget</span><span className="font-medium">{p.budget}</span></div>
                  <div className="flex justify-between"><span>Spent</span><span className="font-medium">{p.spent}</span></div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 text-sm font-medium text-cos-blue">Milestones</h4>
              <div className="grid gap-2 sm:grid-cols-2">
                {milestones.filter((m) => m.project === p.name).map((m, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="text-sm font-medium">{m.name}</p>
                      <p className="text-xs text-muted-foreground">Due: {m.due}</p>
                    </div>
                    <Badge variant={m.status === "on-track" ? "success" : "secondary"} className="text-[10px]">{m.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
