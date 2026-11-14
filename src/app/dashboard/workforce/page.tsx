"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Briefcase, UserCheck, Clock, Calendar, Users } from "lucide-react";

const workers = [
  { id: "WR-001", name: "Carlos Mendez", role: "Foreman", trade: "General", status: "present", project: "Riverside Tower", phone: "+1 (555) 0301", startDate: "2026-01-15" },
  { id: "WR-002", name: "Andre Thompson", role: "Carpenter", trade: "Carpentry", status: "present", project: "Riverside Tower", phone: "+1 (555) 0302", startDate: "2026-02-01" },
  { id: "WR-003", name: "Jose Hernandez", role: "Electrician", trade: "Electrical", status: "present", project: "Oakwood Estates", phone: "+1 (555) 0303", startDate: "2026-03-10" },
  { id: "WR-004", name: "Wei Zhang", role: "Welder", trade: "Welding", status: "absent", project: "City Center Mall", phone: "+1 (555) 0304", startDate: "2026-04-01" },
  { id: "WR-005", name: "Omar Hassan", role: "Operator", trade: "Heavy Equipment", status: "present", project: "Green Valley School", phone: "+1 (555) 0305", startDate: "2026-05-15" },
  { id: "WR-006", name: "Patrick O'Brien", role: "Plumber", trade: "Plumbing", status: "on-leave", project: "Sunset Villas", phone: "+1 (555) 0306", startDate: "2026-03-20" },
  { id: "WR-007", name: "Raj Patel", role: "Surveyor", trade: "Surveying", status: "present", project: "Riverside Tower", phone: "+1 (555) 0307", startDate: "2026-01-20" },
  { id: "WR-008", name: "Ahmed Al-Rashid", role: "Safety Officer", trade: "Safety", status: "present", project: "Oakwood Estates", phone: "+1 (555) 0308", startDate: "2026-02-15" },
];

const metrics = [
  { label: "Total Workforce", value: "186", color: "from-cos-blue to-cos-blue-light", icon: Users },
  { label: "Present Today", value: "152", color: "from-green-500 to-green-600", icon: UserCheck },
  { label: "On Leave", value: "18", color: "from-amber-500 to-amber-600", icon: Clock },
  { label: "Absent", value: "16", color: "from-red-500 to-red-600", icon: Calendar },
];

export default function WorkforcePage() {
  const [search, setSearch] = useState("");

  const filtered = workers.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) || w.role.toLowerCase().includes(search.toLowerCase()) || w.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Workforce</h1>
          <p className="text-muted-foreground">Manage workforce, attendance, and scheduling</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Schedule</Button>
          <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
            <Plus className="mr-2 h-4 w-4" />
            Add Worker
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

      <Card className="border-0 shadow-md">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search workers..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Worker</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Start Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>
                    <div className="font-medium">{w.name}</div>
                    <p className="text-xs text-muted-foreground">{w.id}</p>
                  </TableCell>
                  <TableCell>{w.role}</TableCell>
                  <TableCell>{w.trade}</TableCell>
                  <TableCell>
                    <Badge variant={w.status === "present" ? "success" : w.status === "on-leave" ? "warning" : "destructive"}>
                      {w.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{w.project}</TableCell>
                  <TableCell>{w.phone}</TableCell>
                  <TableCell className="text-muted-foreground">{w.startDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
