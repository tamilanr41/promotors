"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Wrench, CheckCircle2, AlertTriangle, Clock, Hammer } from "lucide-react";

const equipment = [
  { id: "EQ-001", name: "Tower Crane - Liebherr 200", type: "Crane", status: "operational", location: "Riverside Tower", lastService: "2026-06-15", nextService: "2026-08-15", utilization: 85 },
  { id: "EQ-002", name: "Excavator - CAT 320", type: "Excavator", status: "operational", location: "Oakwood Estates", lastService: "2026-06-20", nextService: "2026-08-20", utilization: 72 },
  { id: "EQ-003", name: "Bulldozer - D6", type: "Bulldozer", status: "maintenance", location: "Workshop", lastService: "2026-07-01", nextService: "2026-07-15", utilization: 0 },
  { id: "EQ-004", name: "Concrete Pump", type: "Pump", status: "operational", location: "Green Valley School", lastService: "2026-06-25", nextService: "2026-08-25", utilization: 90 },
  { id: "EQ-005", name: "Generator - 500kW", type: "Generator", status: "idle", location: "Storage Yard", lastService: "2026-05-10", nextService: "2026-08-10", utilization: 0 },
  { id: "EQ-006", name: "Forklift - 5 ton", type: "Forklift", status: "operational", location: "City Center Mall", lastService: "2026-07-02", nextService: "2026-09-02", utilization: 65 },
  { id: "EQ-007", name: "Compressor - Atlas Copco", type: "Compressor", status: "operational", location: "Riverside Tower", lastService: "2026-06-28", nextService: "2026-08-28", utilization: 78 },
  { id: "EQ-008", name: "Welding Machine", type: "Welder", status: "maintenance", location: "Workshop", lastService: "2026-06-10", nextService: "2026-06-24", utilization: 0 },
];

const metrics = [
  { label: "Total Equipment", value: "48", color: "from-cos-blue to-cos-blue-light", icon: Wrench },
  { label: "Operational", value: "32", color: "from-green-500 to-green-600", icon: CheckCircle2 },
  { label: "Under Maintenance", value: "8", color: "from-amber-500 to-amber-600", icon: AlertTriangle },
  { label: "Idle", value: "8", color: "from-cos-orange to-cos-orange-dark", icon: Clock },
];

export default function EquipmentPage() {
  const [search, setSearch] = useState("");

  const filtered = equipment.filter((eq) =>
    eq.name.toLowerCase().includes(search.toLowerCase()) || eq.type.toLowerCase().includes(search.toLowerCase()) || eq.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-cos-blue">Equipment</h1>
          <p className="text-muted-foreground">Track and manage construction equipment</p>
        </div>
        <Button className="bg-gradient-to-r from-cos-orange to-cos-orange-dark">
          <Plus className="mr-2 h-4 w-4" />
          Add Equipment
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
            <Input placeholder="Search equipment..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Service</TableHead>
                <TableHead>Next Service</TableHead>
                <TableHead>Utilization</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((eq) => (
                <TableRow key={eq.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-medium">
                      <Hammer className="h-4 w-4 text-cos-orange" />
                      {eq.name}
                    </div>
                    <p className="text-xs text-muted-foreground">{eq.id}</p>
                  </TableCell>
                  <TableCell>{eq.type}</TableCell>
                  <TableCell>
                    <Badge variant={eq.status === "operational" ? "success" : eq.status === "maintenance" ? "warning" : "secondary"}>
                      {eq.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{eq.location}</TableCell>
                  <TableCell className="text-muted-foreground">{eq.lastService}</TableCell>
                  <TableCell className="text-muted-foreground">{eq.nextService}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-gray-200">
                        <div className={`h-2 rounded-full ${eq.utilization > 70 ? "bg-green-500" : eq.utilization > 40 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${eq.utilization}%` }} />
                      </div>
                      <span className="text-xs">{eq.utilization}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
