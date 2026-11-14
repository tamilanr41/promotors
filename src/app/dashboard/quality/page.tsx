"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, ClipboardCheck, CheckCircle2, AlertTriangle, XCircle, FileText } from "lucide-react";

const checklists = [
  { id: "QC-001", title: "Concrete Quality Test - Floor 10", project: "Riverside Tower", inspector: "Sarah Lee", date: "2026-07-08", status: "passed", items: 12, passed: 12 },
  { id: "QC-002", title: "Steel Welding Inspection", project: "Riverside Tower", inspector: "James Brown", date: "2026-07-07", status: "passed", items: 8, passed: 8 },
  { id: "QC-003", title: "Plumbing Pressure Test", project: "Oakwood Estates", inspector: "Mike Wilson", date: "2026-07-06", status: "conditional", items: 10, passed: 8 },
  { id: "QC-004", title: "Electrical Continuity Check", project: "Green Valley School", inspector: "Sarah Lee", date: "2026-07-05", status: "passed", items: 15, passed: 15 },
  { id: "QC-005", title: "Roof Waterproofing Test", project: "City Center Mall", inspector: "Anna Davis", date: "2026-07-04", status: "failed", items: 6, passed: 3 },
  { id: "QC-006", title: "HVAC System Calibration", project: "Sunset Villas", inspector: "John Smith", date: "2026-07-03", status: "passed", items: 9, passed: 9 },
  { id: "QC-007", title: "Fire Door Installation Check", project: "Riverside Tower", inspector: "Ahmed Al-Rashid", date: "2026-07-02", status: "conditional", items: 7, passed: 5 },
];

const metrics = [
  { label: "Inspections (MTD)", value: "34", color: "from-cos-blue to-cos-blue-light", icon: ClipboardCheck },
  { label: "Pass Rate", value: "88%", color: "from-green-500 to-green-600", icon: CheckCircle2 },
  { label: "Open Issues", value: "6", color: "from-amber-500 to-amber-600", icon: AlertTriangle },
  { label: "Failed Tests", value: "2", color: "from-red-500 to-red-600", icon: XCircle },
];

export default function QualityPage() {
  const [search, setSearch] = useState("");

  const filtered = checklists.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) || c.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Quality Control</h1>
          <p className="text-muted-foreground">Manage inspections, tests, and quality assurance</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          New Checklist
        </Button>
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

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search quality checks..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Check</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Inspector</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Pass Rate</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((qc) => (
                <TableRow key={qc.id}>
                  <TableCell className="font-medium">{qc.title}</TableCell>
                  <TableCell>{qc.project}</TableCell>
                  <TableCell>{qc.inspector}</TableCell>
                  <TableCell>
                    <Badge variant={qc.status === "passed" ? "success" : qc.status === "conditional" ? "warning" : "destructive"}>
                      {qc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{qc.passed}/{qc.items}</TableCell>
                  <TableCell>
                    <span className={qc.passed / qc.items >= 0.9 ? "text-green-600" : qc.passed / qc.items >= 0.7 ? "text-yellow-600" : "text-red-600"}>
                      {Math.round((qc.passed / qc.items) * 100)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{qc.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
