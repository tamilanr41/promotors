"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, ShieldAlert, CheckCircle2, AlertTriangle, ClipboardList, FileText } from "lucide-react";

const inspections = [
  { id: "SFT-001", title: "Weekly Site Inspection", project: "Riverside Tower", inspector: "Ahmed Al-Rashid", date: "2026-07-08", status: "passed", findings: 0 },
  { id: "SFT-002", title: "Crane Safety Check", project: "Riverside Tower", inspector: "Mike Wilson", date: "2026-07-07", status: "passed", findings: 0 },
  { id: "SFT-003", title: "Scaffolding Inspection", project: "Oakwood Estates", inspector: "John Smith", date: "2026-07-06", status: "conditional", findings: 3 },
  { id: "SFT-004", title: "Electrical Safety Audit", project: "Green Valley School", inspector: "Sarah Lee", date: "2026-07-05", status: "passed", findings: 0 },
  { id: "SFT-005", title: "Fire Safety Drill", project: "City Center Mall", inspector: "James Brown", date: "2026-07-04", status: "failed", findings: 5 },
  { id: "SFT-006", title: "PPE Compliance Check", project: "Sunset Villas", inspector: "Anna Davis", date: "2026-07-03", status: "passed", findings: 0 },
  { id: "SFT-007", title: "Monthly Safety Review", project: "Riverside Tower", inspector: "Ahmed Al-Rashid", date: "2026-07-01", status: "conditional", findings: 2 },
];

const incidents = [
  { id: "INC-001", type: "Near Miss", project: "Oakwood Estates", description: "Falling tool from scaffolding", date: "2026-07-02", severity: "low" },
  { id: "INC-002", type: "First Aid", project: "Riverside Tower", description: "Minor cut from rebar", date: "2026-06-28", severity: "low" },
  { id: "INC-003", type: "Property Damage", project: "City Center Mall", description: "Crane boom contact with structure", date: "2026-06-25", severity: "medium" },
];

const metrics = [
  { label: "Days Without Incident", value: "12", color: "from-green-500 to-green-600", icon: ShieldAlert },
  { label: "Inspections (MTD)", value: "24", color: "from-cos-blue to-cos-blue-light", icon: ClipboardList },
  { label: "Open Findings", value: "10", color: "from-amber-500 to-amber-600", icon: AlertTriangle },
  { label: "Safety Reports", value: "8", color: "from-cos-orange to-cos-orange-dark", icon: FileText },
];

export default function SafetyPage() {
  const [search, setSearch] = useState("");

  const filtered = inspections.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase()) || i.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Safety Management</h1>
          <p className="text-muted-foreground">Track inspections, incidents, and compliance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Report Incident</Button>
          <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
            <Plus className="mr-2 h-4 w-4" />
            New Inspection
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="border-0 shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${m.color} shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{m.label}</p>
                  <p className="text-2xl font-bold">{m.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cos-blue">Recent Inspections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search inspections..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Findings</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((ins) => (
                  <TableRow key={ins.id}>
                    <TableCell className="font-medium">{ins.title}</TableCell>
                    <TableCell>{ins.project}</TableCell>
                    <TableCell>
                      <Badge variant={ins.status === "passed" ? "success" : ins.status === "conditional" ? "warning" : "destructive"}>
                        {ins.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ins.findings}</TableCell>
                    <TableCell className="text-muted-foreground">{ins.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-cos-blue">Recent Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((inc) => (
                  <TableRow key={inc.id}>
                    <TableCell className="font-medium">{inc.type}</TableCell>
                    <TableCell>{inc.project}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{inc.description}</TableCell>
                    <TableCell>
                      <Badge variant={inc.severity === "low" ? "secondary" : inc.severity === "medium" ? "warning" : "destructive"}>
                        {inc.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{inc.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
